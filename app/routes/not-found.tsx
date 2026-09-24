import type { MetaFunction } from "react-router"
import { ButtonLink } from "~/components/ui/button"
import { paths } from "~/content/site"
import { seo } from "~/lib/seo"

export const meta: MetaFunction = () => seo({ title: "Seite nicht gefunden | Fahrschule Bubla", description: "Diese Seite gibt es nicht (mehr).", path: "/404.html", noindex: true })

export default function NotFound() {
  return (
    <section className="tone-paper wrap flex min-h-svh flex-col justify-center pt-[var(--nav-offset)] pb-24">
      <p className="kicker mb-6">Fehler 404</p>
      <h1 className="display-xl grad-ink max-w-[12ch] pb-[0.12em]">Falsch abgebogen.</h1>
      <p className="lead mt-6 max-w-[34rem]">Diese Seite gibt es nicht (mehr). Kein Problem – wir bringen dich zurück auf die richtige Spur.</p>
      <div className="mt-10 flex flex-wrap gap-3">
        <ButtonLink to={paths.home}>Zur Startseite</ButtonLink>
        <ButtonLink to={paths.kontakt} variant="ghost">
          Kontakt
        </ButtonLink>
      </div>
    </section>
  )
}
