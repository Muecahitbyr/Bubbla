import { expect, test } from "@playwright/test"
import { answerFor } from "../app/content/assistant"

const cases: [string, string | null][] = [
  ["Wann ist Theorieunterricht?", "zeiten"],
  ["Was kostet der Führerschein?", "preise"],
  ["Wie melde ich mich an?", "anmeldung"],
  ["Welche Unterlagen brauche ich?", "unterlagen"],
  ["Ab welchem Alter kann ich anfangen?", "alter"],
  ["Wo finde ich euch?", "anfahrt"],
  ["Wie viele Fahrstunden brauche ich?", "fahrstunden"],
  ["Wann ist die Theorieprüfung?", "pruefung"],
  ["Gibt es eine Lern-App?", "lernen"],
  ["Was kostet der Motorradführerschein?", "klasse-a"],
  ["Ich will Roller fahren", "klasse-am"],
  ["Anhänger fahren mit Wohnwagen", "klasse-be"],
  ["Automatik Führerschein", "klasse-b197"],
  ["Begleitetes Fahren mit 17", "klasse-bf17"],
  ["Wer sind die Fahrlehrer?", "team"],
  ["Telefonnummer?", "kontakt"],
  ["Am Montag Zeit?", "zeiten"],
  ["Welche Klassen gibt es?", "klassen"],
  ["Hallo", "hallo"],
  ["Was kostet der A2 Führerschein?", "klasse-a2"],
  ["Was kostet Klasse BE?", "klasse-be"],
  ["Brauche ich für B196 eine Prüfung?", "klasse-b196"],
  ["Wie wird das Wetter?", null],
]

for (const [q, intent] of cases) {
  test(`Assistent erkennt: ${q}`, async ({ browserName }) => {
    test.skip(browserName !== "chromium", "reiner Logiktest")
    const r = answerFor(q)
    expect(r.intent).toBe(intent)
    expect(r.answer.text.join(" ").length).toBeGreaterThan(20)
  })
}
