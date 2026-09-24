import { motion, useReducedMotion } from "motion/react"
import { ChevronRight } from "lucide-react"
import type { ReactNode } from "react"
import { Link } from "react-router"
import { cn } from "~/lib/cn"
import { easeOutExpo } from "~/lib/motion"
import { AnimatedWords } from "./animated-headline"
import { ZoomMedia } from "./zoom-media"

type Crumb = { label: string; to?: string }

/** Seitenkopf: große Headline auf Weiß, darunter ein Foto, das beim Scrollen zur vollen Breite aufzieht. */
export function PageHero({
  kicker,
  title,
  lead,
  image,
  imageAlt = "",
  imagePosition,
  breadcrumbs,
  children,
}: {
  kicker?: string
  title: string
  lead?: ReactNode
  image?: string
  imageAlt?: string
  imagePosition?: string
  breadcrumbs?: Crumb[]
  children?: ReactNode
}) {
  const reduce = useReducedMotion()
  // Sehr lange Wörter („Geschäftsbedingungen“) passen in der größten Stufe nicht in die Zeile
  const longWord = Math.max(...title.split(" ").map((w) => w.length)) > 13
  const fade = (delay: number) => ({
    initial: reduce ? false : ({ opacity: 0, y: 16 } as const),
    animate: { opacity: 1, y: 0 },
    transition: { duration: 1, delay, ease: easeOutExpo },
  })

  return (
    <header className="tone-paper relative overflow-hidden pt-[calc(var(--nav-offset)+var(--subnav-h)+2.5rem)] md:pt-[calc(var(--nav-offset)+var(--subnav-h)+4.5rem)]">
      <div aria-hidden className="pointer-events-none absolute -top-48 -right-40 size-[640px] rounded-full opacity-60 blur-[90px]" style={{ background: "radial-gradient(closest-side, rgb(3 101 225 / 0.18), transparent)" }} />
      <div className="wrap relative">
        {breadcrumbs && (
          <motion.nav {...fade(0)} aria-label="Brotkrumen" className="text-muted mb-6 flex flex-wrap items-center gap-1 text-[13px] font-medium">
            {breadcrumbs.map((c, i) => (
              <span key={c.label} className="inline-flex items-center gap-1">
                {c.to ? (
                  <Link to={c.to} className="hover:text-fg transition-colors">
                    {c.label}
                  </Link>
                ) : (
                  <span className="text-fg" aria-current="page">
                    {c.label}
                  </span>
                )}
                {i < breadcrumbs.length - 1 && <ChevronRight className="size-3 opacity-60" aria-hidden />}
              </span>
            ))}
          </motion.nav>
        )}
        {kicker && (
          <motion.p {...fade(0.05)} className="kicker mb-5">
            {kicker}
          </motion.p>
        )}
        <h1 className={cn("grad-ink pb-[0.12em]", longWord ? "display-lg max-w-[20ch]" : "display-xl max-w-[14ch]")}>
          <AnimatedWords text={title} delay={0.1} />
        </h1>
        {lead && (
          <motion.div {...fade(0.35)} className="lead mt-6 max-w-[40rem]">
            {lead}
          </motion.div>
        )}
        {children && (
          <motion.div {...fade(0.5)} className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-3">
            {children}
          </motion.div>
        )}
      </div>
      {image ? (
        <ZoomMedia src={image} alt={imageAlt} position={imagePosition} className="mt-14 md:mt-20" height="aspect-[4/3] md:aspect-auto md:h-[82svh]" priority />
      ) : (
        <div className="wrap mt-14 pb-2">
          <div className="lane opacity-80" />
        </div>
      )}
    </header>
  )
}
