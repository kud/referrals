import { Client } from "@notionhq/client"
import type { Offer } from "@/lib/offers"
import { slugify } from "@/lib/site"

// Database columns. `name`, `code`, `url` and `type` exist today; the rest are
// optional and an offer renders without them.
//   name        Title       Boursorama
//   type        Select      Banking
//   code        Text        ERWANN123
//   url         URL         https://…   (a Text column is read too)
//   country     Select      France
//   you_get     Text        €80 after your first card payment
//   owner_gets  Text        €80 once your account is open
//   terms_url   URL         https://…
//   checked     Date        2026-11-12

export interface NotionProperty {
  type?: string
  title?: Array<{ plain_text?: string }>
  rich_text?: Array<{ plain_text?: string }>
  url?: string | null
  select?: { name?: string } | null
  date?: { start?: string } | null
}

export interface NotionPage {
  id: string
  properties: Record<string, NotionProperty | undefined>
}

export interface NotionQueryResult {
  results: unknown[]
  has_more: boolean
  next_cursor: string | null
}

const joined = (parts?: Array<{ plain_text?: string }>) =>
  parts
    ?.map((part) => part.plain_text ?? "")
    .join("")
    .trim() || null

const text = (property?: NotionProperty): string | null =>
  joined(property?.title) ??
  joined(property?.rich_text) ??
  (property?.url?.trim() || null) ??
  (property?.select?.name?.trim() || null)

// Notion types are typed by hand ("finance", "ride-hailing"); show them as
// labels ("Finance", "Ride-hailing") so chips and tickets read consistently.
export const categoryLabel = (value: string | null) => {
  const trimmed = value?.trim()
  if (!trimmed) return "Other"
  return trimmed.charAt(0).toLocaleUpperCase("en-GB") + trimmed.slice(1)
}

const date = (property?: NotionProperty) =>
  property?.date?.start?.slice(0, 10) ?? null

export const toOffer = (page: NotionPage): Offer | null => {
  const p = page.properties
  const brand = text(p.name)
  if (!brand) return null

  return {
    id: slugify(brand) || page.id,
    brand,
    category: categoryLabel(text(p.type)),
    country: text(p.country),
    youGet: text(p.you_get),
    ownerGets: text(p.owner_gets),
    code: text(p.code),
    url: text(p.url),
    termsUrl: text(p.terms_url),
    checkedAt: date(p.checked),
  }
}

// Notion returns at most 100 rows per call; follow next_cursor to the end.
export const queryAll = async (
  query: (startCursor?: string) => Promise<NotionQueryResult>,
): Promise<unknown[]> => {
  const results: unknown[] = []
  let cursor: string | undefined

  do {
    const page = await query(cursor)
    results.push(...page.results)
    cursor = page.has_more && page.next_cursor ? page.next_cursor : undefined
  } while (cursor)

  return results
}

// Routes that an offer slug must never shadow.
const RESERVED = new Set([
  "api",
  "opengraph-image",
  "twitter-image",
  "icon",
  "apple-icon",
])

// Two rows with the same brand (or a reserved name) get a numbered slug.
export const withUniqueIds = (offers: Offer[]): Offer[] => {
  const seen = new Map<string, number>()
  return offers.map((offer) => {
    const base = RESERVED.has(offer.id) ? `${offer.id}-offer` : offer.id
    const count = (seen.get(base) ?? 0) + 1
    seen.set(base, count)
    return count === 1
      ? { ...offer, id: base }
      : { ...offer, id: `${base}-${count}` }
  })
}

export const getNotionOffers = async (): Promise<{
  offers: Offer[]
  error: string | null
}> => {
  const auth = process.env.NOTION_API_KEY
  const databaseId = process.env.NOTION_DATABASE_ID

  if (!auth || !databaseId) {
    return { offers: [], error: "Server configuration error" }
  }

  try {
    const notion = new Client({ auth })
    const rows = await queryAll(
      (startCursor) =>
        notion.databases.query({
          database_id: databaseId,
          start_cursor: startCursor,
          page_size: 100,
        }) as Promise<NotionQueryResult>,
    )
    const offers = (rows as NotionPage[])
      .map(toOffer)
      .filter((offer): offer is Offer => offer !== null)
    return { offers: withUniqueIds(offers), error: null }
  } catch (error) {
    console.error("Error fetching offers:", error)
    return { offers: [], error: "Failed to fetch offers" }
  }
}
