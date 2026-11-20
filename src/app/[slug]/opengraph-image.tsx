import { ImageResponse } from "next/og"
import { OG_SIZE, OgTicket } from "@/components/og-ticket"
import { getOffer, getOffers } from "@/lib/offers"
import { formatDate, site } from "@/lib/site"
import { talon } from "@/lib/tints"

export const size = OG_SIZE
export const contentType = "image/png"
export const alt = "What you get with this referral, and when it was checked"

export const generateStaticParams = async () => {
  const { offers } = await getOffers()
  return offers.map((offer) => ({ slug: offer.id }))
}

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const offer = await getOffer((await params).slug)

  return new ImageResponse(
    offer ? (
      <OgTicket
        eyebrow={`${site.owner.name} · referral`}
        title={offer.brand}
        subtitle={[offer.category, offer.country].filter(Boolean).join(" · ")}
        label={offer.youGet ? "You get" : null}
        body={offer.youGet}
        stubLabel="Checked"
        stubValue={offer.checkedAt ? formatDate(offer.checkedAt) : "Recently"}
        tint={talon.tint(offer.category)}
      />
    ) : (
      <OgTicket
        eyebrow={site.owner.name}
        title={site.headline}
        stubLabel="Referral links"
        stubValue="referrals.kud.io"
        tint={talon.tint("")}
      />
    ),
    size,
  )
}
