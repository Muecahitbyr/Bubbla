import { AnimatePresence, motion, useReducedMotion } from "motion/react"
import { ArrowRight } from "lucide-react"
import { useState } from "react"
import { Link } from "react-router"
import { categoryLabels, classes, mainFee, priceLabel, type Category } from "~/content/classes"
import { cn } from "~/lib/cn"
import { easeOutExpo } from "~/lib/motion"
import { FeeList } from "./fee-list"
import { MockBadge } from "./mock-badge"
import { Plate } from "./plate"

type Filter = "alle" | Category
const filters: { id: Filter; label: string }[] = [
  { id: "alle", label: "Alle" },
  { id: "auto", label: "Auto" },
  { id: "zweirad", label: "Zweirad" },
]

/** Preistabelle mit Filter (Alle / Auto / Zweirad). Liest nur aus classes.ts. */
export function PriceExplorer() {
  const [filter, setFilter] = useState<Filter>("alle")
  const reduce = useReducedMotion()
  const visible = classes.filter((c) => filter === "alle" || c.category === filter)

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div role="group" aria-label="Preise filtern" className="bg-tile inline-flex rounded-full p-1">
          {filters.map((f) => {
            const count = f.id === "alle" ? classes.length : classes.filter((c) => c.category === f.id).length
            if (count === 0) return null
            return (
              <button
                key={f.id}
                type="button"
                aria-pressed={filter === f.id}
                onClick={() => setFilter(f.id)}
                className={cn(
                  "relative rounded-full px-4 py-2 text-[14.5px] font-bold transition-colors md:px-5",
                  filter === f.id ? "text-white" : "text-muted hover:text-fg",
                )}
              >
                {filter === f.id && (
                  <motion.span layoutId="price-filter" className="bg-night absolute inset-0 rounded-full" transition={{ duration: reduce ? 0 : 0.4, ease: easeOutExpo }} />
                )}
                <span className="relative">
                  {f.label} <span className="opacity-60">{count}</span>
                </span>
              </button>
            )
          })}
        </div>
        <MockBadge label="Alle Preise sind Beispielwerte" />
      </div>

      <motion.div layout={!reduce} className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        <AnimatePresence mode="popLayout" initial={false}>
          {visible.map((c) => {
            const main = mainFee(c)
            return (
              <motion.article
                key={c.slug}
                layout={!reduce}
                initial={reduce ? false : { opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.97 }}
                transition={{ duration: 0.4, ease: easeOutExpo }}
                className="bg-tile flex flex-col rounded-[26px] p-6 md:p-7"
                aria-labelledby={`preis-${c.slug}`}
                data-category={c.category}
              >
                <div className="flex items-start justify-between gap-3">
                  <Plate code={c.code} size="sm" />
                  <span className="text-muted text-[12.5px] font-bold tracking-[0.08em] uppercase">{categoryLabels[c.category]}</span>
                </div>
                <h3 id={`preis-${c.slug}`} className="mt-5 text-[21px] leading-tight font-extrabold tracking-[-0.02em]">
                  {c.name}
                </h3>
                {main && (
                  <p className="mt-3">
                    <span className="text-muted text-[14px]">{main.label} </span>
                    <span className="text-bubla text-[30px] font-extrabold tracking-[-0.03em] tabular-nums">{priceLabel(main)}</span>
                  </p>
                )}
                <FeeList fees={c.fees.filter((f) => f !== main)} compact className="mt-4 flex-1" />
                <Link to={c.path} className="text-accent mt-6 inline-flex items-center gap-1.5 text-[15px] font-bold hover:underline">
                  Mehr zu {c.code} <ArrowRight className="size-4" aria-hidden />
                </Link>
              </motion.article>
            )
          })}
        </AnimatePresence>
      </motion.div>
    </div>
  )
}
