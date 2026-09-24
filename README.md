# Fahrschule Bubla – Website

Neuauflage von [fahrschule-bubla.de](http://fahrschule-bubla.de) als modernes React-Projekt. Texte, Kontaktdaten, Impressum und Datenschutz stammen von der bisherigen Seite (Xara-Baukasten, 7 Seiten). Was dort fehlte (Preise, weitere Klassen, AGB, Bürozeiten, Termine), ist als **Beispieldaten** eingetragen und klar markiert – siehe unten.

## Technik

| Bereich | Werkzeug |
| --- | --- |
| Framework | React 19 + React Router 8 (Framework-Modus, `ssr: false`, **jede Seite als statisches HTML vorgerendert**) |
| Styling | Tailwind CSS 4, Design-Tokens als CSS-Variablen in `app/app.css`, Sektionsfarben über `tone-paper`, `tone-mist`, `tone-night`, `tone-blue` |
| Animationen | Motion (Hero-Zoom, Scroll-Sequenz, Parallax, Bild-Reveal, horizontale Galerie, Wort-für-Wort-Text, Zähler, Zeitleiste) |
| Smooth Scrolling | Lenis (aus bei „Bewegung reduzieren“) |
| Schrift | Plus Jakarta Sans, lokal über @fontsource (kein Google-Fonts-Aufruf) |
| Icons | lucide-react |
| Tests | Playwright (Chromium + WebKit/Safari) |

Design „Allgäu-Blau“: Bubla-Blau `#005BA4`, Logo-Gelb `#F8E322`, Tiefblau `#061C33`, schwebende Pill-Navigation, Klassen als Kfz-Kennzeichen, Fortschritt als gelbe Fahrbahnmarkierung.

## Befehle

```bash
npm install          # Abhängigkeiten installieren
npm run dev          # Entwicklungsserver auf http://localhost:5173
npm run build        # Produktions-Build nach build/client (HTML je Seite + sitemap.xml + 404.html)
npm run preview      # Build lokal testen auf http://localhost:4180
npm run typecheck    # TypeScript prüfen
npm test             # Playwright-Tests (vorher npm run build; einmalig: npx playwright install chromium webkit)
```

## Inhalte pflegen

Alle Texte und Daten liegen getrennt vom Design in `app/content/`:

| Datei | Inhalt |
| --- | --- |
| `site.ts` | Name, Adressen (Büro + Theorieraum), Telefon, E-Mail, Theoriezeiten, Bürozeiten, Termine (`news`), Navigation, Schalter für Beispieldaten |
| `classes.ts` | **Einzige Quelle für Preise** und alle Führerscheinklassen. Preisseite, Klassenseiten, Startseite und Assistent lesen daraus |
| `info.ts` | Texte der alten Seite, Ablauf in 5 Schritten, FAQ, Theoriethemen, B17-Zeitleiste |
| `team.ts` | Teammitglieder und Foto |
| `legal.ts` | Impressum und Datenschutz (wörtlich übernommen), Muster-AGB |
| `assistant.ts` | Fahrschul-Assistent: Fragen zum Antippen und Antworten (bauen sich aus den anderen Dateien zusammen; Klassenfragen entstehen automatisch) |

- **Preis ändern:** in `classes.ts` beim passenden Eintrag `price` anpassen. `null` zeigt „auf Anfrage“.
- **Klasse hinzufügen/entfernen:** Eintrag in `classes` ergänzen oder löschen – Route, Menü, Footer, Galerie, Preistabelle, Sitemap und Assistent passen sich automatisch an.
- **Termine:** `news` in `site.ts`. Vergangene Termine werden beim Build ausgeblendet; leeres Array blendet den Bereich aus.

### Beispieldaten ersetzen (vor dem Livegang!)

Mit `mock: true` bzw. Kommentar `⚠️ Beispieldaten` markiert:

1. alle Preise in `classes.ts`
2. alle Klassen außer B und B17 (`mock: true`)
3. Bürozeiten (`site.officeHours`) und Termine (`news`) in `site.ts`
4. Muster-AGB in `legal.ts` (die AGB-Seite steht bis dahin auf `noindex`)
5. Muster-PDF `public/downloads/Anmeldeformular-Fahrschule-Bubla.pdf`
6. Neu formulierte Texte (Ablauf, FAQ, B17-Details) in `info.ts` bestätigen lassen

Danach in `site.ts` `mock.enabled` auf `false` setzen – alle gelben „Beispielwerte“-Hinweise verschwinden.

## Seiten & URLs

Die alten Adressen bleiben 1:1 erhalten (`/unterricht.htm`, `/preis.htm`, `/team.htm`, `/contact.htm`, `/impressum.htm`, `/datenschutz.htm`); `/index.htm` leitet per 301 auf `/` um. Neue Seiten folgen demselben Schema:

`/` · `/info.htm` · `/unterricht.htm` · `/klassen.htm` · `/klasse-b.htm` · `/begleitetes-fahren.htm` · `/klasse-b197.htm` · `/klasse-be.htm` · `/klasse-b96.htm` · `/klasse-am.htm` · `/klasse-a1.htm` · `/klasse-a2.htm` · `/klasse-a.htm` · `/klasse-b196.htm` · `/preis.htm` · `/team.htm` · `/contact.htm` · `/anmeldung.htm` · `/impressum.htm` · `/datenschutz.htm` · `/agb.htm`

Technischer Hinweis: React Router legt vorgerenderte Seiten als `unterricht.htm/index.html` ab – `scripts/postbuild.mjs` macht daraus die Datei `unterricht.htm`.

SEO je Seite: Titel und Beschreibung (bisherige Werte übernommen und je Seite ergänzt), Canonical, Open Graph (`public/og-image.jpg`), JSON-LD `DrivingSchool` auf allen Seiten, `FAQPage` auf Ablauf und B17, `Course` auf Klassenseiten, automatisch erzeugte `sitemap.xml`, `robots.txt`.

## Funktionen

- **Fahrschul-Assistent** (unten rechts): alle Fragen zum Antippen direkt sichtbar (häufige Fragen + eine Frage je Klasse), kein Freitext, keine KI, keine externen Dienste. Antwortet nur mit Angaben aus `app/content/`. Neue Frage: Eintrag in `generalQuestions` in `assistant.ts`.
- **Anmeldung:** Das Formular öffnet eine vorausgefüllte E-Mail an die Fahrschule (kein Server nötig). Für direkten Versand `onSubmit` in `app/routes/anmeldung.tsx` an einen Formulardienst anbinden.
- **Google Maps** mit 2-Klick-Lösung – vorher fließen keine Daten an Google.
- Barrierefreiheit: Skip-Link, Tastaturbedienung, `aria`-Zustände, „Bewegung reduzieren“ wird respektiert.

## Bildquellen

- `public/images/logo.png` – Originallogo (freigestellt), `public/images/fahrschule/fahrlehrer-golf.webp` – Originalfoto der Fahrschule (alter Xara-Rahmen entfernt).
- `public/images/stock/` – Fotos von [Pexels](https://www.pexels.com/license/) (kostenlos, auch kommerziell, keine Quellenangabe nötig), als WebP (max. 2400 px). Jederzeit durch eigene Fotos ersetzbar (gleicher Dateiname).

| Datei | Quelle |
| --- | --- |
| `stock/allgaeu-wiese.webp` | [pexels.com/photo/32488279](https://www.pexels.com/photo/32488279/) |
| `stock/anhaenger.webp` | [pexels.com/photo/10304035](https://www.pexels.com/photo/10304035/) |
| `stock/autobahn.webp` | [pexels.com/photo/31390896](https://www.pexels.com/photo/31390896/) |
| `stock/fahrerin-laechelt.webp` | [pexels.com/photo/6817008](https://www.pexels.com/photo/6817008/) |
| `stock/fahrerin-lenkrad.webp` | [pexels.com/photo/6816982](https://www.pexels.com/photo/6816982/) |
| `stock/fahrerperspektive.webp` | [pexels.com/photo/31627608](https://www.pexels.com/photo/31627608/) |
| `stock/fahrstunde.webp` | [pexels.com/photo/9518031](https://www.pexels.com/photo/9518031/) |
| `stock/golf-landstrasse.webp` | [pexels.com/photo/10843557](https://www.pexels.com/photo/10843557/) |
| `stock/helm-motorrad.webp` | [pexels.com/photo/17506580](https://www.pexels.com/photo/17506580/) |
| `stock/lernen-app.webp` | [pexels.com/photo/1462631](https://www.pexels.com/photo/1462631/) |
| `stock/motorrad-bergstrasse.webp` | [pexels.com/photo/29244519](https://www.pexels.com/photo/29244519/) |
| `stock/motorrad-helm.webp` | [pexels.com/photo/4560435](https://www.pexels.com/photo/4560435/) |
| `stock/motorrad-kurve.webp` | [pexels.com/photo/18431499](https://www.pexels.com/photo/18431499/) |
| `stock/nachtfahrt.webp` | [pexels.com/photo/2514035](https://www.pexels.com/photo/2514035/) |
| `stock/roller.webp` | [pexels.com/photo/10207636](https://www.pexels.com/photo/10207636/) |
| `stock/serpentinen-luftbild.webp` | [pexels.com/photo/10549951](https://www.pexels.com/photo/10549951/) |
| `stock/theorie-raum.webp` | [pexels.com/photo/8761328](https://www.pexels.com/photo/8761328/) |
| `stock/theorie-vortrag.webp` | [pexels.com/photo/8761324](https://www.pexels.com/photo/8761324/) |
| `stock/wohnwagen.webp` | [pexels.com/photo/17816414](https://www.pexels.com/photo/17816414/) |

Empfehlung: echte Fotos von Theorieraum, Fahrzeugen und Team ergänzen.

## Veröffentlichen

1. `npm run build`
2. **Inhalt von `build/client/`** (inkl. versteckter `.htaccess`) auf den Webspace hochladen. Ein Node-Server ist nicht nötig.
3. SSL-Zertifikat einrichten und in `.htaccess` die HTTPS-Weiterleitung einkommentieren (Canonical und Sitemap nutzen bereits `https://`).
4. Sitemap in der Google Search Console einreichen.

Netlify/Vercel/Cloudflare Pages: Build-Befehl `npm run build`, Ausgabeordner `build/client`.

## Tests

`npm test` prüft in Chromium und WebKit:
- alle Seiten auf 320, 375, 390, 402×874, 768, 1024, 1440 und 1920 px: keine Überbreite, kein abgeschnittener Text (gemessen an den gezeichneten Textzeilen), keine JS-/Hydration-Fehler – auch mit „Bewegung reduzieren“
- interne/externe Links, Sprungmarken, Bilder, PDF, Sitemap, robots.txt, 404, SEO-Tags
- Menüs, Klassen-Flyout, Filter, FAQ, Formular, Karte, Assistent, Sprungmarken-Versatz, Hero-Karte, Zähler
- Vollständigkeit des Assistenten (jede Frage mit Antwort und gültigen Links, jede Klasse vertreten)
