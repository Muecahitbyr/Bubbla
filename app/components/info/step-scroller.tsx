import { AnimatePresence, motion, useInView } from "motion/react"
import { Check, Info } from "lucide-react"
import { useEffect, useRef, useState } from "react"
import type { Step } from "~/content/info"
import { cn } from "~/lib/cn"
import { easeOutExpo } from "~/lib/motion"

/**
 * Schritt-Ablauf: Links bleibt die aktuelle Schrittnummer fixiert stehen,
 * rechts scrollen die Inhalte vorbei. Auf dem Handy eine einfache Liste.
 */
export function StepScroller({ steps }: { steps: Step[] }) {
  const [active, setActive] = useState(0)

  return (
    <div className="wrap grid gap-10 lg:grid-cols-12 lg:gap-16">
      <div className="hidden lg:col-span-5 lg:block">
        <div className="sticky top-[calc(var(--nav-offset)+var(--subnav-h)+3rem)]">
          <p className="text-muted mb-4 text-sm font-bold">
            Schritt {active + 1} von {steps.length}
          </p>
          <div className="relative h-[10.5rem] overflow-hidden">
            <AnimatePresence mode="popLayout" initial={false}>
              <motion.span
                key={steps[active].number}
                initial={{ y: "100%", opacity: 0 }}
                animate={{ y: "0%", opacity: 1 }}
                exit={{ y: "-100%", opacity: 0 }}
                transition={{ duration: 0.7, ease: easeOutExpo }}
                className="grad-blue absolute inset-0 pb-[0.1em] text-[10rem] leading-none font-extrabold tracking-[-0.06em]"
              >
                {steps[active].number}
              </motion.span>
            </AnimatePresence>
          </div>
          <ol className="mt-8 space-y-3">
            {steps.map((step, i) => (
              <li key={step.number} className="flex items-center gap-4">
                <span
                  className={cn(
                    "h-[5px] rounded-full transition-all duration-700 ease-[var(--ease-out-expo)]",
                    i === active ? "bg-sun w-12" : i < active ? "w-6 bg-[#f8e322]/50" : "bg-tile-2 w-6",
                  )}
                />
                <span className={cn("text-lg font-bold tracking-tight transition-colors duration-500", i === active ? "text-fg" : "text-muted")}>{step.title}</span>
              </li>
            ))}
          </ol>
        </div>
      </div>

      <div className="space-y-5 lg:col-span-7 lg:space-y-[16vh] lg:pb-[18vh]">
        {steps.map((step, i) => (
          <StepCard key={step.number} step={step} index={i} active={active === i} onActive={() => setActive(i)} />
        ))}
      </div>
    </div>
  )
}

function StepCard({ step, index, active, onActive }: { step: Step; index: number; active: boolean; onActive: () => void }) {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { margin: "-45% 0px -45% 0px" })

  useEffect(() => {
    if (inView) onActive()
  }, [inView, onActive])

  return (
    <article
      ref={ref}
      className={cn("bg-tile rounded-[26px] p-7 transition-opacity duration-700 md:p-10", "lg:opacity-40", active && "lg:opacity-100")}
      aria-labelledby={`schritt-${index}`}
    >
      <p className="text-bubla mb-3 text-sm font-extrabold lg:hidden">Schritt {step.number}</p>
      <h3 id={`schritt-${index}`} className="text-[27px] font-extrabold tracking-[-0.03em] md:text-[38px]">
        {step.title}
      </h3>
      <div className="text-muted mt-5 space-y-4 text-[17px] leading-relaxed md:text-lg">
        {step.paragraphs?.map((p) => <p key={p}>{p}</p>)}
        {step.list && (
          <ul className="space-y-3 pt-1">
            {step.list.map((item) => (
              <li key={item} className="text-fg flex gap-3">
                <span className="bg-sun text-ink mt-1 grid size-5 shrink-0 place-items-center rounded-full">
                  <Check className="size-3" strokeWidth={3} aria-hidden />
                </span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        )}
        {step.highlight && (
          <p className="text-fg flex gap-3 rounded-2xl bg-white p-4 text-base font-semibold">
            <Info className="text-bubla mt-0.5 size-5 shrink-0" aria-hidden />
            {step.highlight}
          </p>
        )}
      </div>
    </article>
  )
}
