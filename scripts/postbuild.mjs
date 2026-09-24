/**
 * Nach dem Build:
 * 1. React Router legt vorgerenderte Seiten als „unterricht.htm/index.html“ ab.
 *    Damit die alten Adressen exakt gleich bleiben, wird daraus die Datei „unterricht.htm“.
 * 2. Die SPA-Rückfallseite wird zur 404-Seite.
 */
import { copyFile, readdir, rename, rm, stat } from "node:fs/promises"
import { join } from "node:path"

const out = "build/client"

for (const entry of await readdir(out)) {
  if (!entry.endsWith(".htm")) continue
  const dir = join(out, entry)
  if (!(await stat(dir)).isDirectory()) continue
  const tmp = `${dir}.tmp`
  await rename(join(dir, "index.html"), tmp)
  await rm(dir, { recursive: true })
  await rename(tmp, dir)
  console.log(`✓ ${entry}`)
}

try {
  await copyFile(join(out, "__spa-fallback.html"), join(out, "404.html"))
  console.log("✓ 404.html")
} catch {
  console.warn("! __spa-fallback.html nicht gefunden – 404.html nicht erzeugt")
}
