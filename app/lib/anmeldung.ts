import { site } from "~/content/site"

export const DOWNLOAD_PDF = "/downloads/Anmeldeformular-Fahrschule-Bubla.pdf"

/** Baut den Text der vorausgefüllten E-Mail */
export function buildMail(data: Record<string, string>) {
  const lines = [
    "Hallo Fahrschule Bubla,",
    "",
    "ich möchte mich zur Fahrausbildung anmelden:",
    "",
    `Name: ${data.vorname} ${data.nachname}`,
    `Geburtsdatum: ${data.geburtsdatum || "–"}`,
    `Anschrift: ${data.strasse || "–"}, ${data.ort || "–"}`,
    `Telefon: ${data.telefon || "–"}`,
    `E-Mail: ${data.email || "–"}`,
    `Führerscheinklasse: ${data.klasse}`,
    `Vorhandene Führerscheinklassen: ${data.vorbesitz || "keine"}`,
    `Gewünschter Start: ${data.start || "so bald wie möglich"}`,
    "",
    data.nachricht ? `Nachricht: ${data.nachricht}` : "",
    "",
    "Viele Grüße",
    `${data.vorname} ${data.nachname}`,
  ]
  const subject = `Anmeldung Klasse ${data.klasse} – ${data.vorname} ${data.nachname}`
  return `mailto:${site.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(lines.filter((l, i, a) => !(l === "" && a[i - 1] === "")).join("\n"))}`
}
