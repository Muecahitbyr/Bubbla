/**
 * Alle genutzten Icons – einzeln aus lucide-react geladen statt über das Paket-Hauptmodul.
 * Grund: Im Entwicklungsmodus (npm run dev) lädt der Hauptimport sonst alle 1.500+ Icons (ca. 5 MB) bei jedem Neuladen.
 * Neues Icon: Datei unter node_modules/lucide-react/dist/esm/icons/ suchen und hier ergänzen.
 */
import type { LucideIcon } from "lucide-react"
import ArrowRightIcon from "lucide-react/dist/esm/icons/arrow-right.mjs"
import ArrowUpIcon from "lucide-react/dist/esm/icons/arrow-up.mjs"
import ArrowUpRightIcon from "lucide-react/dist/esm/icons/arrow-up-right.mjs"
import AwardIcon from "lucide-react/dist/esm/icons/award.mjs"
import CalendarDaysIcon from "lucide-react/dist/esm/icons/calendar-days.mjs"
import CheckIcon from "lucide-react/dist/esm/icons/check.mjs"
import CheckCircle2Icon from "lucide-react/dist/esm/icons/circle-check.mjs"
import ChevronDownIcon from "lucide-react/dist/esm/icons/chevron-down.mjs"
import ChevronRightIcon from "lucide-react/dist/esm/icons/chevron-right.mjs"
import ClockIcon from "lucide-react/dist/esm/icons/clock.mjs"
import DownloadIcon from "lucide-react/dist/esm/icons/download.mjs"
import ExternalLinkIcon from "lucide-react/dist/esm/icons/external-link.mjs"
import FlaskConicalIcon from "lucide-react/dist/esm/icons/flask-conical.mjs"
import GraduationCapIcon from "lucide-react/dist/esm/icons/graduation-cap.mjs"
import HeadphonesIcon from "lucide-react/dist/esm/icons/headphones.mjs"
import HeartIcon from "lucide-react/dist/esm/icons/heart.mjs"
import InfoIcon from "lucide-react/dist/esm/icons/info.mjs"
import MailIcon from "lucide-react/dist/esm/icons/mail.mjs"
import MapPinIcon from "lucide-react/dist/esm/icons/map-pin.mjs"
import MessageCircleIcon from "lucide-react/dist/esm/icons/message-circle.mjs"
import NavigationIcon from "lucide-react/dist/esm/icons/navigation.mjs"
import PhoneIcon from "lucide-react/dist/esm/icons/phone.mjs"
import PlusIcon from "lucide-react/dist/esm/icons/plus.mjs"
import RouteIcon from "lucide-react/dist/esm/icons/route.mjs"
import ScrollTextIcon from "lucide-react/dist/esm/icons/scroll-text.mjs"
import SendIcon from "lucide-react/dist/esm/icons/send.mjs"
import SmartphoneIcon from "lucide-react/dist/esm/icons/smartphone.mjs"
import SparklesIcon from "lucide-react/dist/esm/icons/sparkles.mjs"
import XIcon from "lucide-react/dist/esm/icons/x.mjs"

export const ArrowRight: LucideIcon = ArrowRightIcon
export const ArrowUp: LucideIcon = ArrowUpIcon
export const ArrowUpRight: LucideIcon = ArrowUpRightIcon
export const Award: LucideIcon = AwardIcon
export const CalendarDays: LucideIcon = CalendarDaysIcon
export const Check: LucideIcon = CheckIcon
export const CheckCircle2: LucideIcon = CheckCircle2Icon
export const ChevronDown: LucideIcon = ChevronDownIcon
export const ChevronRight: LucideIcon = ChevronRightIcon
export const Clock: LucideIcon = ClockIcon
export const Download: LucideIcon = DownloadIcon
export const ExternalLink: LucideIcon = ExternalLinkIcon
export const FlaskConical: LucideIcon = FlaskConicalIcon
export const GraduationCap: LucideIcon = GraduationCapIcon
export const Headphones: LucideIcon = HeadphonesIcon
export const Heart: LucideIcon = HeartIcon
export const Info: LucideIcon = InfoIcon
export const Mail: LucideIcon = MailIcon
export const MapPin: LucideIcon = MapPinIcon
export const MessageCircle: LucideIcon = MessageCircleIcon
export const Navigation: LucideIcon = NavigationIcon
export const Phone: LucideIcon = PhoneIcon
export const Plus: LucideIcon = PlusIcon
export const Route: LucideIcon = RouteIcon
export const ScrollText: LucideIcon = ScrollTextIcon
export const Send: LucideIcon = SendIcon
export const Smartphone: LucideIcon = SmartphoneIcon
export const Sparkles: LucideIcon = SparklesIcon
export const X: LucideIcon = XIcon
export type { LucideIcon }
