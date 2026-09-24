import { expect, test } from "@playwright/test"
import { allPages, layoutProblems, scrollThrough, watchErrors, widths } from "./helpers"

for (const path of allPages) {
  test(`Layout ${path} auf allen Breiten`, async ({ page }) => {
    const errors = watchErrors(page)
    const problems: string[] = []
    for (const vp of widths) {
      await page.setViewportSize(vp)
      await page.goto(path, { waitUntil: "networkidle" })
      await page.waitForTimeout(400)
      await scrollThrough(page)
      for (const p of await layoutProblems(page)) problems.push(`${vp.width}px: ${p}`)
    }
    expect(problems, problems.join("\n")).toEqual([])
    expect(errors, errors.join("\n")).toEqual([])
  })

  test(`Bewegung reduzieren ${path}`, async ({ browser }) => {
    for (const vp of [widths[0], widths[6]]) {
      const ctx = await browser.newContext({ viewport: vp, reducedMotion: "reduce" })
      const page = await ctx.newPage()
      const errors = watchErrors(page)
      await page.goto(path, { waitUntil: "networkidle" })
      await scrollThrough(page)
      const problems = await layoutProblems(page)
      expect(problems, `${vp.width}px\n${problems.join("\n")}`).toEqual([])
      // Headline muss sichtbar sein (keine hängende Einblend-Animation)
      const h1 = page.locator("h1").first()
      await page.evaluate(() => window.scrollTo(0, 0))
      await expect(h1).toBeVisible()
      expect(await h1.evaluate((el) => Number(getComputedStyle(el.querySelector(".word") ?? el).opacity))).toBeGreaterThan(0.9)
      expect(errors, errors.join("\n")).toEqual([])
      await ctx.close()
    }
  })
}
