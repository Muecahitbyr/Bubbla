import type { MetaFunction } from "react-router"
import { LegalPage } from "~/components/ui/legal-page"
import { impressum } from "~/content/legal"
import { paths } from "~/content/site"
import { legacySeo, seo } from "~/lib/seo"

export const meta: MetaFunction = () => seo({ title: `Impressum | ${legacySeo.title}`, description: "Impressum der Fahrschule Bubla, Neugablonzer Str. 29, 87600 Kaufbeuren.", path: paths.impressum })

export default function Impressum() {
  return <LegalPage kicker="Rechtliches" title="Impressum" blocks={impressum} />
}
