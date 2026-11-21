<div align="center">

![Next.js](https://img.shields.io/badge/Next.js-000000?style=flat-square&logo=next.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white)
![Notion](https://img.shields.io/badge/Notion-000000?style=flat-square&logo=notion&logoColor=white)
![MIT](https://img.shields.io/badge/licence-MIT-22C55E?style=flat-square)

**The referral links Erwann actually uses: what you get, what Erwann gets, and when each was last checked**

<a href="https://referrals.kud.io">Website</a> · <a href="https://kud.io/projects/referrals/docs">Documentation</a>

</div>

## Features

- **Ticket layout**: each offer is a perforated ticket. What both sides get sits on the left; the code and its Copy button sit on the stub, apart from the sponsored link. Copying never redirects.
- **Trust first**: a disclosure above the first offer, the owner named, a checked date and terms link on every offer, no countdowns or badges. Light and dark follow the system setting.
- **A page per offer**: `/<slug>` is prerendered for each offer, with its own title, canonical URL, structured data (WebPage, Organization, BreadcrumbList) and an Open Graph image drawn with `next/og`. `sitemap.xml` lists every offer with its checked date.
- **Notion as the store**: production reads the Notion database, following pagination so no row is dropped; pages revalidate hourly. Local and preview builds use sample fixtures unless `REFERRALS_SOURCE=notion` is set.

## Install

```sh
git clone https://github.com/kud/referrals.git
cd referrals
npm install
cp .env.sample .env
```

Edit `.env` and set your Notion credentials:

```
NOTION_API_KEY=your_notion_integration_api_key
NOTION_DATABASE_ID=your_notion_database_id
```

### Notion database schema

Only `name` is required; an offer renders without any of the optional columns.

| Property     | Type   | Required | Example                              |
| ------------ | ------ | -------- | ------------------------------------ |
| `name`       | Title  | yes      | Boursorama                           |
| `type`       | Select | no       | Banking                              |
| `code`       | Text   | no       | ERWANN123                            |
| `url`        | URL    | no       | https://… (a Text column also works) |
| `country`    | Select | no       | France                               |
| `you_get`    | Text   | no       | €80 after your first card payment    |
| `owner_gets` | Text   | no       | €80 once your account is open        |
| `terms_url`  | URL    | no       | https://…                            |
| `checked`    | Date   | no       | 12 Nov 2026                          |

### Data source

`VERCEL_ENV=production` reads Notion; everything else reads `src/lib/fixtures.ts`. Set `REFERRALS_SOURCE=notion` or `REFERRALS_SOURCE=fixtures` to force either.

## Usage

```sh
npm run dev    # development server with Turbopack
npm run build  # production build
npm run start  # start production server
npm run lint   # lint
npm test       # unit tests (vitest)
```

Open [http://localhost:3000](http://localhost:3000).

## Development

```sh
git clone https://github.com/kud/referrals.git
cd referrals
npm install
npm run dev
```

📚 **Full documentation → [referrals/docs](https://kud.io/projects/referrals/docs)**
