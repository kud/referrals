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

export interface OffersResult {
  offers: Offer[]
  source: "fixtures" | "notion"
  error: string | null
}

// Fixtures stay the default until the Notion database carries the reward,
// country, terms and checked-date columns. Set REFERRALS_SOURCE=notion to switch.
export const getOffers = async (): Promise<OffersResult> => {
  if (process.env.REFERRALS_SOURCE === "notion") {
    const { offers, error } = await getNotionOffers()
    return { offers, source: "notion", error }
  }

  return { offers: fixtureOffers, source: "fixtures", error: null }
}

export const categoriesOf = (offers: Offer[]) =>
  Array.from(new Set(offers.map((offer) => offer.category))).sort()
