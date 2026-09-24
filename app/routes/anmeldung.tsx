import { CheckCircle2, Download, Mail, Send } from "lucide-react"
import { useState, type FormEvent } from "react"
import type { MetaFunction } from "react-router"
import { Link } from "react-router"
import { LocalNav } from "~/components/layout/local-nav"
import { MockBadge } from "~/components/ui/mock-badge"
import { PageHero } from "~/components/ui/page-hero"
import { Reveal, Stagger, StaggerItem } from "~/components/ui/reveal"
import { Heading, Section } from "~/components/ui/section"
import { categoryLabels, classes } from "~/content/classes"
import { paths, site } from "~/content/site"
import { buildMail, DOWNLOAD_PDF } from "~/lib/anmeldung"
import { cn } from "~/lib/cn"
import { legacySeo, seo } from "~/lib/seo"

export const meta: MetaFunction = () =>
  seo({
    title: `Anmeldung | ${legacySeo.title}`,
    description: "Jetzt bei der Fahrschule Bubla in Kaufbeuren anmelden: Formular ausfüllen, E-Mail senden – wir melden uns bei dir.",
    path: paths.anmeldung,
  })


const field = "bg-tile focus:ring-bubla-bright w-full rounded-2xl px-4 py-3.5 text-[16px] outline-none ring-1 ring-transparent transition focus:bg-white focus:ring-2"
const label = "mb-1.5 block text-[14px] font-bold"

export default function Anmeldung() {
  const [sent, setSent] = useState(false)

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const data = Object.fromEntries(new FormData(e.currentTarget)) as Record<string, string>
    window.location.href = buildMail(data)
    setSent(true)
  }

  return (
    <>
      <LocalNav
        title="Anmeldung"
        links={[
          { label: "Formular", href: "#formular" },
          { label: "So geht's weiter", href: "#danach" },
        ]}
        cta={{ label: "Anrufen", to: paths.kontakt }}
      />
      <PageHero
        kicker="Anmeldung"
        title="Los geht's."
        lead={
          <>
            Formular ausfüllen, E-Mail abschicken – <strong>wir melden uns bei dir.</strong> Lieber persönlich? Ruf an unter <a href={site.phone.href}>{site.phone.display}</a>.
          </>
        }
      />

      <Section id="formular" space="md">
        <div className="wrap grid gap-12 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-4">
            <Heading kicker="Online-Anmeldung" title="Deine Daten." size="sm">
              Beim Absenden öffnet sich dein E-Mail-Programm mit einer fertigen Nachricht an <strong>{site.email}</strong>. Es werden keine Daten über diese Website übertragen.
            </Heading>
            <a href={DOWNLOAD_PDF} download className="bg-tile hover:bg-tile-2 mt-8 flex items-center gap-4 rounded-[22px] p-5 transition-colors">
              <span className="bg-bubla grid size-11 shrink-0 place-items-center rounded-full text-white">
                <Download className="size-5" aria-hidden />
              </span>
              <span>
                <span className="block font-bold">Anmeldeformular als PDF</span>
                <span className="text-muted flex flex-wrap items-center gap-2 text-[14px]">
                  Zum Ausdrucken <MockBadge label="Muster" />
                </span>
              </span>
            </a>
          </Reveal>

          <Reveal delay={0.1} className="lg:col-span-8">
            {sent ? (
              <div role="status" className="tone-mist rounded-[26px] p-8 md:p-12">
                <CheckCircle2 className="text-bubla size-10" aria-hidden />
                <p className="mt-6 text-[28px] font-extrabold tracking-[-0.03em]">Fast geschafft!</p>
                <p className="lead mt-3">
                  Dein E-Mail-Programm sollte sich geöffnet haben. <strong>Bitte sende die Nachricht dort ab.</strong> Falls nichts passiert ist, schreib uns direkt an{" "}
                  <a href={`mailto:${site.email}`}>{site.email}</a>.
                </p>
                <button type="button" onClick={() => setSent(false)} className="text-accent mt-8 font-bold underline underline-offset-4">
                  Formular erneut öffnen
                </button>
              </div>
            ) : (
              <form onSubmit={onSubmit} className="grid gap-5 sm:grid-cols-2" aria-label="Anmeldeformular">
                <div>
                  <label htmlFor="vorname" className={label}>
                    Vorname *
                  </label>
                  <input id="vorname" name="vorname" required autoComplete="given-name" className={field} />
                </div>
                <div>
                  <label htmlFor="nachname" className={label}>
                    Nachname *
                  </label>
                  <input id="nachname" name="nachname" required autoComplete="family-name" className={field} />
                </div>
                <div>
                  <label htmlFor="geburtsdatum" className={label}>
                    Geburtsdatum *
                  </label>
                  <input id="geburtsdatum" name="geburtsdatum" type="date" required autoComplete="bday" className={field} />
                </div>
                <div>
                  <label htmlFor="telefon" className={label}>
                    Telefon *
                  </label>
                  <input id="telefon" name="telefon" type="tel" required autoComplete="tel" className={field} />
                </div>
                <div className="sm:col-span-2">
                  <label htmlFor="email" className={label}>
                    E-Mail
                  </label>
                  <input id="email" name="email" type="email" autoComplete="email" className={field} />
                </div>
                <div>
                  <label htmlFor="strasse" className={label}>
                    Straße & Hausnummer
                  </label>
                  <input id="strasse" name="strasse" autoComplete="street-address" className={field} />
                </div>
                <div>
                  <label htmlFor="ort" className={label}>
                    PLZ & Ort
                  </label>
                  <input id="ort" name="ort" autoComplete="address-level2" className={field} />
                </div>
                <div>
                  <label htmlFor="klasse" className={label}>
                    Gewünschte Klasse *
                  </label>
                  <select id="klasse" name="klasse" required defaultValue="B" className={cn(field, "appearance-none")}>
                    {(["auto", "zweirad"] as const).map((cat) => (
                      <optgroup key={cat} label={categoryLabels[cat]}>
                        {classes
                          .filter((c) => c.category === cat)
                          .map((c) => (
                            <option key={c.slug} value={c.code}>
                              {c.code} – {c.name}
                            </option>
                          ))}
                      </optgroup>
                    ))}
                  </select>
                </div>
                <div>
                  <label htmlFor="start" className={label}>
                    Gewünschter Start
                  </label>
                  <input id="start" name="start" type="month" className={field} />
                </div>
                <div className="sm:col-span-2">
                  <label htmlFor="vorbesitz" className={label}>
                    Bereits vorhandene Führerscheinklassen
                  </label>
                  <input id="vorbesitz" name="vorbesitz" placeholder="z. B. AM oder keine" className={field} />
                </div>
                <div className="sm:col-span-2">
                  <label htmlFor="nachricht" className={label}>
                    Nachricht
                  </label>
                  <textarea id="nachricht" name="nachricht" rows={4} className={field} />
                </div>
                <label className="flex gap-3 text-[14.5px] sm:col-span-2">
                  <input type="checkbox" name="datenschutz" required className="accent-bubla mt-1 size-5 shrink-0" />
                  <span className="text-muted">
                    Ich habe die{" "}
                    <Link to={paths.datenschutz} className="text-fg underline underline-offset-2">
                      Datenschutzerklärung
                    </Link>{" "}
                    gelesen und bin einverstanden, dass meine Angaben zur Bearbeitung der Anmeldung verwendet werden. *
                  </span>
                </label>
                <div className="flex flex-wrap items-center gap-4 sm:col-span-2">
                  <button type="submit" className="bg-sun text-ink inline-flex items-center gap-2 rounded-full px-7 py-4 text-[17px] font-bold transition-transform active:scale-[0.97]">
                    <Send className="size-4" aria-hidden /> E-Mail vorbereiten
                  </button>
                  <span className="text-muted text-[13px]">* Pflichtfelder</span>
                </div>
              </form>
            )}
          </Reveal>
        </div>
      </Section>

      <Section id="danach" tone="mist" space="md">
        <div className="wrap">
          <Reveal>
            <Heading kicker="Danach" title="So geht's weiter." size="md" />
          </Reveal>
          <Stagger as="ol" className="mt-12 grid gap-4 md:grid-cols-3">
            {[
              ["Wir melden uns", "Wir bestätigen deine Anmeldung und besprechen den Start."],
              ["Unterlagen & Antrag", "Sehtest, Erste Hilfe, Passbild – dann Antrag bei der Führerscheinstelle."],
              ["Theorie starten", `${site.hours.theoryDaysShort}, ${site.hours.theoryTime} in der ${site.theoryLocation.street}.`],
            ].map(([t, d], i) => (
              <StaggerItem as="li" key={t} className="rounded-[24px] bg-white p-7">
                <span className="text-bubla text-[15px] font-extrabold">0{i + 1}</span>
                <p className="mt-6 text-[21px] font-extrabold tracking-[-0.02em]">{t}</p>
                <p className="text-muted mt-2">{d}</p>
              </StaggerItem>
            ))}
          </Stagger>
          <Reveal className="mt-10">
            <a href={`mailto:${site.email}`} className="text-accent inline-flex items-center gap-2 font-bold">
              <Mail className="size-4" aria-hidden /> {site.email}
            </a>
          </Reveal>
        </div>
      </Section>
    </>
  )
}
