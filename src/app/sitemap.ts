import type { MetadataRoute } from "next"
import { getOffers, latestCheck } from "@/lib/offers"
import { site } from "@/lib/site"

export const revalidate = 3600

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const { offers } = await getOffers()
  const home = latestCheck(offers)

  return [
    {
      url: site.url,
      ...(home && { lastModified: home }),
      changeFrequency: "weekly",
      priority: 1,
    },
    ...offers.map((offer) => ({
      url: `${site.url}/${offer.id}`,
      ...(offer.checkedAt && { lastModified: offer.checkedAt }),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ]
}
