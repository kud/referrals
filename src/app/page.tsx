import { CategoryChips, FilterProvider } from "@/components/filter"
import { OfferBrowser } from "@/components/offer-browser"
import { OfferCard } from "@/components/offer-card"
import {
  Disclosure,
  SiteFooter,
  SiteHeader,
  Steps,
} from "@/components/site-chrome"
import {
  categoriesOf,
  getOffers,
  latestCheck,
  sortOffers,
  type Offer,
} from "@/lib/offers"
import { site } from "@/lib/site"

export const revalidate = 3600

const structuredData = (offers: Offer[]) => ({
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": `${site.url}/#website`,
      url: site.url,
      name: site.title,
      description: site.description,
      inLanguage: "en-GB",
      author: { "@id": `${site.url}/#owner` },
    },
    {
      "@type": "Person",
      "@id": `${site.url}/#owner`,
      name: site.owner.name,
      url: site.owner.url,
      sameAs: site.owner.sameAs,
    },
    {
      "@type": "ItemList",
      name: site.headline,
      numberOfItems: offers.length,
      itemListElement: offers.map((offer, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: offer.brand,
        url: `${site.url}/${offer.id}`,
      })),
    },
  ],
})

export default async function HomePage() {
  const { offers, source, error } = await getOffers()
  const sorted = sortOffers(offers)

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData(sorted)),
        }}
      />

      <div className="page">
        <SiteHeader />

        <FilterProvider categories={categoriesOf(sorted)}>
          <main>
            <section className="hero" aria-labelledby="headline">
              <h1 id="headline">{site.headline}</h1>
              <p className="intro">{site.intro}</p>
              <Disclosure source={source} />
            </section>

            <section className="listing" aria-labelledby="offers-title">
              <h2 id="offers-title" className="visually-hidden">
                Offers
              </h2>
              {error ? (
                <p className="empty">
                  The list could not be loaded just now. It usually comes back
                  within the hour.
                </p>
              ) : (
                <>
                  <CategoryChips />
                  <OfferBrowser
                    items={sorted.map((offer) => ({
                      id: offer.id,
                      category: offer.category,
                      node: <OfferCard offer={offer} linkToPage />,
                    }))}
                  />
                </>
              )}
            </section>

            <Steps headingId="how-title" />

            <section className="faq" aria-labelledby="faq-title">
              <h2 id="faq-title">Questions</h2>
              <dl>
                {site.faq.map((item) => (
                  <div key={item.question}>
                    <dt>{item.question}</dt>
                    <dd>{item.answer}</dd>
                  </div>
                ))}
              </dl>
            </section>
          </main>
        </FilterProvider>

        <SiteFooter lastChecked={latestCheck(offers)} />
      </div>
    </>
  )
}
