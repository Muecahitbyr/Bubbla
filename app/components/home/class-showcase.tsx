import { motion, useMotionValue, useReducedMotion, useScroll, useTransform } from "motion/react"
import { ArrowRight } from "lucide-react"
import { useEffect, useRef, useState } from "react"
import { Link } from "react-router"
import { classes } from "~/content/classes"
import { paths } from "~/content/site"
import { ClassCard, type ClassCardItem } from "../ui/class-card"

/** Karten: alle Klassen aus classes.ts */
const cards: ClassCardItem[] = classes.map((c) => ({
  path: c.path,
  code: c.code,
  title: c.name,
  summary: c.summary,
  image: c.image,
  imageAlt: c.imageAlt,
  imagePosition: c.imagePosition,
  badge: c.ageBadge,
}))

/**
 * Horizontale Galerie. Ab 1024 px wird sie beim Scrollen fixiert und fährt seitlich durch,
 * auf Handy/Tablet ist sie ein Wisch-Karussell.
 */
export function ClassShowcase() {
  const sectionRef = useRef<HTMLElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const reduce = useReducedMotion()
  const [pinned, setPinned] = useState(false)
  const [distance, setDistance] = useState(0)
  const distanceMV = useMotionValue(0)
  const pinnedMV = useMotionValue(0)

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)")
    const measure = () => {
      const enable = mq.matches && !reduce
      setPinned(enable)
      pinnedMV.set(enable ? 1 : 0)
      if (!trackRef.current) return
      const d = Math.max(0, trackRef.current.scrollWidth - window.innerWidth)
      setDistance(d)
      distanceMV.set(d)
    }
    measure()
    const ro = new ResizeObserver(measure)
    if (trackRef.current) ro.observe(trackRef.current)
    window.addEventListener("resize", measure)
    mq.addEventListener("change", measure)
    return () => {
      ro.disconnect()
      window.removeEventListener("resize", measure)
      mq.removeEventListener("change", measure)
    }
  }, [reduce, distanceMV, pinnedMV])

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end end"] })
  const x = useTransform([scrollYProgress, distanceMV, pinnedMV], ([sp, d, on]: number[]) => -sp * d * on)
  const progress = useTransform(scrollYProgress, [0, 1], ["0%", "100%"])

  const cardSize = "w-[78vw] shrink-0 snap-start sm:w-[46vw] md:w-[340px] lg:w-[min(350px,27vw)] lg:[aspect-ratio:3/4.1]"
  const pad = "pl-[max(2.5rem,calc((100vw-1280px)/2+2.5rem))] pr-[max(2.5rem,calc((100vw-1280px)/2+2.5rem))]"

  return (
    <section ref={sectionRef} aria-labelledby="klassen-titel" className="tone-paper relative" style={pinned ? { height: `calc(100vh + ${distance}px)` } : undefined}>
      <div className={pinned ? "sticky top-0 flex h-svh flex-col justify-center overflow-hidden pt-16" : "py-24 md:py-32"}>
        <div className="wrap mb-10 flex flex-wrap items-end justify-between gap-6 md:mb-12">
          <div>
            <p className="kicker mb-5">Führerscheinklassen</p>
            <h2 id="klassen-titel" className="display-lg max-w-[14ch] pb-[0.08em]">
              <span className="grad-ink">Auto. Anhänger.</span> <span className="grad-blue">Motorrad.</span>
            </h2>
          </div>
          <Link to={paths.klassen} className="text-accent group inline-flex items-center gap-1.5 text-[17px] font-bold">
            Alle Klassen
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden />
          </Link>
        </div>

        <motion.div
          ref={trackRef}
          style={{ x }}
          className={pinned ? `flex w-max gap-5 ${pad}` : "no-scrollbar flex snap-x snap-mandatory scroll-px-5 gap-4 overflow-x-auto px-5 pb-4 md:scroll-px-10 md:px-10"}
        >
          {cards.map((item) => (
            <ClassCard key={item.path} item={item} className={cardSize} />
          ))}
          <Link to={paths.preise} className={`group tone-blue flex aspect-[3/4] flex-col justify-between rounded-[26px] p-7 ${cardSize}`}>
            <span className="kicker">Preise</span>
            <span>
              <span className="display-sm block text-white">Keine Fahrstunde zu viel. Keine Gebühr zu viel.</span>
              <span className="text-sun mt-6 inline-flex items-center gap-1.5 text-[16px] font-bold">
                Alle Preise ansehen
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden />
              </span>
            </span>
          </Link>
        </motion.div>

        {pinned && (
          <div className="wrap mt-10">
            <div className="bg-tile-2 h-[5px] w-full overflow-hidden rounded-full">
              <motion.div className="bg-sun h-full rounded-full" style={{ width: progress }} />
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
