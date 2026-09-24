import type { MetaDescriptor } from "react-router"
import { site } from "~/content/site"

type SeoInput = {
  title: string
  description: string
  /** Pfad wie auf der alten Seite, z. B. "/unterricht.htm" */
  path: string
  image?: string
  jsonLd?: Record<string, unknown> | Record<string, unknown>[]
  noindex?: boolean
}

/** Meta-Tags inkl. Open Graph und Canonical */
export function seo({ title, description, path, image = "/og-image.jpg", jsonLd, noindex }: SeoInput): MetaDescriptor[] {
  const url = `${site.url}${path}`
  const tags: MetaDescriptor[] = [
    { title },
    { name: "description", content: description },
    { property: "og:title", content: title },
    { property: "og:description", content: description },
    { property: "og:type", content: "website" },
    { property: "og:locale", content: "de_DE" },
    { property: "og:site_name", content: site.name },
    { property: "og:url", content: url },
    { property: "og:image", content: `${site.url}${image}` },
    { property: "og:image:width", content: "1200" },
    { property: "og:image:height", content: "630" },
    { name: "twitter:card", content: "summary_large_image" },
    { tagName: "link", rel: "canonical", href: url },
  ]
  if (noindex) tags.push({ name: "robots", content: "noindex" })
  for (const ld of Array.isArray(jsonLd) ? jsonLd : jsonLd ? [jsonLd] : []) tags.push({ "script:ld+json": ld })
  return tags
}

export function faqJsonLd(items: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  }
}

/** Die bisherige Seite nutzte auf allen Seiten denselben Titel und dieselbe Beschreibung */
export const legacySeo = {
  title: "Fahrschule Bubla in Kaufbeuren und Neugablonz",
  description:
    "Bei Fahrschule Bubla in Kaufbeuren und Neugablonz kommt der Spaß nicht zu kurz hier werden Fahrausbildung in Theorie und Praxis zum echten Erlebnis.",
}
