import { renderToStaticMarkup } from "react-dom/server"
import { describe, expect, it } from "vitest"
import { OfferCard } from "@/components/offer-card"
import type { Offer } from "@/lib/offers"

const bare: Offer = {
  id: "revolut",
  brand: "Revolut",
  category: "Other",
  country: null,
  youGet: null,
  ownerGets: null,
  code: null,
  url: "https://revolut.example/ref",
  termsUrl: null,
  checkedAt: null,
}

describe("OfferCard", () => {
  it("renders a row from today's columns without empty rows", () => {
    const html = renderToStaticMarkup(<OfferCard offer={bare} />)

    expect(html).toContain("Revolut")
    expect(html).toContain('rel="sponsored noopener"')
    expect(html).toContain("No code needed")
    expect(html).not.toContain("offer-rewards")
    expect(html).not.toContain("You get")
    expect(html).not.toContain("Checked")
    expect(html).not.toContain("Terms")
  })

  it("shows rewards, code, checked date and terms when present", () => {
    const html = renderToStaticMarkup(
      <OfferCard
        offer={{
          ...bare,
          youGet: "Three months of Premium",
          code: "ERW123",
          checkedAt: "2026-11-08",
          termsUrl: "https://revolut.example/terms",
        }}
        linkToPage
      />,
    )

    expect(html).toContain("You get")
    expect(html).not.toContain("Erwann gets")
    expect(html).toContain("ERW123")
    expect(html).toContain("8 Nov 2026")
    expect(html).toContain('href="/revolut"')
    expect(html).toContain("Terms")
  })
})
