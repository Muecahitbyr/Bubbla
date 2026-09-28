import { animate, motion, useMotionValue, useReducedMotion, useTransform } from "motion/react"
import { useEffect, useRef } from "react"
import { useRevealed } from "~/lib/use-revealed"

/**
 * Zahl, die beim Hereinscrollen hochzählt. Startet IMMER bei 0 (auch bei reduzierter
 * Bewegung) – sonst weicht das vorgerenderte HTML vom Browser ab (Hydration-Fehler).
 */
export function Counter({ to, prefix = "", suffix = "", duration = 1.8 }: { to: number; prefix?: string; suffix?: string; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null)
  // Startet, sobald die Zahl sichtbar wird (etwas höher als bei Reveal, damit man das Hochzählen sieht)
  const inView = useRevealed(ref, 0.15)
  const reduce = useReducedMotion()
  const value = useMotionValue(0)
  const rounded = useTransform(value, (v) => Math.round(v).toString())

  useEffect(() => {
    if (reduce) {
      value.set(to)
      return
    }
    if (!inView) return
    const controls = animate(value, to, { duration, ease: [0.16, 1, 0.3, 1] })
    return () => controls.stop()
  }, [inView, reduce, to, duration, value])

  return (
    <span ref={ref}>
      <span className="sr-only">
        {prefix}
        {to}
        {suffix}
      </span>
      <span aria-hidden="true" className="tabular-nums">
        {prefix}
        <motion.span>{rounded}</motion.span>
        {suffix}
      </span>
    </span>
  )
}
