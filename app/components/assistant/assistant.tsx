import { AnimatePresence, motion, useReducedMotion } from "motion/react"
import { ArrowUpRight, MessageCircle, X } from "lucide-react"
import { useEffect, useId, useRef, useState } from "react"
import { Link, useLocation } from "react-router"
import { greeting, questionGroups, type AssistantAnswer, type AssistantLink, type Question } from "~/content/assistant"
import { cn } from "~/lib/cn"
import { easeOutExpo } from "~/lib/motion"

type Message = { id: number; from: "bot" | "user"; answer?: AssistantAnswer; text?: string }

/**
 * Fahrschul-Assistent (unten rechts): alle Fragen zum Antippen, kein Freitext.
 * Läuft komplett im Browser und antwortet nur mit Angaben aus app/content/.
 */
export function Assistant() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([{ id: 0, from: "bot", answer: greeting }])
  const [typing, setTyping] = useState(false)
  const nextId = useRef(1)
  const listRef = useRef<HTMLDivElement>(null)
  const panelRef = useRef<HTMLDivElement>(null)
  const toggleRef = useRef<HTMLButtonElement>(null)
  const reduce = useReducedMotion()
  const titleId = useId()
  const location = useLocation()

  // Beim Seitenwechsel schließen
  useEffect(() => setOpen(false), [location.pathname])

  useEffect(() => {
    if (!open) return
    // Fokus aufs Chatfenster (für Tastatur & Screenreader)
    panelRef.current?.focus({ preventScroll: true })
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false)
        toggleRef.current?.focus()
      }
    }
    // Klick/Tipp außerhalb des Chatfensters schließt es (der Chat-Button regelt sich selbst)
    const onPointerDown = (e: PointerEvent) => {
      const target = e.target as Node
      if (panelRef.current?.contains(target) || toggleRef.current?.contains(target)) return
      setOpen(false)
    }
    window.addEventListener("keydown", onKey)
    document.addEventListener("pointerdown", onPointerDown)
    return () => {
      window.removeEventListener("keydown", onKey)
      document.removeEventListener("pointerdown", onPointerDown)
    }
  }, [open])

  // Nach einer Frage zur gestellten Frage scrollen – die Antwort liest man dann von oben,
  // die Fragenliste folgt darunter
  useEffect(() => {
    const el = listRef.current
    if (!el || messages.length < 2) return
    const last = el.querySelector<HTMLElement>("[data-last-question]")
    if (last) el.scrollTo({ top: last.offsetTop - 12, behavior: reduce ? "auto" : "smooth" })
  }, [messages, typing, reduce])

  // Jede Frage bleibt jederzeit antippbar und sieht immer gleich aus
  const ask = (q: Question) => reply(q.label, q.answer())

  const reply = (question: string, answer: AssistantAnswer) => {
    setMessages((m) => [...m, { id: nextId.current++, from: "user", text: question }])
    setTyping(true)
    window.setTimeout(
      () => {
        setTyping(false)
        setMessages((m) => [...m, { id: nextId.current++, from: "bot", answer }])
      },
      reduce ? 0 : 450,
    )
  }

  return (
    <>
      <AnimatePresence>
        {open && (
          <motion.div
            key="panel"
            ref={panelRef}
            tabIndex={-1}
            role="dialog"
            aria-modal="false"
            aria-labelledby={titleId}
            initial={reduce ? false : { opacity: 0, y: 16, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.97, transition: { duration: 0.18 } }}
            transition={{ duration: 0.4, ease: easeOutExpo }}
            data-lenis-prevent
            className="fixed right-2 bottom-[72px] left-2 z-[60] flex outline-none max-h-[min(560px,70svh)] md:max-h-[min(640px,calc(100svh-var(--nav-offset)-84px))] origin-bottom-right flex-col overflow-hidden rounded-[28px] bg-white text-ink shadow-[0_30px_90px_-20px_rgb(6_28_51/0.55)] ring-1 ring-black/5 sm:left-auto sm:w-[400px] md:right-5 md:bottom-[96px]"
          >
            <div className="tone-night flex items-center justify-between gap-3 px-5 py-4">
              <div className="flex items-center gap-3">
                <span className="grid size-10 shrink-0 place-items-center rounded-full bg-white">
                  <img src="/images/b-mark.svg" alt="" width={64} height={64} className="size-8" />
                </span>
                <div>
                  <p id={titleId} className="text-[16px] leading-tight font-bold text-white">
                    Fahrschul-Assistent
                  </p>
                  <p className="text-muted text-[12.5px]">Frage antippen – Antwort aus dieser Website</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => {
                  setOpen(false)
                  toggleRef.current?.focus()
                }}
                className="grid size-9 place-items-center rounded-full text-white/80 hover:bg-white/10 hover:text-white"
                aria-label="Assistent schließen"
              >
                <X className="size-5" aria-hidden />
              </button>
            </div>

            <div ref={listRef} className="relative flex-1 space-y-3 overflow-y-auto overscroll-contain px-4 py-5">
              <div aria-live="polite" aria-relevant="additions" className="space-y-3">
                {messages.map((m, i) =>
                  m.from === "user" ? (
                    <UserBubble key={m.id} text={m.text!} last={i === lastUserIndex(messages)} />
                  ) : (
                    <BotBubble key={m.id} answer={m.answer!} />
                  ),
                )}
                {typing && (
                  <div className="bg-mist w-fit rounded-2xl rounded-bl-md px-4 py-3" aria-label="Assistent schreibt">
                    <span className="flex gap-1">
                      {[0, 1, 2].map((i) => (
                        <span key={i} className="bg-bubla/50 size-1.5 animate-bounce rounded-full" style={{ animationDelay: `${i * 120}ms` }} />
                      ))}
                    </span>
                  </div>
                )}
              </div>

              {/* Alle Fragen – immer sichtbar am Ende des Verlaufs */}
              {!typing && (
                <div className="space-y-4 pt-3">
                  {questionGroups.map((g) => (
                    <div key={g.title} role="group" aria-label={g.title}>
                      <p className="text-muted mb-2 text-[12px] font-bold tracking-[0.08em] uppercase">{g.title}</p>
                      <div className="flex flex-wrap gap-2">
                        {g.questions.map((q) => (
                          <button
                            key={q.id}
                            type="button"
                            onClick={() => ask(q)}
                            className="bg-sun text-ink rounded-full px-3.5 py-2 text-left text-[13.5px] leading-tight font-semibold transition-[filter,transform] hover:brightness-95 active:scale-[0.97]"
                          >
                            {q.label}
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        ref={toggleRef}
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-label={open ? "Fahrschul-Assistent schließen" : "Fahrschul-Assistent öffnen"}
        className={cn(
          "fixed right-3 bottom-3 z-[60] inline-flex h-12 items-center gap-2 rounded-full pr-4 pl-3.5 font-bold md:pr-5 md:pl-4 shadow-[0_16px_40px_-12px_rgb(6_28_51/0.55)] transition-all duration-300 active:scale-95 md:right-5 md:bottom-5 md:h-[60px]",
          open ? "bg-night text-white" : "bg-night text-white ring-2 ring-white/70 hover:-translate-y-0.5",
        )}
      >
        {open ? <X className="size-5" aria-hidden /> : <MessageCircle className="text-sun size-5" aria-hidden />}
        <span className="text-[14px] md:text-[15px]">{open ? "Schließen" : "Fragen?"}</span>
      </button>
    </>
  )
}

const lastUserIndex = (messages: Message[]) => messages.map((m) => m.from).lastIndexOf("user")

function UserBubble({ text, last }: { text: string; last: boolean }) {
  return (
    <div className="flex justify-end" data-last-question={last || undefined}>
      <p className="bg-night max-w-[85%] rounded-2xl rounded-br-md px-4 py-2.5 text-[15px] text-white">{text}</p>
    </div>
  )
}

function BotBubble({ answer }: { answer: AssistantAnswer }) {
  return (
    <div className="max-w-[92%]">
      <div className="bg-mist space-y-1.5 rounded-2xl rounded-bl-md px-4 py-3 text-[15px] leading-snug tabular-nums">
        {answer.text.map((t, i) => (
          <p key={i}>{t}</p>
        ))}
      </div>
      {answer.links && answer.links.length > 0 && (
        <div className="mt-2 flex flex-wrap gap-2">
          {answer.links.map((l) => (
            <AnswerLink key={l.to} link={l} />
          ))}
        </div>
      )}
    </div>
  )
}

function AnswerLink({ link }: { link: AssistantLink }) {
  const cls = "inline-flex items-center gap-1 rounded-full bg-white px-3 py-1.5 text-[13px] font-semibold text-bubla ring-1 ring-bubla/25 hover:bg-mist"
  if (link.to.startsWith("/"))
    return (
      <Link to={link.to} className={cls}>
        {link.label} <ArrowUpRight className="size-3.5" aria-hidden />
      </Link>
    )
  const external = link.to.startsWith("http")
  return (
    <a href={link.to} className={cls} target={external ? "_blank" : undefined} rel={external ? "noopener noreferrer" : undefined}>
      {link.label} <ArrowUpRight className="size-3.5" aria-hidden />
    </a>
  )
}
