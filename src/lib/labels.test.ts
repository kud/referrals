import { describe, expect, it } from "vitest"
import { countLabel } from "@/components/filter"
import { categoryLabel, toOffer } from "@/lib/notion"
import { offerIntro } from "@/lib/offer-seo"
import { countsByCategory, type Offer } from "@/lib/offers"
import { talon, tintFamily } from "@/lib/tints"

// The live Notion select values on 22 Nov 2026.
const LIVE_TYPES = ["finance", "food", "home", "ride-hailing", "tech", "travel"]

describe("categoryLabel", () => {
  it("turns hand-typed Notion types into labels", () => {
    expect(categoryLabel("finance")).toBe("Finance")
    expect(categoryLabel("ride-hailing")).toBe("Ride-hailing")
    expect(categoryLabel("Banking")).toBe("Banking")
    expect(categoryLabel("  ")).toBe("Other")
    expect(categoryLabel(null)).toBe("Other")
  })

  it("is applied when a row is read", () => {
    const offer = toOffer({
      id: "x",
      properties: {
        name: { title: [{ plain_text: "Bolt" }] },
        type: { select: { name: "ride-hailing" } },
      },
    })
    expect(offer?.category).toBe("Ride-hailing")
  })
})

describe("tintFamily", () => {
  it("gives every live category its own card-stock tint", () => {
    const families = LIVE_TYPES.map((type) => tintFamily(categoryLabel(type)))
    expect(families).not.toContain(null)
    expect(new Set(families).size).toBe(LIVE_TYPES.length)
    expect(new Set(LIVE_TYPES.map((type) => talon.tint(type))).size).toBe(
      LIVE_TYPES.length,
    )
  })

  it("falls back to plain stock for an unknown category", () => {
    expect(tintFamily("Pets")).toBeNull()
    expect(talon.tint("Pets")).toBe("#e7e5de")
  })
})

describe("countLabel", () => {
  const offers = ["Finance", "Finance", "Tech"].map(
    (category, index) => ({ id: String(index), category }) as Offer,
  )
  const counts = countsByCategory(offers)

  it("summarises everything when no filter is set", () => {
    expect(countLabel(counts, "All")).toBe("3 offers in 2 categories")
  })

  it("counts what a chip leaves on screen", () => {
    expect(countLabel(counts, "Finance")).toBe("2 of 3 offers")
    expect(countLabel(counts, "Tech")).toBe("1 of 3 offers")
  })
})

describe("offerIntro", () => {
  const bare = { brand: "Bolt", code: "ERW", checkedAt: null } as Offer

  it("does not promise a checked date the row lacks", () => {
    expect(offerIntro(bare)).toBe("My Bolt referral code.")
    expect(offerIntro({ ...bare, code: null })).toBe("My Bolt referral link.")
  })

  it("mentions what each side gets and the check when present", () => {
    expect(
      offerIntro({
        ...bare,
        youGet: "€5",
        ownerGets: "€5",
        checkedAt: "2026-11-12",
      }),
    ).toBe(
      "What you get with my Bolt referral, what I get, and when I last checked it.",
    )
  })
})
