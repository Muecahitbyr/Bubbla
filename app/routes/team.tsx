import { Award, Heart, Sparkles } from "lucide-react"
import type { MetaFunction } from "react-router"
import { LocalNav } from "~/components/layout/local-nav"
import { CtaBand } from "~/components/ui/cta-band"
import { PageHero } from "~/components/ui/page-hero"
import { Reveal, Stagger, StaggerItem } from "~/components/ui/reveal"
import { ScrollText } from "~/components/ui/scroll-text"
import { Heading, Section } from "~/components/ui/section"
import { about, teamText } from "~/content/info"
import { paths } from "~/content/site"
import { team, teamPhoto } from "~/content/team"
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
        <div className="wrap grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-7">
            <figure>
              <img src={teamPhoto.src} alt={teamPhoto.alt} width={teamPhoto.width} height={teamPhoto.height} className="h-auto w-full rounded-[26px]" loading="eager" decoding="async" />
              <figcaption className="text-muted mt-3 text-[13px]">Unterwegs mit dem Fahrschul-Golf – „mit Spaß zum Erfolg“ steht sogar auf der Motorhaube.</figcaption>
            </figure>
          </Reveal>
          <Stagger as="ul" className="space-y-4 lg:col-span-5">
            {team.map((m) => (
              <StaggerItem as="li" key={m.name} className="bg-tile flex items-center gap-5 rounded-[24px] p-6">
                <span className="bg-sun text-ink grid size-16 shrink-0 place-items-center rounded-full text-[20px] font-extrabold">{m.initials}</span>
                <span>
                  <span className="block text-[22px] font-extrabold tracking-[-0.02em]">{m.name}</span>
                  <span className="text-muted block text-[16px]">{m.role}</span>
                  {m.since && <span className="text-bubla mt-1 block text-[14px] font-bold">{m.since}</span>}
                </span>
              </StaggerItem>
            ))}
          </Stagger>
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
