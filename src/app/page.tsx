import Link from "next/link"
import { CategoryChips, FilterProvider } from "@/components/filter"
import { OfferBrowser } from "@/components/offer-browser"
import { OfferCard } from "@/components/offer-card"
import { categoriesOf, getOffers, type Offer } from "@/lib/offers"
import { formatDate, site } from "@/lib/site"

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
        url: `${site.url}/#${offer.id}`,
      })),
    },
  ],
})

const steps = [
  "Copy the code or open the link.",
  "Sign up as you normally would.",
  "Where the offer includes a bonus for you, we both get one.",
]

const faq = [
  {
    question: "Do I pay more?",
    answer:
      "No. You pay exactly what you’d pay signing up directly, and some offers add a bonus for you on top.",
  },
  {
    question: "What do you get?",
    answer:
      "Usually a one-off credit or cash bonus once you’ve signed up. The service pays it, not you.",
  },
]

export default async function HomePage() {
  const { offers, source, error } = await getOffers()
  const sorted = [...offers].sort((a, b) => a.brand.localeCompare(b.brand))
  const lastChecked = offers
    .map((offer) => offer.checkedAt)
    .filter((date): date is string => Boolean(date))
    .sort()
    .at(-1)

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData(sorted)),
        }}
      />

      <div className="page">
        <header className="site-header">
          <Link className="site-name" href="/">
            {site.name}
          </Link>
          <a className="owner" href={site.owner.url}>
            <span className="owner-initials" aria-hidden="true">
              {site.owner.initials}
            </span>
            {site.owner.name}
          </a>
        </header>

        <FilterProvider categories={categoriesOf(sorted)}>
          <main>
            <section className="hero" aria-labelledby="headline">
              <h1 id="headline">{site.headline}</h1>
              <p className="intro">{site.intro}</p>
              <aside className="disclosure" aria-label="Disclosure">
                <p>{site.disclosure}</p>
              </aside>
              {source === "fixtures" && (
                <p className="sample-note">
                  Preview with sample data: rewards are illustrative and codes
                  are placeholders.
                </p>
              )}
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
                  <div className="code-card">
                    <div className="code-card-bar">
                      <span className="code-card-name">~/.referrals</span>
                      <span className="code-card-lang">TOML</span>
                    </div>
                    <OfferBrowser
                      items={sorted.map((offer) => ({
                        id: offer.id,
                        category: offer.category,
                        node: <OfferCard offer={offer} />,
                      }))}
                    />
                  </div>
                </>
              )}
            </section>

            <section className="how" aria-labelledby="how-title">
              <h2 id="how-title">How it works</h2>
              <ol className="steps">
                {steps.map((step) => (
                  <li key={step}>
                    <p>{step}</p>
                  </li>
                ))}
              </ol>
            </section>

            <section className="faq" aria-labelledby="faq-title">
              <h2 id="faq-title">Questions</h2>
              <dl>
                {faq.map((item) => (
                  <div key={item.question}>
                    <dt>{item.question}</dt>
                    <dd>{item.answer}</dd>
                  </div>
                ))}
              </dl>
            </section>
          </main>
        </FilterProvider>

        <footer className="site-footer">
          {lastChecked && (
            <p>
              Last updated{" "}
              <time dateTime={lastChecked}>{formatDate(lastChecked)}</time>
            </p>
          )}
          <p>
            <a href={site.owner.url}>Contact</a>
            {" · "}
            <a href={site.source}>Source</a>
          </p>
        </footer>
      </div>
    </>
  )
}
