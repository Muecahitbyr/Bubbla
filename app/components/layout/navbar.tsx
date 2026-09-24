import { AnimatePresence, motion } from "motion/react"
import { ChevronDown, Phone } from "lucide-react"
import { useEffect, useRef, useState } from "react"
import { Link, NavLink, useLocation } from "react-router"
import { categoryLabels, classes, type Category } from "~/content/classes"
import { mainNav, paths, site } from "~/content/site"
import { cn } from "~/lib/cn"
import { easeOutExpo } from "~/lib/motion"
import { Logo } from "../ui/logo"
import { Plate } from "../ui/plate"
import { useLenis } from "./smooth-scroll"

const moreLinks = [
  { label: "Alle Klassen", to: paths.klassen },
  { label: "Preise", to: paths.preise },
  { label: "Ablauf zum Führerschein", to: paths.info },
  { label: "Theorieunterricht", to: paths.unterricht },
  { label: "Anmeldung", to: paths.anmeldung },
]

/** Schwebende Pill-Navigation mit Flyout „Klassen“ und mobilem Vollbild-Menü */
export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [flyout, setFlyout] = useState(false)
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined)
  const location = useLocation()
  const lenis = useLenis()

  useEffect(() => {
    setMenuOpen(false)
    setFlyout(false)
  }, [location.pathname])

  useEffect(() => {
    if (menuOpen) lenis?.stop()
    else lenis?.start()
    document.documentElement.style.overflow = menuOpen ? "hidden" : ""
  }, [menuOpen, lenis])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMenuOpen(false)
        setFlyout(false)
      }
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [])

  const open = () => {
    clearTimeout(timer.current)
    setFlyout(true)
  }
  const close = () => {
    clearTimeout(timer.current)
    timer.current = setTimeout(() => setFlyout(false), 180)
  }

  const klassenActive = [paths.klassen, ...classes.map((c) => c.path)].includes(location.pathname as never)

  return (
    <>
      <a href="#inhalt" className="bg-sun text-ink sr-only z-[70] rounded-full px-5 py-2.5 font-semibold focus:not-sr-only focus:fixed focus:top-3 focus:left-3">
        Zum Inhalt springen
      </a>
      <header className="fixed inset-x-0 top-2 z-50 md:top-3" onMouseLeave={close}>
        <div className="wrap !px-2 sm:!px-4 md:!px-6">
          <nav className={cn("glass-pill flex h-[54px] items-center justify-between rounded-full pr-2 pl-4 text-ink md:h-[60px] md:pl-5", (flyout || menuOpen) && "!bg-white")} aria-label="Hauptnavigation">
            <Link to={paths.home} aria-label={`${site.name} – Startseite`} className="relative z-10 shrink-0 transition-opacity hover:opacity-80">
              <Logo className="h-[34px] md:h-[40px]" />
            </Link>

            <ul className="hidden items-center gap-1 lg:flex">
              {mainNav.slice(1).map((item) => {
                const isKlassen = item.to === paths.klassen
                return (
                  <li key={item.to} onMouseEnter={isKlassen ? open : close}>
                    <NavLink
                      to={item.to}
                      prefetch="intent"
                      className={({ isActive }) =>
                        cn(
                          "inline-flex items-center gap-1 rounded-full px-3.5 py-2 text-[14px] font-semibold tracking-[-0.01em] transition-colors",
                          isActive || (isKlassen && klassenActive) ? "bg-sun text-ink" : "text-ink/75 hover:bg-mist hover:text-ink",
                        )
                      }
                    >
                      {item.label}
                    </NavLink>
                    {isKlassen && (
                      <button
                        type="button"
                        className="sr-only focus:not-sr-only focus:rounded-full focus:px-1"
                        aria-expanded={flyout}
                        aria-controls="klassen-flyout"
                        aria-label="Untermenü Klassen öffnen"
                        onClick={() => setFlyout((v) => !v)}
                      >
                        <ChevronDown className="size-4" aria-hidden />
                      </button>
                    )}
                  </li>
                )
              })}
            </ul>

            <div className="flex items-center gap-1">
              <a href={site.phone.href} className="hidden items-center gap-1.5 rounded-full px-3 py-2 text-[14px] font-semibold text-ink/75 transition-colors hover:text-ink xl:inline-flex">
                <Phone className="size-[15px]" aria-hidden /> {site.phone.display}
              </a>
              <a href={site.phone.href} aria-label={`Anrufen: ${site.phone.display}`} className="grid size-10 place-items-center rounded-full text-ink/80 hover:bg-black/[0.04] xl:hidden">
                <Phone className="size-[17px]" aria-hidden />
              </a>
              <Link to={paths.anmeldung} className="bg-sun text-ink hidden rounded-full px-4 py-2 text-[14px] font-bold transition-transform active:scale-95 sm:inline-flex md:px-5 md:py-2.5">
                Anmelden
              </Link>
              <button
                type="button"
                className="relative z-10 grid size-11 place-items-center rounded-full hover:bg-black/[0.04] lg:hidden"
                aria-label={menuOpen ? "Menü schließen" : "Menü öffnen"}
                aria-expanded={menuOpen}
                aria-controls="mobile-menu"
                onClick={() => setMenuOpen((v) => !v)}
              >
                <span className="relative block h-[11px] w-[18px]">
                  <span className={cn("absolute left-0 h-[2px] w-full rounded bg-current transition-all duration-500 ease-[var(--ease-out-expo)]", menuOpen ? "top-1/2 -translate-y-1/2 rotate-45" : "top-0")} />
                  <span className={cn("absolute left-0 h-[2px] w-full rounded bg-current transition-all duration-500 ease-[var(--ease-out-expo)]", menuOpen ? "top-1/2 -translate-y-1/2 -rotate-45" : "top-full -translate-y-full")} />
                </span>
              </button>
            </div>
          </nav>

          {/* Flyout „Klassen“ */}
          <AnimatePresence>
            {flyout && (
              <motion.div
                id="klassen-flyout"
                key="flyout"
                initial={{ opacity: 0, y: -8, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -6, scale: 0.98 }}
                transition={{ duration: 0.35, ease: easeOutExpo }}
                className="absolute inset-x-0 mx-auto mt-2 hidden max-w-[1040px] origin-top px-6 lg:block"
                onMouseEnter={open}
              >
                <div className="grid grid-cols-12 gap-8 rounded-[28px] bg-white p-8 text-ink shadow-[0_30px_80px_-30px_rgb(6_28_51/0.45)] ring-1 ring-black/5">
                  {(["auto", "zweirad"] as Category[]).map((cat) => (
                    <div key={cat} className="col-span-4">
                      <p className="kicker mb-4">{categoryLabels[cat]}</p>
                      <ul className="space-y-0.5">
                        {classes
                          .filter((c) => c.category === cat)
                          .map((c, i) => (
                            <motion.li key={c.path} initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.03 * i + 0.05, duration: 0.4, ease: easeOutExpo }}>
                              <Link to={c.path} prefetch="intent" className="group hover:bg-mist flex items-center gap-3 rounded-xl px-2 py-1.5 transition-colors">
                                <Plate code={c.code} size="sm" className="min-w-[4.2rem]" />
                                <span className="group-hover:text-bubla text-[14px] leading-tight font-semibold">{c.name}</span>
                              </Link>
                            </motion.li>
                          ))}
                      </ul>
                    </div>
                  ))}
                  <div className="border-line col-span-4 border-l pl-8">
                    <p className="text-muted mb-4 text-[13px] font-semibold">Mehr zum Führerschein</p>
                    <ul className="space-y-2.5">
                      {moreLinks.map((l, i) => (
                        <motion.li key={l.to} initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.04 * i + 0.08, duration: 0.4 }}>
                          <Link to={l.to} className="hover:text-bubla text-[15px] font-semibold text-ink/85">
                            {l.label}
                          </Link>
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </header>

      <AnimatePresence>
        {flyout && (
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 hidden bg-[#061c33]/20 backdrop-blur-md lg:block"
            onMouseEnter={close}
            onClick={() => setFlyout(false)}
            aria-hidden
          />
        )}
      </AnimatePresence>

      {/* Mobiles Vollbild-Menü */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="mobile-menu"
            key="mobile"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.2 } }}
            className="tone-night fixed inset-0 z-40 overflow-y-auto pt-[calc(var(--nav-offset)+1.5rem)] pb-12 lg:hidden"
          >
            <nav className="wrap" aria-label="Mobile Navigation">
              <ul>
                {mainNav.map((item, i) => (
                  <motion.li key={item.to} initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.03 * i, duration: 0.5, ease: easeOutExpo }}>
                    <NavLink
                      to={item.to}
                      className={({ isActive }) => cn("block py-1.5 text-[30px] leading-tight font-extrabold tracking-[-0.035em]", isActive ? "text-sun" : "text-white")}
                    >
                      {item.label}
                    </NavLink>
                  </motion.li>
                ))}
              </ul>
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.25 }} className="border-line mt-8 border-t pt-7">
                <div className="grid grid-cols-1 gap-7 min-[400px]:grid-cols-2">
                  {(["auto", "zweirad"] as Category[]).map((cat) => (
                    <div key={cat}>
                      <p className="text-muted mb-3 text-[13px] font-semibold">{categoryLabels[cat]}</p>
                      <ul className="space-y-2.5">
                        {classes
                          .filter((c) => c.category === cat)
                          .map((c) => (
                            <li key={c.path}>
                              <Link to={c.path} className="flex items-center gap-3 text-[15px] font-semibold text-white">
                                <Plate code={c.code} size="sm" className="min-w-[4.2rem]" /> <span className="min-w-0">{c.name}</span>
                              </Link>
                            </li>
                          ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </motion.div>
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.35 }} className="mt-10 grid gap-3">
                <Link to={paths.anmeldung} className="bg-sun text-ink rounded-full py-3.5 text-center font-bold">
                  Jetzt anmelden
                </Link>
                <a href={site.phone.href} className="inline-flex items-center justify-center gap-2 rounded-full py-3.5 font-semibold text-white ring-1 ring-white/25">
                  <Phone className="size-4" aria-hidden /> {site.phone.display}
                </a>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
