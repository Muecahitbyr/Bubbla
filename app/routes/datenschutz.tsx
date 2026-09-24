import type { MetaFunction } from "react-router"
import { LegalPage } from "~/components/ui/legal-page"
import { datenschutz } from "~/content/legal"
import { paths } from "~/content/site"
import { legacySeo, seo } from "~/lib/seo"

export const meta: MetaFunction = () =>
  seo({ title: `Datenschutz | ${legacySeo.title}`, description: "Datenschutzerklärung der Fahrschule Bubla in Kaufbeuren.", path: paths.datenschutz })

export default function Datenschutz() {
  return <LegalPage kicker="Rechtliches" title="Datenschutzerklärung" blocks={datenschutz} />
}
