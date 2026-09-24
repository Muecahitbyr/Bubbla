import type { Fee } from "~/content/classes"
import { priceLabel } from "~/content/classes"
import { cn } from "~/lib/cn"
import { Stagger, StaggerItem } from "./reveal"

/** Preisliste einer Klasse – liest ausschließlich aus classes.ts */
export function FeeList({ fees, className, compact }: { fees: Fee[]; className?: string; compact?: boolean }) {
  const own = fees.filter((f) => !f.external)
  const external = fees.filter((f) => f.external)
  return (
    <div className={className}>
      <Stagger as="ul" className="divide-line border-line divide-y border-y" stagger={0.04}>
        {own.map((fee) => (
          <StaggerItem as="li" key={fee.id} className={cn("flex items-baseline justify-between gap-5", compact ? "py-3" : "py-4 md:py-5")}>
            <span className="min-w-0">
              <span className={cn("block font-semibold", compact ? "text-[15px]" : "text-[16px] md:text-[18px]")}>{fee.label}</span>
              {fee.detail && !compact && <span className="text-muted mt-0.5 block text-[14px] leading-snug">{fee.detail}</span>}
            </span>
            <span className="shrink-0 text-right">
              <span className={cn("block font-extrabold tabular-nums", compact ? "text-[15px]" : "text-[17px] md:text-[19px]")}>{priceLabel(fee)}</span>
              {fee.unit && <span className="text-muted block text-[12.5px]">{fee.unit}</span>}
            </span>
          </StaggerItem>
        ))}
      </Stagger>
      {external.length > 0 && (
        <div className="mt-4">
          <p className="text-muted mb-1 text-[12.5px] font-bold tracking-[0.08em] uppercase">Fremdgebühren (nicht an die Fahrschule)</p>
          <ul className="text-muted space-y-1 text-[14px]">
            {external.map((fee) => (
              <li key={fee.id} className="flex justify-between gap-4">
                <span>{fee.label}</span>
                <span className="tabular-nums">{priceLabel(fee)}</span>
              </li>
            ))}
            <li>Dazu kommen Sehtest, Erste-Hilfe-Kurs, Passbild und die Gebühr der Führerscheinstelle.</li>
          </ul>
        </div>
      )}
    </div>
  )
}
