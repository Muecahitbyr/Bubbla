import type { ReactNode } from "react"
import { cn } from "~/lib/cn"
import { Reveal } from "./reveal"

/** Bento-Kachel: große Rundung, eigene Fläche, optional Hintergrundbild */
export function Tile({
  children,
  className,
  image,
  imageAlt = "",
  imagePosition,
  delay = 0,
  shade = "bottom",
}: {
  children?: ReactNode
  className?: string
  image?: string
  imageAlt?: string
  imagePosition?: string
  delay?: number
  shade?: "bottom" | "full" | "none"
}) {
  return (
    <Reveal delay={delay} className={cn("group bg-tile relative isolate overflow-hidden rounded-[26px]", image && "tone-night !bg-night text-white", className)}>
      {image && (
        <>
          <img
            src={image}
            alt={imageAlt}
            loading="lazy"
            decoding="async"
            style={{ objectPosition: imagePosition }}
            className="absolute inset-0 -z-10 h-full w-full object-cover transition-transform duration-[1.6s] ease-[var(--ease-out-expo)] group-hover:scale-[1.04]"
          />
          {shade !== "none" && (
            <div
              aria-hidden
              className={cn("absolute inset-0 -z-10", shade === "bottom" ? "bg-gradient-to-t from-[#061c33]/90 via-[#061c33]/25 to-transparent" : "bg-[#061c33]/55")}
            />
          )}
        </>
      )}
      {children}
    </Reveal>
  )
}
