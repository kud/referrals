import { slugify } from "@/lib/site"

// Talon card-stock tints (light), mirrored from globals.css for OG images.
const TINTS: Record<string, string> = {
  banking: "#dde5ea",
  energy: "#ebe5cf",
  shopping: "#ecdcd5",
  transport: "#e1ddea",
  travel: "#d7e6e1",
}

export const talon = {
  bg: "#f3f2ee",
  ink: "#2b2b2a",
  muted: "#6b6a65",
  line: "#c4c1b6",
  perforation: "rgba(43, 43, 42, 0.32)",
  tint: (category: string) => TINTS[slugify(category)] ?? "#e7e5de",
}
