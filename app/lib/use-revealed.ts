import { useEffect, useState, type RefObject } from "react"

/**
 * Wird true, sobald die Oberkante des Elements den unteren Bildschirmrand erreicht hat – und bleibt es.
 * Bewusst ohne Sichtbarkeits-Anteil (IntersectionObserver „amount“): Große Blöcke in niedrigen Fenstern
 * oder beim schnellen Scrollen bzw. Springen über Anker würden sonst nie ausgelöst.
 * Alle Elemente teilen sich einen Scroll-Listener, der pro Frame höchstens einmal prüft.
 */
export function useRevealed(ref: RefObject<Element | null>, offset = 0.06) {
  const [shown, setShown] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (shown || !el) return
    const check = () => {
      if (el.getBoundingClientRect().top < window.innerHeight * (1 - offset)) {
        setShown(true)
        return true
      }
      return false
    }
    // Erste Prüfung erst im nächsten Frame: Nach einem Seitenwechsel springt die Seite zuvor noch nach oben
    checks.add(check)
    subscribe()
    schedule()
    return () => {
      checks.delete(check)
    }
  }, [ref, offset, shown])

  return shown
}

const checks = new Set<() => boolean>()
let listening = false
let frame = 0

function run() {
  frame = 0
  for (const check of [...checks]) if (check()) checks.delete(check)
}

function schedule() {
  if (!frame) frame = requestAnimationFrame(run)
}

function subscribe() {
  if (listening) return
  listening = true
  window.addEventListener("scroll", schedule, { passive: true })
  window.addEventListener("resize", schedule)
  window.addEventListener("load", schedule)
}
