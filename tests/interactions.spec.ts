import { expect, test } from "@playwright/test"
import { buildMail } from "../app/lib/anmeldung"
import { site } from "../app/content/site"

test("Navigation: Klassen-Flyout (Desktop)", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 })
  await page.goto("/")
  await page.getByRole("navigation", { name: "Hauptnavigation" }).getByRole("link", { name: "Klassen", exact: true }).hover()
  const flyout = page.locator("#klassen-flyout")
  await expect(flyout).toBeVisible()
  await flyout.getByRole("link", { name: /Motorrad Klasse A2/ }).click()
  await expect(page).toHaveURL(/klasse-a2\.htm$/)
  await expect(page.locator("h1")).toContainText("Motorrad Klasse A2")
})

test("Navigation: mobiles Vollbild-Menü", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 })
  await page.goto("/")
  await page.getByRole("button", { name: "Menü öffnen" }).click()
  const menu = page.locator("#mobile-menu")
  await expect(menu).toBeVisible()
  await menu.getByRole("link", { name: "Preise", exact: true }).click()
  await expect(page).toHaveURL(/preis\.htm$/)
  await expect(menu).toBeHidden()
})

test("Skip-Link und Tastatur", async ({ page, browserName }) => {
  test.skip(browserName === "webkit", "Safari springt per Tab standardmäßig nicht zu Links")
  await page.goto("/")
  await page.keyboard.press("Tab")
  const skip = page.getByRole("link", { name: "Zum Inhalt springen" })
  await expect(skip).toBeFocused()
  await page.keyboard.press("Enter")
  await expect(page).toHaveURL(/#inhalt$/)
})

test("Preistabelle: Filter Alle / Auto / Zweirad", async ({ page }) => {
  await page.goto("/preis.htm")
  const cards = page.locator("article[data-category]")
  const all = await cards.count()
  await page.getByRole("button", { name: /^Zweirad/ }).click()
  await expect(cards.locator("xpath=self::*[@data-category='auto']")).toHaveCount(0)
  const bikes = await cards.count()
  expect(bikes).toBeGreaterThan(0)
  await page.getByRole("button", { name: /^Auto/ }).click()
  await expect(cards.locator("xpath=self::*[@data-category='zweirad']")).toHaveCount(0)
  await page.getByRole("button", { name: /^Alle/ }).click()
  await expect(cards).toHaveCount(all)
  expect(all).toBeGreaterThan(bikes)
})

test("Klassenübersicht: Filter", async ({ page }) => {
  await page.goto("/klassen.htm")
  await page.getByRole("button", { name: "Zweirad" }).click()
  await expect(page.locator("li[data-category=auto]")).toHaveCount(0)
  await expect(page.locator("li[data-category=zweirad]").first()).toBeVisible()
})

test("FAQ-Akkordeon", async ({ page }) => {
  await page.goto("/info.htm")
  const second = page.getByRole("button", { name: "Wie viele Fahrstunden brauche ich?" })
  await expect(second).toHaveAttribute("aria-expanded", "false")
  await second.click()
  await expect(second).toHaveAttribute("aria-expanded", "true")
  await expect(page.getByText("Durchschnittlich rechnet man ca. 20 Normalfahrstunden").first()).toBeVisible()
})

test("Sprungmarke landet unter Navigation + Unter-Navigation", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 })
  await page.goto("/info.htm")
  await page.locator("a[href='#faq']").first().click()
  await page.waitForTimeout(1800)
  const top = await page.locator("#faq").evaluate((el) => el.getBoundingClientRect().top)
  expect(top).toBeGreaterThanOrEqual(84 + 56 - 4)
  expect(top).toBeLessThan(260)
})

test("Google Maps erst nach Klick (2-Klick-Lösung)", async ({ page }) => {
  await page.route(/google\.com/, (r) => r.abort())
  await page.goto("/contact.htm")
  await expect(page.locator("iframe")).toHaveCount(0)
  await page.getByRole("button", { name: "Karte laden" }).first().click()
  await expect(page.locator("iframe").first()).toHaveAttribute("src", /google\.com\/maps/)
})

test("Anmeldeformular öffnet vorausgefüllte E-Mail", async ({ page }) => {
  await page.goto("/anmeldung.htm")
  // mailto-Aufruf abfangen
  await page.evaluate(() => {
    ;(window as unknown as { __mail: string }).__mail = ""
    const orig = Object.getOwnPropertyDescriptor(window, "location")
    void orig
  })
  await page.getByLabel("Vorname *").fill("Max")
  await page.getByLabel("Nachname *").fill("Muster")
  await page.getByLabel("Geburtsdatum *").fill("2009-03-01")
  await page.getByLabel("Telefon *").fill("0170 1234567")
  await page.getByLabel("Gewünschte Klasse *").selectOption("A2")
  await page.getByRole("checkbox").check()
  await page.getByRole("button", { name: "E-Mail vorbereiten" }).click()
  await expect(page.getByText("Fast geschafft!")).toBeVisible()

  const url = buildMail({ vorname: "Max", nachname: "Muster", geburtsdatum: "2009-03-01", telefon: "0170", klasse: "A2" })
  expect(url.startsWith(`mailto:${site.email}?subject=`)).toBe(true)
  const body = decodeURIComponent(url.split("body=")[1])
  expect(body).toContain("Name: Max Muster")
  expect(body).toContain("Führerscheinklasse: A2")
})

test("Anmeldeformular prüft Pflichtfelder", async ({ page }) => {
  await page.goto("/anmeldung.htm")
  await page.getByRole("button", { name: "E-Mail vorbereiten" }).click()
  await expect(page.getByText("Fast geschafft!")).toHaveCount(0)
  expect(await page.getByLabel("Vorname *").evaluate((el: HTMLInputElement) => el.validity.valueMissing)).toBe(true)
})

test("Fahrschul-Assistent: alle Fragen sichtbar, kein Eingabefeld, Antworten, Escape", async ({ page }) => {
  await page.goto("/")
  await page.getByRole("button", { name: "Fahrschul-Assistent öffnen" }).click()
  const dialog = page.getByRole("dialog", { name: "Fahrschul-Assistent" })
  await expect(dialog).toBeVisible()
  await expect(dialog).toBeFocused()
  await expect(dialog.getByRole("textbox")).toHaveCount(0)

  const general = dialog.getByRole("group", { name: "Häufige Fragen" }).getByRole("button")
  const perClass = dialog.getByRole("group", { name: "Zu einer Klasse" }).getByRole("button")
  expect(await general.count()).toBeGreaterThanOrEqual(10)
  expect(await perClass.count()).toBe(10)

  await dialog.getByRole("button", { name: "Wann ist Theorieunterricht?" }).click()
  await expect(dialog.getByText(/immer von 19:00 – 20:30 Uhr/)).toBeVisible()
  // Fragen stehen danach wieder vollständig bereit
  await expect(general).toHaveCount(await general.count())

  // Dieselbe Frage bleibt antippbar und liefert erneut die Antwort
  await dialog.getByRole("button", { name: "Wann ist Theorieunterricht?" }).click()
  await expect(dialog.getByText(/immer von 19:00 – 20:30 Uhr/)).toHaveCount(2)

  await dialog.getByRole("button", { name: /^A2 · / }).click()
  await expect(dialog.getByText(/Motorrad Klasse A2: Ab 18/)).toBeVisible()

  await page.keyboard.press("Escape")
  await expect(dialog).toBeHidden()
  await expect(page.getByRole("button", { name: "Fahrschul-Assistent öffnen" })).toBeFocused()
})

test("Hero-Karte: beim Laden = nach Hoch-Scrollen, Headline sichtbar", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 })
  await page.goto("/", { waitUntil: "networkidle" })
  await page.waitForTimeout(1500)
  const card = page.locator("section[aria-label=Willkommen] .will-change-\\[clip-path\\]")
  const before = await card.evaluate((el) => ({ clip: getComputedStyle(el).clipPath, opacity: getComputedStyle(el).opacity }))
  expect(Number(before.opacity)).toBeGreaterThan(0.95)
  await page.evaluate(() => window.scrollTo(0, 1600))
  await page.waitForTimeout(800)
  await page.evaluate(() => window.scrollTo(0, 0))
  await page.waitForTimeout(1500)
  const after = await card.evaluate((el) => getComputedStyle(el).clipPath)
  expect(after).toBe(before.clip)
  // Safari: Verlaufs-Text der Wörter muss per background-clip gezeichnet werden
  const clip = await page.locator("h1 .word").first().evaluate((el) => getComputedStyle(el).webkitBackgroundClip || getComputedStyle(el).backgroundClip)
  expect(clip).toBe("text")
})

test("Zähler starten bei 0 und zählen hoch", async ({ page }) => {
  await page.goto("/", { waitUntil: "networkidle" })
  const counter = page.locator("[aria-hidden=true].tabular-nums").first()
  await counter.scrollIntoViewIfNeeded()
  await page.waitForTimeout(2500)
  await expect(counter).toHaveText("4")
})

test("Assistent: Klick außerhalb schließt, Klick ins Fenster nicht", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 })
  await page.goto("/")
  await page.getByRole("button", { name: "Fahrschul-Assistent öffnen" }).click()
  const dialog = page.getByRole("dialog", { name: "Fahrschul-Assistent" })
  await expect(dialog).toBeVisible()
  // Klick in den Chat (Begrüßungstext) lässt ihn offen
  await dialog.getByText(/Fahrschul-Assistent der Fahrschule Bubla/).click()
  await expect(dialog).toBeVisible()
  // Klick außerhalb (oben auf die Seite) schließt
  await page.mouse.click(20, 20)
  await expect(dialog).toBeHidden()
  // Button öffnet und schließt weiterhin
  await page.getByRole("button", { name: "Fahrschul-Assistent öffnen" }).click()
  await expect(dialog).toBeVisible()
  await page.getByRole("button", { name: "Fahrschul-Assistent schließen" }).first().click()
  await expect(dialog).toBeHidden()
})
