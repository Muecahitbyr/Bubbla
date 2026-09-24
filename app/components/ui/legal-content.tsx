import type { LegalBlock } from "~/content/legal"

/** Gibt Rechtstexte aus legal.ts aus (Überschriften mit Sprungmarken) */
export function LegalContent({ blocks }: { blocks: LegalBlock[] }) {
  return (
    <div className="prose-text max-w-[46rem]">
      {blocks.map((b, i) => {
        switch (b.type) {
          case "h2":
            return (
              <h2 key={i} id={b.id} className="text-fg mt-14 mb-4 text-[26px] leading-tight font-extrabold tracking-[-0.02em] first:mt-0 md:text-[30px]">
                {b.text}
              </h2>
            )
          case "h3":
            return (
              <h3 key={i} className="text-fg mt-8 mb-2 text-[19px] font-bold tracking-[-0.01em]">
                {b.text}
              </h3>
            )
          case "p":
            return (
              <p key={i} className="mb-4 break-words">
                {b.text}
              </p>
            )
          case "lines":
            return (
              <p key={i} className="mb-4">
                {b.lines.map((l, j) => (
                  <span key={j} className="block">
                    {l}
                  </span>
                ))}
              </p>
            )
          case "ul":
            return (
              <ul key={i} className="mb-4 list-disc space-y-2 pl-5">
                {b.items.map((it) => (
                  <li key={it}>{it}</li>
                ))}
              </ul>
            )
        }
      })}
    </div>
  )
}
