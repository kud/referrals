# Changelog

All notable changes to this project are documented here.

---

## 3.3.0 — 2026-06-23

### Highlights

- **Server-side rendering with ISR.** The homepage is now a Next.js App Router Server Component with 1-hour revalidation — referral codes are fetched and rendered on the server, eliminating the client-side fetch waterfall and the loading spinner users previously saw on every visit. A redundant N+1 Notion query was collapsed into a single call. First Load JS dropped from ~153 kB to ~120 kB after removing the now-unused `axios` and `@radix-ui/react-select` dependencies. ([6885760](https://github.com/kud/referrals/commit/688576036ab409fd62a9fb06d944e45df70bacac))

- **Premium card design for referral codes.** Each code is now presented as a payment-card styled tile — chip, contactless icon, the code formatted in card-number groups, and a per-category muted colour gradient. Copying a code triggers a celebratory toast with a randomised cheer message and a coin-burst animation. A "Browse the codes" section heading and friendlier empty/error states round out the redesign. ([3a80f93](https://github.com/kud/referrals/commit/3a80f93415f598830d0b7723eddcbf02b0694932))

- **Pill filter buttons replace the dropdown.** The category filter is now a row of inline pill buttons with emoji, making browsing faster and removing a layer of interaction. ([3a80f93](https://github.com/kud/referrals/commit/3a80f93415f598830d0b7723eddcbf02b0694932))

### Fixes

- **React Server Components CVE patched.** Next.js and the `react-server-dom-*` packages were bumped to their secure versions to address the published RSC vulnerability. ([739d8b2](https://github.com/kud/referrals/commit/739d8b298e6cfac09518a69ac165a522e7c3a239))

### Internal

- Floating-money animations calmed (opacity reduced from 0.8 → 0.25) and scoped to the hero section instead of covering the full viewport; bill count reduced from 6 to 4. `prefers-reduced-motion` overrides and scroll-snap section transitions added. ([95d9790](https://github.com/kud/referrals/commit/95d97909d76c725b14b2eefd42ebb8d864cfd9f3))
