import { type RouteConfig, index, layout, route } from "@react-router/dev/routes"
import { genericClassPages } from "./content/classes"

// Die Adressen entsprechen 1:1 der bisherigen Website (…/unterricht.htm usw.),
// damit Google-Rankings und bestehende Links erhalten bleiben. Neue Seiten folgen demselben Schema.
export default [
  layout("components/layout/site-layout.tsx", [
    index("routes/home.tsx"),
    route("info.htm", "routes/info.tsx"),
    route("unterricht.htm", "routes/unterricht.tsx"),
    route("klassen.htm", "routes/klassen.tsx"),
    ...genericClassPages.map((c) => route(c.path.slice(1), "routes/klasse.tsx", { id: `klasse-${c.slug}` })),
    route("begleitetes-fahren.htm", "routes/begleitetes-fahren.tsx"),
    route("preis.htm", "routes/preise.tsx"),
    route("team.htm", "routes/team.tsx"),
    route("contact.htm", "routes/kontakt.tsx"),
    route("anmeldung.htm", "routes/anmeldung.tsx"),
    route("impressum.htm", "routes/impressum.tsx"),
    route("datenschutz.htm", "routes/datenschutz.tsx"),
    route("agb.htm", "routes/agb.tsx"),
    route("*", "routes/not-found.tsx"),
  ]),
] satisfies RouteConfig
