import { reactRouter } from "@react-router/dev/vite"
import tailwindcss from "@tailwindcss/vite"
import { defineConfig } from "vite"

export default defineConfig({
  plugins: [tailwindcss(), reactRouter()],
  resolve: { tsconfigPaths: true },
  // Build-Ausgabe, Testergebnisse und Screenshots nicht beobachten – sonst lädt `npm run build` die offene Dev-Seite neu
  server: { watch: { ignored: ["**/build/**", "**/test-results/**", "**/design-review/**"] } },
  // Datum des Builds (JJJJ-MM-TT) – blendet vergangene Termine aus, ohne Hydration-Unterschiede
  define: { BUILD_DATE: JSON.stringify(new Date().toISOString().slice(0, 10)) },
})
