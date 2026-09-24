import { Clock, Mail, Phone, Printer, Smartphone } from "lucide-react"
import type { MetaFunction } from "react-router"
import { LocalNav } from "~/components/layout/local-nav"
import { ButtonLink } from "~/components/ui/button"
import { CtaBand } from "~/components/ui/cta-band"
import { MapEmbed } from "~/components/ui/map-embed"
import { MockBadge } from "~/components/ui/mock-badge"
import { PageHero } from "~/components/ui/page-hero"
import { Reveal, Stagger, StaggerItem } from "~/components/ui/reveal"
import { Heading, Section } from "~/components/ui/section"
import { paths, site } from "~/content/site"
import { legacySeo, seo } from "~/lib/seo"

export const meta: MetaFunction = () =>
  seo({
    title: `Kontakt | ${legacySeo.title}`,
    description: `Fahrschule Bubla: Telefon ${site.phone.display}, mobil ${site.mobile.display}, ${site.email}. Büro ${site.address.street}, Theorie ${site.theoryLocation.street} in Kaufbeuren-Neugablonz.`,
    path: paths.kontakt,
  })

const channels = [
  { icon: Phone, label: "Telefon", value: site.phone.display, href: site.phone.href },
  { icon: Smartphone, label: "Mobil", value: site.mobile.display, href: site.mobile.href },
  { icon: Mail, label: "E-Mail", value: site.email, href: `mailto:${site.email}` },
  { icon: Printer, label: "Fax", value: site.fax },
]

export default function Kontakt() {
  return (
    <>
      <LocalNav
        title="Kontakt"
        links={[
          { label: "Erreichbarkeit", href: "#erreichbarkeit" },
          { label: "Standorte", href: "#standorte" },
        ]}
      />
      <PageHero
        kicker="Kontakt"
        title="Jederzeit für dich erreichbar."
        lead={
          <>
            Einfach <a href={site.mobile.href}>{site.mobile.display}</a> oder <a href={site.phone.href}>{site.phone.display}</a> wählen!
          </>
        }
      />

      <Section id="erreichbarkeit" space="md">
        <div className="wrap">
          <Stagger className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {channels.map((c) => {
              const inner = (
                <>
                  <c.icon className="text-bubla size-7" aria-hidden />
                  <span className="text-muted mt-8 block text-[13px] font-bold tracking-[0.08em] uppercase">{c.label}</span>
                  <span className="mt-1 block text-[19px] font-extrabold tracking-[-0.02em] break-words">{c.value}</span>
                </>
              )
              return (
                <StaggerItem key={c.label}>
                  {c.href ? (
                    <a href={c.href} className="bg-tile hover:bg-tile-2 block h-full rounded-[24px] p-6 transition-colors">
                      {inner}
                    </a>
                  ) : (
                    <div className="bg-tile h-full rounded-[24px] p-6">{inner}</div>
                  )}
                </StaggerItem>
              )
            })}
          </Stagger>

          <Reveal className="tone-night mt-4 grid gap-8 rounded-[26px] p-7 md:grid-cols-2 md:p-10">
            <div>
              <p className="kicker">Theorieunterricht</p>
              <p className="mt-5 text-[26px] font-extrabold tracking-[-0.02em] text-white">{site.hours.theoryDays.join(", ")}</p>
              <p className="text-sun mt-1 text-[22px] font-bold">{site.hours.theoryTime}</p>
            </div>
            <div>
              <p className="kicker flex-wrap">
                Bürozeiten <MockBadge />
              </p>
              <ul className="mt-5 space-y-3">
                {site.officeHours.map((h) => (
                  <li key={h.days} className="flex items-start gap-3 text-white">
                    <Clock className="text-sun mt-1 size-4 shrink-0" aria-hidden />
                    <span>
                      <span className="block font-bold">{h.days}</span>
                      <span className="text-muted block">{h.time}</span>
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </Section>

      <Section id="standorte" tone="mist">
        <div className="wrap">
          <Reveal>
            <Heading kicker="Standorte" title="Kaufbeuren & Neugablonz." size="md" />
          </Reveal>
          <div className="mt-12 grid gap-8 lg:grid-cols-2">
            <Reveal>
              <h3 className="text-[22px] font-extrabold tracking-[-0.02em]">Theorieunterricht</h3>
              <p className="text-muted mb-5">
                {site.theoryLocation.street}, {site.theoryLocation.zip} {site.theoryLocation.city}-{site.theoryLocation.district}
              </p>
              <MapEmbed place="theory" />
            </Reveal>
            <Reveal delay={0.1}>
              <h3 className="text-[22px] font-extrabold tracking-[-0.02em]">Büro & Postanschrift</h3>
              <p className="text-muted mb-5">
                {site.name}, Inh. {site.owner}, {site.address.street}, {site.address.zip} {site.address.city}
              </p>
              <MapEmbed place="office" />
            </Reveal>
          </div>
          <Reveal className="mt-10">
            <ButtonLink to={paths.anmeldung}>Zur Online-Anmeldung</ButtonLink>
          </Reveal>
        </div>
      </Section>

      <CtaBand />
    </>
  )
}
