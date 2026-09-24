import type { Page } from "@playwright/test"
import { classes } from "../app/content/classes"
import { paths } from "../app/content/site"

export const allPages = [...new Set([...Object.values(paths), ...classes.map((c) => c.path)])]
export const widths: { width: number; height: number }[] = [
  { width: 320, height: 640 },
  { width: 375, height: 740 },
  { width: 390, height: 844 },
  { width: 402, height: 874 },
  { width: 768, height: 1024 },
  { width: 1024, height: 768 },
  { width: 1440, height: 900 },
  { width: 1920, height: 1080 },
]

/** Sammelt JS-Fehler, Konsolenfehler (inkl. Hydration) und fehlgeschlagene Anfragen */
export function watchErrors(page: Page) {
  const errors: string[] = []
  page.on("pageerror", (e) => errors.push(`pageerror: ${e.message}`))
  page.on("console", (m) => {
    if (m.type() === "error" || /hydrat/i.test(m.text())) errors.push(`console: ${m.text()}`)
  })
  page.on("response", (r) => {
    if (r.status() >= 400 && r.url().startsWith("http://localhost")) errors.push(`${r.status()} ${r.url()}`)
  })
  return errors
}

/** Scrollt einmal durch die Seite, damit alle Abschnitte gerendert und animiert werden */
export async function scrollThrough(page: Page) {
  const h = await page.evaluate(() => document.documentElement.scrollHeight)
  const vh = page.viewportSize()!.height
  for (let y = 0; y < h; y += Math.round(vh * 0.8)) {
    await page.evaluate((y) => window.scrollTo(0, y), y)
    await page.waitForTimeout(40)
  }
  await page.evaluate(() => window.scrollTo(0, document.documentElement.scrollHeight))
  await page.waitForTimeout(300)
}

/**
 * Findet Überbreite und abgeschnittene Inhalte. Gemessen werden die tatsächlich gezeichneten
 * Textzeilen (Range-Rechtecke) – nicht die Kästen –, und zwar gegen den Bildschirmrand und
 * gegen jeden Eltern-Container, der überstehende Inhalte abschneidet (overflow hidden/clip).
 */
export async function layoutProblems(page: Page) {
  return page.evaluate(() => {
    const problems: string[] = []
    const vw = document.documentElement.clientWidth
    if (document.documentElement.scrollWidth > vw + 1) problems.push(`Seite breiter als Bildschirm: ${document.documentElement.scrollWidth} > ${vw}`)

    const skip = (el: Element) =>
      !!el.closest("[aria-hidden=true], [inert], .no-scrollbar, section[aria-labelledby=klassen-titel], #mobile-menu, #klassen-flyout, [role=dialog]") ||
      getComputedStyle(el).visibility === "hidden"

    const clippers = (el: Element) => {
      const out: DOMRect[] = []
      for (let p = el.parentElement; p && p !== document.body; p = p.parentElement) {
        const cs = getComputedStyle(p)
        const mask = p.classList.contains("inline-block") && p.classList.contains("overflow-hidden") // Wort-Maske der Animation
        if (!mask && (/(hidden|clip)/.test(cs.overflowX) || /(hidden|clip)/.test(cs.overflowY))) out.push(p.getBoundingClientRect())
      }
      return out
    }

    const seen = new Set<string>()
    for (const el of document.querySelectorAll("h1, h2, h3, p, a, button, li, dd, dt, label, figcaption, address")) {
      if (skip(el)) continue
      const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT)
      const boxes = clippers(el)
      for (let n = walker.nextNode(); n; n = walker.nextNode()) {
        if (!n.textContent?.trim()) continue
        const range = document.createRange()
        range.selectNodeContents(n)
        for (const r of range.getClientRects()) {
          if (r.width === 0 || r.height === 0) continue
          const text = n.textContent.trim().slice(0, 40)
          const key = `${el.tagName}:${text}`
          if (seen.has(key)) continue
          // nur Text prüfen, der gerade vertikal im Bild ist (Karussells rechts außerhalb ausgenommen)
          if (r.right > vw + 1 && r.left < vw) {
            problems.push(`Text ragt über den Bildschirmrand (${Math.round(r.right)} > ${vw}): ${el.tagName.toLowerCase()} „${text}“`)
            seen.add(key)
          }
          for (const b of boxes) {
            const overlapsX = r.right > b.left && r.left < b.right
            const overlapsY = r.bottom > b.top && r.top < b.bottom
            if (!overlapsX || !overlapsY) continue
            if (r.right > b.right + 1 || r.left < b.left - 1 || r.bottom > b.bottom + 1) {
              problems.push(`Text abgeschnitten: ${el.tagName.toLowerCase()} „${text}“`)
              seen.add(key)
              break
            }
          }
        }
      }
    }
    return problems
  })
}
