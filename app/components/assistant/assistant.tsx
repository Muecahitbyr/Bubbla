import { AnimatePresence, motion, useReducedMotion } from "motion/react"
import { ArrowUpRight, MessageCircle, SendHorizontal, X } from "lucide-react"
import { useEffect, useId, useRef, useState, type FormEvent } from "react"
import { Link, useLocation } from "react-router"
import { answerFor, answerForIntent, greeting, suggestions, type AssistantAnswer, type AssistantLink } from "~/content/assistant"
import { cn } from "~/lib/cn"
import { easeOutExpo } from "~/lib/motion"

type Message = { id: number; from: "bot" | "user"; answer?: AssistantAnswer; text?: string }

/**
 * Fahrschul-Assistent (unten rechts). Regelbasiert, läuft komplett im Browser und
 * antwortet nur mit Angaben aus app/content/ – es werden keine Daten versendet.
 */
export function Assistant() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([{ id: 0, from: "bot", answer: greeting }])
  const [input, setInput] = useState("")
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
    // Fokus aufs Chatfenster, nicht ins Eingabefeld – so öffnet sich auf dem Handy
    // keine Tastatur. Die Tastatur erscheint erst, wenn man ins Eingabefeld tippt.
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

  useEffect(() => {
    const el = listRef.current
    if (el) el.scrollTo({ top: el.scrollHeight, behavior: reduce ? "auto" : "smooth" })
  }, [messages, typing, reduce])

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

  const onSubmit = (e: FormEvent) => {
    e.preventDefault()
    const q = input.trim()
    if (!q) return
    setInput("")
    reply(q, answerFor(q).answer)
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
                <span className="bg-sun text-ink grid size-10 place-items-center rounded-full text-[15px] font-extrabold">B</span>
                <div>
                  <p id={titleId} className="text-[16px] leading-tight font-bold text-white">
                    Fahrschul-Assistent
                  </p>
                  <p className="text-muted text-[12.5px]">Antworten aus den Angaben dieser Website</p>
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

            <div ref={listRef} className="flex-1 space-y-3 overflow-y-auto overscroll-contain px-4 py-5" aria-live="polite" aria-relevant="additions">
              {messages.map((m) => (m.from === "user" ? <UserBubble key={m.id} text={m.text!} /> : <BotBubble key={m.id} answer={m.answer!} />))}
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

            <div className="border-t border-black/[0.06] px-3 pt-3 pb-3">
              <div className="no-scrollbar -mx-3 mb-3 flex gap-2 overflow-x-auto px-3" role="group" aria-label="Vorgeschlagene Fragen">
                {suggestions.map((s) => (
                  <button
                    key={s.intent}
                    type="button"
                    onClick={() => reply(s.label, answerForIntent(s.intent))}
                    className="bg-mist hover:bg-tile-2 text-bubla shrink-0 rounded-full px-3.5 py-2 text-[13px] font-semibold whitespace-nowrap transition-colors"
                  >
                    {s.label}
                  </button>
                ))}
              </div>
              <form onSubmit={onSubmit} className="flex items-center gap-2">
                <label htmlFor={`${titleId}-input`} className="sr-only">
                  Deine Frage
                </label>
                <input
                  id={`${titleId}-input`}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Frag mich etwas …"
                  autoComplete="off"
                  className="bg-mist focus:ring-bubla-bright min-w-0 flex-1 rounded-full px-4 py-3 text-[16px] outline-none focus:ring-2"
                />
                <button type="submit" className="bg-bubla grid size-12 shrink-0 place-items-center rounded-full text-white disabled:opacity-40" disabled={!input.trim()} aria-label="Frage senden">
                  <SendHorizontal className="size-5" aria-hidden />
                </button>
              </form>
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
          open ? "bg-night text-white" : "bg-sun text-ink hover:-translate-y-0.5",
        )}
      >
        {open ? <X className="size-5" aria-hidden /> : <MessageCircle className="size-5" aria-hidden />}
        <span className="text-[14px] md:text-[15px]">{open ? "Schließen" : "Fragen?"}</span>
      </button>
    </>
  )
}

function UserBubble({ text }: { text: string }) {
  return (
    <div className="flex justify-end">
      <p className="bg-bubla max-w-[85%] rounded-2xl rounded-br-md px-4 py-2.5 text-[15px] text-white">{text}</p>
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
