import { ArrowRight } from "lucide-react"
import type { ReactNode } from "react"
import { Link } from "react-router"
import { cn } from "~/lib/cn"

type Variant = "primary" | "dark" | "ghost" | "light" | "link"
type Size = "sm" | "md" | "lg"

const variants: Record<Variant, string> = {
  // Hauptaktion: gelb – auf gelben Flächen automatisch tiefblau (Variablen in app.css)
  primary: "bg-[var(--btn-bg)] text-[var(--btn-fg)] hover:brightness-105 shadow-[0_10px_28px_-14px_var(--btn-shadow)]",
  dark: "bg-night text-white hover:bg-[#0c2946]",
  ghost: "ring-1 ring-inset ring-line text-fg hover:bg-fg/[0.06]",
  light: "bg-white text-ink hover:bg-white/90",
  link: "text-accent !p-0 hover:gap-3",
}

const sizes: Record<Size, string> = {
  sm: "px-4 py-2 text-[14px]",
  md: "px-6 py-3 text-[16px]",
  lg: "px-7 py-4 text-[17px]",
}

/**
 * Pill-Button. Interne Ziele per `to`, externe Ziele, Telefon & E-Mail per `href`.
 * Beschriftungen dürfen umbrechen – sonst wird auf 320 px abgeschnitten.
 */
export function ButtonLink({
  children,
  to,
  href,
  variant = "primary",
  size = "md",
  icon,
  className,
}: {
  children: ReactNode
  to?: string
  href?: string
  variant?: Variant
  size?: Size
  icon?: ReactNode
  className?: string
}) {
  const classes = cn(
    "group inline-flex max-w-full items-center justify-center gap-2 rounded-full text-center leading-tight font-semibold tracking-[-0.01em] transition-all duration-300 active:scale-[0.97] [&>svg]:shrink-0",
    variants[variant],
    sizes[size],
    className,
  )
  const content = (
    <>
      {icon}
      <span>{children}</span>
      {variant === "link" && <ArrowRight className="size-[1em] transition-transform duration-300 group-hover:translate-x-0.5" aria-hidden />}
    </>
  )
  if (to)
    return (
      <Link to={to} prefetch="intent" className={classes}>
        {content}
      </Link>
    )
  const external = href?.startsWith("http")
  return (
    <a href={href} className={classes} target={external ? "_blank" : undefined} rel={external ? "noopener noreferrer" : undefined}>
      {content}
    </a>
  )
}
