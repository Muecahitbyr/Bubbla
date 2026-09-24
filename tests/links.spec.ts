import { expect, test } from "@playwright/test"
import { allPages } from "./helpers"

test.describe.configure({ mode: "serial" })

test("Alle internen Links, Sprungmarken, Bilder und PDFs funktionieren", async ({ page, request, browserName }) => {
  test.skip(browserName !== "chromium", "einmal reicht")
  const internal = new Set<string>()
  const external = new Set<string>()
  const anchors: { from: string; href: string }[] = []

  for (const path of allPages) {
    await page.goto(path, { waitUntil: "networkidle" })
    const found = await page.evaluate(() => ({
      links: [...document.querySelectorAll("a[href]")].map((a) => a.getAttribute("href")!),
      assets: [...document.querySelectorAll("img[src], link[rel=icon], link[rel=apple-touch-icon], link[rel=preload]")].map(
        (el) => el.getAttribute("src") ?? el.getAttribute("href")!,
      ),
    }))
    for (const href of [...found.links, ...found.assets]) {
      if (href.startsWith("http")) external.add(href)
      else if (href.startsWith("#")) anchors.push({ from: path, href })
      else if (href.startsWith("/")) {
        const [p, hash] = href.split("#")
        internal.add(p)
        if (hash) anchors.push({ from: p, href: `#${hash}` })
      }
    }
  }

  for (const p of internal) {
    const res = await request.get(p)
    expect(res.status(), `interner Link ${p}`).toBe(200)
    if (p.endsWith(".pdf")) expect(res.headers()["content-type"]).toContain("pdf")
  }

  for (const a of anchors) {
    await page.goto(a.from)
    expect(await page.locator(a.href).count(), `Sprungmarke ${a.href} auf ${a.from}`).toBeGreaterThan(0)
  }

  const broken: string[] = []
  for (const url of external) {
    try {
      const res = await request.get(url, { timeout: 20_000, maxRedirects: 5 })
      if (res.status() >= 400) broken.push(`${res.status()} ${url}`)
    } catch (e) {
      broken.push(`Fehler ${url}: ${(e as Error).message.split("\n")[0]}`)
    }
  }
  expect(broken, broken.join("\n")).toEqual([])
})

test("Sitemap, robots.txt, .htaccess und 404", async ({ request, page, browserName }) => {
  test.skip(browserName !== "chromium", "einmal reicht")
  const sitemap = await (await request.get("/sitemap.xml")).text()
  const locs = [...sitemap.matchAll(/<loc>https:\/\/fahrschule-bubla\.de([^<]*)<\/loc>/g)].map((m) => m[1])
  expect(locs.length).toBe(allPages.length)
  for (const l of locs) expect((await request.get(l)).status(), l).toBe(200)
  expect(await (await request.get("/robots.txt")).text()).toContain("Sitemap: https://fahrschule-bubla.de/sitemap.xml")
  expect((await request.get("/.htaccess")).status()).toBe(200)

  const res = await page.goto("/gibt-es-nicht.htm")
  expect(res?.status()).toBe(404)
  await expect(page.getByRole("heading", { name: "Falsch abgebogen." })).toBeVisible()
})

test("SEO: Titel, Beschreibung, Canonical und JSON-LD auf jeder Seite", async ({ page, browserName }) => {
  test.skip(browserName !== "chromium", "einmal reicht")
  const titles = new Set<string>()
  for (const path of allPages) {
    await page.goto(path)
    const title = await page.title()
    expect(title.length, path).toBeGreaterThan(10)
    titles.add(title)
    expect(await page.locator('meta[name="description"]').getAttribute("content"), path).toBeTruthy()
    expect(await page.locator('link[rel="canonical"]').getAttribute("href")).toBe(`https://fahrschule-bubla.de${path}`)
    expect(await page.locator('meta[property="og:image"]').getAttribute("content")).toContain("/og-image.jpg")
    const ld = await page.locator('script[type="application/ld+json"]').allTextContents()
    expect(ld.some((t) => t.includes('"DrivingSchool"')), path).toBe(true)
  }
  expect(titles.size, "jede Seite hat einen eigenen Titel").toBeGreaterThanOrEqual(allPages.length - 1)
  await page.goto("/info.htm")
  expect((await page.locator('script[type="application/ld+json"]').allTextContents()).join()).toContain('"FAQPage"')
})
