/**
 * Fahrschul-Assistent: vorgefertigte Fragen zum Antippen – kein Freitext, keine KI,
 * keine externen Dienste. Jede Antwort wird aus den Inhaltsdateien (site.ts, classes.ts,
 * info.ts, team.ts) zusammengesetzt; ändert sich dort etwas, ändern sich die Antworten mit.
 *
 * Neue Frage ergänzen: einen Eintrag in `generalQuestions` anlegen (label + answer).
 * Fragen zu den Klassen entstehen automatisch aus classes.ts.
 */

import { categoryLabels, classB, classBF17, classes, mainFee, priceLabel, specialDriveTotal, type LicenseClass } from "./classes"
import { bf17, steps } from "./info"
import { paths, site } from "./site"
import { team } from "./team"

export type AssistantLink = { label: string; to: string }
export type AssistantAnswer = { text: string[]; links?: AssistantLink[] }
export type Question = { id: string; label: string; answer: () => AssistantAnswer }

const mockNote = site.mock.enabled ? " (Beispielwerte – bitte bei uns nachfragen)" : ""
const contactLine = `Telefon ${site.phone.display}, mobil ${site.mobile.display} oder per E-Mail an ${site.email}.`
const theoryPlace = `${site.theoryLocation.street}, ${site.theoryLocation.zip} ${site.theoryLocation.city} (${site.theoryLocation.district})`

export const greeting: AssistantAnswer = {
  text: [
    "Hallo! Ich bin der Fahrschul-Assistent der Fahrschule Bubla. 👋",
    "Tippe einfach eine Frage an – ich antworte mit den Angaben von dieser Website.",
  ],
}

/** Häufige Fragen (erste Gruppe im Chat) */
export const generalQuestions: Question[] = [
  {
    id: "zeiten",
    label: "Wann ist Theorieunterricht?",
    answer: () => ({
      text: [
        `Theorieunterricht ist ${site.hours.theoryDays.join(", ").replace(/, (?=[^,]*$)/, " und ")} – immer von ${site.hours.theoryTime}.`,
        `Ort: ${theoryPlace}.`,
        "Bürozeiten: " + site.officeHours.map((h) => `${h.days} ${h.time}`).join(", ") + mockNote + ".",
        "Telefonisch erreichst du uns jederzeit: " + contactLine,
      ],
      links: [{ label: "Zum Theorieunterricht", to: paths.unterricht }],
    }),
  },
  {
    id: "preise",
    label: "Was kostet der Führerschein?",
    answer: () => ({
      text: [
        `Für den Autoführerschein Klasse B${mockNote}:`,
        ...classB.fees.map((f) => `• ${f.label}: ${priceLabel(f)}${f.unit ? ` (${f.unit})` : ""}`),
        `Dazu kommen ca. ${classB.averageLessons} Normalfahrstunden im Durchschnitt – je nach deinen Voraussetzungen. Andere Klassen findest du auf der Preisseite.`,
      ],
      links: [{ label: "Zur Preisübersicht", to: paths.preise }],
    }),
  },
  {
    id: "anmeldung",
    label: "Wie melde ich mich an?",
    answer: () => ({
      text: [
        "Anmelden kannst du dich ganz einfach:",
        "• über das Anmeldeformular auf dieser Website (es öffnet eine vorausgefüllte E-Mail),",
        `• telefonisch unter ${site.phone.display} oder mobil ${site.mobile.display},`,
        `• oder du kommst zum Theorieunterricht (${site.hours.theoryDaysShort}, ${site.hours.theoryTime}) vorbei.`,
      ],
      links: [
        { label: "Zur Anmeldung", to: paths.anmeldung },
        { label: "Ablauf ansehen", to: paths.info },
      ],
    }),
  },
  {
    id: "unterlagen",
    label: "Welche Unterlagen brauche ich?",
    answer: () => {
      const step = steps.find((s) => s.title.startsWith("Unterlagen"))!
      return {
        text: [
          "Für den Antrag bei der Führerscheinstelle brauchst du in der Regel:",
          ...(step.list ?? []).map((i) => `• ${i}`),
          step.highlight ?? "",
        ].filter(Boolean),
        links: [{ label: "Ablauf Schritt für Schritt", to: paths.info }],
      }
    },
  },
  {
    id: "alter",
    label: "Ab welchem Alter geht's los?",
    answer: () => ({
      text: [
        `Klasse B: ab ${classB.minAge[0].value} Jahren.`,
        `Begleitetes Fahren: Ausbildung ab ${classBF17.minAge[0].value} Jahren, fahren in Begleitung ab ${classBF17.minAge[1].value}.`,
        "Deine Begleitperson muss: " + bf17.companion.map((c) => c.charAt(0).toLowerCase() + c.slice(1)).join(", ") + ".",
      ],
      links: [{ label: "Begleitetes Fahren ab 17", to: paths.bf17 }],
    }),
  },
  {
    id: "anfahrt",
    label: "Wo finde ich euch?",
    answer: () => ({
      text: [
        `Theorieunterricht: ${theoryPlace}.`,
        `Postanschrift / Büro: ${site.address.street}, ${site.address.zip} ${site.address.city}.`,
      ],
      links: [
        { label: "Kontakt & Karte", to: paths.kontakt },
        { label: "Route planen (Google Maps)", to: site.maps.theoryLink },
      ],
    }),
  },
  {
    id: "fahrstunden",
    label: "Wie viele Fahrstunden brauche ich?",
    answer: () => {
      const s = classB.specialDrives!
      return {
        text: [
          `Durchschnittlich rechnet man ca. ${classB.averageLessons} Normalfahrstunden – die Anzahl hängt von deinen persönlichen Voraussetzungen ab.`,
          `Dazu kommen ${specialDriveTotal(s)} Pflichtstunden als Sonderfahrten: ${s.autobahn} Autobahn-, ${s.ueberland} Überland- und ${s.dunkelheit} Fahrten bei Dunkelheit.`,
          "Unser Versprechen: Keine Fahrstunde zu viel.",
        ],
        links: [{ label: "Klasse B im Detail", to: paths.klasseB }],
      }
    },
  },
  {
    id: "pruefung",
    label: "Wie läuft die Prüfung ab?",
    answer: () => {
      const step = steps.find((s) => s.title.startsWith("Prüfung"))!
      return {
        text: [...(step.paragraphs ?? []), step.highlight ?? ""].filter(Boolean),
        links: [{ label: "Ablauf ansehen", to: paths.info }],
      }
    },
  },
  {
    id: "lernen",
    label: "Wie lerne ich für die Theorie?",
    answer: () => ({
      text: [
        `Neben dem Unterricht übst du online auf unserer Lernplattform (${site.learningPlatform.name}). So gibt es bei der Prüfung kein Nervenflattern, denn du kennst bereits alle Fragen.`,
      ],
      links: [
        { label: "Zur Lernplattform", to: site.learningPlatform.url },
        { label: "Theorieunterricht", to: paths.unterricht },
      ],
    }),
  },
  {
    id: "klassen",
    label: "Welche Klassen gibt es?",
    answer: () => ({
      text: [
        "Diese Führerscheinklassen findest du bei uns" + (site.mock.enabled ? " (außer B/B17 derzeit Beispielinhalte)" : "") + ":",
        ...(["auto", "zweirad"] as const).map((cat) => `• ${categoryLabels[cat]}: ` + classes.filter((c) => c.category === cat).map((c) => c.code).join(", ")),
        "Tippe unten auf eine Klasse für Details und Preise.",
      ],
      links: [{ label: "Alle Klassen", to: paths.klassen }],
    }),
  },
  {
    id: "team",
    label: "Wer sind die Fahrlehrer?",
    answer: () => ({
      text: ["Dein Team: " + team.map((m) => `${m.name} (${m.role}${m.since ? `, ${m.since.toLowerCase()}` : ""})`).join(" und ") + "."],
      links: [{ label: "Zum Team", to: paths.team }],
    }),
  },
  {
    id: "kontakt",
    label: "Wie erreiche ich euch?",
    answer: () => ({
      text: [`So erreichst du uns: ${contactLine}`],
      links: [
        { label: `Anrufen: ${site.phone.display}`, to: site.phone.href },
        { label: "E-Mail schreiben", to: `mailto:${site.email}` },
      ],
    }),
  },
]

/** Antwort zu einer Führerscheinklasse – automatisch aus classes.ts */
const classAnswer = (c: LicenseClass): AssistantAnswer => {
  const main = mainFee(c)
  return {
    text: [
      `${c.name.includes(c.code) ? c.name : `${c.name} (${c.code})`}: ${c.summary}`,
      "Mindestalter: " + c.minAge.map((a) => `${a.value} ${a.label}`).join(" bzw. ") + ".",
      ...(c.requirements ? ["Voraussetzung: " + c.requirements.join(", ") + "."] : []),
      ...(main ? [`${main.label}: ${priceLabel(main)}${mockNote}.`] : []),
    ],
    links: [
      { label: `Mehr zu ${c.code}`, to: c.path },
      { label: "Anmelden", to: paths.anmeldung },
    ],
  }
}

/** Fragen zu den einzelnen Klassen (zweite Gruppe im Chat) */
export const classQuestions: Question[] = classes.map((c) => ({
  id: `klasse-${c.slug}`,
  label: `${c.code} · ${c.code === "B17" ? "Begleitet ab 17" : c.name.replace(c.code, "").replace(/\bKlasse\b/, "").replace(/\s{2,}/g, " ").trim()}`,
  answer: () => classAnswer(c),
}))

export const questionGroups: { title: string; questions: Question[] }[] = [
  { title: "Häufige Fragen", questions: generalQuestions },
  { title: "Zu einer Klasse", questions: classQuestions },
]
