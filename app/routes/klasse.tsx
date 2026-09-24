import { ArrowRight, Check, GraduationCap, Route as RouteIcon, ScrollText as ScrollIcon } from "lucide-react"
import type { MetaFunction } from "react-router"
import { useMatches } from "react-router"
import { LocalNav } from "~/components/layout/local-nav"
import { ButtonLink } from "~/components/ui/button"
import { ClassCard } from "~/components/ui/class-card"
import { CtaBand } from "~/components/ui/cta-band"
import { FeeList } from "~/components/ui/fee-list"
import { MockBadge } from "~/components/ui/mock-badge"
import { PageHero } from "~/components/ui/page-hero"
import { Plate } from "~/components/ui/plate"
import { Reveal, Stagger, StaggerItem } from "~/components/ui/reveal"
import { Heading, Section } from "~/components/ui/section"
import { classBySlug, classes, specialDriveTotal, type LicenseClass } from "~/content/classes"
import { paths, site } from "~/content/site"
import { seo } from "~/lib/seo"

/** Die Route-ID lautet „klasse-<slug>“ (siehe routes.ts) – zuverlässiger als der Pfad beim Vorrendern */
const byRouteId = (id?: string) => classes.find((c) => `klasse-${c.slug}` === id) ?? classes[0]

export const meta: MetaFunction = ({ matches }) => {
  const c = byRouteId(matches[matches.length - 1]?.id)
  return seo({
    ...c.seo,
    path: c.path,
    image: "/og-image.jpg",
    jsonLd: {
      "@context": "https://schema.org",
      "@type": "Course",
      name: c.name,
      description: c.summary,
      provider: { "@type": "DrivingSchool", name: site.name, url: site.url },
    },
  })
}

/** Klassenseite – eine Vorlage für alle Klassen aus classes.ts */
export default function KlassePage() {
  const matches = useMatches()
  const c = byRouteId(matches[matches.length - 1]?.id)
  const related = (c.related ?? []).map(classBySlug).filter(Boolean)

  return (
    <>
      <LocalNav
        title={`Klasse ${c.code}`}
        links={[
          { label: "Überblick", href: "#ueberblick" },
          { label: "Ausbildung", href: "#ausbildung" },
          { label: "Preise", href: "#preise" },
        ]}
      />
      <PageHero
        breadcrumbs={[{ label: "Start", to: paths.home }, { label: "Klassen", to: paths.klassen }, { label: c.code }]}
        kicker={c.category === "auto" ? "Auto & Anhänger" : "Zweirad"}
        title={c.name}
        lead={c.intro[0]}
        image={c.image}
        imageAlt={c.imageAlt}
        imagePosition={c.imagePosition}
      >
        <Plate code={c.code} size="md" />
        <ButtonLink to={paths.anmeldung}>Jetzt anmelden</ButtonLink>
        {c.mock && <MockBadge label="Beispielinhalt" />}
      </PageHero>

      <Overview c={c} />
      <Training c={c} />

      <Section id="preise" tone="mist">
        <div className="wrap grid gap-12 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-5">
            <Heading kicker="Preise" title={`Was kostet Klasse ${c.code}?`} size="md">
              Keine Fahrstunde zu viel – das bedeutet auch: <strong>keine Gebühr zu viel.</strong>
            </Heading>
            <div className="mt-6">
              <MockBadge />
            </div>
            <ButtonLink to={paths.preise} variant="link" className="mt-8 text-[17px]">
              Alle Preise vergleichen
            </ButtonLink>
          </Reveal>
          <Reveal delay={0.1} className="lg:col-span-7">
            <div className="rounded-[26px] bg-white p-6 md:p-9">
              <FeeList fees={c.fees} />
            </div>
          </Reveal>
        </div>
      </Section>

      {related.length > 0 && (
        <Section>
          <div className="wrap">
            <Reveal>
              <Heading kicker="Passt dazu" title="Weitere Klassen." size="md" />
            </Reveal>
            <Stagger className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((r) => (
                <StaggerItem key={r.slug}>
                  <ClassCard
                    item={{ path: r.path, code: r.code, title: r.name, summary: r.summary, image: r.image, imageAlt: r.imageAlt, imagePosition: r.imagePosition, badge: r.ageBadge }}
                    className="aspect-[4/3.6]"
                  />
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </Section>
      )}

      <CtaBand title={`Bereit für Klasse ${c.code}?`} />
    </>
  )
}

function Overview({ c }: { c: LicenseClass }) {
  return (
    <Section id="ueberblick">
      <div className="wrap">
        <Reveal>
          <Heading kicker="Überblick" title="Das darfst du fahren." size="md" />
        </Reveal>
        <div className="mt-12 grid gap-4 md:grid-cols-12 md:gap-5">
          <Reveal className="tone-night rounded-[26px] p-7 md:col-span-5 md:p-10">
            <p className="kicker">Mindestalter</p>
            <ul className="mt-6 space-y-6">
              {c.minAge.map((a) => (
                <li key={a.label}>
                  <span className="text-sun block text-[clamp(3.5rem,7vw,5.5rem)] leading-none font-extrabold tracking-[-0.05em]">{a.value}</span>
                  <span className="text-muted mt-1 block text-[16px] font-semibold">{a.label}</span>
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={0.08} className="bg-tile rounded-[26px] p-7 md:col-span-7 md:p-10">
            <p className="kicker">Fahrzeuge</p>
            <ul className="mt-6 space-y-4">
              {c.vehicle.map((v) => (
                <li key={v} className="flex gap-3 text-[17px] md:text-[19px]">
                  <span className="bg-sun text-ink mt-1 grid size-5 shrink-0 place-items-center rounded-full">
                    <Check className="size-3" strokeWidth={3} aria-hidden />
                  </span>
                  <span>{v}</span>
                </li>
              ))}
            </ul>
            {c.requirements && (
              <>
                <p className="kicker mt-10">Voraussetzungen</p>
                <ul className="mt-5 space-y-3">
                  {c.requirements.map((r) => (
                    <li key={r} className="text-muted flex gap-3 text-[16px]">
                      <ArrowRight className="text-bubla mt-1 size-4 shrink-0" aria-hidden /> {r}
                    </li>
                  ))}
                </ul>
              </>
            )}
          </Reveal>
        </div>
      </div>
    </Section>
  )
}

function Training({ c }: { c: LicenseClass }) {
  const s = c.specialDrives
  return (
    <Section id="ausbildung" space="none" className="pb-24 md:pb-36">
      <div className="wrap">
        <Reveal>
          <Heading kicker="Ausbildung" title="So läuft deine Ausbildung." size="md" />
        </Reveal>
        <Stagger className="mt-12 grid gap-4 md:grid-cols-3 md:gap-5">
          <StaggerItem className="bg-tile rounded-[26px] p-7">
            <GraduationCap className="text-bubla size-7" aria-hidden />
            <p className="mt-6 text-[21px] font-extrabold tracking-[-0.02em]">Theorie</p>
            <p className="text-muted mt-2">{c.theory.text}</p>
            <p className="text-muted mt-3 text-[14px]">
              {site.hours.theoryDaysShort}, {site.hours.theoryTime}
            </p>
          </StaggerItem>
          <StaggerItem className="bg-tile rounded-[26px] p-7" >
            <RouteIcon className="text-bubla size-7" aria-hidden />
            <p className="mt-6 text-[21px] font-extrabold tracking-[-0.02em]">Praxis</p>
            <p className="text-muted mt-2">
              {c.averageLessons ? `Durchschnittlich ca. ${c.averageLessons} Normalfahrstunden – je nach deinen persönlichen Voraussetzungen.` : "Umfang je nach Klasse und Vorkenntnissen – wir planen ihn gemeinsam mit dir."}
            </p>
          </StaggerItem>
          <StaggerItem className="bg-tile rounded-[26px] p-7">
            <ScrollIcon className="text-bubla size-7" aria-hidden />
            <p className="mt-6 text-[21px] font-extrabold tracking-[-0.02em]">Prüfung</p>
            <p className="text-muted mt-2">{c.exam}</p>
          </StaggerItem>
        </Stagger>

        {s && (
          <Reveal className="tone-sun mt-5 rounded-[26px] p-7 md:p-10">
            <div id="sonderfahrten" className="flex flex-wrap items-end justify-between gap-6">
              <div>
                <p className="kicker">Sonderfahrten</p>
                <p className="mt-4 text-[clamp(1.8rem,3.4vw,2.8rem)] leading-tight font-extrabold tracking-[-0.03em]">
                  {specialDriveTotal(s)} Pflichtstunden à 45 Minuten
                </p>
              </div>
              <ul className="grid w-full grid-cols-3 gap-3 sm:w-auto sm:gap-8">
                {[
                  [s.ueberland, "Überland"],
                  [s.autobahn, "Autobahn"],
                  [s.dunkelheit, "Dunkelheit"],
                ].map(([n, l]) => (
                  <li key={l}>
                    <span className="text-bubla block text-[clamp(2.6rem,5vw,4rem)] leading-none font-extrabold tabular-nums">{n}</span>
                    <span className="text-muted mt-1 block text-[14px] font-semibold">{l}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        )}
      </div>
    </Section>
  )
}
