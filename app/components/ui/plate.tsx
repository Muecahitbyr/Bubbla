import { cn } from "~/lib/cn"

/**
 * Klassen-Kürzel im Stil eines deutschen Kfz-Kennzeichens (blauer EU-Streifen links).
 * Erkennungszeichen der Bubla-Website.
 */
export function Plate({ code, className, size = "md" }: { code: string; className?: string; size?: "sm" | "md" | "lg" }) {
  return (
    <span
      className={cn(
        "inline-flex items-stretch overflow-hidden rounded-[0.35em] bg-white font-extrabold tracking-[0.02em] text-[#0b1b2b] shadow-[0_0_0_0.09em_#0b1b2b_inset]",
        size === "sm" && "text-[15px]",
        size === "md" && "text-[26px]",
        size === "lg" && "text-[44px]",
        className,
      )}
    >
      <span aria-hidden className="flex w-[0.8em] flex-col items-center justify-end bg-[#003f9e] pb-[0.12em] text-[0.36em] leading-none text-white">
        <span className="mb-auto pt-[0.25em] text-[#f8e322]">★</span>D
      </span>
      <span className="px-[0.38em] py-[0.08em] leading-[1.15]">{code}</span>
    </span>
  )
}
