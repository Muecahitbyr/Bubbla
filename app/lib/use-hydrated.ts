import { useEffect, useState } from "react"

/**
 * false beim Vorrendern und beim ersten Rendern im Browser, danach true.
 * Für scroll-gekoppelte Werte (Deckkraft je Scrollposition): Bis JavaScript läuft, wird der
 * lesbare Endzustand gezeigt – vorgerendertes HTML und Hydrieren stimmen dabei überein.
 */
export function useHydrated() {
  const [hydrated, setHydrated] = useState(false)
  useEffect(() => setHydrated(true), [])
  return hydrated
}
