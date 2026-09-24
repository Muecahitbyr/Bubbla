import type { ReactNode } from "react"
import { LocalNav } from "~/components/layout/local-nav"
import type { LegalBlock } from "~/content/legal"
import { LegalContent } from "./legal-content"
import { PageHero } from "./page-hero"
import { Section } from "./section"

/** Gemeinsamer Aufbau für Impressum, Datenschutz und AGB */
export function LegalPage({ title, kicker, blocks, intro }: { title: string; kicker: string; blocks: LegalBlock[]; intro?: ReactNode }) {
  const links = blocks.filter((b): b is Extract<LegalBlock, { type: "h2" }> => b.type === "h2" && !!b.id).slice(0, 3)
  return (
    <>
      <LocalNav
        title={title}
        links={links.map((l) => {
          const label = l.text.replace(/^\d+\.\s*/, "")
          return { label: label.length > 24 ? label.split(/[\s,]/)[0] : label, href: `#${l.id}` }
        })}
      />
      <PageHero kicker={kicker} title={title} />
      <Section space="md">
        <div className="wrap">
          {intro}
          <LegalContent blocks={blocks} />
        </div>
      </Section>
    </>
  )
}
