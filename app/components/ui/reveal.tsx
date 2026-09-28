import { motion, useReducedMotion, type Variants } from "motion/react"
import { useRef, type ReactNode } from "react"
import { easeOutExpo } from "~/lib/motion"
import { useRevealed } from "~/lib/use-revealed"

/** Blendet Inhalte beim Hereinscrollen weich ein (Fade + Slide). */
export function Reveal({
  children,
  className,
  delay = 0,
  y = 28,
}: {
  children: ReactNode
  className?: string
  delay?: number
  y?: number
}) {
  const reduce = useReducedMotion()
  const ref = useRef<HTMLDivElement>(null)
  const shown = useRevealed(ref)
  return (
    <motion.div
      ref={ref}
      className={className}
      initial={reduce ? false : { opacity: 0, y }}
      animate={shown || reduce ? { opacity: 1, y: 0 } : undefined}
      transition={{ duration: 0.95, delay, ease: easeOutExpo }}
    >
      {children}
    </motion.div>
  )
}

const container: Variants = {
  hidden: {},
  show: (stagger: number = 0.08) => ({ transition: { staggerChildren: stagger } }),
}

const item: Variants = {
  hidden: { opacity: 0, y: 26 },
  show: { opacity: 1, y: 0, transition: { duration: 0.85, ease: easeOutExpo } },
}

/** Container, dessen <StaggerItem>-Kinder nacheinander erscheinen. */
export function Stagger({
  children,
  className,
  stagger = 0.08,
  as = "div",
}: {
  children: ReactNode
  className?: string
  stagger?: number
  as?: "div" | "ul" | "ol"
}) {
  const reduce = useReducedMotion()
  const ref = useRef<HTMLElement>(null)
  const shown = useRevealed(ref)
  const Comp = as === "ul" ? motion.ul : as === "ol" ? motion.ol : motion.div
  return (
    // Ref-Typ je nach Tag unterschiedlich – Laufzeit ist identisch
    <Comp ref={ref as never} className={className} variants={container} custom={stagger} initial={reduce ? false : "hidden"} animate={shown || reduce ? "show" : "hidden"}>
      {children}
    </Comp>
  )
}

export function StaggerItem({ children, className, as = "div" }: { children: ReactNode; className?: string; as?: "div" | "li" }) {
  const Comp = as === "li" ? motion.li : motion.div
  return (
    <Comp className={className} variants={item}>
      {children}
    </Comp>
  )
}
