import { renderToStaticMarkup } from "react-dom/server"
import { describe, expect, it } from "vitest"
import { Disclosure } from "@/components/site-chrome"

describe("Disclosure", () => {
  it("flags sample data only when fixtures are the source", () => {
    expect(renderToStaticMarkup(<Disclosure source="fixtures" />)).toContain(
      "sample data",
    )
    const live = renderToStaticMarkup(<Disclosure source="notion" />)
    expect(live).not.toContain("sample data")
    expect(live).toContain("These are referral links")
  })
})
