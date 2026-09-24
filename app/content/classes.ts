/**
 * Führerscheinklassen inkl. Preise – die EINZIGE Quelle für Preise.
 * Preisseite, Klassenübersicht, Klassenseiten, Startseite und der Fahrschul-Assistent
 * lesen alle aus dieser Datei. Ein Preis muss also nur hier geändert werden.
 *
 * ⚠️ BEISPIELDATEN: Die bisherige Website nennt keine Euro-Beträge und nur Klasse B.
 * Alle Beträge sowie die Klassen außer B/B17 sind Platzhalter (`mock: true`) und
 * müssen vor dem Livegang von der Fahrschule bestätigt oder ersetzt werden.
 * Solange `site.mock.enabled` true ist, zeigt die Website neben diesen Werten „Beispielwerte“.
 * Ein Betrag `null` wird als „auf Anfrage“ angezeigt.
 */

export type Category = "auto" | "zweirad"

export const categoryLabels: Record<Category, string> = {
  auto: "Auto & Anhänger",
  zweirad: "Zweirad",
}

export type Fee = {
  id: string
  label: string
  /** Erläuterung */
  detail?: string
  /** Betrag in Euro – null = „auf Anfrage“ */
  price: number | null
  unit?: string
  /** Gebühren, die nicht an die Fahrschule gehen (TÜV, Sehtest …) */
  external?: boolean
}

export type SpecialDrives = { ueberland: number; autobahn: number; dunkelheit: number }

export type LicenseClass = {
  slug: string
  path: string
  code: string
  name: string
  category: Category
  /** Kurzer Satz für Karten und Übersichten */
  summary: string
  intro: string[]
  seo: { title: string; description: string }
  minAge: { value: string; label: string }[]
  vehicle: string[]
  requirements?: string[]
  theory: { text: string; basic?: number; specific?: number }
  specialDrives?: SpecialDrives
  /** Durchschnittliche Zahl normaler Fahrstunden */
  averageLessons?: number
  exam: string
  fees: Fee[]
  image: string
  imageAlt: string
  imagePosition?: string
  ageBadge?: string
  /** Stichwörter, an denen der Fahrschul-Assistent die Klasse erkennt (klein, ohne Umlaute) */
  keywords: string[]
  /** true = komplette Klasse ist Beispielinhalt (nicht von der bisherigen Website) */
  mock: boolean
  related?: string[]
}

/* ------------------------------------------------------------------ */
/*  Preisbausteine (Beispielwerte)                                     */
/* ------------------------------------------------------------------ */

const tuev = (theorie: number | null, praxis: number | null): Fee[] => [
  ...(theorie !== null ? [{ id: "tuev-theorie", label: "TÜV-Gebühr Theorieprüfung", price: theorie, unit: "einmalig", external: true }] : []),
  ...(praxis !== null ? [{ id: "tuev-praxis", label: "TÜV-Gebühr praktische Prüfung", price: praxis, unit: "einmalig", external: true }] : []),
]

const feesB: Fee[] = [
  { id: "grundpreis", label: "Grundpreis", detail: "Pauschalbetrag für den theoretischen Unterricht und Anmeldegebühr.", price: 450, unit: "pauschal" },
  {
    id: "fahrstunde",
    label: "Normalfahrstunde",
    detail: "Durchschnittlich rechnet man ca. 20 Stunden. (Die Anzahl hängt von Deinen persönlichen Voraussetzungen ab)",
    price: 70,
    unit: "je 45 Min.",
  },
  { id: "sonderfahrt", label: "Sonderfahrt", detail: "12 Pflichtstunden: 4 Autobahn-, 5 Überland- und 3 Fahrten bei Dunkelheit", price: 85, unit: "je 45 Min." },
  { id: "vorstellung-theorie", label: "Vorstellung zur Theorieprüfung", price: 90, unit: "einmalig" },
  { id: "vorstellung-praxis", label: "Vorstellung zur praktischen Prüfung", price: 200, unit: "einmalig" },
  { id: "lehrmaterial", label: "Lehrmaterial & Online-Lernplattform", price: 89, unit: "einmalig" },
  ...tuev(25.49, 130.05),
]

export const classes: LicenseClass[] = [
  /* ---------------------------- Auto ---------------------------- */
  {
    slug: "b",
    path: "/klasse-b.htm",
    code: "B",
    name: "Autoführerschein Klasse B",
    category: "auto",
    summary: "Der klassische Autoführerschein: Pkw bis 3.500 kg – mit Theorie viermal pro Woche und 12 Pflicht-Sonderfahrten.",
    intro: [
      "Der Autoführerschein ist für die meisten der erste Schritt in die Freiheit. Bei uns lernst du mit Spaß, Fairness, Erfahrung und Kompetenz – und ohne eine Fahrstunde zu viel.",
    ],
    seo: {
      title: "Führerschein Klasse B in Kaufbeuren | Fahrschule Bubla",
      description:
        "Autoführerschein Klasse B bei der Fahrschule Bubla in Kaufbeuren und Neugablonz: Theorie Mo–Do 19:00–20:30 Uhr, 12 Sonderfahrten, faire Ausbildung – Mit Spaß zum Erfolg!",
    },
    minAge: [
      { value: "18", label: "Jahre" },
      { value: "17", label: "Jahre mit Begleitetem Fahren" },
    ],
    vehicle: [
      "Kraftfahrzeuge bis 3.500 kg zulässige Gesamtmasse",
      "Zur Beförderung von nicht mehr als acht Personen außer dem Fahrzeugführer",
      "Mit Anhänger bis 750 kg – oder schwerer, solange der Zug insgesamt 3.500 kg nicht überschreitet",
    ],
    theory: { text: "12 Doppelstunden Grundstoff + 2 Doppelstunden Zusatzstoff (je 90 Min.)", basic: 12, specific: 2 },
    specialDrives: { ueberland: 5, autobahn: 4, dunkelheit: 3 },
    averageLessons: 20,
    exam: "Theorieprüfung am Computer, danach praktische Prüfung mit dem Prüfer vom TÜV.",
    fees: feesB,
    image: "/images/stock/fahrerin-laechelt.webp",
    imageAlt: "Fahrschülerin lächelt am Lenkrad",
    imagePosition: "60% center",
    keywords: ["autofuehrerschein", "pkw", "auto", "klasse b"],
    mock: false,
    related: ["bf17", "b197", "be"],
  },
  {
    slug: "bf17",
    path: "/begleitetes-fahren.htm",
    code: "B17",
    name: "Begleitetes Fahren ab 17",
    category: "auto",
    summary: "Mit 17 schon ans Steuer – in Begleitung. Gleiche Ausbildung wie Klasse B, früher unterwegs.",
    intro: [
      "Mit dem Begleiteten Fahren sammelst du schon ab 17 Fahrpraxis – mit einer erfahrenen Begleitperson auf dem Beifahrersitz. Die Ausbildung ist dieselbe wie für Klasse B.",
    ],
    seo: {
      title: "Begleitetes Fahren ab 17 (BF17) in Kaufbeuren | Fahrschule Bubla",
      description:
        "Führerschein mit 17: Begleitetes Fahren bei der Fahrschule Bubla in Kaufbeuren – Ablauf, Voraussetzungen für Begleitpersonen und Fristen auf einen Blick.",
    },
    minAge: [
      { value: "16½", label: "Jahre: Ausbildung beginnen" },
      { value: "17", label: "Jahre: begleitet fahren" },
    ],
    vehicle: ["Wie Klasse B – bis zum 18. Geburtstag nur mit eingetragener Begleitperson"],
    theory: { text: "Wie Klasse B: 12 Doppelstunden Grundstoff + 2 Doppelstunden Zusatzstoff", basic: 12, specific: 2 },
    specialDrives: { ueberland: 5, autobahn: 4, dunkelheit: 3 },
    averageLessons: 20,
    exam: "Wie Klasse B. Nach bestandener Prüfung erhältst du eine Prüfungsbescheinigung für das begleitete Fahren.",
    fees: feesB,
    image: "/images/stock/fahrerin-lenkrad.webp",
    imageAlt: "Junge Fahrerin in orangefarbener Jacke am Lenkrad",
    imagePosition: "55% center",
    ageBadge: "ab 17",
    keywords: ["bf17", "b17", "begleitet", "begleitperson", "mit 17"],
    mock: false,
    related: ["b"],
  },
  {
    slug: "b197",
    path: "/klasse-b197.htm",
    code: "B197",
    name: "Automatik mit Schaltberechtigung",
    category: "auto",
    summary: "Ausbildung und Prüfung auf Automatik – mit Schaltstunden und Testfahrt darfst du trotzdem Schaltwagen fahren.",
    intro: [
      "Mit der Schlüsselzahl 197 lernst du und legst die Prüfung auf einem Automatikfahrzeug ab. Zusätzlich absolvierst du mindestens 10 Fahrstunden auf einem Schaltwagen und eine kurze Testfahrt – danach darfst du beides fahren.",
    ],
    seo: {
      title: "Führerschein B197 (Automatik) in Kaufbeuren | Fahrschule Bubla",
      description: "Klasse B mit Schlüsselzahl 197: Prüfung auf Automatik, trotzdem Schaltwagen fahren. Ausbildung bei der Fahrschule Bubla in Kaufbeuren.",
    },
    minAge: [
      { value: "18", label: "Jahre" },
      { value: "17", label: "Jahre mit Begleitetem Fahren" },
    ],
    vehicle: ["Wie Klasse B", "Prüfung auf Automatik, Schaltberechtigung durch Schaltstunden und Testfahrt"],
    requirements: ["Mindestens 10 Fahrstunden à 45 Min. auf einem Schaltwagen", "Testfahrt von mindestens 15 Minuten in der Fahrschule"],
    theory: { text: "Wie Klasse B: 12 Doppelstunden Grundstoff + 2 Doppelstunden Zusatzstoff", basic: 12, specific: 2 },
    specialDrives: { ueberland: 5, autobahn: 4, dunkelheit: 3 },
    averageLessons: 20,
    exam: "Praktische Prüfung auf Automatik; die Testfahrt auf dem Schaltwagen findet in der Fahrschule statt.",
    fees: [
      ...feesB.filter((f) => f.id !== "fahrstunde"),
      { id: "fahrstunde", label: "Fahrstunde Automatik", price: 70, unit: "je 45 Min." },
      { id: "schaltstunde", label: "Schaltstunde (mind. 10)", price: 70, unit: "je 45 Min." },
      { id: "testfahrt", label: "Testfahrt Schaltwagen", price: 60, unit: "einmalig" },
    ],
    image: "/images/stock/fahrerperspektive.webp",
    imageAlt: "Blick vom Fahrersitz auf Lenkrad und Straße",
    imagePosition: "center 58%",
    keywords: ["automatik", "b197", "schaltwagen", "schalten", "197"],
    mock: true,
    related: ["b"],
  },
  {
    slug: "be",
    path: "/klasse-be.htm",
    code: "BE",
    name: "Anhänger Klasse BE",
    category: "auto",
    summary: "Für Wohnwagen, Pferde- und große Autoanhänger: Anhänger bis 3.500 kg hinter deinem Pkw.",
    intro: ["Mit der Klasse BE darfst du hinter deinem Pkw Anhänger bis 3.500 kg zulässige Gesamtmasse ziehen – ideal für Wohnwagen, Pferdeanhänger oder Transporte."],
    seo: {
      title: "Anhängerführerschein BE in Kaufbeuren | Fahrschule Bubla",
      description: "Führerschein Klasse BE für Anhänger bis 3.500 kg: Ausbildung, Sonderfahrten und Kosten bei der Fahrschule Bubla in Kaufbeuren.",
    },
    minAge: [{ value: "18", label: "Jahre" }],
    vehicle: ["Fahrzeugkombination aus Zugfahrzeug der Klasse B und Anhänger", "Anhänger bis 3.500 kg zulässige Gesamtmasse"],
    requirements: ["Besitz der Klasse B"],
    theory: { text: "Keine Grundstoff-Stunden – Zusatzstoff nach Ausbildungsplan", specific: 3 },
    specialDrives: { ueberland: 3, autobahn: 1, dunkelheit: 1 },
    exam: "Praktische Prüfung inkl. Abfahrtkontrolle, An- und Abkuppeln – keine Theorieprüfung.",
    fees: [
      { id: "grundpreis", label: "Grundpreis", price: 250, unit: "pauschal" },
      { id: "fahrstunde", label: "Fahrstunde mit Anhänger", price: 85, unit: "je 45 Min." },
      { id: "sonderfahrt", label: "Sonderfahrt", detail: "3 Überland-, 1 Autobahn- und 1 Fahrt bei Dunkelheit", price: 100, unit: "je 45 Min." },
      { id: "vorstellung-praxis", label: "Vorstellung zur praktischen Prüfung", price: 190, unit: "einmalig" },
      { id: "lehrmaterial", label: "Lehrmaterial", price: 30, unit: "einmalig" },
      ...tuev(null, 130.05),
    ],
    image: "/images/stock/anhaenger.webp",
    imageAlt: "Pkw-Anhänger mit blauer Plane am Straßenrand",
    keywords: ["anhaenger", "be", "wohnwagen", "pferdeanhaenger", "klasse be", "3500"],
    mock: true,
    related: ["b96"],
  },
  {
    slug: "b96",
    path: "/klasse-b96.htm",
    code: "B96",
    name: "Anhänger-Schulung B96",
    category: "auto",
    summary: "Schulung statt Prüfung: Gespanne bis 4.250 kg Gesamtmasse – schnell zum größeren Anhänger.",
    intro: ["Mit der Schlüsselzahl 96 darfst du Kombinationen bis 4.250 kg zulässige Gesamtmasse fahren. Eine Prüfung gibt es nicht – nur eine kompakte Schulung in Theorie und Praxis."],
    seo: {
      title: "Anhänger-Schulung B96 in Kaufbeuren | Fahrschule Bubla",
      description: "B96: Gespanne bis 4.250 kg ohne Prüfung – nur mit Schulung. Termine und Kosten bei der Fahrschule Bubla in Kaufbeuren.",
    },
    minAge: [{ value: "18", label: "Jahre" }],
    vehicle: ["Zugfahrzeug Klasse B mit Anhänger über 750 kg", "Gesamtmasse der Kombination über 3.500 kg bis 4.250 kg"],
    requirements: ["Besitz der Klasse B"],
    theory: { text: "2,5 Stunden theoretische Schulung" },
    exam: "Keine Prüfung – nach der Schulung erhältst du eine Bescheinigung für die Führerscheinstelle.",
    fees: [{ id: "schulung", label: "Schulungspaket B96", detail: "2,5 Std. Theorie + 3,5 Std. Praxis", price: 390, unit: "pauschal" }],
    image: "/images/stock/wohnwagen.webp",
    imageAlt: "Autos mit Wohnwagen auf einem Campingplatz in den Bergen",
    keywords: ["b96", "schulung", "4250", "gespann"],
    mock: true,
    related: ["be"],
  },

  /* ---------------------------- Zweirad ---------------------------- */
  {
    slug: "am",
    path: "/klasse-am.htm",
    code: "AM",
    name: "Roller & Moped Klasse AM",
    category: "zweirad",
    summary: "Der Einstieg auf zwei Rädern: Roller und Mopeds bis 45 km/h.",
    intro: ["Mit der Klasse AM fährst du Roller und Mopeds bis 45 km/h – der perfekte Einstieg in die Mobilität, schon vor dem Autoführerschein."],
    seo: {
      title: "Rollerführerschein AM in Kaufbeuren | Fahrschule Bubla",
      description: "Führerschein Klasse AM für Roller und Mopeds bis 45 km/h: Ablauf und Kosten bei der Fahrschule Bubla in Kaufbeuren.",
    },
    minAge: [{ value: "16", label: "Jahre" }],
    vehicle: ["Zweirädrige Kleinkrafträder bis 45 km/h", "Hubraum bis 50 cm³ bzw. Leistung bis 4 kW"],
    theory: { text: "Grundstoff + 2 Doppelstunden Zusatzstoff", basic: 12, specific: 2 },
    exam: "Theorieprüfung am Computer und praktische Prüfung auf dem Roller.",
    fees: [
      { id: "grundpreis", label: "Grundpreis", price: 250, unit: "pauschal" },
      { id: "fahrstunde", label: "Fahrstunde", price: 65, unit: "je 45 Min." },
      { id: "vorstellung-theorie", label: "Vorstellung zur Theorieprüfung", price: 80, unit: "einmalig" },
      { id: "vorstellung-praxis", label: "Vorstellung zur praktischen Prüfung", price: 170, unit: "einmalig" },
      { id: "lehrmaterial", label: "Lehrmaterial", price: 50, unit: "einmalig" },
      ...tuev(25.49, 72.4),
    ],
    image: "/images/stock/roller.webp",
    imageAlt: "Roter Motorroller vor einer bemalten Hauswand",
    imagePosition: "35% center",
    ageBadge: "ab 16",
    keywords: ["roller", "moped", "klasse am", "45 km", "rollerfuehrerschein", "mopedfuehrerschein"],
    mock: true,
    related: ["a1"],
  },
  {
    slug: "a1",
    path: "/klasse-a1.htm",
    code: "A1",
    name: "Leichtkraftrad Klasse A1",
    category: "zweirad",
    summary: "125er ab 16: Leichtkrafträder bis 11 kW – der Motorrad-Einstieg.",
    intro: ["Mit der Klasse A1 fährst du ab 16 Jahren Leichtkrafträder bis 125 cm³ und 11 kW – der sportliche Einstieg ins Motorradfahren."],
    seo: {
      title: "Führerschein A1 (125er) in Kaufbeuren | Fahrschule Bubla",
      description: "Klasse A1 für Leichtkrafträder bis 125 cm³ ab 16 Jahren – Ausbildung und Kosten bei der Fahrschule Bubla in Kaufbeuren.",
    },
    minAge: [{ value: "16", label: "Jahre" }],
    vehicle: ["Krafträder bis 125 cm³ Hubraum", "Leistung bis 11 kW, Verhältnis Leistung/Gewicht bis 0,1 kW/kg"],
    theory: { text: "12 Doppelstunden Grundstoff + 4 Doppelstunden Zusatzstoff", basic: 12, specific: 4 },
    specialDrives: { ueberland: 5, autobahn: 4, dunkelheit: 3 },
    exam: "Theorieprüfung am Computer, praktische Prüfung mit Grundfahraufgaben.",
    fees: [
      { id: "grundpreis", label: "Grundpreis", price: 400, unit: "pauschal" },
      { id: "fahrstunde", label: "Fahrstunde", price: 75, unit: "je 45 Min." },
      { id: "sonderfahrt", label: "Sonderfahrt", detail: "5 Überland-, 4 Autobahn- und 3 Fahrten bei Dunkelheit", price: 90, unit: "je 45 Min." },
      { id: "vorstellung-theorie", label: "Vorstellung zur Theorieprüfung", price: 90, unit: "einmalig" },
      { id: "vorstellung-praxis", label: "Vorstellung zur praktischen Prüfung", price: 220, unit: "einmalig" },
      { id: "lehrmaterial", label: "Lehrmaterial", price: 70, unit: "einmalig" },
      ...tuev(25.49, 130.05),
    ],
    image: "/images/stock/motorrad-helm.webp",
    imageAlt: "Motorradfahrer mit Helm steht vor seinem Motorrad auf einer Waldstraße",
    imagePosition: "center 40%",
    ageBadge: "ab 16",
    keywords: ["a1", "125", "leichtkraftrad", "125er"],
    mock: true,
    related: ["a2", "am"],
  },
  {
    slug: "a2",
    path: "/klasse-a2.htm",
    code: "A2",
    name: "Motorrad Klasse A2",
    category: "zweirad",
    summary: "Ab 18 auf Motorräder bis 35 kW – und nach zwei Jahren der Aufstieg zu A.",
    intro: ["Die Klasse A2 bringt dich ab 18 auf richtige Motorräder bis 35 kW. Nach zwei Jahren kannst du mit einer praktischen Prüfung auf Klasse A aufsteigen."],
    seo: {
      title: "Motorradführerschein A2 in Kaufbeuren | Fahrschule Bubla",
      description: "Klasse A2 für Motorräder bis 35 kW ab 18 Jahren – Ausbildung, Aufstieg und Kosten bei der Fahrschule Bubla in Kaufbeuren.",
    },
    minAge: [{ value: "18", label: "Jahre" }],
    vehicle: ["Krafträder bis 35 kW", "Verhältnis Leistung/Gewicht bis 0,2 kW/kg"],
    theory: { text: "12 Doppelstunden Grundstoff + 4 Doppelstunden Zusatzstoff", basic: 12, specific: 4 },
    specialDrives: { ueberland: 5, autobahn: 4, dunkelheit: 3 },
    exam: "Theorieprüfung am Computer, praktische Prüfung mit Grundfahraufgaben.",
    fees: [
      { id: "grundpreis", label: "Grundpreis", price: 420, unit: "pauschal" },
      { id: "fahrstunde", label: "Fahrstunde", price: 78, unit: "je 45 Min." },
      { id: "sonderfahrt", label: "Sonderfahrt", detail: "5 Überland-, 4 Autobahn- und 3 Fahrten bei Dunkelheit", price: 92, unit: "je 45 Min." },
      { id: "vorstellung-theorie", label: "Vorstellung zur Theorieprüfung", price: 90, unit: "einmalig" },
      { id: "vorstellung-praxis", label: "Vorstellung zur praktischen Prüfung", price: 220, unit: "einmalig" },
      { id: "lehrmaterial", label: "Lehrmaterial", price: 70, unit: "einmalig" },
      ...tuev(25.49, 130.05),
    ],
    image: "/images/stock/motorrad-bergstrasse.webp",
    imageAlt: "Motorrad auf einer Bergstraße im Herbst",
    keywords: ["a2", "35 kw"],
    mock: true,
    related: ["a", "a1"],
  },
  {
    slug: "a",
    path: "/klasse-a.htm",
    code: "A",
    name: "Motorrad Klasse A",
    category: "zweirad",
    summary: "Alle Motorräder ohne Leistungsbeschränkung – direkt ab 24 oder per Aufstieg ab 20.",
    intro: ["Die Klasse A ist der „große“ Motorradführerschein ohne Leistungsbeschränkung. Direkt ab 24 Jahren – oder nach zwei Jahren A2 schon ab 20."],
    seo: {
      title: "Motorradführerschein Klasse A in Kaufbeuren | Fahrschule Bubla",
      description: "Klasse A ohne Leistungsbeschränkung: Direkteinstieg ab 24 oder Aufstieg von A2 ab 20 – bei der Fahrschule Bubla in Kaufbeuren.",
    },
    minAge: [
      { value: "24", label: "Jahre (Direkteinstieg)" },
      { value: "20", label: "Jahre (Aufstieg nach 2 Jahren A2)" },
    ],
    vehicle: ["Krafträder ohne Leistungsbeschränkung", "Dreirädrige Kraftfahrzeuge über 15 kW"],
    theory: { text: "12 Doppelstunden Grundstoff + 4 Doppelstunden Zusatzstoff (beim Aufstieg keine Theorie)", basic: 12, specific: 4 },
    specialDrives: { ueberland: 5, autobahn: 4, dunkelheit: 3 },
    exam: "Direkteinstieg: Theorie- und praktische Prüfung. Aufstieg von A2: nur praktische Prüfung.",
    fees: [
      { id: "grundpreis", label: "Grundpreis", price: 420, unit: "pauschal" },
      { id: "fahrstunde", label: "Fahrstunde", price: 80, unit: "je 45 Min." },
      { id: "sonderfahrt", label: "Sonderfahrt", detail: "5 Überland-, 4 Autobahn- und 3 Fahrten bei Dunkelheit", price: 95, unit: "je 45 Min." },
      { id: "vorstellung-theorie", label: "Vorstellung zur Theorieprüfung", price: 90, unit: "einmalig" },
      { id: "vorstellung-praxis", label: "Vorstellung zur praktischen Prüfung", price: 230, unit: "einmalig" },
      { id: "lehrmaterial", label: "Lehrmaterial", price: 70, unit: "einmalig" },
      ...tuev(25.49, 130.05),
    ],
    image: "/images/stock/motorrad-kurve.webp",
    imageAlt: "Motorradfahrer mit Helm auf einer Landstraße",
    imagePosition: "center 35%",
    keywords: ["motorrad", "motorradfuehrerschein", "klasse a", "offen", "aufstieg"],
    mock: true,
    related: ["a2"],
  },
  {
    slug: "b196",
    path: "/klasse-b196.htm",
    code: "B196",
    name: "125er mit Autoführerschein",
    category: "zweirad",
    summary: "Mit Klasse B auf die 125er – nur Schulung, keine Prüfung.",
    intro: ["Mit der Schlüsselzahl 196 darfst du als Autofahrer auch Leichtkrafträder bis 125 cm³ fahren – ohne Prüfung, nur mit einer kompakten Schulung in Theorie und Praxis."],
    seo: {
      title: "B196 – 125er mit Autoführerschein in Kaufbeuren | Fahrschule Bubla",
      description: "Schlüsselzahl 196: Leichtkrafträder bis 125 cm³ mit Klasse B fahren – Schulung ohne Prüfung bei der Fahrschule Bubla in Kaufbeuren.",
    },
    minAge: [{ value: "25", label: "Jahre" }],
    vehicle: ["Leichtkrafträder bis 125 cm³ und 11 kW", "Gilt nur in Deutschland"],
    requirements: ["Seit mindestens 5 Jahren im Besitz der Klasse B"],
    theory: { text: "4 Doppelstunden Theorie (je 90 Min.)" },
    exam: "Keine Prüfung – nach 5 Doppelstunden Praxis erhältst du eine Bescheinigung für die Führerscheinstelle.",
    fees: [{ id: "schulung", label: "Schulungspaket B196", detail: "4 × 90 Min. Theorie + 5 × 90 Min. Praxis", price: 590, unit: "pauschal" }],
    image: "/images/stock/helm-motorrad.webp",
    imageAlt: "Hand hält einen Motorradhelm, dahinter ein Motorrad",
    imagePosition: "center 45%",
    ageBadge: "ab 25",
    keywords: ["b196", "196", "125er mit auto", "leichtkraftrad mit b"],
    mock: true,
    related: ["a1"],
  },
]

export const autoClasses = classes.filter((c) => c.category === "auto")
export const bikeClasses = classes.filter((c) => c.category === "zweirad")
export const classBySlug = (slug: string) => classes.find((c) => c.slug === slug)!
export const classB = classBySlug("b")
export const classBF17 = classBySlug("bf17")
/** Klassen mit eigener, generischer Klassenseite (B17 hat eine eigene Seite) */
export const genericClassPages = classes.filter((c) => c.slug !== "bf17")

export const formatEuro = (n: number) =>
  new Intl.NumberFormat("de-DE", { style: "currency", currency: "EUR", minimumFractionDigits: n % 1 === 0 ? 0 : 2, maximumFractionDigits: 2 }).format(n)

export const priceLabel = (fee: Fee) => (fee.price === null ? "auf Anfrage" : `${fee.external ? "ca. " : ""}${formatEuro(fee.price)}`)

/** Summe der Sonderfahrten einer Klasse */
export const specialDriveTotal = (s?: SpecialDrives) => (s ? s.ueberland + s.autobahn + s.dunkelheit : 0)

/** Hauptpreis einer Klasse (Grundpreis bzw. Schulungspaket) */
export const mainFee = (c: LicenseClass) => c.fees.find((f) => f.id === "grundpreis" || f.id === "schulung")
