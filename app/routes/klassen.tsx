import { AnimatePresence, motion, useReducedMotion } from "motion/react"
import { useState } from "react"
import type { MetaFunction } from "react-router"
import { LocalNav } from "~/components/layout/local-nav"
import { ClassCard } from "~/components/ui/class-card"
import { CtaBand } from "~/components/ui/cta-band"
import { MockBadge } from "~/components/ui/mock-badge"
import { PageHero } from "~/components/ui/page-hero"
import { Reveal } from "~/components/ui/reveal"
import { Heading, Section } from "~/components/ui/section"
import { categoryLabels, classes, type Category } from "~/content/classes"
import { paths } from "~/content/site"
import { cn } from "~/lib/cn"
import { easeOutExpo } from "~/lib/motion"
import { seo } from "~/lib/seo"

export const meta: MetaFunction = () =>
  seo({
    title: "Führerscheinklassen | Fahrschule Bubla Kaufbeuren",
    description: "Alle Führerscheinklassen der Fahrschule Bubla in Kaufbeuren und Neugablonz: Auto, Anhänger, Roller und Motorrad – mit Mindestalter und Preisen.",
    path: paths.klassen,
  })

type Filter = "alle" | Category

export default function Klassen() {
  const [filter, setFilter] = useState<Filter>("alle")
  const reduce = useReducedMotion()
  const visible = classes.filter((c) => filter === "alle" || c.category === filter)

  return (
    <>
      <LocalNav title="Klassen" links={[{ label: "Alle Klassen", href: "#uebersicht" }]} />
      <PageHero
        kicker="Führerscheinklassen"
        title="Auto. Anhänger. Motorrad."
        lead={
          <>
            Vom Roller bis zum großen Motorrad, vom ersten Autoführerschein bis zum Wohnwagen – <strong>finde die passende Klasse.</strong>
          </>
        }
        image="/images/stock/motorrad-bergstrasse.webp"
        imageAlt="Motorrad auf einer Bergstraße im Herbst"
      >
        <MockBadge label="Klassen außer B / B17 sind Beispielinhalte" />
      </PageHero>

      <Section id="uebersicht">
        <div className="wrap">
          <Reveal className="flex flex-wrap items-end justify-between gap-6">
            <Heading kicker="Übersicht" title={`${visible.length} Klassen.`} size="md" />
            <div role="group" aria-label="Klassen filtern" className="bg-tile inline-flex rounded-full p-1">
              {(["alle", "auto", "zweirad"] as Filter[]).map((f) => (
                <button
                  key={f}
                  type="button"
                  aria-pressed={filter === f}
                  onClick={() => setFilter(f)}
                  className={cn("relative rounded-full px-4 py-2 text-[14.5px] font-bold transition-colors md:px-5", filter === f ? "text-white" : "text-muted hover:text-fg")}
                >
                  {filter === f && <motion.span layoutId="class-filter" className="bg-night absolute inset-0 rounded-full" transition={{ duration: reduce ? 0 : 0.4, ease: easeOutExpo }} />}
                  <span className="relative">{f === "alle" ? "Alle" : categoryLabels[f]}</span>
                </button>
              ))}
            </div>
          </Reveal>

          <motion.ul layout={!reduce} className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <AnimatePresence mode="popLayout" initial={false}>
              {visible.map((c) => (
                <motion.li
                  key={c.slug}
                  layout={!reduce}
                  initial={reduce ? false : { opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.45, ease: easeOutExpo }}
                  data-category={c.category}
                >
                  <ClassCard
                    item={{ path: c.path, code: c.code, title: c.name, summary: c.summary, image: c.image, imageAlt: c.imageAlt, imagePosition: c.imagePosition, badge: c.ageBadge ?? `ab ${c.minAge[0].value}` }}
                  />
                </motion.li>
              ))}
            </AnimatePresence>
          </motion.ul>
        </div>
      </Section>

      <CtaBand title="Nicht sicher, welche Klasse passt?" text="Ruf uns an – wir beraten dich gerne persönlich. Mit Spaß zum Erfolg!" />
    </>
  )
}
