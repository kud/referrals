import { NextResponse } from 'next/server'
import { Client } from '@notionhq/client'

const NOTION_API_KEY = process.env.NOTION_API_KEY
const NOTION_DATABASE_ID = process.env.NOTION_DATABASE_ID

interface ReferralItem {
  name: string | null
  code: string | null
  url: string | null
  type: string | null
}

export async function GET() {
  if (!NOTION_API_KEY || !NOTION_DATABASE_ID) {
    console.error('Missing Notion API key or database ID')
    return NextResponse.json(
      { error: 'Server configuration error' },
      { status: 500 }
    )
  }

  try {
    const notion = new Client({ auth: NOTION_API_KEY })
    const database = await notion.databases.query({
      database_id: NOTION_DATABASE_ID,
    })

    const rawPages = database.results
    const pagePromises = rawPages.map(async ({ id }) => {
      const page = await notion.pages.retrieve({ page_id: id })
      
      return {
        name: (page.properties as any).name?.title?.[0]?.plain_text || null,
        code: (page.properties as any).code?.rich_text?.[0]?.plain_text || null,
        url: (page.properties as any).url?.url || null,
        type: (page.properties as any).type?.select?.name || null,
      }
    })

    const items: ReferralItem[] = await Promise.all(pagePromises)
    return NextResponse.json({ items })
  } catch (error) {
    console.error('Error fetching data:', error)
    return NextResponse.json(
      { error: 'Failed to fetch referrals' },
      { status: 500 }
    )
  }
}