/**
 * Fahrschul-Assistent: regelbasiert, ohne externe Dienste. Er antwortet NUR mit Angaben
 * aus den Inhaltsdateien (site.ts, classes.ts, info.ts, team.ts). Ändert sich dort etwas,
 * ändern sich die Antworten automatisch mit.
 *
 * Neue Frage ergänzen: einen Eintrag in `intents` anlegen – `keywords` sind Wortteile
 * (klein, ohne Umlaute: „ae“ statt „ä“), `answer` baut die Antwort aus den Inhalten.
 */

import { categoryLabels, classB, classBF17, classes, mainFee, priceLabel, specialDriveTotal, type LicenseClass } from "./classes"
import { bf17, steps } from "./info"
import { paths, site } from "./site"
import { team } from "./team"

export type AssistantLink = { label: string; to: string }
export type AssistantAnswer = { text: string[]; links?: AssistantLink[] }
export type Intent = { id: string; keywords: string[]; answer: () => AssistantAnswer }

const mockNote = site.mock.enabled ? " (Beispielwerte – bitte bei uns nachfragen)" : ""
const contactLine = `Telefon ${site.phone.display}, mobil ${site.mobile.display} oder per E-Mail an ${site.email}.`
const theoryPlace = `${site.theoryLocation.street}, ${site.theoryLocation.zip} ${site.theoryLocation.city} (${site.theoryLocation.district})`

export const greeting: AssistantAnswer = {
  text: [
    "Hallo! Ich bin der Fahrschul-Assistent der Fahrschule Bubla. 👋",
    "Ich beantworte Fragen zu Theoriezeiten, Preisen, Anmeldung, Unterlagen, Alter und Anfahrt – mit den Angaben von dieser Website. Tippe eine Frage an oder schreib einfach los.",
  ],
}

/** Vorgefertigte Fragen zum Antippen */
export const suggestions: { label: string; intent: string }[] = [
  { label: "Wann ist Theorieunterricht?", intent: "zeiten" },
  { label: "Was kostet der Führerschein?", intent: "preise" },
  { label: "Wie melde ich mich an?", intent: "anmeldung" },
  { label: "Welche Unterlagen brauche ich?", intent: "unterlagen" },
  { label: "Ab welchem Alter?", intent: "alter" },
  { label: "Wo finde ich euch?", intent: "anfahrt" },
]

export const intents: Intent[] = [
  {
    id: "zeiten",
    keywords: ["wann", "uhr", "uhrzeit", "zeiten", "theorieunterricht", "unterricht", "theorie", "montag", "dienstag", "mittwoch", "donnerstag", "abend", "termin", "oeffnungs", "geoeffnet"],
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
    keywords: ["preis", "kost", "euro", "€", "teuer", "guenstig", "gebuehr", "bezahl", "grundbetrag", "grundpreis", "rate"],
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
    keywords: ["anmeld", "melde", "registrier", "starten", "beginnen", "anfangen", "einschreib", "vertrag", "platz frei"],
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
    keywords: ["unterlage", "dokument", "sehtest", "erste hilfe", "erste-hilfe", "passbild", "foto", "antrag", "fuehrerscheinstelle", "ausweis", "mitbringen", "brauche ich"],
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
    keywords: ["alter", "alt", "jahre", "16", "17", "18", "minderjaehrig", "mindestalter", "ab wann", "welchem alter", "wie alt"],
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
    keywords: ["wo", "adresse", "anfahrt", "standort", "finde", "karte", "huetten", "neugablonz", "strasse", "parken", "buero"],
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
    keywords: ["fahrstunde", "stunden", "sonderfahrt", "autobahn", "ueberland", "nacht", "dunkel", "pflicht", "wie viele", "wieviel", "praxis"],
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
    keywords: ["pruefung", "tuev", "durchfall", "bestehen", "bestanden", "praktisch", "theoretisch", "theoriepruefung"],
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
    keywords: ["lern", "app", "online", "ueben", "plattform", "fahrschulcard", "zuhause"],
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
    keywords: ["klasse", "klassen", "fuehrerscheinklasse", "fuehrerscheinklassen", "angebot", "welche"],
    answer: () => ({
      text: [
        "Diese Führerscheinklassen findest du bei uns" + (site.mock.enabled ? " (außer B/B17 derzeit Beispielinhalte)" : "") + ":",
        ...(["auto", "zweirad"] as const).map((cat) => `• ${categoryLabels[cat]}: ` + classes.filter((c) => c.category === cat).map((c) => c.code).join(", ")),
        "Frag mich einfach nach einer Klasse, z. B. „Was kostet A2?“",
      ],
      links: [{ label: "Alle Klassen", to: paths.klassen }],
    }),
  },
  {
    id: "team",
    keywords: ["fahrlehrer", "team", "inhaber", "chef", "bubla", "vetter", "wer"],
    answer: () => ({
      text: ["Dein Team: " + team.map((m) => `${m.name} (${m.role}${m.since ? `, ${m.since.toLowerCase()}` : ""})`).join(" und ") + "."],
      links: [{ label: "Zum Team", to: paths.team }],
    }),
  },
  {
    id: "kontakt",
    keywords: ["telefon", "anruf", "nummer", "handy", "mail", "erreich", "kontakt", "fax", "whatsapp", "schreiben", "sprechen"],
    answer: () => ({
      text: [`So erreichst du uns: ${contactLine}`, `Fax: ${site.fax}.`],
      links: [
        { label: `Anrufen: ${site.phone.display}`, to: site.phone.href },
        { label: "E-Mail schreiben", to: `mailto:${site.email}` },
      ],
    }),
  },
  {
    id: "hallo",
    keywords: ["hallo", "hi", "hey", "servus", "moin", "gruess", "guten tag", "guten abend"],
    answer: () => ({ text: ["Hallo! Wobei kann ich dir helfen? Frag mich z. B. nach Theoriezeiten, Preisen oder der Anmeldung."] }),
  },
  {
    id: "danke",
    keywords: ["danke", "dankeschoen", "super", "perfekt", "cool", "top"],
    answer: () => ({ text: ["Gern geschehen! Viel Spaß auf dem Weg zum Führerschein – Mit Spaß zum Erfolg! 🚗"] }),
  },
]

/** Eine Antwort je Führerscheinklasse – automatisch aus classes.ts */
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
intents.push(...classes.map((c) => ({ id: `klasse-${c.slug}`, keywords: c.keywords, answer: () => classAnswer(c) })))

/** Ehrliche Rückfallantwort, wenn keine passende Information in den Inhalten steht */
export const fallback = (): AssistantAnswer => ({
  text: [
    "Dazu habe ich auf unserer Website leider keine Angabe – und ich möchte dir nichts Falsches sagen.",
    "Am besten fragst du uns direkt: " + contactLine,
  ],
  links: [
    { label: `Anrufen: ${site.phone.display}`, to: site.phone.href },
    { label: "E-Mail schreiben", to: `mailto:${site.email}` },
  ],
})

/** Text vereinheitlichen: klein, Umlaute ausgeschrieben, Satzzeichen als Leerzeichen */
export function normalize(input: string) {
  return (
    " " +
    input
      .toLowerCase()
      .replace(/ä/g, "ae")
      .replace(/ö/g, "oe")
      .replace(/ü/g, "ue")
      .replace(/ß/g, "ss")
      .replace(/€/g, " € ")
      .replace(/[.,!?;:()"'„“]/g, " ")
      .replace(/\s+/g, " ")
      .trim() +
    " "
  )
}

/**
 * Findet die passende Antwort. Jedes Wort zählt für das spezifischste (längste) passende
 * Stichwort; kurze Stichwörter (unter 4 Zeichen) müssen als ganzes Wort vorkommen.
 * Die Absicht mit den meisten Punkten gewinnt.
 */
export function answerFor(input: string): { intent: string | null; answer: AssistantAnswer } {
  const text = normalize(input)
  const words = text.trim().split(" ").filter(Boolean)
  const scores = new Map<string, number>()
  const add = (id: string, n: number) => scores.set(id, (scores.get(id) ?? 0) + n)

  // Genannte Klassenkürzel („A2“, „BE“ …) haben Vorrang – außer „am“ (auch Präposition)
  const codes = new Map(classes.filter((c) => c.code !== "AM").map((c) => [c.code.toLowerCase(), `klasse-${c.slug}`]))
  for (const word of words) if (codes.has(word)) add(codes.get(word)!, 12)

  for (const word of words) {
    let best: { id: string; len: number } | null = null
    for (const intent of intents) {
      for (const k of intent.keywords) {
        if (k.includes(" ")) continue
        const hit = k.length < 4 ? word === k : word.includes(k)
        if (hit && (!best || k.length > best.len)) best = { id: intent.id, len: k.length }
      }
    }
    if (best) add(best.id, best.len)
  }
  // Mehrwort-Stichwörter („erste hilfe“, „wie viele“) über den ganzen Text
  for (const intent of intents) {
    for (const k of intent.keywords) if (k.includes(" ") && text.includes(` ${k} `)) add(intent.id, k.length)
  }

  let winner: string | null = null
  for (const [id, score] of scores) if (!winner || score > scores.get(winner)!) winner = id
  if (!winner) return { intent: null, answer: fallback() }
  return { intent: winner, answer: answerForIntent(winner) }
}

export function answerForIntent(id: string): AssistantAnswer {
  return intents.find((i) => i.id === id)?.answer() ?? fallback()
}
