/**
 * Impressum und Datenschutzerklärung – wörtlich von der bisherigen Website übernommen.
 * Einzige Ergänzung: Abschnitt 4 (Google Maps), weil die neue Website eine Karte mit
 * 2-Klick-Lösung enthält. Diese Ergänzung bitte rechtlich prüfen lassen.
 */

export type LegalBlock =
  | { type: "h2"; text: string; id?: string }
  | { type: "h3"; text: string }
  | { type: "p"; text: string }
  | { type: "lines"; lines: string[] }
  | { type: "ul"; items: string[] }

export const impressum: LegalBlock[] = [
  { type: "p", text: "Informationen gemäß § 2 Absatz I Dienstleistungs-Informationspflichten-Verordnung (DL-InfoV)" },
  { type: "h3", text: "Herausgeber & Dienstanbieter:" },
  { type: "lines", lines: ["Fahrschule Bubla", "Neugablonzer Str. 29", "D-87600 Kaufbeuren"] },
  { type: "h3", text: "Vertreten durch:" },
  {
    type: "lines",
    lines: [
      "Christian Bubla",
      "Mob.: +49 (0) 170 - 73 73 73 9",
      "Tel.: +49 (0) 8341 - 70 84",
      "Fax: +49 (0) 8314 -96 02 27 3",
      "E-Mail: fahrschule-bubla@gmx.de",
    ],
  },
  { type: "h3", text: "Umsatzsteuer-Identifikationsnummer gemäß §27a Umsatzsteuergesetz:" },
  { type: "p", text: "76478921537" },

  { type: "h2", text: "Inhalt des Online-Angebotes", id: "inhalt" },
  {
    type: "p",
    text: "Die Autoren übernehmen keinerlei Gewähr für die Aktualität, Korrektheit, Vollständigkeit oder Qualität der bereitgestellten Informationen. Haftungsansprüche gegen die Autoren, welche sich auf Schäden materieller oder ideeller Art beziehen, die durch die Nutzung oder Nichtnutzung der dargebotenen Informationen bzw. durch die Nutzung fehlerhafter und unvollständiger Informationen verursacht wurden sind grundsätzlich ausgeschlossen, sofern seitens der Autoren kein nachweislich vorsätzliches oder grob fahrlässiges Verschulden vorliegt. Alle Angebote sind freibleibend und unverbindlich. Die Autoren behalten es sich ausdrücklich vor, Teile der Seiten oder das gesamte Angebot ohne gesonderte Ankündigung zu verändern, zu ergänzen, zu löschen oder die Veröffentlichung zeitweise oder endgültig einzustellen.",
  },
  { type: "h2", text: "Verweise und Links", id: "links" },
  {
    type: "p",
    text: "Die Autoren haben keinerlei Einfluss auf die aktuelle und zukünftige Gestaltung und auf die Inhalte der gelinkten/ verknüpften Seiten. Deshalb distanzieren sie sich hiermit ausdrücklich von allen Inhalten aller gelinkten/verknüpften Seiten, auch für die Seiten, die nach der Linksetzung verändert wurden. Diese Feststellung gilt für alle innerhalb des eigenen Internetangebotes gesetzten Links und Verweise sowie für Fremdeinträge in von den Autoren eingerichteten Gästebüchern, Diskussionsforen und Mailinglisten. Für illegale, fehlerhafte oder unvollständige Inhalte und insbesondere für Schäden, die aus der Nutzung oder Nichtnutzung solcherart dargebotener Informationen entstehen, haftet allein der Anbieter der Seite, auf welche verwiesen wurde, nicht derjenige, der über Links auf die jeweilige Veröffentlichung lediglich verweist.",
  },
  { type: "h2", text: "Urheber- und Kennzeichenrecht", id: "urheberrecht" },
  {
    type: "p",
    text: "Die Autoren sind bestrebt, in allen Publikationen die Urheberrechte der verwendeten Grafiken, Tondokumente, Videosequenzen und Texte zu beachten, von ihnen selbst erstellte Grafiken, Tondokumente, Videosequenzen und Texte zu nutzen oder auf lizenzfreie Grafiken, Tondokumente, Videosequenzen und Texte zurückzugreifen. Alle innerhalb des Internetangebotes genannten und ggf. durch Dritte geschützten Marken- und Warenzeichen unterliegen uneingeschränkt den Bestimmungen des jeweils gültigen Kennzeichenrechts und den Besitzrechten der jeweiligen eingetragenen Eigentümer. Allein aufgrund der bloßen Nennung ist nicht der Schluss zu ziehen, dass Markenzeichen nicht durch Rechte Dritter geschützt sind! Das Copyright für veröffentlichte, von den Autoren selbst erstellte Objekte bleibt allein bei den Autoren der Seiten. Eine Vervielfältigung oder Verwendung solcher Grafiken, Tondokumente, Videosequenzen und Texte in anderen elektronischen oder gedruckten Publikationen ist ohne ausdrückliche Zustimmung der Autoren nicht gestattet.",
  },
  { type: "h2", text: "Rechte Dritter, Homepage-Zugehörigkeit", id: "rechte-dritter" },
  {
    type: "p",
    text: "Sollten wir mit den Inhalten dieser Homepage gegen Rechte Dritter verstoßen, so teilen Sie uns dies bitte umgehend per Mail mit. Damit sollte Ihnen ausreichend Gelegenheit gegeben sein, uns auch ohne rechtsanwaltliche Hilfe Ihre Bedenken mitzuteilen. Dies gilt insbesondere für die verantwortlichen Personen, die „Massen-Abmahnungen“ verschicken. Dies ist hier nicht notwendig, da wir jederzeit und ohne Widerstand bereit sind, Ihre berechtigt beanstandeten Interessen zu wahren.",
  },
  { type: "h2", text: "Rechtswirksamkeit dieses Haftungsausschlusses", id: "rechtswirksamkeit" },
  {
    type: "p",
    text: "Dieser Haftungsausschluss ist als Teil des Internet-Angebotes zu betrachten, von dem aus auf diese Seite verwiesen wurde. Sofern Teile oder einzelne Formulierungen dieses Textes der geltenden Rechtslage nicht, nicht mehr oder nicht vollständig entsprechen sollten, bleiben die übrigen Teile des Dokumentes in ihrem Inhalt und ihrer Gültigkeit davon unberührt.",
  },
]

export const datenschutz: LegalBlock[] = [
  { type: "h2", text: "1. Datenschutz auf einen Blick", id: "auf-einen-blick" },
  { type: "h3", text: "Allgemeine Hinweise" },
  {
    type: "p",
    text: "Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit Ihren personenbezogenen Daten passiert, wenn Sie unsere Website besuchen. Personenbezogene Daten sind alle Daten, mit denen Sie persönlich identifiziert werden können. Ausführliche Informationen zum Thema Datenschutz entnehmen Sie unserer unter diesem Text aufgeführten Datenschutzerklärung.",
  },
  { type: "h3", text: "Datenerfassung auf unserer Website" },
  { type: "p", text: "Wer ist verantwortlich für die Datenerfassung auf dieser Website?" },
  {
    type: "p",
    text: "Die Datenverarbeitung auf dieser Website erfolgt durch den Websitebetreiber. Dessen Kontaktdaten können Sie dem Impressum dieser Website entnehmen.",
  },
  { type: "p", text: "Wie erfassen wir Ihre Daten?" },
  {
    type: "p",
    text: "Ihre Daten werden zum einen dadurch erhoben, dass Sie uns diese mitteilen. Hierbei kann es sich z. B. um Daten handeln, die Sie in ein Kontaktformular eingeben.",
  },
  {
    type: "p",
    text: "Andere Daten werden automatisch beim Besuch der Website durch unsere IT-Systeme erfasst. Das sind vor allem technische Daten (z. B. Internetbrowser, Betriebssystem oder Uhrzeit des Seitenaufrufs). Die Erfassung dieser Daten erfolgt automatisch, sobald Sie unsere Website betreten.",
  },
  { type: "p", text: "Wofür nutzen wir Ihre Daten?" },
  {
    type: "p",
    text: "Ein Teil der Daten wird erhoben, um eine fehlerfreie Bereitstellung der Website zu gewährleisten. Andere Daten können zur Analyse Ihres Nutzerverhaltens verwendet werden.",
  },
  { type: "p", text: "Welche Rechte haben Sie bezüglich Ihrer Daten?" },
  {
    type: "p",
    text: "Sie haben jederzeit das Recht unentgeltlich Auskunft über Herkunft, Empfänger und Zweck Ihrer gespeicherten personenbezogenen Daten zu erhalten. Sie haben außerdem ein Recht, die Berichtigung, Sperrung oder Löschung dieser Daten zu verlangen. Hierzu sowie zu weiteren Fragen zum Thema Datenschutz können Sie sich jederzeit unter der im Impressum angegebenen Adresse an uns wenden. Des Weiteren steht Ihnen ein Beschwerderecht bei der zuständigen Aufsichtsbehörde zu.",
  },
  {
    type: "p",
    text: "Außerdem haben Sie das Recht, unter bestimmten Umständen die Einschränkung der Verarbeitung Ihrer personenbezogenen Daten zu verlangen. Details hierzu entnehmen Sie der Datenschutzerklärung unter „Recht auf Einschränkung der Verarbeitung“.",
  },

  { type: "h2", text: "2. Allgemeine Hinweise und Pflichtinformationen", id: "pflichtinformationen" },
  { type: "h3", text: "Datenschutz" },
  {
    type: "p",
    text: "Die Betreiber dieser Seiten nehmen den Schutz Ihrer persönlichen Daten sehr ernst. Wir behandeln Ihre personenbezogenen Daten vertraulich und entsprechend der gesetzlichen Datenschutzvorschriften sowie dieser Datenschutzerklärung.",
  },
  {
    type: "p",
    text: "Wenn Sie diese Website benutzen, werden verschiedene personenbezogene Daten erhoben. Personenbezogene Daten sind Daten, mit denen Sie persönlich identifiziert werden können. Die vorliegende Datenschutzerklärung erläutert, welche Daten wir erheben und wofür wir sie nutzen. Sie erläutert auch, wie und zu welchem Zweck das geschieht.",
  },
  {
    type: "p",
    text: "Wir weisen darauf hin, dass die Datenübertragung im Internet (z. B. bei der Kommunikation per E-Mail) Sicherheitslücken aufweisen kann. Ein lückenloser Schutz der Daten vor dem Zugriff durch Dritte ist nicht möglich.",
  },
  { type: "h3", text: "Hinweis zur verantwortlichen Stelle" },
  { type: "p", text: "Die verantwortliche Stelle für die Datenverarbeitung auf dieser Website ist:" },
  {
    type: "lines",
    lines: [
      "Christian Bubla",
      "Fahrschule Bubla",
      "Neugablonzer Str. 29",
      "D-87600 Kaufbeuren",
      "Telefon: +49 (0) 8341 - 70 84",
      "E-Mail: fahrschule-bubla@gmx.de",
    ],
  },
  {
    type: "p",
    text: "Verantwortliche Stelle ist die natürliche oder juristische Person, die allein oder gemeinsam mit anderen über die Zwecke und Mittel der Verarbeitung von personenbezogenen Daten (z. B. Namen, E-Mail-Adressen o. Ä.) entscheidet.",
  },
  { type: "h3", text: "Widerruf Ihrer Einwilligung zur Datenverarbeitung" },
  {
    type: "p",
    text: "Viele Datenverarbeitungsvorgänge sind nur mit Ihrer ausdrücklichen Einwilligung möglich. Sie können eine bereits erteilte Einwilligung jederzeit widerrufen. Dazu reicht eine formlose Mitteilung per E-Mail an uns. Die Rechtmäßigkeit der bis zum Widerruf erfolgten Datenverarbeitung bleibt vom Widerruf unberührt.",
  },
  { type: "h3", text: "Widerspruchsrecht gegen die Datenerhebung in besonderen Fällen sowie gegen Direktwerbung (Art. 21 DSGVO)" },
  {
    type: "p",
    text: "Wenn die Datenverarbeitung auf Grundlage von Art. 6 Abs. 1 lit. e oder f DSGVO erfolgt, haben Sie jederzeit das Recht, aus Gründen, die sich aus Ihrer besonderen Situation ergeben, gegen die Verarbeitung Ihrer personenbezogenen Daten Widerspruch einzulegen; dies gilt auch für ein auf diese Bestimmungen gestütztes Profiling. Die jeweilige Rechtsgrundlage, auf denen eine Verarbeitung beruht, entnehmen Sie dieser Datenschutzerklärung. Wenn Sie Widerspruch einlegen, werden wir Ihre betroffenen personenbezogenen Daten nicht mehr verarbeiten, es sei denn, wir können zwingende schutzwürdige Gründe für die Verarbeitung nachweisen, die Ihre Interessen, Rechte und Freiheiten überwiegen oder die Verarbeitung dient der Geltendmachung, Ausübung oder Verteidigung von Rechtsansprüchen (Widerspruch nach Art. 21 Abs. 1 DSGVO).",
  },
  {
    type: "p",
    text: "Werden Ihre personenbezogenen Daten verarbeitet, um Direktwerbung zu betreiben, so haben Sie das Recht, jederzeit Widerspruch gegen die Verarbeitung Sie betreffender personenbezogener Daten zum Zwecke derartiger Werbung einzulegen; dies gilt auch für das Profiling, soweit es mit solcher Direktwerbung in Verbindung steht. Wenn Sie widersprechen, werden Ihre personenbezogenen Daten anschließend nicht mehr zum Zwecke der Direktwerbung verwendet (Widerspruch nach Art. 21 Abs. 2 DSGVO).",
  },
  { type: "h3", text: "Beschwerderecht bei der zuständigen Aufsichtsbehörde" },
  {
    type: "p",
    text: "Im Falle von Verstößen gegen die DSGVO steht den Betroffenen ein Beschwerderecht bei einer Aufsichtsbehörde, insbesondere in dem Mitgliedstaat ihres gewöhnlichen Aufenthalts, ihres Arbeitsplatzes oder des Orts des mutmaßlichen Verstoßes zu. Das Beschwerderecht besteht unbeschadet anderweitiger verwaltungsrechtlicher oder gerichtlicher Rechtsbehelfe.",
  },
  { type: "h3", text: "Recht auf Datenübertragbarkeit" },
  {
    type: "p",
    text: "Sie haben das Recht, Daten, die wir auf Grundlage Ihrer Einwilligung oder in Erfüllung eines Vertrags automatisiert verarbeiten, an sich oder an einen Dritten in einem gängigen, maschinenlesbaren Format aushändigen zu lassen. Sofern Sie die direkte Übertragung der Daten an einen anderen Verantwortlichen verlangen, erfolgt dies nur, soweit es technisch machbar ist.",
  },
  { type: "h3", text: "Auskunft, Sperrung, Löschung und Berichtigung" },
  {
    type: "p",
    text: "Sie haben im Rahmen der geltenden gesetzlichen Bestimmungen jederzeit das Recht auf unentgeltliche Auskunft über Ihre gespeicherten personenbezogenen Daten, deren Herkunft und Empfänger und den Zweck der Datenverarbeitung und ggf. ein Recht auf Berichtigung, Sperrung oder Löschung dieser Daten. Hierzu sowie zu weiteren Fragen zum Thema personenbezogene Daten können Sie sich jederzeit unter der im Impressum angegebenen Adresse an uns wenden.",
  },
  { type: "h3", text: "Recht auf Einschränkung der Verarbeitung" },
  {
    type: "p",
    text: "Sie haben das Recht, die Einschränkung der Verarbeitung Ihrer personenbezogenen Daten zu verlangen. Hierzu können Sie sich jederzeit unter der im Impressum angegebenen Adresse an uns wenden. Das Recht auf Einschränkung der Verarbeitung besteht in folgenden Fällen:",
  },
  {
    type: "ul",
    items: [
      "Wenn Sie die Richtigkeit Ihrer bei uns gespeicherten personenbezogenen Daten bestreiten, benötigen wir in der Regel Zeit, um dies zu überprüfen. Für die Dauer der Prüfung haben Sie das Recht, die Einschränkung der Verarbeitung Ihrer personenbezogenen Daten zu verlangen.",
      "Wenn die Verarbeitung Ihrer personenbezogenen Daten unrechtmäßig geschah/geschieht, können Sie statt der Löschung die Einschränkung der Datenverarbeitung verlangen.",
      "Wenn wir Ihre personenbezogenen Daten nicht mehr benötigen, Sie sie jedoch zur Ausübung, Verteidigung oder Geltendmachung von Rechtsansprüchen benötigen, haben Sie das Recht, statt der Löschung die Einschränkung der Verarbeitung Ihrer personenbezogenen Daten zu verlangen.",
      "Wenn Sie einen Widerspruch nach Art. 21 Abs. 1 DSGVO eingelegt haben, muss eine Abwägung zwischen Ihren und unseren Interessen vorgenommen werden. Solange noch nicht feststeht, wessen Interessen überwiegen, haben Sie das Recht, die Einschränkung der Verarbeitung Ihrer personenbezogenen Daten zu verlangen.",
    ],
  },
  {
    type: "p",
    text: "Wenn Sie die Verarbeitung Ihrer personenbezogenen Daten eingeschränkt haben, dürfen diese Daten – von ihrer Speicherung abgesehen – nur mit Ihrer Einwilligung oder zur Geltendmachung, Ausübung oder Verteidigung von Rechtsansprüchen oder zum Schutz der Rechte einer anderen natürlichen oder juristischen Person oder aus Gründen eines wichtigen öffentlichen Interesses der Europäischen Union oder eines Mitgliedstaats verarbeitet werden.",
  },

  { type: "h2", text: "3. Datenerfassung auf unserer Website", id: "datenerfassung" },
  { type: "h3", text: "Server-Log-Dateien" },
  {
    type: "p",
    text: "Der Provider der Seiten erhebt und speichert automatisch Informationen in so genannten Server-Log-Dateien, die Ihr Browser automatisch an uns übermittelt. Dies sind:",
  },
  {
    type: "ul",
    items: [
      "Browsertyp und Browserversion",
      "verwendetes Betriebssystem",
      "Referrer URL",
      "Hostname des zugreifenden Rechners",
      "Uhrzeit der Serveranfrage",
      "IP-Adresse",
    ],
  },
  { type: "p", text: "Eine Zusammenführung dieser Daten mit anderen Datenquellen wird nicht vorgenommen." },
  {
    type: "p",
    text: "Die Erfassung dieser Daten erfolgt auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO. Der Websitebetreiber hat ein berechtigtes Interesse an der technisch fehlerfreien Darstellung und der Optimierung seiner Website – hierzu müssen die Server-Log-Files erfasst werden.",
  },
  { type: "h3", text: "Anfrage per E-Mail, Telefon oder Telefax" },
  {
    type: "p",
    text: "Wenn Sie uns per E-Mail, Telefon oder Telefax kontaktieren, wird Ihre Anfrage inklusive aller daraus hervorgehenden personenbezogenen Daten (Name, Anfrage) zum Zwecke der Bearbeitung Ihres Anliegens bei uns gespeichert und verarbeitet. Diese Daten geben wir nicht ohne Ihre Einwilligung weiter.",
  },
  {
    type: "p",
    text: "Die Verarbeitung dieser Daten erfolgt auf Grundlage von Art. 6 Abs. 1 lit. b DSGVO, sofern Ihre Anfrage mit der Erfüllung eines Vertrags zusammenhängt oder zur Durchführung vorvertraglicher Maßnahmen erforderlich ist. In allen übrigen Fällen beruht die Verarbeitung auf Ihrer Einwilligung (Art. 6 Abs. 1 lit. a DSGVO) und/oder auf unseren berechtigten Interessen (Art. 6 Abs. 1 lit. f DSGVO), da wir ein berechtigtes Interesse an der effektiven Bearbeitung der an uns gerichteten Anfragen haben.",
  },
  {
    type: "p",
    text: "Die von Ihnen an uns per Kontaktanfragen übersandten Daten verbleiben bei uns, bis Sie uns zur Löschung auffordern, Ihre Einwilligung zur Speicherung widerrufen oder der Zweck für die Datenspeicherung entfällt (z. B. nach abgeschlossener Bearbeitung Ihres Anliegens). Zwingende gesetzliche Bestimmungen – insbesondere gesetzliche Aufbewahrungsfristen – bleiben unberührt.",
  },

  /* ---- Ergänzung für die neue Website (bitte rechtlich prüfen lassen) ---- */
  { type: "h2", text: "4. Plugins und Tools", id: "plugins" },
  { type: "h3", text: "Google Maps" },
  {
    type: "p",
    text: "Diese Seite kann über eine 2-Klick-Lösung den Kartendienst Google Maps einbinden. Anbieter ist die Google Ireland Limited, Gordon House, Barrow Street, Dublin 4, Irland. Die Karte wird erst geladen, wenn Sie auf „Karte laden“ klicken. Erst dann wird eine Verbindung zu Servern von Google hergestellt und u. a. Ihre IP-Adresse übertragen. Die Verarbeitung erfolgt auf Grundlage Ihrer Einwilligung (Art. 6 Abs. 1 lit. a DSGVO), die Sie durch den Klick erteilen und jederzeit durch Neuladen der Seite beenden können. Mehr Informationen finden Sie in der Datenschutzerklärung von Google: https://policies.google.com/privacy",
  },
  { type: "h3", text: "Fahrschul-Assistent und Anmeldeformular" },
  {
    type: "p",
    text: "Der Fahrschul-Assistent auf dieser Website läuft vollständig in Ihrem Browser; Ihre Auswahl wird nicht an uns oder Dritte übertragen. Das Anmeldeformular öffnet lediglich Ihr eigenes E-Mail-Programm mit einer vorausgefüllten Nachricht – es gilt der Abschnitt „Anfrage per E-Mail, Telefon oder Telefax“.",
  },
]

/**
 * ⚠️ MUSTER-AGB (Platzhalter). Die bisherige Website hatte keine AGB.
 * Vor dem Livegang durch die echten, rechtlich geprüften AGB der Fahrschule ersetzen.
 */
export const agb: LegalBlock[] = [
  { type: "h2", text: "1. Geltungsbereich", id: "geltungsbereich" },
  {
    type: "p",
    text: "Diese Geschäftsbedingungen gelten für den Ausbildungsvertrag zwischen der Fahrschule Bubla, Inhaber Christian Bubla, und dem Fahrschüler bzw. der Fahrschülerin. Bei Minderjährigen bedarf der Vertrag der Zustimmung der gesetzlichen Vertreter.",
  },
  { type: "h2", text: "2. Vertragsabschluss und Ausbildung", id: "vertrag" },
  {
    type: "p",
    text: "Der Ausbildungsvertrag kommt mit der Unterzeichnung der Anmeldung zustande. Die Ausbildung erfolgt nach der Fahrschüler-Ausbildungsordnung. Die Fahrschule entscheidet nach pädagogischen Gesichtspunkten über den Umfang der praktischen Ausbildung und stellt den Fahrschüler zur Prüfung vor, sobald er den Ausbildungsstand erreicht hat.",
  },
  { type: "h2", text: "3. Entgelte", id: "entgelte" },
  {
    type: "p",
    text: "Es gelten die zum Zeitpunkt des Vertragsabschlusses in der Fahrschule ausgehängten Preise. Mit dem Grundbetrag werden der theoretische Unterricht und die allgemeinen Aufwendungen der Fahrschule abgegolten. Fahrstunden, Sonderfahrten, die Vorstellung zur Prüfung und Lehrmaterial werden gesondert berechnet.",
  },
  { type: "h2", text: "4. Zahlungsbedingungen", id: "zahlung" },
  {
    type: "p",
    text: "Der Grundbetrag ist bei Vertragsabschluss fällig. Fahrstunden sind spätestens vor der jeweiligen Fahrstunde bzw. nach Rechnungsstellung zu bezahlen. Die Entgelte für die Vorstellung zur Prüfung sowie Fremdgebühren sind vor der Prüfung zu entrichten.",
  },
  { type: "h2", text: "5. Absage von Fahrstunden", id: "absage" },
  {
    type: "p",
    text: "Vereinbarte Fahrstunden, die nicht mindestens 24 Stunden vorher abgesagt werden, können ohne Nachweis eines Schadens als Ausfallentschädigung in Höhe von drei Vierteln des Fahrstundenentgelts berechnet werden, es sei denn, der Fahrschüler hat den Ausfall nicht zu vertreten.",
  },
  { type: "h2", text: "6. Kündigung", id: "kuendigung" },
  {
    type: "p",
    text: "Der Ausbildungsvertrag kann vom Fahrschüler jederzeit, von der Fahrschule nur aus wichtigem Grund gekündigt werden. Bereits erbrachte Leistungen werden abgerechnet; der Grundbetrag wird nicht erstattet, wenn der theoretische Unterricht bereits begonnen hat.",
  },
  { type: "h2", text: "7. Ausschluss vom Unterricht", id: "ausschluss" },
  {
    type: "p",
    text: "Die Fahrschule kann Fahrschüler vom Unterricht ausschließen, die unter Einfluss von Alkohol, Drogen oder Medikamenten stehen, die die Fahrtüchtigkeit beeinträchtigen, oder die nicht die erforderlichen Dokumente (z. B. Ausbildungsbescheinigung, Brille) mitführen.",
  },
  { type: "h2", text: "8. Haftung", id: "haftung" },
  {
    type: "p",
    text: "Die Fahrschule haftet für Schäden nur bei Vorsatz und grober Fahrlässigkeit, soweit keine Verletzung von Leben, Körper oder Gesundheit vorliegt. Die Ausbildungsfahrzeuge sind gesetzlich haftpflichtversichert.",
  },
  { type: "h2", text: "9. Schlussbestimmungen", id: "schluss" },
  {
    type: "p",
    text: "Sollten einzelne Bestimmungen unwirksam sein, bleibt die Wirksamkeit der übrigen Bestimmungen unberührt. Es gilt das Recht der Bundesrepublik Deutschland.",
  },
]
