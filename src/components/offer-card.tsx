import Link from "next/link"
import { CopyCode } from "@/components/copy-code"
import type { Offer } from "@/lib/offers"
import { formatDate, site, slugify } from "@/lib/site"

interface OfferCardProps {
  offer: Offer
  // On the home page the brand links to the offer's own page.
  linkToPage?: boolean
  headingLevel?: "h2" | "h3"
}

export const OfferCard = ({
  offer,
  linkToPage = false,
  headingLevel: Heading = "h3",
}: OfferCardProps) => (
  <article
    className="offer ticket"
    data-tint={slugify(offer.category)}
    aria-labelledby={`offer-${offer.id}-name`}
  >
    <div className="ticket-main">
      <header className="offer-head">
        <Heading id={`offer-${offer.id}-name`} className="offer-brand">
          {linkToPage ? (
            <Link href={`/${offer.id}`}>{offer.brand}</Link>
          ) : (
            offer.brand
          )}
        </Heading>
        <p className="offer-meta">
          <span className="offer-category">{offer.category}</span>
          {offer.country && <> · {offer.country}</>}
        </p>
      </header>

      {(offer.youGet || offer.ownerGets) && (
        <dl className="offer-rewards">
          {offer.youGet && (
            <div>
              <dt>You get</dt>
              <dd>{offer.youGet}</dd>
            </div>
          )}
          {offer.ownerGets && (
            <div>
              <dt>{site.owner.firstName} gets</dt>
              <dd>{offer.ownerGets}</dd>
            </div>
          )}
        </dl>
      )}

      {(offer.checkedAt || offer.termsUrl) && (
        <p className="offer-foot">
          {offer.checkedAt && (
            <span>
              Checked{" "}
              <time dateTime={offer.checkedAt}>
                {formatDate(offer.checkedAt)}
              </time>
            </span>
          )}
          {offer.termsUrl && (
            <a href={offer.termsUrl} target="_blank" rel="noopener">
              Terms<span className="visually-hidden"> for {offer.brand}</span>
            </a>
          )}
        </p>
      )}
    </div>

    <div className="ticket-stub">
      {offer.code ? (
        <>
          <p className="stub-label">Code</p>
          <CopyCode code={offer.code} brand={offer.brand} />
        </>
      ) : (
        <p className="stub-label">No code needed</p>
      )}
      {offer.url && (
        <a
          className="offer-open"
          href={offer.url}
          target="_blank"
          rel="sponsored noopener"
        >
          Open {offer.brand} <span aria-hidden="true">↗</span>
          <span className="visually-hidden"> (opens in a new tab)</span>
        </a>
      )}
    </div>
  </article>
)
