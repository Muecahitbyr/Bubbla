import { useEffect, useRef, useState, type RefObject } from "react"

/**
 * Einblenden beim Scrollen – Progressive Enhancement:
 * ohne JavaScript sichtbar, MIT JavaScript animiert.
 *
 * Zustände:
 * - "static": sichtbar, keine Animation. So wird vorgerendert (Inhalt ohne JavaScript immer da) und so
 *   bleiben Elemente, die beim ersten Laden schon im Bild sind – sie wurden bereits gezeichnet und würden
 *   sonst aufflackern.
 * - "hidden": wartet unsichtbar aufs Hereinkommen. Nur mit laufendem JavaScript: Elemente, die beim Laden
 *   komplett unterhalb des Bildschirms liegen, und alle Elemente einer per Navigation geöffneten Seite
 *   (die sind neu und noch nicht gezeichnet).
 * - "shown": Einblend-Animation läuft.
 *
 * Auslöser (wer zuerst kommt):
 * 1. Oberkante erreicht die Auslöse-Linie (TRIGGER, 85 % der Bildschirmhöhe) – dort sieht man die
 *    Animation gut. IntersectionObserver: erkennt auch Bewegung ohne Scrollen (Layout, Nachbar-Animation).
 * 2. Element wurde übersprungen (Sprung per Anker/Ende-Taste) → Scroll-Prüfung.
 * 3. Sicherheitsnetz: Element ist im Bild, aber noch unterhalb der Linie (z. B. am Seitenende, das nicht
 *    weiter scrollt) → nach SAFETY_MS trotzdem einblenden. Nichts bleibt sichtbar-leer im Bild stehen.
 * Ohne IntersectionObserver-Unterstützung wird nie ausgeblendet.
 */
export type RevealPhase = "static" | "hidden" | "shown"

const TRIGGER = 0.85
const SAFETY_MS = 700

/** true, sobald die erste Seite hydriert ist – danach neu erscheinende Elemente dürfen unsichtbar starten */
let appMounted = false

export function useRevealPhase(ref: RefObject<Element | null>, { disabled = false } = {}): RevealPhase {
  const [phase, setPhaseState] = useState<RevealPhase>(() => (!disabled && appMounted && supported() ? "hidden" : "static"))
  // aktueller Zustand für die Effekte (ohne Seiteneffekte in setState-Updatern)
  const phaseRef = useRef(phase)
  const setPhase = (p: RevealPhase) => {
    phaseRef.current = p
    setPhaseState(p)
  }

  useEffect(() => {
    const el = ref.current
    const markMounted = requestAnimationFrame(() => (appMounted = true))
    if (disabled || !el || !supported()) {
      setPhase("static")
      return () => cancelAnimationFrame(markMounted)
    }
    let waiting = false
    const reveal = () => {
      if (!waiting) return
      waiting = false
      unwatch(el)
      setPhase("shown")
    }
    // Im nächsten Frame messen: Nach einem Seitenwechsel springt die Seite zuvor noch nach oben
    const frame = requestAnimationFrame(() => {
      if (phaseRef.current === "shown") return
      const top = el.getBoundingClientRect().top
      if (phaseRef.current === "static" && top < window.innerHeight) return // beim Laden schon gezeichnet → bleibt
      if (top < window.innerHeight * TRIGGER) return setPhase("shown") // neue Seite, direkt im Bild → einblenden
      setPhase("hidden")
      waiting = true
      watch(el, reveal)
    })
    return () => {
      cancelAnimationFrame(frame)
      cancelAnimationFrame(markMounted)
      if (waiting) unwatch(el)
      waiting = false
    }
  }, [ref, disabled])

  return phase
}

const supported = () => typeof window !== "undefined" && "IntersectionObserver" in window

type Watch = { reveal: () => void; timer?: number }
const watched = new Map<Element, Watch>()
let lineObserver: IntersectionObserver | null = null
let edgeObserver: IntersectionObserver | null = null
let listening = false
let frame = 0

function watch(el: Element, reveal: () => void) {
  watched.set(el, { reveal })
  // 1. Auslöse-Linie bei 85 % der Bildschirmhöhe
  lineObserver ??= new IntersectionObserver((entries) => entries.forEach((e) => e.isIntersecting && watched.get(e.target)?.reveal()), {
    rootMargin: `0px 0px -${Math.round((1 - TRIGGER) * 100)}% 0px`,
  })
  // 3. Sicherheitsnetz: im Bild, aber unter der Linie → nach kurzer Zeit trotzdem
  edgeObserver ??= new IntersectionObserver((entries) =>
    entries.forEach((e) => {
      const w = watched.get(e.target)
      if (!w) return
      window.clearTimeout(w.timer)
      if (e.isIntersecting) w.timer = window.setTimeout(() => w.reveal(), SAFETY_MS)
    }),
  )
  lineObserver.observe(el)
  edgeObserver.observe(el)
  // 2. Übersprungene Elemente
  if (!listening) {
    listening = true
    window.addEventListener("scroll", schedule, { passive: true })
    window.addEventListener("resize", schedule)
  }
}

function unwatch(el: Element) {
  const w = watched.get(el)
  if (w) window.clearTimeout(w.timer)
  watched.delete(el)
  lineObserver?.unobserve(el)
  edgeObserver?.unobserve(el)
}

function schedule() {
  if (!frame) frame = requestAnimationFrame(checkPassed)
}

/** Elemente, die ein Sprung über den Bildschirm hinaus befördert hat (nie „im Bild“ gewesen) */
function checkPassed() {
  frame = 0
  for (const [el, w] of [...watched]) if (el.getBoundingClientRect().bottom < 0) w.reveal()
}
