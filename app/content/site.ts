/**
 * Zentrale Stammdaten der Fahrschule. Adresse, Zeiten und Kontakt werden
 * überall auf der Website (auch vom Fahrschul-Assistenten) aus dieser Datei gelesen.
 * Quelle: bisherige Website fahrschule-bubla.de (Kontakt, Unterricht, Impressum).
 */

export const site = {
  name: "Fahrschule Bubla",
  claim: "Mit Spaß zum Erfolg!",
  owner: "Christian Bubla",
  url: "https://fahrschule-bubla.de",
  city: "Kaufbeuren",

  /** Postanschrift / Büro (laut Kontakt und Impressum) */
  address: {
    street: "Neugablonzer Str. 29",
    zip: "87600",
    city: "Kaufbeuren",
  },

  /** Theorieunterricht (laut Seite „Unterricht“) */
  theoryLocation: {
    name: "Theorieraum Neugablonz",
    street: "Hüttenstraße 9",
    zip: "87600",
    city: "Kaufbeuren",
    district: "Neugablonz",
  },

  phone: { display: "08341 7084", href: "tel:+4983417084", international: "+49 8341 7084" },
  mobile: { display: "0170 7373739", href: "tel:+491707373739", international: "+49 170 7373739" },
  /** Fax laut Kontaktseite (im Impressum steht eine abweichende Nummer) */
  fax: "08341 9962163",
  email: "fahrschule-bubla@gmx.de",

  hours: {
    theoryDays: ["Montag", "Dienstag", "Mittwoch", "Donnerstag"],
    theoryDaysShort: "Mo – Do",
    theoryTime: "19:00 – 20:30 Uhr",
    theoryStart: "19:00",
    theoryEnd: "20:30",
    /** Theorieabende pro Woche */
    theoryPerWeek: 4,
  },

  /**
   * Beispieldaten-Hinweis. Solange `enabled` true ist, stehen neben Platzhalter-Werten
   * (Preise, Zusatzklassen, Bürozeiten, Termine, AGB) kleine Hinweise „Beispielwerte“.
   * Vor dem Livegang: echte Daten eintragen und auf false setzen.
   */
  mock: { enabled: true, label: "Beispielwerte" },

  /** ⚠️ Beispieldaten – die bisherige Website nennt keine Bürozeiten */
  officeHours: [
    { days: "Montag – Donnerstag", time: "18:30 – 19:00 Uhr" },
    { days: "und nach Vereinbarung", time: "telefonisch jederzeit" },
  ],

  /** Online-Lernplattform (Link von der alten Seite „Unterricht“) */
  learningPlatform: { name: "Fahrschulcard", url: "https://www.fahrschulcard.de/" },

  maps: {
    /** Google Maps wird erst nach Klick geladen (2-Klick-Lösung) */
    theoryEmbed: "https://www.google.com/maps?q=H%C3%BCttenstra%C3%9Fe+9,+87600+Kaufbeuren&z=16&output=embed",
    theoryLink: "https://www.google.com/maps/search/?api=1&query=H%C3%BCttenstra%C3%9Fe+9+87600+Kaufbeuren",
    officeEmbed: "https://www.google.com/maps?q=Neugablonzer+Str.+29,+87600+Kaufbeuren&z=16&output=embed",
    officeLink: "https://www.google.com/maps/search/?api=1&query=Neugablonzer+Str.+29+87600+Kaufbeuren",
    /** Koordinaten laut OpenStreetMap */
    office: { lat: 47.8846788, lng: 10.6252393 },
    theory: { lat: 47.9118914, lng: 10.6333424 },
  },
} as const

export type NavItem = { label: string; to: string }

/** Die bisherigen Adressen (.htm) bleiben erhalten – Google-Rankings und Links funktionieren weiter. */
export const paths = {
  home: "/",
  info: "/info.htm",
  unterricht: "/unterricht.htm",
  klassen: "/klassen.htm",
  klasseB: "/klasse-b.htm",
  bf17: "/begleitetes-fahren.htm",
  preise: "/preis.htm",
  agb: "/agb.htm",
  team: "/team.htm",
  kontakt: "/contact.htm",
  anmeldung: "/anmeldung.htm",
  impressum: "/impressum.htm",
  datenschutz: "/datenschutz.htm",
} as const

export const mainNav: NavItem[] = [
  { label: "Start", to: paths.home },
  { label: "Ablauf", to: paths.info },
  { label: "Unterricht", to: paths.unterricht },
  { label: "Klassen", to: paths.klassen },
  { label: "Preise", to: paths.preise },
  { label: "Team", to: paths.team },
  { label: "Kontakt", to: paths.kontakt },
]

/**
 * ⚠️ Beispieldaten: Neuigkeiten/Termine (Seite „Unterricht“ und Startseite).
 * Leeres Array blendet den Bereich aus. Vergangene Termine werden automatisch ausgeblendet.
 */
export const news: { date: string; title: string; text: string }[] = [
  { date: "2026-10-26", title: "Herbstferien-Intensivkurs", text: "Theorie kompakt: Mo – Fr, 9:00 – 12:00 Uhr in der Hüttenstraße 9." },
  { date: "2026-11-14", title: "Erste-Hilfe-Kurs", text: "Samstag, 9:00 – 16:30 Uhr – Anmeldung über die Fahrschule." },
  { date: "2027-03-01", title: "Motorradsaison-Start", text: "Ab März wieder Fahrstunden für A, A1, A2 und B196." },
]
