/**
 * Texte der Website. Absätze mit „Quelle: alte Seite“ stammen wörtlich (nur Tippfehler
 * korrigiert) von fahrschule-bubla.de. Ablauf, FAQ und B17-Details sind neu formuliert
 * und beruhen auf den allgemeinen Regeln der Fahrerlaubnis-Verordnung – bitte vor dem
 * Livegang von der Fahrschule bestätigen lassen.
 */

import { classB, formatEuro, mainFee } from "./classes"
import { site } from "./site"

/** Quelle: alte Startseite */
export const about =
  "Bei Fahrschule Bubla aus Kaufbeuren wird Spaß und Fairness optimal mit Erfahrung und Kompetenz verbunden."

/** Quelle: alte Startseite (drei Säulen „Modern – Qualität – Support“) */
export const pillars = [
  {
    title: "Modern",
    text: "Moderner Theorieunterricht 4x die Woche. Mit Spaß zum Erfolg!",
  },
  {
    title: "Qualität",
    text: "Deine optimale Prüfungsvorbereitung: erfahrene Fahrlehrer und zusätzlich unsere Online-Lernplattform.",
  },
  {
    title: "Support",
    text: `Jederzeit für dich erreichbar. Einfach ${site.mobile.display} oder ${site.phone.display} wählen!`,
  },
]

/** Quelle: alte Seite „Unterricht“ */
export const theoryText = [
  "Trockener Theorieunterricht? Trocken ist bei uns höchstens dein Sitzplatz in einer unserer zwei Theorieräume. Bequeme Bestuhlung und modernste Technik sorgen dafür, dass der Unterricht so angenehm wie möglich ist.",
  "Damit Du den Führerschein möglichst schnell bekommst, bietet unsere Fahrschule mehrmals pro Woche theoretischen Unterricht an. Auch für die Fahrstunden versuchen wir so flexibel wie möglich auf Deine Wünsche einzugehen.",
  "Für Deine optimale Prüfungs-Vorbereitung sorgen zum einen natürlich die Fahrlehrer. Zusätzlich kannst Du auch online auf unserer Lernplattform üben. So gibt es bei der Prüfung kein Nervenflattern, denn Du kennst bereits alle Fragen.",
]

/** Quelle: alte Seite „Preis“ */
export const priceText = [
  "Unsere Fahrschule verspricht Dir: Keine Fahrstunde zu viel. Das bedeutet natürlich auch: keine Gebühr zu viel. Denn je weniger Fahrstunden Du brauchst, desto günstiger wird Dein Führerschein – logisch. Aber leider nicht überall selbstverständlich.",
  "Durch gute Planung und Kompetenz ermöglicht Dir unsere Fahrschule einen preiswerten Weg zum Führerschein.",
  "Was Du letztendlich für den Führerschein bezahlen musst, setzt sich aus verschiedenen Posten zusammen:",
]

/** Quelle: alte Seite „Team“ */
export const teamText =
  "Kompetenz, Leidenschaft und Qualität zeichnen unser Team aus. Wenn Du von diesen Eigenschaften profitieren willst und wir mit dieser Seite Dein Interesse wecken konnten, freuen wir uns auf Deinen Besuch und die Fahrschulausbildung mit Dir."

export type Step = {
  number: string
  title: string
  paragraphs?: string[]
  list?: string[]
  highlight?: string
}

/** Ablauf bis zum Führerschein (neu formuliert, allgemeine Regeln) */
export const steps: Step[] = [
  {
    number: "01",
    title: "Anmelden",
    paragraphs: [
      "Ruf uns an, schreib uns eine E-Mail oder nutze das Anmeldeformular auf dieser Website. Wir besprechen gemeinsam, wann du starten möchtest und welche Unterlagen du brauchst.",
    ],
    highlight: "Mit dem Begleiteten Fahren kannst du schon mit 16½ Jahren mit der Ausbildung beginnen.",
  },
  {
    number: "02",
    title: "Unterlagen & Antrag",
    paragraphs: ["Für den Antrag auf die Fahrerlaubnis bei der Führerscheinstelle brauchst du in der Regel:"],
    list: [
      "Sehtest (z. B. beim Optiker)",
      "Nachweis über einen Erste-Hilfe-Kurs",
      "Ein aktuelles biometrisches Passbild",
      "Personalausweis oder Reisepass",
    ],
    highlight: "Stell den Antrag frühzeitig – die Bearbeitung dauert oft mehrere Wochen.",
  },
  {
    number: "03",
    title: "Theorie",
    paragraphs: [
      "Theorieunterricht gibt es von Montag bis Donnerstag, immer von 19:00 bis 20:30 Uhr. Für Klasse B besuchst du 12 Doppelstunden Grundstoff und 2 Doppelstunden Zusatzstoff.",
      "Zusätzlich übst du online auf unserer Lernplattform – so kennst du bei der Prüfung bereits alle Fragen.",
    ],
  },
  {
    number: "04",
    title: "Fahrstunden",
    paragraphs: [
      "Durchschnittlich rechnet man ca. 20 Normalfahrstunden – die Anzahl hängt von deinen persönlichen Voraussetzungen ab. Dazu kommen 12 Pflichtstunden als Sonderfahrten:",
    ],
    list: ["5 Überlandfahrten", "4 Autobahnfahrten", "3 Fahrten bei Dunkelheit"],
  },
  {
    number: "05",
    title: "Prüfungen",
    paragraphs: [
      "Die theoretische Prüfung legst du am Computer ab, frühestens drei Monate vor deinem Mindestalter. Die praktische Prüfung folgt frühestens einen Monat vor dem Mindestalter – wir stellen dich vor, wenn du sicher bist.",
    ],
    highlight: "Bestanden? Dann bekommst du deinen Führerschein direkt nach der praktischen Prüfung.",
  },
]

/** Begleitetes Fahren ab 17 (neu formuliert, allgemeine Regeln) */
export const bf17 = {
  intro:
    "Mit dem Begleiteten Fahren sammelst du schon ab 17 Fahrpraxis – mit einer erfahrenen Begleitperson auf dem Beifahrersitz. Die Ausbildung ist dieselbe wie für Klasse B.",
  timeline: [
    { age: "16½ Jahre", title: "Ausbildung starten", text: "Anmeldung in der Fahrschule und Antrag bei der Führerscheinstelle." },
    { age: "16¾ Jahre", title: "Theorieprüfung", text: "Frühestens drei Monate vor dem 17. Geburtstag." },
    { age: "16 Jahre, 11 Monate", title: "Praktische Prüfung", text: "Frühestens einen Monat vor dem 17. Geburtstag." },
    { age: "17 Jahre", title: "Begleitet fahren", text: "Mit der Prüfungsbescheinigung und einer eingetragenen Begleitperson." },
    { age: "18 Jahre", title: "Allein fahren", text: "Prüfungsbescheinigung gegen den Kartenführerschein tauschen." },
  ],
  companion: [
    "Mindestens 30 Jahre alt",
    "Seit mindestens 5 Jahren im Besitz der Klasse B",
    "Höchstens 1 Punkt im Fahreignungsregister",
    "Namentlich in der Prüfungsbescheinigung eingetragen",
  ],
}

export type FaqItem = { q: string; a: string }

export const faq: FaqItem[] = [
  {
    q: "Wann und wo findet der Theorieunterricht statt?",
    a: "Montag bis Donnerstag, immer von 19:00 bis 20:30 Uhr in der Hüttenstraße 9, 87600 Kaufbeuren (Neugablonz).",
  },
  {
    q: "Wie viele Fahrstunden brauche ich?",
    a: "Durchschnittlich rechnet man ca. 20 Normalfahrstunden. Die Anzahl hängt von Deinen persönlichen Voraussetzungen ab. Dazu kommen 12 Pflichtstunden: 4 Autobahn-, 5 Überland- und 3 Fahrten bei Dunkelheit.",
  },
  {
    q: "Was kostet der Führerschein?",
    a: `Der Preis setzt sich zusammen aus Grundpreis (theoretischer Unterricht und Anmeldegebühr), Normalfahrstunden, Sonderfahrten, Vorstellung zur Prüfung, Lehrmaterial und Fremdgebühren (TÜV, Sehtest etc.). Für Klasse B beträgt der Grundpreis ${formatEuro(mainFee(classB)?.price ?? 0)}, eine Fahrstunde kostet ${formatEuro(classB.fees.find((f) => f.id === "fahrstunde")?.price ?? 0)}. Alle Posten findest du auf der Preisseite.`,
  },
  {
    q: "Welche Unterlagen brauche ich für die Anmeldung?",
    a: "In der Regel einen Sehtest, einen Nachweis über einen Erste-Hilfe-Kurs, ein biometrisches Passbild und deinen Personalausweis oder Reisepass. Damit stellst du den Antrag bei der Führerscheinstelle.",
  },
  {
    q: "Ab welchem Alter kann ich anfangen?",
    a: "Mit dem Begleiteten Fahren ab 17 kannst du mit 16½ Jahren mit der Ausbildung beginnen. Ohne Begleitung liegt das Mindestalter für Klasse B bei 18 Jahren.",
  },
  {
    q: "Wie bereite ich mich auf die Theorieprüfung vor?",
    a: "Neben dem Unterricht übst du online auf unserer Lernplattform. So gibt es bei der Prüfung kein Nervenflattern, denn du kennst bereits alle Fragen.",
  },
  {
    q: "Wie erreiche ich die Fahrschule?",
    a: "Telefonisch unter 08341 7084 oder mobil unter 0170 7373739, per E-Mail an fahrschule-bubla@gmx.de – oder du kommst einfach zum Theorieunterricht vorbei.",
  },
]

/**
 * Themen des Grundstoffs (12 Lektionen nach Fahrschüler-Ausbildungsordnung).
 * ⚠️ Der Wochenplan („Termine rotieren“) ist ein Beispiel.
 */
export const theoryTopics = [
  "Persönliche Voraussetzungen",
  "Risikofaktor Mensch",
  "Rechtliche Rahmenbedingungen",
  "Straßenverkehrssystem und seine Nutzung",
  "Vorfahrt und Verkehrsregelungen",
  "Verkehrszeichen und Verkehrseinrichtungen",
  "Andere Teilnehmer im Straßenverkehr",
  "Geschwindigkeit, Abstand und umweltschonende Fahrweise",
  "Verkehrsverhalten bei Fahrmanövern",
  "Ruhender Verkehr",
  "Verhalten in besonderen Situationen, Folgen von Verstößen",
  "Lebenslanges Lernen",
]

/** Kurze FAQ zum Begleiteten Fahren (neu formuliert, allgemeine Regeln) */
export const bf17Faq: FaqItem[] = [
  {
    q: "Wie viele Begleitpersonen darf ich eintragen lassen?",
    a: "Du kannst mehrere Begleitpersonen eintragen lassen – zum Beispiel beide Elternteile. Jede muss die Voraussetzungen erfüllen.",
  },
  {
    q: "Was passiert an meinem 18. Geburtstag?",
    a: "Ab dann darfst du allein fahren. Die Prüfungsbescheinigung tauschst du bei der Führerscheinstelle gegen den Kartenführerschein.",
  },
  {
    q: "Gilt die Probezeit auch beim Begleiteten Fahren?",
    a: "Ja. Die zweijährige Probezeit beginnt mit der Aushändigung der Prüfungsbescheinigung – also schon mit 17.",
  },
]
