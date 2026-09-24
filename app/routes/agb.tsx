import type { MetaFunction } from "react-router"
import { LegalPage } from "~/components/ui/legal-page"
import { MockBadge } from "~/components/ui/mock-badge"
import { agb } from "~/content/legal"
import { paths, site } from "~/content/site"
import { legacySeo, seo } from "~/lib/seo"

export const meta: MetaFunction = () =>
  seo({ title: `AGB | ${legacySeo.title}`, description: "Allgemeine Geschäftsbedingungen der Fahrschule Bubla in Kaufbeuren.", path: paths.agb, noindex: site.mock.enabled })

export default function Agb() {
  return (
    <LegalPage
      kicker="Rechtliches"
      title="Allgemeine Geschäftsbedingungen"
      blocks={agb}
      intro={
        site.mock.enabled ? (
          <p className="mb-10 flex flex-wrap items-center gap-3 rounded-2xl bg-[#fff7c2] p-4 text-[15px] font-semibold text-[#6b5a00]">
            <MockBadge label="Muster-AGB" /> Platzhaltertext – wird vor dem Livegang durch die AGB der Fahrschule ersetzt.
          </p>
        ) : null
      }
    />
  )
}
