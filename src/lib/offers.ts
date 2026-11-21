import { cache } from "react"
import { fixtureOffers } from "@/lib/fixtures"
import { getNotionOffers } from "@/lib/notion"

export interface Offer {
  id: string
  brand: string
  category: string
  country: string | null
  youGet: string | null
  ownerGets: string | null
  code: string | null
  url: string | null
  termsUrl: string | null
  checkedAt: string | null
}

export type OffersSource = "fixtures" | "notion"

export interface OffersResult {
  offers: Offer[]
  source: OffersSource
  error: string | null
}

// Production reads Notion; local and preview builds use the fixtures.
// REFERRALS_SOURCE=notion|fixtures overrides either way.
export const resolveSource = (
  env: Record<string, string | undefined> = process.env,
): OffersSource => {
  if (
    env.REFERRALS_SOURCE === "notion" ||
    env.REFERRALS_SOURCE === "fixtures"
  ) {
    return env.REFERRALS_SOURCE
  }
  return env.VERCEL_ENV === "production" ? "notion" : "fixtures"
}

export const getOffers = cache(async (): Promise<OffersResult> => {
  const source = resolveSource()

  if (source === "notion") {
    const { offers, error } = await getNotionOffers()
    return { offers, source, error }
  }

  return { offers: fixtureOffers, source, error: null }
})

export const getOffer = async (id: string) => {
  const { offers } = await getOffers()
  return offers.find((offer) => offer.id === id) ?? null
}

export const sortOffers = (offers: Offer[]) =>
  [...offers].sort((a, b) => a.brand.localeCompare(b.brand))

export const categoriesOf = (offers: Offer[]) =>
  Array.from(new Set(offers.map((offer) => offer.category))).sort()

export const latestCheck = (offers: Offer[]) =>
  offers
    .map((offer) => offer.checkedAt)
    .filter((date): date is string => Boolean(date))
    .sort()
    .at(-1) ?? null
