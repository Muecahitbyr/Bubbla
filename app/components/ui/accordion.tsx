import { motion } from "motion/react"
import { Plus } from "lucide-react"
import { useId, useState } from "react"
import { easeOutExpo } from "~/lib/motion"
import { cn } from "~/lib/cn"

export type AccordionItem = { q: string; a: string }

/** FAQ-Akkordeon. Antworten bleiben im HTML (SEO) und werden nur optisch ein-/ausgeklappt. */
export function Accordion({ items, className }: { items: AccordionItem[]; className?: string }) {
  const [open, setOpen] = useState<number | null>(0)
  const id = useId()

  return (
    <div className={cn("space-y-3", className)}>
      {items.map((item, i) => {
        const isOpen = open === i
        return (
          <div key={item.q} className={cn("bg-tile rounded-[22px] transition-colors duration-500", isOpen && "bg-tile-2")}>
            <h3>
              <button
                type="button"
                id={`${id}-q-${i}`}
                aria-expanded={isOpen}
                aria-controls={`${id}-a-${i}`}
                onClick={() => setOpen(isOpen ? null : i)}
                className="group flex w-full items-center justify-between gap-5 px-6 py-5 text-left text-[18px] font-bold tracking-[-0.015em] md:px-8 md:py-6 md:text-[21px]"
              >
                <span>{item.q}</span>
                <span
                  className={cn(
                    "grid size-9 shrink-0 place-items-center rounded-full bg-white text-ink shadow-sm transition-all duration-500 ease-[var(--ease-out-expo)]",
                    isOpen && "bg-sun rotate-45",
                  )}
                >
                  <Plus className="size-4" aria-hidden />
                </span>
              </button>
            </h3>
            <motion.div
              id={`${id}-a-${i}`}
              role="region"
              aria-labelledby={`${id}-q-${i}`}
              initial={false}
              animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
              transition={{ duration: 0.5, ease: easeOutExpo }}
              className="overflow-hidden"
              inert={!isOpen}
            >
              <p className="prose-text px-6 pb-6 md:px-8 md:pb-8 md:pr-24 md:text-[18px]">{item.a}</p>
            </motion.div>
          </div>
        )
      })}
    </div>
  )
}
