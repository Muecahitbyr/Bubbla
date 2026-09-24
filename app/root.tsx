import type { ReactNode } from "react"
import { isRouteErrorResponse, Links, Meta, Outlet, Scripts, ScrollRestoration } from "react-router"
import type { LinksFunction } from "react-router"
import "./app.css"
import { paths, site } from "./content/site"
import { HERO_IMAGE } from "./components/home/hero"

export const links: LinksFunction = () => [
  { rel: "icon", href: "/favicon.svg", type: "image/svg+xml" },
  { rel: "apple-touch-icon", href: "/apple-touch-icon.png" },
  // Muss exakt das Bild sein, das der Startseiten-Hero verwendet
  { rel: "preload", href: HERO_IMAGE, as: "image", type: "image/webp" },
]

const drivingSchool = {
  "@context": "https://schema.org",
  "@type": "DrivingSchool",
  name: site.name,
  slogan: site.claim,
  url: site.url,
  telephone: site.phone.international,
  email: site.email,
  image: `${site.url}/og-image.jpg`,
  logo: `${site.url}/images/logo.png`,
  founder: { "@type": "Person", name: site.owner },
  address: {
    "@type": "PostalAddress",
    streetAddress: site.address.street,
    postalCode: site.address.zip,
    addressLocality: site.address.city,
    addressRegion: "Bayern",
    addressCountry: "DE",
  },
  geo: { "@type": "GeoCoordinates", latitude: site.maps.office.lat, longitude: site.maps.office.lng },
  location: {
    "@type": "Place",
    name: `${site.name} – ${site.theoryLocation.name}`,
    address: {
      "@type": "PostalAddress",
      streetAddress: site.theoryLocation.street,
      postalCode: site.theoryLocation.zip,
      addressLocality: `${site.theoryLocation.city}-${site.theoryLocation.district}`,
      addressCountry: "DE",
    },
    geo: { "@type": "GeoCoordinates", latitude: site.maps.theory.lat, longitude: site.maps.theory.lng },
  },
  areaServed: ["Kaufbeuren", "Neugablonz"],
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      name: "Theorieunterricht",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday"],
      opens: site.hours.theoryStart,
      closes: site.hours.theoryEnd,
    },
  ],
}

export function Layout({ children }: { children: ReactNode }) {
  return (
    <html lang="de">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        <meta name="theme-color" content="#ffffff" />
        <meta name="format-detection" content="telephone=no" />
        <Meta />
        <Links />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(drivingSchool) }} />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  )
}

export default function App() {
  return <Outlet />
}

export function ErrorBoundary({ error }: { error: unknown }) {
  let title = "Da ist etwas schiefgelaufen."
  let details = "Bitte lade die Seite neu oder versuche es später noch einmal."

  if (isRouteErrorResponse(error) && error.status === 404) {
    title = "Seite nicht gefunden."
    details = "Die angeforderte Seite existiert nicht."
  } else if (import.meta.env.DEV && error instanceof Error) {
    details = error.message
  }

  return (
    <main className="tone-paper wrap-narrow flex min-h-svh flex-col justify-center py-24">
      <p className="kicker mb-5">{site.name}</p>
      <h1 className="display-md">{title}</h1>
      <p className="lead mt-5">{details}</p>
      <a href={paths.home} className="bg-sun text-ink mt-10 inline-flex w-fit rounded-full px-6 py-3 font-semibold">
        Zur Startseite
      </a>
    </main>
  )
}
