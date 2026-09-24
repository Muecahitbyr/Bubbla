import { Link } from "react-router"
import { paths } from "~/content/site"
import { cn } from "~/lib/cn"

/**
 * Unter-Navigation einer Seite: klebt unter der Hauptnavigation,
 * links der Seitentitel, rechts Sprungmarken (ab Tablet) und ein Button.
 */
export function LocalNav({
  title,
  links = [],
  cta = { label: "Anmelden", to: paths.anmeldung },
  className,
}: {
  title: string
  links?: { label: string; href: string }[]
  cta?: { label: string; to: string }
  className?: string
}) {
  return (
    <div className={cn("pointer-events-none fixed inset-x-0 top-[var(--nav-offset)] z-40", className)}>
      <div className="wrap !px-2 sm:!px-4 md:!px-6">
        <div className="pointer-events-auto flex h-11 items-center justify-between gap-4 rounded-full bg-white/70 pr-1.5 pl-5 text-ink shadow-[0_0_0_1px_rgb(6_28_51/0.07)] backdrop-blur-xl md:h-12">
          <p className="truncate text-[15px] font-bold tracking-[-0.015em] md:text-[17px]">{title}</p>
          <div className="flex shrink-0 items-center gap-5">
            {links.length > 0 && (
              <ul className="hidden items-center gap-5 md:flex">
                {links.map((l) => (
                  <li key={l.href}>
                    <a href={l.href} className="hover:text-bubla text-[13.5px] font-semibold text-ink/65 transition-colors">
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            )}
            <Link to={cta.to} className="bg-night rounded-full px-4 py-1.5 text-[13.5px] font-bold text-white transition-transform active:scale-95">
              {cta.label}
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
