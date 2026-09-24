import { cn } from "~/lib/cn"

/** Originales Bubla-Logo (freigestellt, transparentes PNG) */
export function Logo({ className }: { className?: string }) {
  return (
    <img
      src="/images/logo.png"
      alt="Fahrschule Bubla Kaufbeuren"
      width={522}
      height={258}
      className={cn("h-10 w-auto select-none", className)}
      draggable={false}
    />
  )
}
