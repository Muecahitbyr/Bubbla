import { defineConfig, devices } from "@playwright/test"

/**
 * Tests laufen gegen den statischen Build (build/client).
 * Vorher: npm run build   ·   Dann: npm test
 */
export default defineConfig({
  testDir: "tests",
  timeout: 180_000,
  expect: { timeout: 10_000 },
  fullyParallel: true,
  workers: 4,
  reporter: [["list"]],
  use: { baseURL: "http://localhost:4180" },
  webServer: {
    command: "npx serve build/client -l 4180 --no-clipboard",
    url: "http://localhost:4180",
    reuseExistingServer: true,
  },
  projects: [
    { name: "chromium", use: { ...devices["Desktop Chrome"] } },
    { name: "webkit", use: { ...devices["Desktop Safari"] } },
  ],
})
