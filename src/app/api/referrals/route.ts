import { NextResponse } from "next/server"
import { getReferrals } from "@/lib/referrals"

export const revalidate = 3600

export async function GET() {
  const { items, error } = await getReferrals()

  if (error) {
    return NextResponse.json({ error }, { status: 500 })
  }

  return NextResponse.json({ items })
}
