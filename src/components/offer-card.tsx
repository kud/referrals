import { CopyCode } from "@/components/copy-code"
import type { Offer } from "@/lib/offers"
import { formatDate } from "@/lib/site"

const Line = ({
  name,
  children,
}: {
  name: string
  children: React.ReactNode
}) => (
  <div className="line">
    <dt className="tok-key">{name}</dt>
    <dd className="tok-value">{children}</dd>
  </div>
)

const Quoted = ({ children }: { children: React.ReactNode }) => (
  <>
    <span className="tok-quote" aria-hidden="true">
      &quot;
    </span>
    <span className="tok-string">{children}</span>
    <span className="tok-quote" aria-hidden="true">
      &quot;
    </span>
  </>
)

export const OfferCard = ({ offer }: { offer: Offer }) => (
  <article className="entry" aria-labelledby={`offer-${offer.id}-name`}>
    <div className="line line-head">
      <h3 id={`offer-${offer.id}-name`} className="tok-section">
        <span className="tok-bracket" aria-hidden="true">
          [
        </span>
        {offer.brand}
        <span className="tok-bracket" aria-hidden="true">
          ]
        </span>
      </h3>
      <p className="tok-comment">
        <span aria-hidden="true"># </span>
        {offer.category}
        {offer.country && <> · {offer.country}</>}
      </p>
      {offer.url && (
        <span className="gutter">
          <a
            className="offer-open"
            href={offer.url}
            target="_blank"
            rel="sponsored noopener"
            aria-label={`Open ${offer.brand} in a new tab`}
            title={`Open ${offer.brand}`}
          >
            ↗
          </a>
        </span>
      )}
    </div>

    <dl className="entry-body">
      {offer.youGet && (
        <Line name="you_get">
          <Quoted>{offer.youGet}</Quoted>
        </Line>
      )}
      {offer.ownerGets && (
        <Line name="erwann_gets">
          <Quoted>{offer.ownerGets}</Quoted>
        </Line>
      )}
      {offer.checkedAt && (
        <Line name="checked">
          <Quoted>
            <time dateTime={offer.checkedAt}>
              {formatDate(offer.checkedAt)}
            </time>
          </Quoted>
        </Line>
      )}
      {offer.code ? (
        <div className="line line-code">
          <dt className="tok-key">code</dt>
          <dd className="tok-value">
            <CopyCode code={offer.code} brand={offer.brand} />
          </dd>
        </div>
      ) : (
        <div className="line">
          <dt className="tok-key">code</dt>
          <dd className="tok-value tok-comment">
            <span aria-hidden="true"># </span>none needed, the link is enough
          </dd>
        </div>
      )}
      {offer.termsUrl && (
        <Line name="terms">
          <a href={offer.termsUrl} target="_blank" rel="noopener">
            <Quoted>
              read the terms
              <span className="visually-hidden"> for {offer.brand}</span>
            </Quoted>
          </a>
        </Line>
      )}
    </dl>
  </article>
)
