import { motion, useReducedMotion, useScroll, useTransform } from "motion/react"
import { useRef } from "react"
import { Reveal } from "./reveal"

export type TimelineItem = { age: string; title: string; text: string }

/** Zeitleiste: Eine gelbe Linie füllt sich beim Scrollen, jede Station blendet ein. */
export function Timeline({ items }: { items: TimelineItem[] }) {
  const ref = useRef<HTMLOListElement>(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.75", "end 0.55"] })
  const fill = useTransform(scrollYProgress, [0, 1], reduce ? ["100%", "100%"] : ["0%", "100%"])

  return (
    <ol ref={ref} className="relative space-y-10 pl-10 md:space-y-14 md:pl-14">
      <span aria-hidden className="bg-tile-2 absolute top-2 bottom-2 left-[11px] w-[4px] rounded-full md:left-[15px]" />
      <motion.span aria-hidden style={{ height: fill }} className="bg-sun absolute top-2 left-[11px] w-[4px] rounded-full md:left-[15px]" />
      {items.map((item) => (
        <li key={item.title} className="relative">
          <span aria-hidden className="bg-bubla absolute top-1.5 -left-10 grid size-[26px] place-items-center rounded-full ring-4 ring-white md:-left-14 md:size-[34px]">
            <span className="bg-sun size-2 rounded-full md:size-2.5" />
          </span>
          <Reveal y={16}>
            <p className="text-bubla text-[15px] font-extrabold">{item.age}</p>
            <h3 className="mt-1 text-[24px] font-extrabold tracking-[-0.02em] md:text-[30px]">{item.title}</h3>
            <p className="text-muted mt-2 max-w-[36rem] text-[17px]">{item.text}</p>
          </Reveal>
        </li>
      ))}
    </ol>
  )
}
