import manifest from "~/content/image-manifest.json"

/**
 * Responsive Bildangaben für <img>: srcset aus den vorab erzeugten Varianten
 * (scripts/responsive-images.mjs → app/content/image-manifest.json), dazu sizes und die Originalmaße.
 * Der Browser lädt so nur die Stufe, die er für die tatsächliche Darstellungsgröße braucht.
 *
 * `sizes` beschreibt die gezeichnete Breite. Bei Hochformat-Karten mit Querformat-Fotos (object-cover)
 * ist die gezeichnete Breite größer als die Karte – das ist in den Voreinstellungen unten berücksichtigt.
 */
type Entry = { width: number; height: number; variants: number[] }
const images = manifest as Record<string, Entry>

export const imageSizes = {
  full: "100vw",
  /** Bildkarte der Kapitel-Sequenz, Bento-Kachel, Teamfoto (ab Tablet ca. 60 % Breite, Handy mit 16-px-Rand) */
  wide: "(min-width: 768px) 60vw, calc(100vw - 2rem)",
  /** halbe Breite ab Tablet */
  half: "(min-width: 768px) 50vw, calc(100vw - 2rem)",
  /**
   * Hero-Foto der Startseite: Das Original hat nur 959 px echte Auflösung (hochgerechnet auf 1920).
   * Auf dem Handy bringen mehr als ~1080 px keine Schärfe → 360 px × Pixeldichte 3 = 1080er-Stufe.
   */
  heroOriginal959: "(max-width: 767px) 360px, 100vw",
  /** Hochformat-Klassenkarten (Querformat-Fotos werden dort etwa doppelt so breit gezeichnet wie die Karte) */
  card: "(min-width: 1024px) 480px, (min-width: 640px) 60vw, 100vw",
} as const

export function responsiveImage(src: string, sizes: string = imageSizes.full) {
  const entry = images[src]
  if (!entry) return { src }
  const srcSet = [...entry.variants.map((w) => `${src.replace(/\.webp$/, `-${w}.webp`)} ${w}w`), `${src} ${entry.width}w`].join(", ")
  return { src, srcSet, sizes, width: entry.width, height: entry.height }
}
