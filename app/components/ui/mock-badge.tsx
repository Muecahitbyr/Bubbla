import { FlaskConical } from "lucide-react"
import { site } from "~/content/site"
import { cn } from "~/lib/cn"

/**
 * Kleiner Hinweis neben Platzhalter-Werten. Verschwindet komplett,
 * sobald `site.mock.enabled` auf false steht.
 */
export function MockBadge({ className, label = site.mock.label }: { className?: string; label?: string }) {
  if (!site.mock.enabled) return null
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full bg-[#fff7c2] px-2.5 py-0.5 align-middle text-[11.5px] font-bold tracking-normal text-[#6b5a00] normal-case ring-1 ring-[#e8c900]/60",
        className,
      )}
      title="Platzhalter – wird vor dem Livegang durch echte Angaben ersetzt"
    >
      <FlaskConical className="size-3" aria-hidden />
      {label}
    </span>
  )
}
