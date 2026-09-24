import { expect, test } from "@playwright/test"
import { classQuestions, generalQuestions, questionGroups } from "../app/content/assistant"
import { classes } from "../app/content/classes"
import { allPages } from "./helpers"

test("Assistent: jede Frage hat eine vollständige Antwort mit gültigen Links", async ({ browserName }) => {
  test.skip(browserName !== "chromium", "reiner Logiktest")
  const all = questionGroups.flatMap((g) => g.questions)
  expect(new Set(all.map((q) => q.id)).size, "IDs eindeutig").toBe(all.length)
  expect(new Set(all.map((q) => q.label)).size, "Beschriftungen eindeutig").toBe(all.length)
  for (const q of all) {
    const a = q.answer()
    expect(a.text.join(" ").length, q.label).toBeGreaterThan(30)
    for (const l of a.links ?? []) {
      if (l.to.startsWith("/")) expect(allPages, `${q.label} → ${l.to}`).toContain(l.to.split("#")[0])
      else expect(l.to, q.label).toMatch(/^(https:|tel:|mailto:)/)
    }
  }
})

test("Assistent: zu jeder Klasse gibt es eine Frage", async ({ browserName }) => {
  test.skip(browserName !== "chromium", "reiner Logiktest")
  expect(classQuestions.length).toBe(classes.length)
  expect(generalQuestions.length).toBeGreaterThanOrEqual(10)
  for (const c of classes) expect(classQuestions.some((q) => q.label.startsWith(`${c.code} · `)), c.code).toBe(true)
})
