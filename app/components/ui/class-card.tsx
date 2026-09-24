import { ArrowUpRight } from "lucide-react"
import { Link } from "react-router"
import { cn } from "~/lib/cn"
import { Plate } from "./plate"

export type ClassCardItem = {
  path: string
  code: string
  title: string
  summary: string
  image: string
  imageAlt: string
  imagePosition?: string
  badge?: string
}

/** Hochformat-Karte mit Kennzeichen-Badge */
export function ClassCard({ item, className }: { item: ClassCardItem; className?: string }) {
  return (
    <Link to={item.path} prefetch="intent" className={cn("group relative isolate block aspect-[3/4] overflow-hidden rounded-[26px] bg-night text-white", className)}>
      <img
        src={item.image}
        alt={item.imageAlt}
        loading="lazy"
        decoding="async"
        style={{ objectPosition: item.imagePosition }}
        className="absolute inset-0 -z-10 h-full w-full object-cover transition-transform duration-[1.6s] ease-[var(--ease-out-expo)] group-hover:scale-[1.06]"
      />
      <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-b from-[#061c33]/40 via-transparent to-[#061c33]/95" />
      <div className="flex h-full flex-col justify-between p-6 md:p-7">
        <div className="flex items-start justify-between gap-3">
          <Plate code={item.code} />
          {item.badge && <span className="glass-dark rounded-full px-3 py-1 text-[12px] font-bold">{item.badge}</span>}
        </div>
        <div>
          <p className="text-[22px] leading-tight font-bold tracking-[-0.02em]">{item.title}</p>
          <p className="mt-2 line-clamp-3 text-[15px] leading-snug text-white/75">{item.summary}</p>
          <span className="text-sun mt-5 inline-flex items-center gap-1 text-[15px] font-semibold">
            Mehr erfahren
            <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden />
          </span>
        </div>
      </div>
    </Link>
  )
}
