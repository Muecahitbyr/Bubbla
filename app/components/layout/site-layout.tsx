import { motion, useReducedMotion } from "motion/react"
import { useEffect, useRef } from "react"
import { Outlet, useLocation, useNavigationType } from "react-router"
import { easeOutExpo } from "~/lib/motion"
import { Assistant } from "../assistant/assistant"
import { Footer } from "./footer"
import { Navbar } from "./navbar"
import { SmoothScroll, useLenis } from "./smooth-scroll"

export default function SiteLayout() {
  return (
    <SmoothScroll>
      <Navbar />
      <PageTransition />
      <Footer />
      <Assistant />
    </SmoothScroll>
  )
}

function PageTransition() {
  const location = useLocation()
  const navigationType = useNavigationType()
  const lenis = useLenis()
  const reduce = useReducedMotion()
  const firstRender = useRef(true)

  // Bei neuer Seite nach oben springen (Zurück-Button stellt die Position selbst wieder her)
  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false
      return
    }
    if (navigationType !== "POP" && !location.hash) lenis?.scrollTo(0, { immediate: true, force: true })
  }, [location.pathname, location.hash, navigationType, lenis])

  const animateIn = !firstRender.current && !reduce

  return (
    <motion.main
      id="inhalt"
      tabIndex={-1}
      key={location.pathname}
      initial={animateIn ? { opacity: 0 } : false}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, ease: easeOutExpo }}
      className="tone-paper min-h-svh outline-none"
    >
      <Outlet />
    </motion.main>
  )
}
