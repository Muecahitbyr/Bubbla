import { animate, motion, useMotionValue, useReducedMotion, useTransform } from "motion/react"
import { useEffect, useRef } from "react"
import { useRevealPhase } from "~/lib/use-revealed"

/**
 * Zahl, die beim Hereinscrollen von 0 auf den Zielwert hochzählt.
 * Vorgerendert wird der ZIELWERT – ohne JavaScript (oder wenn es nicht startet) steht also immer die
 * richtige Zahl da, und Vorrendern und Hydrieren stimmen überein. Erst wenn der Zähler beim Start
 * unterhalb des Bildschirms liegt, wird er auf 0 gesetzt und zählt beim Hereinscrollen hoch.
 * Nur eine Textfassung der Zahl: Screenreader und Kopieren liefern den echten Wert.
 */
export function Counter({ to, prefix = "", suffix = "", duration = 1.8 }: { to: number; prefix?: string; suffix?: string; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null)
  const reduce = useReducedMotion()
  const phase = useRevealPhase(ref, { disabled: !!reduce })
  const value = useMotionValue(to)
  const rounded = useTransform(value, (v) => Math.round(v).toString())

  useEffect(() => {
    if (phase === "hidden") value.set(0)
    if (phase !== "shown") return
    const controls = animate(value, to, { duration, ease: [0.16, 1, 0.3, 1] })
    return () => controls.stop()
  }, [phase, to, duration, value])

  return (
    <span ref={ref} data-counter className="tabular-nums">
      {prefix}
      <motion.span>{rounded}</motion.span>
      {suffix}
    </span>
  )
}
