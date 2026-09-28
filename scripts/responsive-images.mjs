/**
 * Erzeugt kleinere Varianten aller Fotos (WebP) für srcset und schreibt ihre Maße nach
 * app/content/image-manifest.json. Aufruf nach dem Hinzufügen/Ersetzen eines Fotos:
 *
 *   node scripts/responsive-images.mjs
 *
 * Braucht `cwebp` (macOS: brew install webp). Originale bleiben unverändert und sind die größte Stufe.
 * Varianten heißen <name>-<breite>.webp und liegen neben dem Original.
 */
import { execFileSync } from "node:child_process"
import { readdirSync, readFileSync, statSync, writeFileSync } from "node:fs"
import { join, relative } from "node:path"

const ROOT = "public/images"
const WIDTHS = [640, 1080, 1600]
const QUALITY = "78"
const isVariant = (f) => /-\d+\.webp$/.test(f)

/** Breite/Höhe direkt aus dem WebP-Header (VP8, VP8L, VP8X) */
function webpSize(file) {
  const b = readFileSync(file)
  const type = b.toString("ascii", 12, 16)
  if (type === "VP8X") return { width: 1 + b.readUIntLE(24, 3), height: 1 + b.readUIntLE(27, 3) }
  if (type === "VP8L") {
    const bits = b.readUInt32LE(21)
    return { width: 1 + (bits & 0x3fff), height: 1 + ((bits >> 14) & 0x3fff) }
  }
  if (type === "VP8 ") return { width: b.readUInt16LE(26) & 0x3fff, height: b.readUInt16LE(28) & 0x3fff }
  throw new Error(`Unbekanntes WebP-Format: ${file}`)
}

const files = []
const walk = (dir) => {
  for (const f of readdirSync(dir)) {
    const p = join(dir, f)
    if (statSync(p).isDirectory()) walk(p)
    else if (f.endsWith(".webp") && !isVariant(f)) files.push(p)
  }
}
walk(ROOT)

const manifest = {}
for (const file of files.sort()) {
  const { width, height } = webpSize(file)
  const variants = []
  for (const w of WIDTHS.filter((w) => w < width * 0.9)) {
    const out = file.replace(/\.webp$/, `-${w}.webp`)
    execFileSync("cwebp", ["-quiet", "-q", QUALITY, "-m", "6", "-sharp_yuv", "-metadata", "none", "-resize", String(w), "0", file, "-o", out])
    variants.push(w)
  }
  manifest["/" + relative("public", file)] = { width, height, variants }
  console.log(`${file}: ${width}×${height}, Varianten ${variants.join(", ") || "–"}`)
}
writeFileSync("app/content/image-manifest.json", JSON.stringify(manifest, null, 2) + "\n")
