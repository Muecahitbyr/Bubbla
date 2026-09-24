import type { MetaFunction } from "react-router"
import { StepScroller } from "~/components/info/step-scroller"
import { LocalNav } from "~/components/layout/local-nav"
import { Accordion } from "~/components/ui/accordion"
import { CtaBand } from "~/components/ui/cta-band"
import { PageHero } from "~/components/ui/page-hero"
import { Reveal } from "~/components/ui/reveal"
import { Heading, Section } from "~/components/ui/section"
import { faq, steps } from "~/content/info"
import { paths } from "~/content/site"
import { faqJsonLd, legacySeo, seo } from "~/lib/seo"

export const meta: MetaFunction = () =>
  seo({
    title: `Ablauf & FAQ | ${legacySeo.title}`,
    description: "In fünf Schritten zum Führerschein: Anmeldung, Unterlagen, Theorie, Fahrstunden und Prüfungen – plus Antworten auf die häufigsten Fragen. Fahrschule Bubla Kaufbeuren.",
    path: paths.info,
    jsonLd: faqJsonLd(faq),
  })

export default function Info() {
  return (
    <>
      <LocalNav
        title="Ablauf"
        links={[
          { label: "Fünf Schritte", href: "#ablauf" },
          { label: "Häufige Fragen", href: "#faq" },
        ]}
      />
      <PageHero
        kicker="Ablauf"
        title="In fünf Schritten zum Führerschein."
        lead={
          <>
            Von der Anmeldung bis zur Prüfung – <strong>so kommst du ohne Umwege ans Ziel.</strong>
          </>
        }
        image="/images/stock/fahrstunde.webp"
        imageAlt="Fahrlehrer erklärt einem Fahrschüler im Auto die nächste Übung"
        imagePosition="center 40%"
      />

      <Section id="ablauf">
        <div className="wrap mb-14 md:mb-20">
          <Reveal>
            <Heading kicker="Schritt für Schritt" title="Dein Weg zur Fahrerlaubnis." size="md" />
          </Reveal>
        </div>
        <StepScroller steps={steps} />
      </Section>

      <Section id="faq" tone="mist">
        <div className="wrap grid gap-12 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-4">
            <Heading kicker="FAQ" title="Häufige Fragen." size="md">
              Deine Frage ist nicht dabei? <strong>Frag unseren Assistenten unten rechts</strong> – oder ruf uns an.
            </Heading>
          </Reveal>
          <Reveal delay={0.1} className="lg:col-span-8">
            <Accordion items={faq} />
          </Reveal>
        </div>
      </Section>

      <CtaBand />
    </>
  )
}
