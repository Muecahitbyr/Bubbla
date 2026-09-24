import { motion, useReducedMotion, useScroll, useTransform } from "motion/react"
import { ArrowRight, GraduationCap, Headphones, Mail, Phone, Sparkles } from "lucide-react"
import { useRef } from "react"
import type { MetaFunction } from "react-router"
import { Link } from "react-router"
import { ClassShowcase } from "~/components/home/class-showcase"
import { FeatureSequence, type Chapter } from "~/components/home/feature-sequence"
import { HomeHero } from "~/components/home/hero"
import { ButtonLink } from "~/components/ui/button"
import { Counter } from "~/components/ui/counter"
import { CtaBand } from "~/components/ui/cta-band"
import { MapEmbed } from "~/components/ui/map-embed"
import { MockBadge } from "~/components/ui/mock-badge"
import { Reveal, Stagger, StaggerItem } from "~/components/ui/reveal"
import { ScrollText } from "~/components/ui/scroll-text"
import { Heading, Section } from "~/components/ui/section"
import { Tile } from "~/components/ui/tile"
import { ZoomMedia } from "~/components/ui/zoom-media"
import { classB, mainFee, priceLabel, specialDriveTotal } from "~/content/classes"
import { about, pillars, steps, teamText } from "~/content/info"
import { paths, site } from "~/content/site"
import { team, teamPhoto } from "~/content/team"
import { legacySeo, seo } from "~/lib/seo"

export const meta: MetaFunction = () => seo({ ...legacySeo, path: paths.home })

const chapters: Chapter[] = [
  {
    kicker: "Theorieunterricht",
    title: "Vier Abende pro Woche.",
    text: (
      <>
        Damit du den Führerschein möglichst schnell bekommst: Theorie{" "}
        <strong>
          {site.hours.theoryDays.join(", ").replace(/, (?=[^,]*$)/, " und ")}, immer {site.hours.theoryTime}
        </strong>{" "}
        in der {site.theoryLocation.street} in {site.theoryLocation.district}.
      </>
    ),
    image: "/images/stock/theorie-raum.webp",
    alt: "Teilnehmende im Theorieraum vor einer Leinwand",
  },
  {
    kicker: "Theorieräume",
    title: "Trocken? Höchstens dein Sitzplatz.",
    text: (
      <>
        <strong>Bequeme Bestuhlung und modernste Technik</strong> sorgen dafür, dass der Unterricht so angenehm wie möglich ist.
      </>
    ),
    image: "/images/stock/theorie-vortrag.webp",
    alt: "Vortrag mit Präsentation in einem hellen Seminarraum",
  },
  {
    kicker: "Online üben",
    title: "Kein Nervenflattern.",
    text: (
      <>
        Zusätzlich übst du online auf unserer Lernplattform. <strong>So kennst du bei der Prüfung bereits alle Fragen.</strong>
      </>
    ),
    image: "/images/stock/lernen-app.webp",
    alt: "Junge Frau mit Smartphone und Lernunterlagen zeigt Daumen hoch",
    position: "70% center",
  },
  {
    kicker: "Fahrstunden",
    title: "So flexibel wie möglich.",
    text: (
      <>
        Auch für die Fahrstunden versuchen wir, <strong>so flexibel wie möglich auf deine Wünsche einzugehen.</strong>
      </>
    ),
    image: "/images/stock/fahrerin-laechelt.webp",
    alt: "Fahrschülerin lächelt am Lenkrad",
    position: "60% center",
  },
]

export default function Home() {
  return (
    <>
      <HomeHero />

      {/* Über uns – Wort für Wort + Kennzahlen */}
      <Section>
        <div className="wrap">
          <p className="kicker mb-8">Fahrschule Bubla</p>
          <ScrollText className="display-md max-w-[24ch] !font-bold !leading-[1.14]" text={about} highlight={["Spaß", "Fairness"]} />

          <Stagger className="mt-24 grid grid-cols-2 gap-x-6 gap-y-12 md:mt-36 md:grid-cols-4">
            {[
              { value: site.hours.theoryPerWeek, label: "Theorieabende pro Woche" },
              { value: 2, label: "Standorte: Kaufbeuren & Neugablonz" },
              { value: specialDriveTotal(classB.specialDrives), label: "Pflicht-Sonderfahrten" },
              { value: classB.averageLessons ?? 20, prefix: "ca. ", label: "Fahrstunden im Durchschnitt" },
            ].map((s) => (
              <StaggerItem key={s.label} className="border-t-[3px] border-dashed border-[#f8e322] pt-6">
                <p className="grad-blue text-[clamp(3.25rem,7vw,6.25rem)] leading-none font-extrabold tracking-[-0.05em]">
                  {s.prefix && <span className="text-[0.4em] tracking-normal">{s.prefix}</span>}
                  <Counter to={s.value} />
                </p>
                <p className="text-muted mt-3 text-[15px] font-semibold md:text-[17px]">{s.label}</p>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </Section>

      <FeatureSequence chapters={chapters} label="Was dich bei uns erwartet" />

      <PromiseParallax />

      <ClassShowcase />

      {/* Bento */}
      <Section tone="mist">
        <div className="wrap">
          <Reveal>
            <Heading kicker="Auf einen Blick" title="Modern. Qualität. Support." />
          </Reveal>
          <div className="mt-14 grid auto-rows-[minmax(280px,auto)] gap-4 md:mt-20 md:grid-cols-6 md:gap-5">
            <Tile
              image="/images/stock/theorie-vortrag.webp"
              imageAlt="Theorieunterricht mit Präsentation"
              className="flex min-h-[440px] flex-col justify-end p-7 md:col-span-4 md:row-span-2 md:p-12"
            >
              <p className="kicker">Theorieunterricht</p>
              <p className="mt-4 text-[clamp(1.4rem,2.4vw,1.9rem)] font-bold tracking-[-0.02em] text-white/85">Mo · Di · Mi · Do</p>
              <p className="mt-1 text-[clamp(3.1rem,7.4vw,6.5rem)] leading-[0.95] font-extrabold tracking-[-0.05em] text-white tabular-nums">
                {site.hours.theoryStart}–{site.hours.theoryEnd}
              </p>
              <p className="mt-4 text-[17px] text-white/75">
                Uhr · {site.theoryLocation.street}, {site.theoryLocation.city}-{site.theoryLocation.district}
              </p>
            </Tile>

            {pillars.map((p, i) => {
              const Icon = [Sparkles, GraduationCap, Headphones][i]
              return (
                <Tile key={p.title} delay={0.05 * (i + 1)} className="flex flex-col justify-between gap-8 p-7 md:col-span-2 md:p-9">
                  <span className="bg-bubla grid size-12 place-items-center rounded-2xl text-white">
                    <Icon className="size-6" aria-hidden />
                  </span>
                  <div>
                    <p className="text-[26px] font-extrabold tracking-[-0.03em]">{p.title}</p>
                    <p className="text-muted mt-2 text-[16px] leading-snug">{p.text}</p>
                  </div>
                </Tile>
              )
            })}

            <Tile delay={0.1} className="!bg-sun flex flex-col justify-between gap-8 p-7 text-ink md:col-span-2 md:p-9">
              <p className="text-[15px] font-bold opacity-70">Anmeldung</p>
              <div>
                <p className="text-[clamp(1.75rem,2.4vw,2.2rem)] leading-[1.08] font-extrabold tracking-[-0.035em]">Online anmelden – in zwei Minuten.</p>
                <Link to={paths.anmeldung} className="bg-night mt-6 inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-[15px] font-bold text-white transition-transform active:scale-95">
                  Zur Anmeldung <ArrowRight className="size-4" aria-hidden />
                </Link>
              </div>
            </Tile>

            <Tile delay={0.15} className="flex flex-col justify-between gap-8 p-7 md:col-span-2 md:p-9">
              <p className="kicker">Preise</p>
              <div>
                <p className="text-[clamp(1.75rem,2.4vw,2.2rem)] leading-[1.08] font-extrabold tracking-[-0.035em]">Keine Fahrstunde zu viel.</p>
                <p className="text-muted mt-3 text-[16px]">
                  Grundpreis Klasse B <strong className="text-fg">{priceLabel(mainFee(classB)!)}</strong> <MockBadge className="ml-1" />
                </p>
                <Link to={paths.preise} className="text-accent mt-5 inline-flex items-center gap-1.5 text-[16px] font-bold hover:underline">
                  So setzt sich der Preis zusammen <ArrowRight className="size-4" aria-hidden />
                </Link>
              </div>
            </Tile>
          </div>
        </div>
      </Section>

      {/* Ablauf – Bild zieht zur vollen Breite auf */}
      <Section space="none" className="pt-24 md:pt-36">
        <div className="wrap">
          <Reveal>
            <Heading kicker="Ablauf" title="In fünf Schritten zum Führerschein.">
              Von der Anmeldung bis zur Prüfung – <strong>wir begleiten dich auf jedem Kilometer.</strong>
            </Heading>
          </Reveal>
        </div>
        <ZoomMedia
          src="/images/stock/fahrerperspektive.webp"
          alt="Blick vom Fahrersitz auf Lenkrad und Straße"
          className="mt-14 md:mt-20"
          height="aspect-[4/3] md:aspect-auto md:h-[86svh]"
          position="center 58%"
        />
        <div className="wrap py-14 md:py-20">
          <Stagger as="ol" className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {steps.map((step) => (
              <StaggerItem as="li" key={step.number} className="bg-tile rounded-[22px] p-6">
                <p className="text-bubla text-[15px] font-extrabold tabular-nums">{step.number}</p>
                <p className="mt-6 text-[21px] font-extrabold tracking-[-0.02em]">{step.title}</p>
              </StaggerItem>
            ))}
          </Stagger>
          <Reveal className="mt-10">
            <ButtonLink to={paths.info} variant="link" className="text-[18px]">
              Ablauf im Detail
            </ButtonLink>
          </Reveal>
        </div>
      </Section>

      {/* Team */}
      <Section tone="night">
        <div className="wrap grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-5">
            <Heading kicker="Unser Team" title="Kompetenz, Leidenschaft und Qualität." size="md">
              {teamText.replace(/^[^.]+\.\s*/, "")}
            </Heading>
            <ul className="mt-10 space-y-4">
              {team.map((m) => (
                <li key={m.name} className="border-line flex items-center gap-4 border-t pt-4">
                  <span className="bg-sun text-ink grid size-12 shrink-0 place-items-center rounded-full text-[15px] font-extrabold">{m.initials}</span>
                  <span>
                    <span className="block text-[19px] font-bold text-white">{m.name}</span>
                    <span className="text-muted block text-[15px]">
                      {m.role}
                      {m.since && ` · ${m.since}`}
                    </span>
                  </span>
                </li>
              ))}
            </ul>
            <ButtonLink to={paths.team} variant="link" className="mt-10 text-[18px]">
              Lerne unser Team kennen
            </ButtonLink>
          </Reveal>
          <Reveal delay={0.1} className="lg:col-span-7">
            <figure className="overflow-hidden rounded-[26px] bg-white/5">
              <img src={teamPhoto.src} alt={teamPhoto.alt} width={teamPhoto.width} height={teamPhoto.height} loading="lazy" decoding="async" className="h-auto w-full" />
            </figure>
          </Reveal>
        </div>
      </Section>

      {/* Kontakt & Anfahrt */}
      <Section tone="mist">
        <div className="wrap grid gap-12 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-5">
            <Heading kicker="Kontakt" title="Jederzeit für dich erreichbar." size="md" />
            <dl className="mt-10 space-y-6">
              {(
                [
                  ["Theorieunterricht", `${site.theoryLocation.street}, ${site.theoryLocation.zip} ${site.theoryLocation.city}-${site.theoryLocation.district}`],
                  ["Büro / Postanschrift", `${site.address.street}, ${site.address.zip} ${site.address.city}`],
                  ["Telefon", site.phone.display, site.phone.href],
                  ["Mobil", site.mobile.display, site.mobile.href],
                  ["E-Mail", site.email, `mailto:${site.email}`],
                ] as [string, string, string?][]
              ).map(([label, value, href]) => (
                <div key={label} className="border-line border-t pt-4">
                  <dt className="text-muted text-[13px] font-semibold">{label}</dt>
                  <dd className="mt-1 text-[20px] font-bold tracking-[-0.02em] break-words">
                    {href ? (
                      <a href={href} className="hover:text-bubla inline-flex items-center gap-2">
                        {label === "E-Mail" ? <Mail className="size-4 shrink-0" aria-hidden /> : <Phone className="size-4 shrink-0" aria-hidden />}
                        {value}
                      </a>
                    ) : (
                      value
                    )}
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>
          <Reveal delay={0.1} className="lg:col-span-7">
            <MapEmbed className="lg:aspect-auto lg:h-full lg:min-h-[500px]" />
          </Reveal>
        </div>
      </Section>

      <CtaBand />
    </>
  )
}

/** Vollbild mit Tiefen-Parallax: Bild und Text bewegen sich unterschiedlich schnell */
function PromiseParallax() {
  const ref = useRef<HTMLElement>(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] })
  const imgY = useTransform(scrollYProgress, [0, 1], reduce ? ["0%", "0%"] : ["-14%", "14%"])
  const textY = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [150, -150])
  // Deckkraft per Funktion (nicht über die beschleunigte Scroll-Timeline)
  const textOpacity = useTransform(() => {
    if (reduce) return 1
    const v = scrollYProgress.get()
    return Math.min(1, Math.max(0, (v - 0.2) / 0.18)) * Math.min(1, Math.max(0, (0.84 - v) / 0.14))
  })

  return (
    <section ref={ref} className="tone-night relative h-[125svh] overflow-hidden" aria-label="Unser Versprechen">
      <motion.img
        src="/images/stock/allgaeu-wiese.webp"
        alt="Blumenwiese mit Almhütte vor den Allgäuer Bergen"
        loading="lazy"
        decoding="async"
        style={{ y: imgY, scale: 1.34 }}
        className="absolute inset-0 h-full w-full object-cover object-[center_35%]"
      />
      <div aria-hidden className="absolute inset-0 bg-gradient-to-b from-[#061c33]/55 via-[#061c33]/35 to-[#061c33]/70" />
      <motion.div style={{ y: textY, opacity: textOpacity }} className="wrap relative flex h-full flex-col items-start justify-center">
        <p className="kicker mb-6">Unser Versprechen</p>
        <p className="display-xl max-w-[12ch] pb-3 text-white">
          Keine Fahrstunde <span className="text-sun">zu viel.</span>
        </p>
        <p className="mt-4 max-w-[30rem] text-[19px] leading-snug font-medium text-white/85">
          Das bedeutet natürlich auch: keine Gebühr zu viel. Durch gute Planung und Kompetenz ein preiswerter Weg zum Führerschein.
        </p>
      </motion.div>
    </section>
  )
}
