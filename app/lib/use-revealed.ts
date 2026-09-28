import { useEffect, useState, type RefObject } from "react"

/**
 * Zustand eines Elements, das beim Hereinscrollen eingeblendet wird:
 * - "static": sichtbar, keine Animation. So wird vorgerendert – Inhalte sind ohne JavaScript
 *   (oder wenn es nicht startet) immer sichtbar – und so bleiben Elemente, die beim Laden
 *   schon im Bild oder darüber liegen.
 * - "hidden": liegt beim Start komplett unterhalb des Bildschirms → wird unsichtbar geschaltet
 *   (der Nutzer sieht es dort ohnehin nicht) und wartet aufs Hereinkommen.
 * - "shown": ist ins Bild gekommen → Einblend-Animation läuft.
 *
 * Ausgelöst wird, sobald irgendein Teil des Elements den Bildschirm berührt oder es darüber liegt:
 * - IntersectionObserver ohne Anteil-Schwelle: erkennt auch Bewegung ohne Scrollen (Layout-Verschiebung,
 *   Einblend-Animation der Nachbarn). Eine Anteil-Schwelle („amount“) oder ein Rand-Streifen würde
 *   große Blöcke bzw. am Rand stehenbleibende Elemente nie auslösen.
 * - Scroll-Prüfung: fängt Elemente, die bei Sprüngen (Anker, Ende-Taste) übersprungen wurden – die
 *   wechseln nie in den Zustand „im Bild“ und würden vom Observer nicht gemeldet.
 * Alle Elemente teilen sich einen Observer und einen Scroll-Listener (pro Frame höchstens eine Prüfung).
 */
export type RevealPhase = "static" | "hidden" | "shown"

export function useRevealPhase(ref: RefObject<Element | null>, { disabled = false } = {}): RevealPhase {
  const [phase, setPhase] = useState<RevealPhase>("static")

  useEffect(() => {
    const el = ref.current
    if (disabled || !el) return
    let waiting = false
    const reveal = () => {
      if (!waiting) return
      waiting = false
      unwatch(el)
      setPhase("shown")
    }
    // Erst im nächsten Frame messen: Nach einem Seitenwechsel springt die Seite zuvor noch nach oben
    const frame = requestAnimationFrame(() => {
      if (el.getBoundingClientRect().top < window.innerHeight) return // schon im Bild oder darüber → bleibt „static“
      setPhase("hidden")
      waiting = true
      watch(el, reveal)
    })
    return () => {
      cancelAnimationFrame(frame)
      if (waiting) unwatch(el)
    }
  }, [ref, disabled])

  return phase
}

const callbacks = new Map<Element, () => void>()
let observer: IntersectionObserver | null = null
let listening = false
let frame = 0

function watch(el: Element, cb: () => void) {
  callbacks.set(el, cb)
  observer ??= new IntersectionObserver((entries) => {
    for (const e of entries) if (e.isIntersecting) callbacks.get(e.target)?.()
  })
  observer.observe(el)
  if (!listening) {
    listening = true
    window.addEventListener("scroll", schedule, { passive: true })
    window.addEventListener("resize", schedule)
  }
}

function unwatch(el: Element) {
  callbacks.delete(el)
  observer?.unobserve(el)
}

function schedule() {
  if (!frame) frame = requestAnimationFrame(checkAll)
}

/** Elemente, die (z. B. nach einem Sprung) schon den Bildschirm erreicht oder überholt haben */
function checkAll() {
  frame = 0
  for (const [el, cb] of [...callbacks]) if (el.getBoundingClientRect().top < window.innerHeight) cb()
}
