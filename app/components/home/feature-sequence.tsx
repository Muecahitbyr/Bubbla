import { AnimatePresence, motion, useMotionValueEvent, useReducedMotion, useScroll } from "motion/react"
import { useRef, useState, type ReactNode } from "react"
import { easeOutExpo } from "~/lib/motion"

export type Chapter = { kicker: string; title: string; text: ReactNode; image: string; alt: string; position?: string }

/**
 * Scroll-Sequenz: Der Abschnitt bleibt stehen, Bild und Text blenden Kapitel für Kapitel über.
 * Fortschritt als gelbe Fahrbahnmarkierung. Auf dem Handy beginnt der Inhalt direkt unter
 * der Navigation (nicht vertikal zentriert) und das Bild hat ein festes Seitenverhältnis.
 */
export function FeatureSequence({ chapters, label }: { chapters: Chapter[]; label: string }) {
  const ref = useRef<HTMLElement>(null)
  const reduce = useReducedMotion()
  const [active, setActive] = useState(0)
  const [local, setLocal] = useState(0)
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] })

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const f = Math.min(chapters.length - 0.0001, Math.max(0, v * chapters.length))
    setActive(Math.floor(f))
    setLocal(f - Math.floor(f))
  })

  const chapter = chapters[active]

  return (
    <section ref={ref} aria-label={label} className="tone-mist relative" style={{ height: `${chapters.length * 85 + 60}vh` }}>
      <div className="sticky top-0 flex h-svh items-start overflow-hidden pt-[calc(var(--nav-offset)+0.75rem)] md:items-center md:pt-10">
        <div className="wrap grid items-center gap-6 md:grid-cols-12 md:gap-14">
          {/* Bildkarte */}
          <div className="relative order-1 aspect-[16/10] overflow-hidden rounded-[26px] md:order-2 md:col-span-7 md:aspect-[4/3.4] lg:aspect-[4/3]">
            {chapters.map((c, i) => (
              <motion.img
                key={c.image}
                src={c.image}
                alt={i === active ? c.alt : ""}
                aria-hidden={i !== active}
                loading={i === 0 ? "eager" : "lazy"}
                decoding="async"
                style={{ objectPosition: c.position }}
                initial={false}
                animate={{ opacity: i === active ? 1 : 0, scale: i === active ? 1 : 1.08 }}
                transition={{ duration: reduce ? 0 : 1, ease: easeOutExpo }}
                className="absolute inset-0 h-full w-full object-cover"
              />
            ))}
            <span className="glass-dark absolute bottom-4 left-4 rounded-full px-3.5 py-1.5 text-[13px] font-bold text-white tabular-nums">
              {String(active + 1).padStart(2, "0")} / {String(chapters.length).padStart(2, "0")}
            </span>
          </div>

          {/* Text */}
          <div className="order-2 md:order-1 md:col-span-5">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={active}
                initial={reduce ? false : { opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduce ? { opacity: 1 } : { opacity: 0, y: -16 }}
                transition={{ duration: 0.5, ease: easeOutExpo }}
              >
                <p className="kicker mb-4">{chapter.kicker}</p>
                <h3 className="display-md grad-ink pb-[0.12em]">{chapter.title}</h3>
                <div className="lead mt-4 md:mt-5">{chapter.text}</div>
              </motion.div>
            </AnimatePresence>
            {/* Fortschritt als Fahrbahnmarkierung */}
            <ol className="mt-8 flex gap-2 md:mt-10" aria-hidden>
              {chapters.map((c, i) => (
                <li key={c.title} className="bg-tile-2 h-[5px] flex-1 overflow-hidden rounded-full">
                  <span className="bg-sun block h-full rounded-full" style={{ width: i < active ? "100%" : i === active ? `${local * 100}%` : "0%" }} />
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  )
}
