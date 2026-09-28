/** Datum des Builds (JJJJ-MM-TT), gesetzt in vite.config.ts */
declare const BUILD_DATE: string

/** Einzelne lucide-Icons (siehe app/lib/icons.ts) */
declare module "lucide-react/dist/esm/icons/*.mjs" {
  const Icon: import("lucide-react").LucideIcon
  export default Icon
}
