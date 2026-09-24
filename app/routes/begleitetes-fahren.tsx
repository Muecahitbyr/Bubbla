import { Check } from "lucide-react"
import type { MetaFunction } from "react-router"
import { LocalNav } from "~/components/layout/local-nav"
import { Accordion } from "~/components/ui/accordion"
import { ButtonLink } from "~/components/ui/button"
import { CtaBand } from "~/components/ui/cta-band"
import { MockBadge } from "~/components/ui/mock-badge"
import { PageHero } from "~/components/ui/page-hero"
import { Reveal, Stagger, StaggerItem } from "~/components/ui/reveal"
import { Heading, Section } from "~/components/ui/section"
import { Timeline } from "~/components/ui/timeline"
import { ZoomMedia } from "~/components/ui/zoom-media"
import { classB, classBF17, mainFee, priceLabel } from "~/content/classes"
import { bf17, bf17Faq } from "~/content/info"
import { paths } from "~/content/site"
import { faqJsonLd, seo } from "~/lib/seo"

export const meta: MetaFunction = () => seo({ ...classBF17.seo, path: paths.bf17, jsonLd: faqJsonLd(bf17Faq) })

export default function BegleitetesFahren() {
  const grund = mainFee(classB)
  return (
    <>
      <LocalNav
        title="Begleitetes Fahren"
        links={[
          { label: "Zeitplan", href: "#zeitplan" },
          { label: "Begleitperson", href: "#begleitperson" },
          { label: "Fragen", href: "#fragen" },
        ]}
      />
      <PageHero
        breadcrumbs={[{ label: "Start", to: paths.home }, { label: "Klassen", to: paths.klassen }, { label: "B17" }]}
        kicker="Führerschein mit 17"
        title="Früher ans Steuer."
        lead={bf17.intro}
        image={classBF17.image}
        imageAlt={classBF17.imageAlt}
        imagePosition={classBF17.imagePosition}
      >
        <ButtonLink to={paths.anmeldung}>Jetzt anmelden</ButtonLink>
        <ButtonLink to={paths.klasseB} variant="link">
          Alles zu Klasse B
        </ButtonLink>
      </PageHero>

      <Section id="zeitplan">
        <div className="wrap grid gap-12 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-5">
            <div className="lg:sticky lg:top-[calc(var(--nav-offset)+var(--subnav-h)+3rem)]">
              <Heading kicker="Zeitleiste" title="Von 16½ bis 18." size="md">
                Die Ausbildung ist dieselbe wie für Klasse B – <strong>nur der Start ist früher.</strong>
              </Heading>
              {grund && (
                <p className="text-muted mt-8 text-[15px]">
                  Grundpreis wie Klasse B: <strong className="text-fg">{priceLabel(grund)}</strong> <MockBadge className="ml-1" />
                </p>
              )}
            </div>
          </Reveal>
          <div className="lg:col-span-7">
            <Timeline items={bf17.timeline} />
          </div>
        </div>
      </Section>

      <Section id="begleitperson" tone="night" space="none" className="pt-24 md:pt-36">
        <div className="wrap">
          <Reveal>
            <Heading kicker="Begleitperson" title="Wer darf mitfahren?" size="md" />
          </Reveal>
          <Stagger className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {bf17.companion.map((c) => (
              <StaggerItem key={c} className="bg-tile rounded-[22px] p-6">
                <span className="bg-sun text-ink grid size-8 place-items-center rounded-full">
                  <Check className="size-4" strokeWidth={3} aria-hidden />
                </span>
                <p className="mt-6 text-[18px] font-bold text-white">{c}</p>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
        <ZoomMedia src="/images/stock/autobahn.webp" alt="Autobahn im Abendlicht mit Windrädern" className="mt-16 md:mt-24" height="aspect-[16/10] md:aspect-auto md:h-[80svh]" />
      </Section>

      <Section id="fragen" tone="mist">
        <div className="wrap grid gap-12 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-4">
            <Heading kicker="FAQ" title="Fragen zu B17." size="md" />
          </Reveal>
          <Reveal delay={0.1} className="lg:col-span-8">
            <Accordion items={bf17Faq} />
          </Reveal>
        </div>
      </Section>

      <CtaBand title="Mit 17 starten?" />
    </>
  )
}
