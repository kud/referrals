import { slugify } from "@/lib/site"

// Talon card-stock tints. A category maps to one of six families so that the
// live Notion types (finance, home, food, ride-hailing, tech, travel) and
// near synonyms share a colour. Unknown categories fall back to plain stock.
// The light values mirror globals.css for the OG images.
export type TintFamily = "finance" | "home" | "food" | "ride" | "travel" | "tech"

const FAMILIES: Record<string, TintFamily> = {
  finance: "finance",
  banking: "finance",
  bank: "finance",
  investing: "finance",
  savings: "finance",
  home: "home",
  energy: "home",
  utilities: "home",
  broadband: "home",
  internet: "home",
  food: "food",
  groceries: "food",
  shopping: "food",
  "ride-hailing": "ride",
  transport: "ride",
  mobility: "ride",
  travel: "travel",
  tech: "tech",
  software: "tech",
  cloud: "tech",
}

const LIGHT: Record<TintFamily, string> = {
  finance: "#dde5ea",
  home: "#ebe5cf",
  food: "#ecdcd5",
  ride: "#e1ddea",
  travel: "#d7e6e1",
  tech: "#e2e5d9",
}

export const tintFamily = (category: string): TintFamily | null =>
  FAMILIES[slugify(category)] ?? null

export const talon = {
  bg: "#f3f2ee",
  ink: "#2b2b2a",
  muted: "#6b6a65",
  line: "#c4c1b6",
  perforation: "rgba(43, 43, 42, 0.32)",
  tint: (category: string) => {
    const family = tintFamily(category)
    return family ? LIGHT[family] : "#e7e5de"
  },
}
