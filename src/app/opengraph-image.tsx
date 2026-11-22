import { ImageResponse } from "next/og"
import { OG_SIZE, OgTicket } from "@/components/og-ticket"
import { getOffers, latestCheck } from "@/lib/offers"
import { formatDate, site } from "@/lib/site"
import { talon } from "@/lib/tints"

export const size = OG_SIZE
export const contentType = "image/png"
export const alt = site.headline
export const revalidate = 3600

export default async function Image() {
  const { offers } = await getOffers()
  const checked = latestCheck(offers)

  return new ImageResponse(
    <OgTicket
      eyebrow={site.owner.name}
      title={site.headline}
      label="These are referral links"
      body="I get a reward when you use one, and it never costs you more."
      stubLabel="Last checked"
      stubValue={checked ? formatDate(checked) : "Recently"}
      tint={talon.tint("")}
    />,
    size,
  )
}
