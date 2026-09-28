import { expect, test, type Page } from "@playwright/test"
import { classB, specialDriveTotal } from "../app/content/classes"
import { site } from "../app/content/site"
import { allPages, watchErrors } from "./helpers"

/**
 * Inhalte dürfen nie an JavaScript oder einer Animation hängen:
 * vorgerendert sichtbar, ohne JavaScript sichtbar, nach Sprüngen/Reload/Seitenwechsel sichtbar.
 */

const counterValues = [`${site.hours.theoryPerWeek}`, "2", `${specialDriveTotal(classB.specialDrives)}`, `ca. ${classB.averageLessons ?? 20}`]

/** Wartet, bis die Einblend-Animationen oben auf der Seite (CSS) durchgelaufen sind */
// (von außen abgefragt – waitForFunction bräuchte Seiten-JavaScript, das hier teils abgeschaltet ist)
const animationsDone = (page: Page) =>
  expect
    .poll(() => page.evaluate(() => document.getAnimations().filter((a) => a.playState === "running" && a.effect?.getComputedTiming().iterations !== Infinity).length), { timeout: 5000 })
    .toBe(0)

/** Abschnitte, deren Deckkraft absichtlich an der Scrollposition hängt (Hero blendet beim Weiterscrollen aus) */
const SCROLL_LINKED = "section[aria-label=Willkommen], section[aria-label='Unser Versprechen']"

/**
 * Inhalte im <main>, die (effektiv, inkl. Eltern) fast unsichtbar sind – nur bis `limitY` (Seitenkoordinate).
 * `skip`: zusätzlich auszunehmende Bereiche.
 */
async function invisibleContent(page: Page, limitY = Infinity, skip = "") {
  return page.evaluate(({ limitY, skip }) => {
    const out: string[] = []
    const effOpacity = (el: Element) => {
      let o = 1
      for (let e: Element | null = el; e && e !== document.documentElement; e = e.parentElement) o *= Number(getComputedStyle(e).opacity)
      return o
    }
    for (const el of document.querySelectorAll("main h1, main h2, main h3, main p, main li, main dd, main a, main img, main figure")) {
      // gewollt verborgen: inaktive Bilder der Kapitel-Sequenz, Scroll-Überblendungen im Hero, geschlossene Akkordeons
      if (el.closest("[aria-hidden=true], [inert], .pointer-events-none") || getComputedStyle(el).visibility === "hidden") continue
      if (skip && el.closest(skip)) continue
      const r = el.getBoundingClientRect()
      if (r.width < 2 || r.height < 2) continue
      if (r.top + scrollY > limitY) continue
      if (el.tagName !== "IMG" && !el.textContent?.trim()) continue
      const o = effOpacity(el)
      if (o < 0.3) out.push(`${el.tagName.toLowerCase()} (${o.toFixed(2)}) „${(el.textContent || el.getAttribute("alt") || "").trim().slice(0, 50)}“`)
    }
    return out
  }, { limitY, skip })
}

/** Text der Kennzahl (inkl. „ca. “) */
const counterTexts = (page: Page) => page.locator("main [data-counter]").evaluateAll((els) => els.map((e) => e.parentElement!.textContent!.replace(/\s+/g, " ").trim()))
/** Was beim Markieren & Kopieren eines Kennzahl-Blocks herauskommt */
const counterBlockText = (page: Page) => page.locator("main [data-counter]").first().evaluate((e) => (e.closest("div") as HTMLElement).innerText.replace(/\s+/g, " ").trim())

test.describe("ohne JavaScript", () => {
  test.use({ javaScriptEnabled: false })
  for (const path of allPages) {
    test(`alles sichtbar ${path}`, async ({ page }) => {
      await page.goto(path)
      await animationsDone(page)
      expect(await invisibleContent(page)).toEqual([])
    })
  }
  test("Zähler zeigen die echten Werte", async ({ page }) => {
    await page.goto("/")
    const texts = await counterTexts(page)
    expect(texts.length).toBe(4)
    for (const v of counterValues) expect(texts.some((t) => t.startsWith(v))).toBe(true)
  })
})

test.describe("mit JavaScript", () => {
  test("Zähler zählen beim Hereinscrollen hoch und enden beim echten Wert", async ({ page }) => {
    const errors = watchErrors(page)
    // Erst den Start von JavaScript abwarten – vorher stünden schon die vorgerenderten Endwerte da
    await page.goto("/", { waitUntil: "networkidle" })
    await page.waitForTimeout(300)
    // Unterhalb des Bildschirms: auf 0 gesetzt, wartet aufs Hereinscrollen
    expect(await counterTexts(page)).toEqual(["0", "0", "0", "ca. 0"])
    await page.locator("main [data-counter]").first().scrollIntoViewIfNeeded()
    await expect.poll(() => counterTexts(page), { timeout: 6000 }).toEqual(counterValues)
    // Kopieren liefert die echte Zahl (keine doppelte Screenreader-Fassung mehr)
    expect(await counterBlockText(page)).toBe(`${counterValues[0]} Theorieabende pro Woche`)
    expect(errors).toEqual([])
  })

  for (const path of allPages) {
    test(`Sprung ans Seitenende lässt nichts unsichtbar ${path}`, async ({ page }) => {
      const errors = watchErrors(page)
      await page.goto(path, { waitUntil: "load" })
      await page.waitForTimeout(300)
      await page.evaluate(() => window.scrollTo(0, document.documentElement.scrollHeight))
      await page.waitForTimeout(1400)
      // Alles oberhalb des aktuellen Bildschirms muss sichtbar sein (scroll-gekoppelte Überblendungen ausgenommen)
      const limit = await page.evaluate(() => scrollY)
      expect(await invisibleContent(page, limit, SCROLL_LINKED)).toEqual([])
      expect(errors).toEqual([])
    })
  }

  test("Reload mitten auf der Seite: sichtbarer Bereich ist sofort da", async ({ page }) => {
    await page.goto("/unterricht.htm", { waitUntil: "load" })
    await page.evaluate(() => window.scrollTo(0, document.documentElement.scrollHeight / 2))
    await page.waitForTimeout(800)
    await page.reload({ waitUntil: "load" })
    await page.waitForTimeout(1400)
    const y = await page.evaluate(() => scrollY)
    const vh = page.viewportSize()!.height
    expect(await invisibleContent(page, y + vh * 0.9)).toEqual([])
  })

  test("Seitenwechsel über die Navigation: Inhalte der neuen Seite erscheinen", async ({ page }) => {
    await page.goto("/", { waitUntil: "load" })
    await page.evaluate(() => window.scrollTo(0, document.documentElement.scrollHeight))
    await page.waitForTimeout(600)
    await page.locator("footer a[href='/preis.htm']").first().click()
    await page.waitForURL("**/preis.htm")
    await page.waitForTimeout(1600)
    expect(await invisibleContent(page, page.viewportSize()!.height)).toEqual([])
    await page.evaluate(() => window.scrollTo(0, document.documentElement.scrollHeight))
    await page.waitForTimeout(1400)
    expect(await invisibleContent(page, await page.evaluate(() => scrollY), SCROLL_LINKED)).toEqual([])
  })

  test("Hero-Foto: sofort sichtbar, hohe Priorität, nicht lazy", async ({ page }) => {
    await page.goto("/")
    const imgs = page.locator("section[aria-label=Willkommen] img")
    expect(await imgs.count()).toBe(2)
    for (const i of [0, 1]) {
      expect(await imgs.nth(i).getAttribute("loading")).not.toBe("lazy")
      expect(await imgs.nth(i).getAttribute("fetchpriority")).toBe("high")
    }
    await expect.poll(() => imgs.first().evaluate((el: HTMLImageElement) => el.complete && el.naturalWidth > 0)).toBe(true)
  })
})

test.describe("Bilder", () => {
  test.use({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2, isMobile: true, hasTouch: true })
  test("Handy lädt keine 2400-px-Originale und nur eine Fassung des Hero-Fotos", async ({ page, browserName }) => {
    test.skip(browserName === "firefox", "isMobile wird in Firefox nicht unterstützt")
    const images: string[] = []
    page.on("request", (r) => r.resourceType() === "image" && images.push(new URL(r.url()).pathname))
    await page.goto("/klassen.htm", { waitUntil: "networkidle" })
    await page.goto("/", { waitUntil: "networkidle" })
    expect(images.filter((p) => /\/stock\/[a-z-]+\.webp$/.test(p))).toEqual([])
    expect(images.filter((p) => p.includes("bubla-golf")).length).toBe(1)
  })
})
