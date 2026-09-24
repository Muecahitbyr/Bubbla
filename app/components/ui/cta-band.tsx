import { Phone } from "lucide-react"
import { paths, site } from "~/content/site"
import { AnimatedWords } from "./animated-headline"
import { ButtonLink } from "./button"
import { Reveal } from "./reveal"

/** Abschluss jeder Seite: Bubla-blaue Fläche mit Fahrbahnmarkierung, großer Satz, zwei Aktionen */
export function CtaBand({
  title = "Bereit für die erste Fahrstunde?",
  text = `Melde dich online an oder ruf uns an – ${site.claim}`,
}: {
  title?: string
  text?: string
}) {
  return (
    <section className="tone-paper px-3 pb-3 md:px-5 md:pb-5" aria-label="Anmeldung">
      <div className="tone-blue relative isolate overflow-hidden rounded-[34px] px-6 py-24 md:py-36">
        {/* Straße mit Mittelstreifen als ruhige Grafik */}
        <svg aria-hidden className="absolute inset-x-0 bottom-0 -z-10 h-[70%] w-full opacity-[0.22]" preserveAspectRatio="none" viewBox="0 0 1200 400">
          <path d="M-50 400 C 300 360, 520 240, 700 180 S 1050 60, 1300 40" fill="none" stroke="#ffffff" strokeWidth="90" />
          <path d="M-50 400 C 300 360, 520 240, 700 180 S 1050 60, 1300 40" fill="none" stroke="#f8e322" strokeWidth="6" strokeDasharray="38 26" />
        </svg>
        <div className="wrap-narrow text-center">
          <h2 className="display-lg mx-auto max-w-[16ch] pb-[0.1em] text-white">
            <AnimatedWords text={title} />
          </h2>
          <Reveal delay={0.2}>
            <p className="lead mx-auto mt-6 max-w-[34rem]">{text}</p>
          </Reveal>
          <Reveal delay={0.3}>
            <div className="mt-11 flex flex-wrap items-center justify-center gap-3">
              <ButtonLink to={paths.anmeldung} size="lg">
                Jetzt anmelden
              </ButtonLink>
              <ButtonLink href={site.phone.href} size="lg" variant="light" icon={<Phone className="size-4" aria-hidden />}>
                {site.phone.display}
              </ButtonLink>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
