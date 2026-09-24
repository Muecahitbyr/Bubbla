import { animate, motion, useMotionValue, useMotionValueEvent, useReducedMotion, useScroll, useTransform } from "motion/react"
import { Phone } from "lucide-react"
import { useCallback, useEffect, useRef } from "react"
import { paths, site } from "~/content/site"
import { clamp01, easeOutExpo } from "~/lib/motion"
import { AnimatedWords } from "../ui/animated-headline"
import { ButtonLink } from "../ui/button"

/** Wird auch in root.tsx vorgeladen – beide Stellen müssen dasselbe Bild nennen */
export const HERO_IMAGE = "/images/stock/golf-landstrasse.webp"

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
  const reduce = useReducedMotion()
  const { scrollYProgress: p } = useScroll({ target: ref, offset: ["start start", "end end"] })

  // Gemessene Kartenränder in px. Werte werden direkt gesetzt (useMotionValueEvent) –
  // ein automatisch verknüpftes useTransform(() => …) reagiert im Dev-Modus nicht auf neue Messwerte.
  const dims = useRef({ top: 480, side: 40, bottom: 40, mobile: false, vw: 1440, vh: 900 })
  const clipPath = useMotionValue("inset(480px 40px 40px 40px round 32px)")
  const boxTop = useMotionValue(0)
  const boxSide = useMotionValue(0)
  const boxH = useMotionValue("100%")
  const boxRadius = useMotionValue(0)
  // Desktop: Im Startzustand wird das Foto verkleinert und so verschoben, dass das ganze Motiv
  // in der flachen Karte sitzt; beim Aufziehen wächst es auf Vollbildgröße
  const imgShift = useMotionValue(0)
  const imgScale = useMotionValue(1.06)
  // Karte erst einblenden, wenn sie gemessen ist – sonst springt sie beim Laden
  const cardOpacity = useMotionValue(0)

  const update = useCallback(() => {
    const t = reduce ? 0 : ease(clamp01(p.get() / 0.5))
    const { top, side, bottom, mobile, vw, vh } = dims.current
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
    const startH = Math.max(140, Math.min((vw - 2 * side) * 0.95, vh - top - 24))
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
    const measure = () => {
      if (!headRef.current) return
      const vw = window.innerWidth
      const vh = window.innerHeight
      const mobile = vw < 768
      const top = headRef.current.offsetTop + headRef.current.offsetHeight + (mobile ? 24 : 40)
      dims.current = {
        top,
        side: mobile ? 16 : Math.max(24, (vw - 1280) / 2 + 40),
        bottom: Math.max(24, vh * 0.05),
        mobile,
        vw,
        vh,
      }
      update()
    }
    measure()
    const ro = new ResizeObserver(measure)
    if (headRef.current) ro.observe(headRef.current)
    window.addEventListener("resize", measure)

    // Erst einblenden, wenn die Schrift geladen ist (sonst ändert sich die Höhe der Headline noch)
    let cancelled = false
    const fontsReady = document.fonts?.ready ?? Promise.resolve()
    Promise.race([fontsReady, new Promise((r) => setTimeout(r, 800))]).then(() => {
      if (cancelled) return
      measure()
      animate(cardOpacity, 1, { duration: reduce ? 0 : 0.9, ease: easeOutExpo })
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
    <section ref={ref} className="tone-paper relative h-[240vh]" aria-label="Willkommen">
      <div className="sticky top-0 h-svh overflow-hidden">
        <div aria-hidden className="absolute inset-x-0 top-0 h-[70%] bg-gradient-to-b from-[#e6f0fb] to-transparent" />

        <motion.div
          className="absolute overflow-hidden will-change-[clip-path]"
          style={{ clipPath, opacity: cardOpacity, top: boxTop, left: boxSide, right: boxSide, height: boxH, borderRadius: boxRadius }}
        >
          <motion.img
            src={HERO_IMAGE}
            alt="VW Golf fährt auf einer Landstraße"
            style={{ scale: imgScale, y: imgShift }}
            className="h-full w-full object-cover object-[55%_58%]"
            fetchPriority="high"
            decoding="async"
          />
          <motion.div aria-hidden className="absolute inset-0 hidden bg-gradient-to-t from-[#061c33] via-[#061c33]/40 to-transparent md:block" style={{ opacity: shade }} />
        </motion.div>

        {/* Headline – linksbündig, rechts daneben Einleitung & Aktionen */}
        <motion.div ref={headRef} style={{ opacity: headOpacity, y: headY, pointerEvents: headPointer }} className="wrap relative pt-[calc(var(--nav-offset)+1.5rem)] md:pt-[calc(var(--nav-offset)+3rem)]">
          <p className="kicker mb-4 md:mb-6">Kaufbeuren &amp; Neugablonz</p>
          <div className="grid items-end gap-6 lg:grid-cols-12 lg:gap-10">
            <h1 className="display-xl lg:col-span-8">
              <span className="grad-ink -mb-[0.16em] block pb-[0.16em]">
                <AnimatedWords text="Mit Spaß" delay={0.1} />
              </span>
              <span className="grad-blue -mb-[0.16em] block pb-[0.16em]">
                <AnimatedWords text="zum Erfolg." delay={0.25} />
              </span>
            </h1>
            <motion.div
              className="lg:col-span-4 lg:pb-3"
              initial={reduce ? false : { opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.55, ease: easeOutExpo }}
            >
              <p className="lead hidden max-w-[26rem] sm:block">
                Deine Fahrschule mit <strong>Spaß, Fairness, Erfahrung und Kompetenz</strong> – Theorie viermal pro Woche.
              </p>
              <div className="flex flex-wrap items-center gap-3 sm:mt-6">
                <ButtonLink to={paths.anmeldung}>Jetzt anmelden</ButtonLink>
                <ButtonLink href={site.phone.href} variant="ghost" icon={<Phone className="size-4" aria-hidden />}>
                  {site.phone.display}
                </ButtonLink>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Aussage auf dem Vollbild (Tablet/Desktop) */}
        <motion.div style={{ opacity: overlayOpacity, y: overlayY }} className="pointer-events-none absolute inset-x-0 bottom-0 hidden pb-16 text-white md:block md:pb-24">
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
          className="pointer-events-none absolute inset-x-0 md:hidden"
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
