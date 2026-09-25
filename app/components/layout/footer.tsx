import { ArrowUp } from "lucide-react"
import { Link } from "react-router"
import { autoClasses, bikeClasses } from "~/content/classes"
import { paths, site } from "~/content/site"
import { Logo } from "../ui/logo"
import { useLenis } from "./smooth-scroll"

const columns: { title: string; links: [string, string][] }[] = [
  {
    title: "Führerschein",
    links: [
      ["Ablauf", paths.info],
      ["Theorieunterricht", paths.unterricht],
      ["Alle Klassen", paths.klassen],
      ["Preise", paths.preise],
      ["Anmeldung", paths.anmeldung],
    ],
  },
  { title: "Auto", links: autoClasses.map((c) => [`${c.code} · ${c.name}`, c.path] as [string, string]) },
  { title: "Zweirad", links: bikeClasses.map((c) => [`${c.code} · ${c.name}`, c.path] as [string, string]) },
]

/** Footer in Tiefblau mit Logo auf heller Karte */
export function Footer() {
  const lenis = useLenis()
  const toTop = () => (lenis ? lenis.scrollTo(0, { duration: 1.6 }) : window.scrollTo({ top: 0, behavior: "smooth" }))

  return (
    <footer className="tone-night text-[14px] leading-[1.6]">
      <div className="wrap pt-16 pb-10">
        <div className="flex flex-wrap items-center justify-between gap-6">
          <Link to={paths.home} aria-label="Startseite" className="rounded-[22px] bg-white px-6 py-4">
            <Logo className="h-16 md:h-20" />
          </Link>
          <p className="text-sun text-[22px] font-extrabold tracking-[-0.02em]">{site.claim}</p>
        </div>
        <div className="lane mt-10 opacity-70" />

        <div className="grid gap-10 py-12 sm:grid-cols-2 lg:grid-cols-5">
          {columns.map((col) => (
            <div key={col.title}>
              <h2 className="mb-4 text-[13px] font-bold tracking-[0.1em] text-white uppercase">{col.title}</h2>
              <ul className="space-y-2">
                {col.links.map(([label, to]) => (
                  <li key={to + label}>
                    <Link to={to} className="text-muted transition-colors hover:text-white">
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <div>
            <h2 className="mb-4 text-[13px] font-bold tracking-[0.1em] text-white uppercase">Kontakt</h2>
            <address className="text-muted space-y-3 not-italic">
              <p>
                {site.name}
                <br />
                Inh. {site.owner}
                <br />
                {site.address.street}
                <br />
                {site.address.zip} {site.address.city}
              </p>
              <p>
                <a href={site.phone.href} className="hover:text-white">
                  Tel. {site.phone.display}
                </a>
                <br />
                <a href={site.mobile.href} className="hover:text-white">
                  Mobil {site.mobile.display}
                </a>
                <br />
                <a href={`mailto:${site.email}`} className="break-all hover:text-white">
                  {site.email}
                </a>
              </p>
            </address>
          </div>
          <div>
            <h2 className="mb-4 text-[13px] font-bold tracking-[0.1em] text-white uppercase">Theorieunterricht</h2>
            <p className="text-muted">
              {site.hours.theoryDays.join(", ")}
              <br />
              <span className="text-white">{site.hours.theoryTime}</span>
              <br />
              {site.theoryLocation.street}
              <br />
              {site.theoryLocation.zip} {site.theoryLocation.city}-{site.theoryLocation.district}
            </p>
          </div>
        </div>

        <div className="border-line text-muted flex flex-col gap-3 border-t pt-6 text-[13px] sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} {site.name}</p>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            <Link to={paths.impressum} className="hover:text-white">
              Impressum
            </Link>
            <Link to={paths.datenschutz} className="hover:text-white">
              Datenschutz
            </Link>
            <Link to={paths.agb} className="hover:text-white">
              AGB
            </Link>
            <Link to={paths.team} className="hover:text-white">
              Team
            </Link>
            <Link to={paths.kontakt} className="hover:text-white">
              Kontakt
            </Link>
            <button type="button" onClick={toTop} className="inline-flex items-center gap-1.5 hover:text-white">
              Nach oben <ArrowUp className="size-3.5" aria-hidden />
            </button>
          </div>
        </div>
      </div>
    </footer>
  )
}
