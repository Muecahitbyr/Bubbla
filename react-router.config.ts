import { writeFile } from "node:fs/promises"
import { join } from "node:path"
import type { Config } from "@react-router/dev/config"
import { classes } from "./app/content/classes"
import { paths, site } from "./app/content/site"

/** Alle Seiten, die vorgerendert und in die sitemap.xml aufgenommen werden */
export const pages: string[] = [...new Set([...Object.values(paths), ...classes.map((c) => c.path)])]

export default {
  // Statische Website: jede Seite wird beim Build als fertiges HTML vorgerendert
  // (schnell, SEO-freundlich, läuft auf jedem Webspace ohne Node-Server).
  ssr: false,
  prerender: pages,

  // sitemap.xml für Suchmaschinen erzeugen
  async buildEnd({ reactRouterConfig }) {
    const today = new Date().toISOString().slice(0, 10)
    const urls = pages
      .map((p) => `  <url><loc>${site.url}${p}</loc><lastmod>${today}</lastmod><priority>${p === "/" ? "1.0" : "0.8"}</priority></url>`)
      .join("\n")
    const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`
    await writeFile(join(reactRouterConfig.buildDirectory, "client", "sitemap.xml"), xml)
  },
} satisfies Config
