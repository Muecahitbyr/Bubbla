import { cn } from "~/lib/cn"

/** Originales Bubla-Logo als Vektor (Arial wie im Original, Farben #F8E322 / #0365E1) – bleibt in jeder Größe scharf */
export function Logo({ className }: { className?: string }) {
  return (
    <img
      src="/images/logo.svg"
      alt="Fahrschule Bubla Kaufbeuren"
      width={522}
      height={258}
      className={cn("h-10 w-auto select-none", className)}
      draggable={false}
    />
  )
}
