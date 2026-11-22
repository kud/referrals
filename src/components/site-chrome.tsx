import Link from "next/link"
import type { OffersSource } from "@/lib/offers"
import { ThemeControl } from "@/components/theme-control"
import { formatDate, site } from "@/lib/site"

// The mark and title lead home; the theme control is the header's one tool.
// The owner is named in the disclosure, next to what it discloses.
export const SiteHeader = () => (
  <header className="site-header">
    <Link className="site-name" href="/">
      <span className="site-mark" aria-hidden="true" />
      {site.name}
    </Link>
    <ThemeControl />
  </header>
)

export const Disclosure = ({ source }: { source: OffersSource }) => (
  <>
    <aside className="disclosure" aria-label="Disclosure">
      <span className="owner-initials" aria-hidden="true">
        {site.owner.initials}
      </span>
      <p>{site.disclosure}</p>
    </aside>
    {source === "fixtures" && (
      <p className="sample-note">
        Preview with sample data: rewards are illustrative and codes are
        placeholders.
      </p>
    )}
  </>
)

export const Steps = ({ headingId }: { headingId: string }) => (
  <section className="how" aria-labelledby={headingId}>
    <h2 id={headingId}>How it works</h2>
    <ol className="steps">
      {site.steps.map((step) => (
        <li key={step}>
          <p>{step}</p>
        </li>
      ))}
    </ol>
  </section>
)

export const SiteFooter = ({ lastChecked }: { lastChecked: string | null }) => (
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
)
