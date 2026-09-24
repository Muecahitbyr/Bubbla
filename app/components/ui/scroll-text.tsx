import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from "motion/react"
import { Fragment, useRef } from "react"
import { cn } from "~/lib/cn"

/** Absatz, dessen Wörter beim Scrollen nacheinander „aufleuchten“. `highlight` hebt Wörter gelb hervor. */
export function ScrollText({ text, className, highlight = [] }: { text: string; className?: string; highlight?: string[] }) {
  const ref = useRef<HTMLParagraphElement>(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.85", "end 0.5"] })
  const words = text.split(" ")
  const marked = (w: string) => highlight.includes(w.replace(/[.,!?]/g, ""))

  return (
    <p ref={ref} className={cn("tracking-tight", className)}>
      {words.map((word, i) => (
        <Fragment key={i}>
          {reduce ? (
            <span className={marked(word) ? "highlight" : undefined}>{word}</span>
          ) : (
            <Word progress={scrollYProgress} range={[i / words.length, (i + 1) / words.length]} marked={marked(word)}>
              {word}
            </Word>
          )}
          {i < words.length - 1 && " "}
        </Fragment>
      ))}
    </p>
  )
}

function Word({ children, progress, range, marked }: { children: string; progress: MotionValue<number>; range: [number, number]; marked: boolean }) {
  const opacity = useTransform(progress, range, [0.16, 1])
  return (
    <motion.span style={{ opacity }} className={marked ? "highlight" : undefined}>
      {children}
    </motion.span>
  )
}
