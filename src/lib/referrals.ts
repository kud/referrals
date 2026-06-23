import { Client } from "@notionhq/client"

export interface ReferralItem {
  name: string | null
  code: string | null
  url: string | null
  type: string | null
}

export interface ReferralsResult {
  items: ReferralItem[]
  error: string | null
}

interface NotionProperty {
  title?: Array<{ plain_text?: string }>
  rich_text?: Array<{ plain_text?: string }>
  url?: string
  select?: { name?: string }
}

interface NotionPage {
  properties: Record<string, NotionProperty>
}

const toReferralItem = (page: NotionPage): ReferralItem => ({
  name: page.properties.name?.title?.[0]?.plain_text || null,
  code: page.properties.code?.rich_text?.[0]?.plain_text || null,
  url: page.properties.url?.rich_text?.[0]?.plain_text || null,
  type: page.properties.type?.select?.name || null,
})

export const getReferrals = async (): Promise<ReferralsResult> => {
  const apiKey = process.env.NOTION_API_KEY
  const databaseId = process.env.NOTION_DATABASE_ID

  if (!apiKey || !databaseId) {
    console.error("Missing Notion API key or database ID")
    return { items: [], error: "Server configuration error" }
  }

  try {
    const notion = new Client({ auth: apiKey })
    const database = await notion.databases.query({ database_id: databaseId })
    const items = (database.results as unknown as NotionPage[]).map(
      toReferralItem,
    )
    return { items, error: null }
  } catch (error) {
    console.error("Error fetching data:", error)
    return { items: [], error: "Failed to fetch referrals" }
  }
}
