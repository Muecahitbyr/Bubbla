import { motion, useMotionValue, useReducedMotion, useScroll, useTransform } from "motion/react"
import { useEffect, useRef, type ReactNode } from "react"
import { cn } from "~/lib/cn"

/**
 * Bild, das beim Hereinscrollen von einer abgerundeten Karte zur vollen Breite aufzieht.
 * Höhe mobil über das Seitenverhältnis (Querformat-Fotos werden nicht hochkant beschnitten),
 * ab Tablet über die Bildschirmhöhe.
 */
export function ZoomMedia({
  src,
  alt,
  position,
  className,
  height = "aspect-[4/3] md:aspect-auto md:h-[88svh]",
  children,
  priority,
}: {
  src: string
  alt: string
  position?: string
  className?: string
  height?: string
  children?: ReactNode
  priority?: boolean
}) {
  const ref = useRef<HTMLDivElement>(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "start 0.12"] })
  const inset = useTransform(scrollYProgress, [0, 1], reduce ? ["0%", "0%"] : ["8%", "0%"])
  const radius = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [32, 0])
  const clipPath = useTransform(() => `inset(0 ${inset.get()} round ${radius.get()}px)`)
  // Auf dem Handy weniger hineinzoomen, damit vom Motiv mehr zu sehen ist
  const zoom = useMotionValue(1.25)
  useEffect(() => {
    const set = () => zoom.set(window.innerWidth < 768 ? 1.08 : 1.25)
    set()
    window.addEventListener("resize", set)
    return () => window.removeEventListener("resize", set)
  }, [zoom])
  const imgScale = useTransform([scrollYProgress, zoom], ([p, z]: number[]) => (reduce ? 1 : z - (z - 1) * p))

  return (
    <div ref={ref} className={cn("relative", className)}>
      <motion.div style={{ clipPath }} className={cn("relative overflow-hidden", height)}>
        <motion.img
          src={src}
          alt={alt}
          style={{ scale: imgScale, objectPosition: position }}
          className="absolute inset-0 h-full w-full object-cover"
          loading={priority ? "eager" : "lazy"}
          decoding="async"
        />
        {children}
      </motion.div>
    </div>
  )
}
