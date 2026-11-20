import { CopyCode } from "@/components/copy-code"
import type { Offer } from "@/lib/offers"
import { formatDate, site } from "@/lib/site"

export const OfferCard = ({ offer }: { offer: Offer }) => (
  <article className="offer" aria-labelledby={`offer-${offer.id}-name`}>
    <header className="offer-head">
      <h3 id={`offer-${offer.id}-name`} className="offer-brand">
        {offer.brand}
      </h3>
      <p className="offer-meta">
        {offer.category}
        {offer.country && <> · {offer.country}</>}
      </p>
    </header>

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

    <div className="offer-actions">
      {offer.code && <CopyCode code={offer.code} brand={offer.brand} />}
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

    {(offer.checkedAt || offer.termsUrl) && (
      <p className="offer-foot">
        {offer.checkedAt && (
          <span>
            Checked <time dateTime={offer.checkedAt}>{formatDate(offer.checkedAt)}</time>
          </span>
        )}
        {offer.termsUrl && (
          <a href={offer.termsUrl} target="_blank" rel="noopener">
            Terms<span className="visually-hidden"> for {offer.brand}</span>
          </a>
        )}
      </p>
    )}
  </article>
)
