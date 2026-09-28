import { reactRouter } from "@react-router/dev/vite"
import tailwindcss from "@tailwindcss/vite"
import { defineConfig, type Plugin } from "vite"

/**
 * Nur `npm run dev`: nichts im Browser zwischenspeichern.
 * Vite liefert Bibliotheken als „immutable“ und eigene Module mit „no-cache“ aus. Safari verwendet beim
 * Neuladen trotzdem alte Module weiter; die verweisen nach einem Dev-Server-Neustart auf Bibliotheks-
 * Versionen, die es nicht mehr gibt → JavaScript startet nicht. Mit „no-store“ lädt Safari immer frisch.
 * (Der Produktions-Build ist nicht betroffen: Dateinamen dort enthalten einen Inhalts-Hash.)
 */
function devNoStore(): Plugin {
  return {
    name: "bubla-dev-no-store",
    apply: "serve",
    configureServer(server) {
      server.middlewares.use((_req, res, next) => {
        const setHeader = res.setHeader.bind(res)
        res.setHeader = ((name: string, value: number | string | readonly string[]) =>
          setHeader(name, name.toLowerCase() === "cache-control" ? "no-store" : value)) as typeof res.setHeader
        setHeader("Cache-Control", "no-store")
        next()
      })
    },
  }
}

export default defineConfig({
  plugins: [devNoStore(), tailwindcss(), reactRouter()],
  resolve: { tsconfigPaths: true },
  // Build-Ausgabe, Testergebnisse und Screenshots nicht beobachten – sonst lädt `npm run build` die offene Dev-Seite neu
  server: { watch: { ignored: ["**/build/**", "**/test-results/**", "**/design-review/**", "**/.audit/**"] } },
  // Datum des Builds (JJJJ-MM-TT) – blendet vergangene Termine aus, ohne Hydration-Unterschiede
  define: { BUILD_DATE: JSON.stringify(new Date().toISOString().slice(0, 10)) },
})
