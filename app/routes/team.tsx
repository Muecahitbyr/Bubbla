import { Award, Heart, Sparkles } from "~/lib/icons"
import type { MetaFunction } from "react-router"
import { LocalNav } from "~/components/layout/local-nav"
import { CtaBand } from "~/components/ui/cta-band"
import { MockBadge } from "~/components/ui/mock-badge"
import { PageHero } from "~/components/ui/page-hero"
import { Reveal, Stagger, StaggerItem } from "~/components/ui/reveal"
import { ScrollText } from "~/components/ui/scroll-text"
import { Heading, Section } from "~/components/ui/section"
import { about, teamText } from "~/content/info"
import { paths } from "~/content/site"
import { team, teamPhoto } from "~/content/team"
import { imageSizes, responsiveImage } from "~/lib/images"
import { legacySeo, seo } from "~/lib/seo"

export const meta: MetaFunction = () =>
  seo({
    title: `Team | ${legacySeo.title}`,
    description: "Kompetenz, Leidenschaft und Qualität: Christian Bubla und Horst Vetter – dein Team der Fahrschule Bubla in Kaufbeuren und Neugablonz.",
    path: paths.team,
  })

const values = [
  { icon: Award, title: "Kompetenz", text: "Erfahrung aus vielen Jahren Fahrausbildung – für eine sichere Prüfungsvorbereitung." },
  { icon: Heart, title: "Leidenschaft", text: "Lockere, freundliche Atmosphäre und Offenheit untereinander." },
  { icon: Sparkles, title: "Qualität", text: "Keine Fahrstunde zu viel: gute Planung statt unnötiger Kosten." },
]

export default function Team() {
  return (
    <>
      <LocalNav title="Team" links={[{ label: "Fahrlehrer", href: "#fahrlehrer" }, { label: "Werte", href: "#werte" }]} />
      <PageHero kicker="Unser Team" title="Kompetenz, Leidenschaft und Qualität." lead={teamText.replace(/^[^.]+\.\s*/, "")} />

      <Section id="fahrlehrer" space="md">
        <div className="wrap">
          <Stagger as="ul" className="grid gap-4 md:grid-cols-2 md:gap-6">
            {team.map((m) => (
              <StaggerItem as="li" key={m.name} className="bg-tile overflow-hidden rounded-[26px]">
                <div className="relative aspect-[4/3] overflow-hidden lg:aspect-[16/10]">
                  {m.photo ? (
                    <img {...responsiveImage(m.photo.src, imageSizes.half)} alt={m.photo.alt} className="absolute inset-0 size-full object-cover" loading="eager" decoding="async" />
                  ) : (
                    <div className="bg-mist absolute inset-0 grid place-items-center">
                      <span className="bg-sun text-ink grid size-36 place-items-center rounded-full text-[52px] font-extrabold tracking-[-0.04em] md:size-44 md:text-[64px]" aria-hidden>
                        {m.initials}
                      </span>
                      <MockBadge label="Foto folgt" className="absolute top-4 left-4" />
                    </div>
                  )}
                </div>
                <div className="p-6 md:p-8">
                  <p className="text-[26px] font-extrabold tracking-[-0.03em] md:text-[30px]">{m.name}</p>
                  <p className="text-muted mt-1 text-[16px]">{m.role}</p>
                  {m.since && <p className="text-bubla mt-2 text-[14px] font-bold">{m.since}</p>}
                </div>
              </StaggerItem>
            ))}
          </Stagger>

          <Reveal className="mt-4 md:mt-6">
            <figure>
              <img {...responsiveImage(teamPhoto.src, imageSizes.full)} alt={teamPhoto.alt} className="aspect-[16/9] h-auto w-full rounded-[26px] object-cover" loading="lazy" decoding="async" />
              <figcaption className="text-muted mt-3 text-[13px]">Unterwegs mit dem Fahrschul-Golf – „mit Spaß zum Erfolg“ steht sogar auf der Motorhaube.</figcaption>
            </figure>
          </Reveal>
        </div>
      </Section>

      <Section tone="mist">
        <div className="wrap">
          <p className="kicker mb-8">Über uns</p>
          <ScrollText className="display-md max-w-[24ch] !font-bold !leading-[1.14]" text={about} highlight={["Spaß", "Fairness"]} />
        </div>
      </Section>

      <Section id="werte">
        <div className="wrap">
          <Reveal>
            <Heading kicker="Werte" title="Wofür wir stehen." size="md" />
          </Reveal>
          <Stagger className="mt-12 grid gap-4 md:grid-cols-3">
            {values.map((v) => (
              <StaggerItem key={v.title} className="tone-night rounded-[26px] p-8">
                <v.icon className="text-sun size-8" aria-hidden />
                <p className="mt-10 text-[26px] font-extrabold tracking-[-0.03em] text-white">{v.title}</p>
                <p className="text-muted mt-2">{v.text}</p>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </Section>

      <CtaBand title="Wir freuen uns auf dich." />
    </>
  )
}
