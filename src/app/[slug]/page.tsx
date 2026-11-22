import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { OfferCard } from "@/components/offer-card"
import {
  Disclosure,
  SiteFooter,
  SiteHeader,
  Steps,
} from "@/components/site-chrome"
import {
  offerDescription,
  offerStructuredData,
  offerTitle,
} from "@/lib/offer-seo"
import { getOffer, getOffers } from "@/lib/offers"
import { site } from "@/lib/site"

export const revalidate = 3600
export const dynamicParams = false

interface Params {
  params: Promise<{ slug: string }>
}

export const generateStaticParams = async () => {
  const { offers } = await getOffers()
  return offers.map((offer) => ({ slug: offer.id }))
}

export const generateMetadata = async ({
  params,
}: Params): Promise<Metadata> => {
  const offer = await getOffer((await params).slug)
  if (!offer) return {}

  const title = offerTitle(offer)
  const description = offerDescription(offer)

  return {
    title: { absolute: title },
    description,
    alternates: { canonical: `/${offer.id}` },
    openGraph: {
      title,
      description,
      url: `/${offer.id}`,
      siteName: site.name,
      locale: "en_GB",
      type: "website",
    },
    twitter: { card: "summary_large_image", title, description },
  }
}

export default async function OfferPage({ params }: Params) {
  const offer = await getOffer((await params).slug)
  if (!offer) notFound()

  const { source } = await getOffers()

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(offerStructuredData(offer)),
        }}
      />

      <div className="page">
        <SiteHeader />

        <main>
          <nav className="breadcrumb" aria-label="Breadcrumb">
            <ol>
              <li>
                <Link href="/">{site.name}</Link>
              </li>
              <li aria-current="page">{offer.brand}</li>
            </ol>
          </nav>

          <section className="hero hero-offer" aria-labelledby="headline">
            <h1 id="headline">{offer.brand} referral code</h1>
            <p className="intro">
              {offer.youGet
                ? `What you get with my ${offer.brand} referral, what I get, and when I last checked it.`
                : `My ${offer.brand} referral ${offer.code ? "code" : "link"}, and when I last checked it.`}
            </p>
            <Disclosure source={source} />
          </section>

          <section className="offer-single" aria-label={`${offer.brand} offer`}>
            <OfferCard offer={offer} headingLevel="h2" />
          </section>

          <Steps headingId="how-title" />

          <p className="back-link">
            <Link href="/">← Every referral link</Link>
          </p>
        </main>

        <SiteFooter lastChecked={offer.checkedAt} />
      </div>
    </>
  )
}
