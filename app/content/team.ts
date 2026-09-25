/**
 * Team der Fahrschule. Quelle: alte Seite „Team“ (Namen) und ältere Fassung der Website
 * („Christian Bubla (Inhaber) und Horst Vetter (Fahrlehrer seit 1989)“).
 */

export type TeamMember = { name: string; role: string; since?: string; initials: string }

export const team: TeamMember[] = [
  { name: "Christian Bubla", role: "Inhaber & Fahrlehrer", initials: "CB" },
  { name: "Horst Vetter", role: "Fahrlehrer", since: "Fahrlehrer seit 1989", initials: "HV" },
]

/** Originalfoto der Fahrschule (Fahrschulwagen mit Fahrlehrer) */
export const teamPhoto = {
  src: "/images/fahrschule/bubla-golf.webp",
  alt: "Fahrlehrer der Fahrschule Bubla lehnt am weißen Fahrschul-Golf mit Bubla-Beschriftung",
  width: 1920,
  height: 1149,
}
