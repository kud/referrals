import { describe, expect, it, vi } from "vitest"
import {
  queryAll,
  toOffer,
  withUniqueIds,
  type NotionPage,
  type NotionQueryResult,
} from "@/lib/notion"
import { resolveSource } from "@/lib/offers"

const row = (index: number): NotionPage => ({
  id: `page-${index}`,
  properties: { name: { title: [{ plain_text: `Brand ${index}` }] } },
})

describe("queryAll", () => {
  it("follows next_cursor until Notion says there is nothing more", async () => {
    const rows = Array.from({ length: 250 }, (_, index) => row(index))
    const query = vi.fn(async (cursor?: string): Promise<NotionQueryResult> => {
      const start = cursor ? Number(cursor) : 0
      const end = Math.min(start + 100, rows.length)
      return {
        results: rows.slice(start, end),
        has_more: end < rows.length,
        next_cursor: end < rows.length ? String(end) : null,
      }
    })

    const results = await queryAll(query)

    expect(results).toHaveLength(250)
    expect(query).toHaveBeenCalledTimes(3)
    expect(query.mock.calls.map(([cursor]) => cursor)).toEqual([
      undefined,
      "100",
      "200",
    ])
    expect((results.at(-1) as NotionPage).id).toBe("page-249")
  })

  it("stops after one call when everything fits", async () => {
    const query = vi.fn(async () => ({
      results: [row(1)],
      has_more: false,
      next_cursor: null,
    }))

    expect(await queryAll(query)).toHaveLength(1)
    expect(query).toHaveBeenCalledTimes(1)
  })
})

describe("toOffer", () => {
  it("reads every column when present", () => {
    const offer = toOffer({
      id: "x",
      properties: {
        name: { title: [{ plain_text: "Octopus Energy" }] },
        type: { select: { name: "Energy" } },
        code: { rich_text: [{ plain_text: "ERW" }, { plain_text: "123" }] },
        url: { url: "https://octopus.example/ref" },
        country: { select: { name: "France" } },
        you_get: { rich_text: [{ plain_text: "€50 credit" }] },
        owner_gets: { rich_text: [{ plain_text: "€50 credit too" }] },
        terms_url: { url: "https://octopus.example/terms" },
        checked: { date: { start: "2026-11-12T09:00:00.000+01:00" } },
      },
    })

    expect(offer).toEqual({
      id: "octopus-energy",
      brand: "Octopus Energy",
      category: "Energy",
      country: "France",
      youGet: "€50 credit",
      ownerGets: "€50 credit too",
      code: "ERW123",
      url: "https://octopus.example/ref",
      termsUrl: "https://octopus.example/terms",
      checkedAt: "2026-11-12",
    })
  })

  it("keeps an offer without the optional columns", () => {
    const offer = toOffer({
      id: "x",
      properties: {
        name: { title: [{ plain_text: "Revolut" }] },
        url: { rich_text: [{ plain_text: "https://revolut.example/ref" }] },
        you_get: { rich_text: [] },
      },
    })

    expect(offer).toMatchObject({
      brand: "Revolut",
      category: "Other",
      url: "https://revolut.example/ref",
      youGet: null,
      ownerGets: null,
      country: null,
      termsUrl: null,
      checkedAt: null,
      code: null,
    })
  })

  it("skips a row without a name", () => {
    expect(toOffer({ id: "x", properties: {} })).toBeNull()
  })
})

describe("withUniqueIds", () => {
  it("numbers duplicate slugs and moves reserved ones aside", () => {
    const base = toOffer(row(1))!
    const ids = withUniqueIds([
      { ...base, id: "uber" },
      { ...base, id: "uber" },
      { ...base, id: "api" },
    ]).map((offer) => offer.id)

    expect(ids).toEqual(["uber", "uber-2", "api-offer"])
  })
})

describe("resolveSource", () => {
  it("reads Notion in production and fixtures elsewhere", () => {
    expect(resolveSource({ VERCEL_ENV: "production" })).toBe("notion")
    expect(resolveSource({ VERCEL_ENV: "preview" })).toBe("fixtures")
    expect(resolveSource({})).toBe("fixtures")
  })

  it("lets REFERRALS_SOURCE override", () => {
    expect(
      resolveSource({ VERCEL_ENV: "production", REFERRALS_SOURCE: "fixtures" }),
    ).toBe("fixtures")
    expect(resolveSource({ REFERRALS_SOURCE: "notion" })).toBe("notion")
  })
})
