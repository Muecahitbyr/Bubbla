import { CalendarDays, ExternalLink, MapPin } from "lucide-react"
import type { MetaFunction } from "react-router"
import { LocalNav } from "~/components/layout/local-nav"
import { ButtonLink } from "~/components/ui/button"
import { CtaBand } from "~/components/ui/cta-band"
import { MapEmbed } from "~/components/ui/map-embed"
import { MockBadge } from "~/components/ui/mock-badge"
import { PageHero } from "~/components/ui/page-hero"
import { ParallaxImage } from "~/components/ui/parallax-image"
import { Reveal, Stagger, StaggerItem } from "~/components/ui/reveal"
import { ScrollText } from "~/components/ui/scroll-text"
import { Heading, Section } from "~/components/ui/section"
import { theoryText, theoryTopics } from "~/content/info"
import { news, paths, site } from "~/content/site"
import { legacySeo, seo } from "~/lib/seo"

export const meta: MetaFunction = () =>
  seo({
    title: `Theorieunterricht | ${legacySeo.title}`,
    description: `Theorieunterricht bei der Fahrschule Bubla: ${site.hours.theoryDays.join(", ")}, immer ${site.hours.theoryTime} in der ${site.theoryLocation.street}, Kaufbeuren-Neugablonz. Plus Online-Lernplattform.`,
    path: paths.unterricht,
  })

const upcoming = (today: string) => news.filter((n) => n.date >= today)
const formatDate = (iso: string) => new Intl.DateTimeFormat("de-DE", { day: "numeric", month: "long", year: "numeric" }).format(new Date(`${iso}T12:00:00`))

export default function Unterricht() {
  // Datum beim Build festhalten – vorgerendertes HTML und Browser zeigen so dieselben Termine
  const items = upcoming(BUILD_DATE)

  return (
    <>
      <LocalNav
        title="Unterricht"
        links={[
          { label: "Zeiten", href: "#zeiten" },
          { label: "Themen", href: "#themen" },
          { label: "Online lernen", href: "#lernen" },
          { label: "Anfahrt", href: "#anfahrt" },
        ]}
      />
      <PageHero
        kicker="Theorieunterricht"
        title="Trocken? Höchstens dein Sitzplatz."
        lead={theoryText[0]}
        image="/images/stock/theorie-raum.webp"
        imageAlt="Teilnehmende im Theorieraum vor einer Leinwand"
      />

      <Section id="zeiten">
        <div className="wrap">
          <p className="kicker mb-8">Unterricht {site.hours.theoryDaysShort}</p>
          <ScrollText className="display-md max-w-[24ch] !font-bold !leading-[1.14]" text={theoryText[1]} highlight={["mehrmals", "flexibel"]} />
          <Stagger className="mt-20 grid grid-cols-2 gap-3 md:mt-28 md:grid-cols-4 md:gap-4">
            {site.hours.theoryDays.map((d) => (
              <StaggerItem key={d} className="bg-tile rounded-[22px] p-5 md:p-7">
                <p className="text-bubla text-[15px] font-extrabold">{d}</p>
                <p className="mt-8 text-[clamp(1.6rem,3vw,2.4rem)] leading-none font-extrabold tracking-[-0.04em] tabular-nums">{site.hours.theoryStart}</p>
                <p className="text-muted mt-1 text-[14px] font-semibold">bis {site.hours.theoryEnd} Uhr</p>
              </StaggerItem>
            ))}
          </Stagger>
          <Reveal className="text-muted mt-6 flex items-center gap-2 text-[15px] font-semibold">
            <MapPin className="text-bubla size-4" aria-hidden /> {site.theoryLocation.street}, {site.theoryLocation.zip} {site.theoryLocation.city}-{site.theoryLocation.district}
          </Reveal>
        </div>
      </Section>

      <Section id="themen" tone="night">
        <div className="wrap">
          <Reveal>
            <Heading kicker="Grundstoff" title="12 Themen. Ein Ziel." size="md">
              Die Themen wiederholen sich laufend – <strong>du kannst jederzeit einsteigen.</strong>
            </Heading>
          </Reveal>
          <Stagger as="ol" className="mt-14 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {theoryTopics.map((t, i) => (
              <StaggerItem as="li" key={t} className="bg-tile flex items-start gap-4 rounded-[20px] p-5">
                <span className="text-sun text-[15px] font-extrabold tabular-nums">{String(i + 1).padStart(2, "0")}</span>
                <span className="font-semibold text-white">{t}</span>
              </StaggerItem>
            ))}
          </Stagger>
          <p className="text-muted mt-8 text-[14px]">Dazu kommt der klassenspezifische Zusatzstoff (für Klasse B: 2 Doppelstunden).</p>
        </div>
      </Section>

      <Section id="lernen" space="none">
        <div className="wrap grid items-center gap-12 py-24 md:py-36 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-6">
            <Heading kicker="Online lernen" title="Kein Nervenflattern." size="md">
              {theoryText[2]}
            </Heading>
            <ButtonLink href={site.learningPlatform.url} variant="dark" className="mt-9" icon={<ExternalLink className="size-4" aria-hidden />}>
              Lernplattform {site.learningPlatform.name}
            </ButtonLink>
          </Reveal>
          <Reveal delay={0.1} className="lg:col-span-6">
            <ParallaxImage src="/images/stock/lernen-app.webp" alt="Junge Frau mit Smartphone und Lernunterlagen zeigt Daumen hoch" className="aspect-[4/3] rounded-[26px]" position="70% center" speed={0.08} />
          </Reveal>
        </div>
      </Section>

      {items.length > 0 && (
        <Section id="termine" tone="mist" space="md">
          <div className="wrap">
            <Reveal className="flex flex-wrap items-center gap-4">
              <Heading kicker="Aktuelles" title="Nächste Termine." size="md" />
              <MockBadge />
            </Reveal>
            <Stagger className="mt-10 grid gap-4 md:grid-cols-3">
              {items.map((n) => (
                <StaggerItem key={n.title} className="rounded-[22px] bg-white p-6">
                  <p className="text-bubla flex items-center gap-2 text-[14px] font-bold">
                    <CalendarDays className="size-4" aria-hidden /> {formatDate(n.date)}
                  </p>
                  <p className="mt-4 text-[20px] font-extrabold tracking-[-0.02em]">{n.title}</p>
                  <p className="text-muted mt-2 text-[15.5px]">{n.text}</p>
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </Section>
      )}

      <Section id="anfahrt">
        <div className="wrap grid gap-10 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-4">
            <Heading kicker="Anfahrt" title="Hier findet der Unterricht statt." size="sm" />
            <p className="lead mt-6">
              {site.theoryLocation.street}
              <br />
              {site.theoryLocation.zip} {site.theoryLocation.city}-{site.theoryLocation.district}
            </p>
          </Reveal>
          <Reveal delay={0.1} className="lg:col-span-8">
            <MapEmbed place="theory" />
          </Reveal>
        </div>
      </Section>

      <CtaBand title="Komm einfach vorbei." text={`${site.hours.theoryDays.join(", ")} ab ${site.hours.theoryStart} Uhr in der ${site.theoryLocation.street} – oder melde dich online an.`} />
    </>
  )
}
