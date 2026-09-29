import { expect, test } from "@playwright/test"
import { allPages } from "./helpers"

/** Markenregel: Das einzige Blau der Website ist Bubla-Blau #005BA4 (Schrift, Flächen, Rahmen, Verläufe, Schatten, SVG). */
test("Nur ein Blau: #005BA4", async ({ page, browserName }) => {
  test.skip(browserName !== "chromium", "einmal reicht")
  const found = new Set<string>()
  for (const path of allPages) {
    await page.goto(path, { waitUntil: "networkidle" })
    if (path === "/") {
      await page.getByRole("button", { name: "Fahrschul-Assistent öffnen" }).click()
      await page.waitForTimeout(500)
    }
    const res = await page.evaluate(() => {
      const out: string[] = []
      const isBlue = (r: number, g: number, b: number) => {
        const mx = Math.max(r, g, b), mn = Math.min(r, g, b), d = mx - mn
        if (d < 18 || b <= r) return false
        let h = mx === r ? ((g - b) / d) % 6 : mx === g ? (b - r) / d + 2 : (r - g) / d + 4
        h = (h * 60 + 360) % 360
        return h >= 185 && h <= 255
      }
      for (const el of document.querySelectorAll("body *")) {
        const cs = getComputedStyle(el)
        if (cs.display === "none" || cs.visibility === "hidden") continue
        const props = ["color", "backgroundColor", "backgroundImage", "boxShadow", ...(cs.borderTopWidth !== "0px" ? ["borderTopColor"] : []), ...(el instanceof SVGElement ? ["fill", "stroke"] : [])]
        for (const prop of props) {
          for (const m of (cs[prop as keyof CSSStyleDeclaration] as string).matchAll(/rgba?\(([\d.]+),? ([\d.]+),? ([\d.]+)(?:,? \/? ?([\d.]+))?\)/g)) {
            const [r, g, b, a] = [+m[1], +m[2], +m[3], m[4] === undefined ? 1 : +m[4]]
            if (a >= 0.05 && isBlue(r, g, b) && !(r === 0 && g === 91 && b === 164)) out.push(`${prop} rgb(${r},${g},${b}) an ${el.tagName.toLowerCase()}.${String((el as HTMLElement).className).split(" ")[0]}`)
          }
        }
      }
      return out
    })
    for (const r of res) found.add(`${path}: ${r}`)
  }
  expect([...found]).toEqual([])
})
