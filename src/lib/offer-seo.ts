import type { Offer } from "@/lib/offers"
import { formatDate, formatMonth, site } from "@/lib/site"

export const offerUrl = (offer: Offer) => `${site.url}/${offer.id}`

export const offerTitle = (offer: Offer) =>
  `${offer.brand} referral code: what you get` +
  (offer.checkedAt ? ` (checked ${formatMonth(offer.checkedAt)})` : "")

export const offerDescription = (offer: Offer) => {
  const parts = [
    offer.youGet
      ? `${offer.brand} referral: ${offer.youGet}.`
      : `My ${offer.brand} referral ${offer.code ? "code" : "link"}.`,
    offer.ownerGets ? `I get ${offer.ownerGets}.` : null,
    offer.checkedAt ? `Checked ${formatDate(offer.checkedAt)}.` : null,
  ]
  return parts.filter(Boolean).join(" ")
}

const originOf = (url: string | null) => {
  if (!url) return undefined
  try {
    return new URL(url).origin
  } catch {
    return undefined
  }
}

export const offerStructuredData = (offer: Offer) => ({
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": `${offerUrl(offer)}#webpage`,
      url: offerUrl(offer),
      name: offerTitle(offer),
      description: offerDescription(offer),
      inLanguage: "en-GB",
      isPartOf: { "@id": `${site.url}/#website` },
      author: { "@type": "Person", name: site.owner.name, url: site.owner.url },
      ...(offer.checkedAt && { dateModified: offer.checkedAt }),
      about: {
        "@type": "Organization",
        name: offer.brand,
        ...(originOf(offer.url) && { url: originOf(offer.url) }),
      },
      breadcrumb: { "@id": `${offerUrl(offer)}#breadcrumb` },
    },
    {
      "@type": "BreadcrumbList",
      "@id": `${offerUrl(offer)}#breadcrumb`,
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: site.name,
          item: site.url,
        },
        {
          "@type": "ListItem",
          position: 2,
          name: offer.brand,
          item: offerUrl(offer),
        },
      ],
    },
  ],
})

// Only promise a checked date when the row has one.
export const offerIntro = (offer: Offer) => {
  const checked = offer.checkedAt ? ", and when I last checked it" : ""
  if (offer.youGet) {
    const owner = offer.ownerGets ? ", what I get" : ""
    return `What you get with my ${offer.brand} referral${owner}${checked}.`
  }
  return `My ${offer.brand} referral ${offer.code ? "code" : "link"}${checked}.`
}
