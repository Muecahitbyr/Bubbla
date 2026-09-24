import { motion, useReducedMotion, useScroll, useTransform } from "motion/react"
import { useRef } from "react"
import { cn } from "~/lib/cn"

/** Bild, das sich beim Scrollen langsamer bewegt als die Seite (Parallax). */
export function ParallaxImage({
  src,
  alt,
  className,
  imgClassName,
  speed = 0.1,
  position,
}: {
  src: string
  alt: string
  className?: string
  imgClassName?: string
  /** Stärke der Verschiebung (0.1 = ±10 % der Bildhöhe) */
  speed?: number
  position?: string
}) {
  const ref = useRef<HTMLDivElement>(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] })
  const y = useTransform(scrollYProgress, [0, 1], reduce ? ["0%", "0%"] : [`-${speed * 100}%`, `${speed * 100}%`])

  return (
    <div ref={ref} className={cn("relative overflow-hidden", className)}>
      <motion.img
        src={src}
        alt={alt}
        style={{ y, scale: reduce ? 1 : 1 + speed * 2.4, objectPosition: position }}
        className={cn("absolute inset-0 h-full w-full object-cover will-change-transform", imgClassName)}
        loading="lazy"
        decoding="async"
      />
    </div>
  )
}
