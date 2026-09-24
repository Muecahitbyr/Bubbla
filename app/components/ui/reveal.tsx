import { motion, useReducedMotion, type Variants } from "motion/react"
import type { ReactNode } from "react"
import { easeOutExpo } from "~/lib/motion"

/** Blendet Inhalte beim Hereinscrollen weich ein (Fade + Slide). */
export function Reveal({
  children,
  className,
  delay = 0,
  y = 28,
  amount = 0.2,
}: {
  children: ReactNode
  className?: string
  delay?: number
  y?: number
  amount?: number
}) {
  const reduce = useReducedMotion()
  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount, margin: "0px 0px -6% 0px" }}
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
  amount = 0.15,
  as = "div",
}: {
  children: ReactNode
  className?: string
  stagger?: number
  amount?: number
  as?: "div" | "ul" | "ol"
}) {
  const reduce = useReducedMotion()
  const Comp = as === "ul" ? motion.ul : as === "ol" ? motion.ol : motion.div
  return (
    <Comp className={className} variants={container} custom={stagger} initial={reduce ? false : "hidden"} whileInView="show" viewport={{ once: true, amount }}>
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
