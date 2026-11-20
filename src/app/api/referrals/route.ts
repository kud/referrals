import { NextResponse } from "next/server"
import { getOffers } from "@/lib/offers"

export const revalidate = 3600

export async function GET() {
  const { offers, error } = await getOffers()

  if (error) {
    return NextResponse.json({ error }, { status: 500 })
  }

  return NextResponse.json({ offers })
}
