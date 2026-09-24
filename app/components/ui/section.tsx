import type { ReactNode } from "react"
import { cn } from "~/lib/cn"

export type Tone = "paper" | "mist" | "night" | "blue"

/** Seitenabschnitt. `tone` schaltet die komplette Farbwelt für alles darin um. */
export function Section({
  children,
  className,
  id,
  tone = "paper",
  space = "lg",
  label,
}: {
  children: ReactNode
  className?: string
  id?: string
  tone?: Tone
  space?: "none" | "md" | "lg"
  label?: string
}) {
  return (
    <section
      id={id}
      aria-label={label}
      className={cn(`tone-${tone} relative`, space === "lg" && "py-24 md:py-36", space === "md" && "py-16 md:py-24", className)}
    >
      {children}
    </section>
  )
}

/** Überschriftenblock: Kicker + große Headline + optionaler Absatz */
export function Heading({
  kicker,
  title,
  children,
  className,
  center,
  size = "lg",
  as: As = "h2",
  id,
}: {
  kicker?: ReactNode
  title: ReactNode
  children?: ReactNode
  className?: string
  center?: boolean
  size?: "xl" | "lg" | "md" | "sm"
  as?: "h1" | "h2" | "h3"
  id?: string
}) {
  return (
    <div className={cn(center && "mx-auto text-center", className)}>
      {kicker && <p className="kicker mb-5">{kicker}</p>}
      <As id={id} className={cn(`display-${size}`, "max-w-[18ch] pb-[0.08em]", center && "mx-auto", size === "sm" && "max-w-[26ch]")}>
        {title}
      </As>
      {children && <div className={cn("lead mt-6 max-w-[38rem]", center && "mx-auto")}>{children}</div>}
    </div>
  )
}
