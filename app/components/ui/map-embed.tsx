import { MapPin, Navigation } from "lucide-react"
import { useState } from "react"
import { Link } from "react-router"
import { paths, site } from "~/content/site"
import { cn } from "~/lib/cn"

type Place = "theory" | "office"

/**
 * Google Maps mit 2-Klick-Lösung: Die Karte wird erst nach Klick geladen,
 * vorher fließen keine Daten an Google (DSGVO).
 */
export function MapEmbed({ className, place = "theory" }: { className?: string; place?: Place }) {
  const [loaded, setLoaded] = useState(false)
  const p =
    place === "theory"
      ? { title: site.theoryLocation.name, street: site.theoryLocation.street, city: `${site.theoryLocation.zip} ${site.theoryLocation.city}-${site.theoryLocation.district}`, embed: site.maps.theoryEmbed, link: site.maps.theoryLink }
      : { title: `${site.name} – Büro`, street: site.address.street, city: `${site.address.zip} ${site.address.city}`, embed: site.maps.officeEmbed, link: site.maps.officeLink }

  return (
    <div className={cn("bg-tile relative min-h-[420px] overflow-hidden rounded-[26px] sm:aspect-[4/3] sm:min-h-[380px] md:aspect-[16/10]", className)}>
      {loaded ? (
        <iframe
          src={p.embed}
          title={`Karte: ${p.title}, ${p.street} in Kaufbeuren (Google Maps)`}
          className="absolute inset-0 h-full w-full border-0"
          loading="lazy"
          allowFullScreen
          referrerPolicy="no-referrer-when-downgrade"
        />
      ) : (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-5 p-6 text-center md:p-8">
          {/* Stilisierte Straßen statt Karte – es wird noch nichts von Google geladen */}
          <svg aria-hidden className="absolute inset-0 h-full w-full opacity-60" preserveAspectRatio="xMidYMid slice" viewBox="0 0 400 300">
            <path d="M-20 210 C 80 190, 140 120, 230 130 S 380 90, 430 60" fill="none" stroke="var(--tile-2)" strokeWidth="22" />
            <path d="M-20 210 C 80 190, 140 120, 230 130 S 380 90, 430 60" fill="none" stroke="#f8e322" strokeWidth="2.5" strokeDasharray="12 10" />
            <path d="M120 -10 C 140 80, 170 200, 150 320" fill="none" stroke="var(--tile-2)" strokeWidth="14" />
            <path d="M300 -10 C 280 90, 300 190, 330 320" fill="none" stroke="var(--tile-2)" strokeWidth="10" />
          </svg>
          <span className="bg-bubla relative grid size-14 place-items-center rounded-full text-white shadow-[0_12px_40px_-8px_rgb(0_91_164/0.6)]">
            <MapPin className="size-6" aria-hidden />
          </span>
          <div className="relative">
            <p className="text-[20px] font-bold tracking-tight">{p.title}</p>
            <p className="text-muted">
              {p.street}, {p.city}
            </p>
          </div>
          <div className="relative flex flex-wrap justify-center gap-3">
            <button type="button" onClick={() => setLoaded(true)} className="bg-night rounded-full px-5 py-2.5 text-[15px] font-semibold text-white transition-opacity hover:opacity-85">
              Karte laden
            </button>
            <a
              href={p.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-[15px] font-semibold text-ink ring-1 ring-black/10 transition-colors hover:bg-white/80"
            >
              <Navigation className="size-4" aria-hidden /> Route planen
            </a>
          </div>
          <p className="text-muted relative max-w-sm text-xs">
            Beim Laden der Karte werden Daten an Google übertragen. Mehr dazu in der{" "}
            <Link to={`${paths.datenschutz}#plugins`} className="underline underline-offset-2">
              Datenschutzerklärung
            </Link>
            .
          </p>
        </div>
      )}
    </div>
  )
}
