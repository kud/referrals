const CATEGORY_EMOJI: Record<string, string> = {
  finance: "🏦",
  food: "🍔",
  home: "🏠",
  "ride-hailing": "🚕",
  tech: "💻",
  travel: "✈️",
}

const CATEGORY_GRADIENT: Record<string, string> = {
  finance: "from-emerald-800 to-gray-950",
  food: "from-rose-800 to-gray-950",
  home: "from-sky-800 to-gray-950",
  "ride-hailing": "from-amber-700 to-gray-950",
  tech: "from-violet-800 to-gray-950",
  travel: "from-cyan-800 to-gray-950",
}

export const categoryEmoji = (type: string | null) =>
  (type && CATEGORY_EMOJI[type.toLowerCase()]) || "🎁"

export const categoryGradient = (type: string | null) =>
  (type && CATEGORY_GRADIENT[type.toLowerCase()]) || "from-gray-700 to-gray-950"
