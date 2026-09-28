import { animate, motion, useMotionValue, useMotionValueEvent, useReducedMotion, useScroll, useTransform } from "motion/react"
import { Phone } from "~/lib/icons"
import { useCallback, useEffect, useRef, useState } from "react"
import { paths, site } from "~/content/site"
import { clamp01, easeOutExpo } from "~/lib/motion"
import { AnimatedWords } from "../ui/animated-headline"
import { ButtonLink } from "../ui/button"
import { cn } from "~/lib/cn"
import { imageSizes, responsiveImage } from "~/lib/images"

const HERO_IMAGE = "/images/fahrschule/bubla-golf.webp"
// Beide Bildkarten nutzen dieselben Angaben → der Browser lädt das Foto nur einmal
const heroImage = responsiveImage(HERO_IMAGE, imageSizes.heroOriginal959)

/** Handy: Oberkante (unter der schwebenden Navigation) und Seitenverhältnis (Höhe/Breite) des Bild-Bands */
const MOBILE_BAND_TOP = 72
const MOBILE_BAND_RATIO = 0.72
const ease = (t: number) => 1 - Math.pow(1 - t, 3)

/**
 * Startseiten-Hero: große, linksbündige Headline, darunter eine Bildkarte.
 * Beim Scrollen wächst die Karte zum Vollbild (Handy: zu einem vollbreiten Querformat-Band,
 * Text darunter), die Headline gleitet weg und eine zweite Aussage erscheint.
 */
export function HomeHero() {
  const ref = useRef<HTMLElement>(null)
  const headRef = useRef<HTMLDivElement>(null)
  // Fest eingebaute Bildkarte: vorgerendert sichtbar (auch ohne JavaScript) und Maßvorlage für die bewegliche Karte
  const slotRef = useRef<HTMLDivElement>(null)
  const [layerOn, setLayerOn] = useState(false)
  const reduce = useReducedMotion()
  const { scrollYProgress: p } = useScroll({ target: ref, offset: ["start start", "end end"] })

  // Gemessene Kartenränder in px. Werte werden direkt gesetzt (useMotionValueEvent) –
  // ein automatisch verknüpftes useTransform(() => …) reagiert im Dev-Modus nicht auf neue Messwerte.
  const dims = useRef({ top: 480, side: 40, bottom: 40, startH: 380, mobile: false, vw: 1440, vh: 900 })
  const clipPath = useMotionValue("inset(480px 40px 40px 40px round 32px)")
  const boxTop = useMotionValue(0)
  const boxSide = useMotionValue(0)
  const boxH = useMotionValue("100%")
  const boxRadius = useMotionValue(0)
  // Desktop: Im Startzustand wird das Foto verkleinert und so verschoben, dass das ganze Motiv
  // in der flachen Karte sitzt; beim Aufziehen wächst es auf Vollbildgröße
  const imgShift = useMotionValue(0)
  const imgScale = useMotionValue(1.06)
  // Bewegliche Karte erst einblenden, wenn sie gemessen ist – bis dahin zeigt die feste Karte das Foto
  const cardOpacity = useMotionValue(0)

  const update = useCallback(() => {
    const t = reduce ? 0 : ease(clamp01(p.get() / 0.5))
    const { top, side, bottom, startH, mobile, vw, vh } = dims.current
    if (!mobile) {
      boxTop.set(0)
      boxSide.set(0)
      boxH.set("100%")
      boxRadius.set(0)
      // Kleinste Größe, bei der das Foto die Karte noch ganz füllt (kein leerer Rand)
      const s0 = Math.min(1, Math.max((vw - 2 * side) / vw, (vh - top - bottom) / vh, 0.8) + 0.02)
      imgScale.set(s0 + (1 - s0) * t)
      // Kartenmitte, leicht nach oben korrigiert (das Auto sitzt im Foto etwas unter der Bildmitte)
      imgShift.set(((top + (vh - bottom)) / 2 - vh / 2 - vh * 0.06) * (1 - t))
      clipPath.set(`inset(${top * (1 - t)}px ${side * (1 - t)}px ${bottom * (1 - t)}px ${side * (1 - t)}px round ${32 * (1 - t)}px)`)
      return
    }
    // Handy: Das Querformat-Foto nicht auf den hohen Bildschirm aufziehen (starker Beschnitt),
    // sondern die Karte selbst zu einem vollbreiten Band unter der Navigation wachsen lassen.
    const lerp = (a: number, b: number) => a + (b - a) * t
    const endH = vw * MOBILE_BAND_RATIO
    clipPath.set("none")
    imgShift.set(0)
    imgScale.set(1.06 - 0.06 * t)
    boxTop.set(lerp(top, MOBILE_BAND_TOP))
    boxSide.set(lerp(side, 0))
    boxH.set(`${lerp(startH, endH)}px`)
    boxRadius.set(lerp(26, 0))
  }, [p, reduce, clipPath, boxTop, boxSide, boxH, boxRadius, imgShift, imgScale])
  useMotionValueEvent(p, "change", update)

  useEffect(() => {
    // Maße direkt von der festen Karte abnehmen – ihre Lage bestimmt allein das CSS
    const measure = () => {
      const slot = slotRef.current
      if (!slot) return
      const vw = window.innerWidth
      const vh = window.innerHeight
      dims.current = {
        top: slot.offsetTop,
        side: slot.offsetLeft,
        bottom: Math.max(0, vh - slot.offsetTop - slot.offsetHeight),
        startH: slot.offsetHeight,
        mobile: vw < 768,
        vw,
        vh,
      }
      update()
    }
    measure()
    const ro = new ResizeObserver(measure)
    if (headRef.current) ro.observe(headRef.current)
    if (slotRef.current) ro.observe(slotRef.current)
    window.addEventListener("resize", measure)

    // Erst einblenden, wenn die Schrift geladen ist (sonst ändert sich die Höhe der Headline noch)
    let cancelled = false
    const fontsReady = document.fonts?.ready ?? Promise.resolve()
    Promise.race([fontsReady, new Promise((r) => setTimeout(r, 300))]).then(() => {
      if (cancelled) return
      measure()
      // Über die feste Karte blenden; danach die feste Karte ausblenden (die bewegliche wächst beim Scrollen über sie hinaus)
      animate(cardOpacity, 1, { duration: reduce ? 0 : 0.3, ease: easeOutExpo }).then(() => {
        if (!cancelled) setLayerOn(true)
      })
    })

    return () => {
      cancelled = true
      ro.disconnect()
      window.removeEventListener("resize", measure)
    }
  }, [cardOpacity, reduce, update])

  // Deckkraft & Co. per Funktion aus dem Scrollwert (nicht über die beschleunigte Scroll-Timeline)
  const range = (a: number, b: number) => (reduce ? 0 : clamp01((p.get() - a) / (b - a)))
  const headOpacity = useTransform(() => 1 - range(0.02, 0.2))
  const headY = useTransform(() => -range(0, 0.3) * 70)
  const headPointer = useTransform(() => (range(0.02, 0.2) > 0.95 ? "none" : "auto"))
  const shade = useTransform(() => range(0.38, 0.6) * 0.6)
  const overlayOpacity = useTransform(() => range(0.5, 0.68))
  const overlayY = useTransform(() => (1 - range(0.5, 0.72)) * 36)

  return (
    <section ref={ref} className="tone-sun relative h-[240vh]" aria-label="Willkommen">
      <div className="sticky top-0 flex h-svh flex-col overflow-hidden">
        <div aria-hidden className="absolute inset-x-0 top-0 h-[70%] bg-gradient-to-b from-white/35 to-transparent" />

        {/* Bewegliche Karte: optisches Duplikat der festen Karte (für Screenreader ausgeblendet) */}
        <motion.div
          aria-hidden
          className="absolute z-10 overflow-hidden will-change-[clip-path]"
          style={{ clipPath, opacity: cardOpacity, top: boxTop, left: boxSide, right: boxSide, height: boxH, borderRadius: boxRadius }}
        >
          <motion.img
            {...heroImage}
            alt=""
            style={{ scale: imgScale, y: imgShift }}
            className="h-full w-full object-cover object-[78%_60%] md:object-[55%_58%]"
            fetchPriority="high"
            decoding="async"
          />
          <motion.div aria-hidden className="absolute inset-0 hidden bg-gradient-to-t from-[#061c33] via-[#061c33]/40 to-transparent md:block" style={{ opacity: shade }} />
        </motion.div>

        {/* Headline – linksbündig, rechts daneben Einleitung & Aktionen */}
        <motion.div ref={headRef} style={{ opacity: headOpacity, y: headY, pointerEvents: headPointer }} className="wrap relative z-20 shrink-0 pt-[calc(var(--nav-offset)+1.5rem)] md:pt-[calc(var(--nav-offset)+3rem)]">
          <p className="kicker mb-4 md:mb-6">Kaufbeuren &amp; Neugablonz</p>
          <div className="grid items-end gap-6 lg:grid-cols-12 lg:gap-10">
            <h1 className="display-xl lg:col-span-8">
              <span className="grad-ink -mb-[0.16em] block pb-[0.16em]">
                <AnimatedWords text="Fahrschule" delay={0.1} />
              </span>
              <span className="grad-blue -mb-[0.16em] block pb-[0.16em]">
                <AnimatedWords text={`${site.name.replace("Fahrschule ", "")}.`} delay={0.25} />
              </span>
            </h1>
            {/* CSS-Einblenden – wartet nicht auf JavaScript */}
            <div className="intro-fade lg:col-span-4 lg:pb-3" style={{ animationDelay: "0.2s" }}>
              <p className="lead hidden max-w-[26rem] sm:block">
                Deine Fahrschule mit <strong>Spaß, Fairness, Erfahrung und Kompetenz</strong> – Theorie viermal pro Woche.
              </p>
              <div className="flex flex-wrap items-center gap-3 sm:mt-6">
                <ButtonLink to={paths.anmeldung}>Jetzt anmelden</ButtonLink>
                <ButtonLink href={site.phone.href} variant="ghost" icon={<Phone className="size-4" aria-hidden />}>
                  {site.phone.display}
                </ButtonLink>
              </div>
            </div>
          </div>
        </motion.div>

        {/*
          Feste Bildkarte im normalen Fluss: vorgerendert sichtbar – auch wenn JavaScript langsam ist oder
          nicht startet. Ihre Lage (nur CSS) ist die Maßvorlage für die bewegliche Karte darüber, die nach dem
          Start deckungsgleich eingeblendet wird und beim Scrollen zum Vollbild wächst.
        */}
        <div
          ref={slotRef}
          className={cn(
            "relative z-0 mx-4 mt-6 mb-6 h-[calc((100vw_-_2rem)*0.95)] min-h-[140px] shrink overflow-hidden rounded-[26px]",
            "md:mx-[max(24px,calc((100vw_-_1280px)/2_+_40px))] md:mt-10 md:mb-[max(24px,5vh)] md:h-auto md:min-h-0 md:flex-1 md:rounded-[32px]",
            layerOn && "invisible",
          )}
        >
          <img {...heroImage} alt="Fahrlehrer der Fahrschule Bubla am weißen Fahrschul-Golf mit Bubla-Beschriftung" className="h-full w-full scale-[1.06] object-cover object-[78%_60%] md:scale-100 md:object-[55%_58%]" fetchPriority="high" decoding="async" />
        </div>

        {/* Aussage auf dem Vollbild (Tablet/Desktop) */}
        <motion.div style={{ opacity: overlayOpacity, y: overlayY }} className="pointer-events-none absolute inset-x-0 bottom-0 z-20 hidden pb-16 text-white md:block md:pb-24">
          <div className="wrap flex items-end justify-between gap-10">
            <p className="display-lg max-w-[12ch]">
              Kaufbeuren <span className="text-sun">&amp; Neugablonz.</span>
            </p>
            <p className="hidden max-w-[20rem] pb-3 text-[19px] leading-snug font-semibold text-white/85 lg:block">
              Theorie {site.hours.theoryDaysShort}, {site.hours.theoryTime} – in der {site.theoryLocation.street}.
            </p>
          </div>
        </motion.div>

        {/* Aussage unter dem Bild-Band (Handy) – Position passend zu MOBILE_BAND_TOP/RATIO */}
        <motion.div
          style={{ opacity: overlayOpacity, y: overlayY, top: `calc(${MOBILE_BAND_TOP}px + ${MOBILE_BAND_RATIO * 100}vw + 28px)` }}
          className="pointer-events-none absolute inset-x-0 z-20 md:hidden"
        >
          <div className="wrap">
            <p className="display-md">
              <span className="grad-ink">Kaufbeuren</span> <span className="grad-blue">&amp; Neugablonz.</span>
            </p>
            <p className="text-muted mt-4 text-[17px] font-semibold">
              Theorie {site.hours.theoryDaysShort}, {site.hours.theoryTime}
            </p>
            <p className="lead mt-6">
              Deine Fahrschule mit <strong>Spaß, Fairness, Erfahrung und Kompetenz.</strong>
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
