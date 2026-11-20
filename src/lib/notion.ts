import { Client } from "@notionhq/client"
import type { Offer } from "@/lib/offers"
import { slugify } from "@/lib/site"

// Expected database columns. `name`, `code`, `url` and `type` exist today;
// the others are proposed and read as optional until they are added.
//   name        Title
//   code        Text
//   url         URL (or Text)
//   type        Select     → category
//   country     Select / Text
//   you_get     Text
//   owner_gets  Text
//   terms_url   URL
//   checked     Date

interface NotionProperty {
  title?: Array<{ plain_text?: string }>
  rich_text?: Array<{ plain_text?: string }>
  url?: string | null
  select?: { name?: string } | null
  date?: { start?: string } | null
}

interface NotionPage {
  id: string
  properties: Record<string, NotionProperty | undefined>
}

const text = (property?: NotionProperty) =>
  property?.title?.[0]?.plain_text ||
  property?.rich_text?.map((part) => part.plain_text ?? "").join("") ||
  property?.url ||
  property?.select?.name ||
  null

const toOffer = (page: NotionPage): Offer | null => {
  const p = page.properties
  const brand = text(p.name)
  if (!brand) return null

  return {
    id: slugify(brand) || page.id,
    brand,
    category: text(p.type) ?? "Other",
    country: text(p.country),
    youGet: text(p.you_get),
    ownerGets: text(p.owner_gets),
    code: text(p.code),
    url: text(p.url),
    termsUrl: text(p.terms_url),
    checkedAt: p.checked?.date?.start ?? null,
  }
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
    const database = await notion.databases.query({ database_id: databaseId })
    const offers = (database.results as unknown as NotionPage[])
      .map(toOffer)
      .filter((offer): offer is Offer => offer !== null)
    return { offers, error: null }
  } catch (error) {
    console.error("Error fetching offers:", error)
    return { offers: [], error: "Failed to fetch offers" }
  }
}
