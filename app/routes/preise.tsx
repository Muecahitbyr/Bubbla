import { Check } from "lucide-react"
import type { MetaFunction } from "react-router"
import { LocalNav } from "~/components/layout/local-nav"
import { CtaBand } from "~/components/ui/cta-band"
import { PageHero } from "~/components/ui/page-hero"
import { PriceExplorer } from "~/components/ui/price-explorer"
import { Reveal, Stagger, StaggerItem } from "~/components/ui/reveal"
import { Heading, Section } from "~/components/ui/section"
import { priceText } from "~/content/info"
import { paths } from "~/content/site"
import { legacySeo, seo } from "~/lib/seo"

export const meta: MetaFunction = () =>
  seo({
    title: `Preise | ${legacySeo.title}`,
    description: "Keine Fahrstunde zu viel – keine Gebühr zu viel: So setzt sich der Preis für deinen Führerschein bei der Fahrschule Bubla in Kaufbeuren zusammen.",
    path: paths.preise,
  })

/** Preisbestandteile laut bisheriger Preisseite */
const components = [
  ["Grundpreis", "Pauschalbetrag für den theoretischen Unterricht und Anmeldegebühr."],
  ["Normalfahrstunden", "Durchschnittlich rechnet man ca. 20 Stunden. (Die Anzahl hängt von Deinen persönlichen Voraussetzungen ab)"],
  ["Sonderfahrten (12 Pflichtstunden)", "4 Autobahn-, 5 Überland- und 3 Fahrten bei Dunkelheit"],
  ["Vorstellung zur Prüfung", ""],
  ["Lehrmaterial", ""],
  ["Fremdgebühren (TÜV, Sehtest etc.)", ""],
]

export default function Preise() {
  return (
    <>
      <LocalNav
        title="Preise"
        links={[
          { label: "So setzt sich der Preis zusammen", href: "#bestandteile" },
          { label: "Preise nach Klasse", href: "#preisliste" },
        ]}
      />
      <PageHero kicker="Preise" title="Keine Fahrstunde zu viel." lead={priceText[0]} />

      <Section id="bestandteile" space="md">
        <div className="wrap grid gap-12 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-5">
            <Heading kicker="Transparent" title="So setzt sich der Preis zusammen." size="md">
              {priceText[1]} {priceText[2]}
            </Heading>
          </Reveal>
          <Stagger as="ol" className="grid gap-3 lg:col-span-7">
            {components.map(([title, text], i) => (
              <StaggerItem as="li" key={title} className="bg-tile flex gap-5 rounded-[22px] p-5 md:p-6">
                <span className="bg-night text-sun grid size-10 shrink-0 place-items-center rounded-full text-[15px] font-extrabold tabular-nums">{i + 1}</span>
                <span>
                  <span className="block text-[18px] font-bold">{title}</span>
                  {text && <span className="text-muted mt-1 block text-[15.5px]">{text}</span>}
                </span>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </Section>

      <Section id="preisliste" tone="mist">
        <div className="wrap">
          <Reveal>
            <Heading kicker="Preisliste" title="Preise nach Klasse.">
              Wähle Auto oder Zweirad – <strong>alle Posten auf einen Blick.</strong>
            </Heading>
          </Reveal>
          <div className="mt-12">
            <PriceExplorer />
          </div>
          <Reveal className="mt-10">
            <ul className="text-muted grid gap-2 text-[14.5px] md:grid-cols-2">
              {[
                "Eine Fahrstunde dauert 45 Minuten.",
                "Fremdgebühren gehen direkt an TÜV, Führerscheinstelle, Optiker bzw. Erste-Hilfe-Anbieter.",
                "Alle Preise inkl. gesetzlicher Mehrwertsteuer.",
                "Die genaue Zahl der Fahrstunden hängt von deinen persönlichen Voraussetzungen ab.",
              ].map((t) => (
                <li key={t} className="flex gap-2">
                  <Check className="text-bubla mt-1 size-4 shrink-0" aria-hidden /> {t}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </Section>

      <CtaBand title="Dein preiswerter Weg zum Führerschein." />
    </>
  )
}
