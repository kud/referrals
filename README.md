<div align="center">

![Next.js](https://img.shields.io/badge/Next.js-000000?style=flat-square&logo=next.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)
![Notion](https://img.shields.io/badge/Notion-000000?style=flat-square&logo=notion&logoColor=white)
![MIT](https://img.shields.io/badge/licence-MIT-22C55E?style=flat-square)

**Premium referral codes platform with animated money-themed UI**

<a href="https://referrals.kud.io">Website</a> · <a href="https://kud.io/projects/referrals/docs">Documentation</a>

</div>

## Features

- **Payment-card tiles** — each referral is displayed as a premium card with a chip, contactless icon, and the code formatted as a card number, with muted per-category colour gradients.
- **One-click copy and redirect** — clicking a card copies the code to the clipboard, triggers a celebratory toast and coin-burst animation, then redirects to the referral link after a 3-second countdown.
- **Category pill filtering** — filter by finance, food, home, ride-hailing, tech, or travel using pill buttons; the grid reflows fluidly.
- **Notion as a headless CMS** — referral data lives in a Notion database; adding or updating a code requires no code change or redeploy.
- **Server-side ISR** — the homepage is a Next.js App Router Server Component with a 1-hour revalidation window, so pages load instantly with no client-side fetch.
- **Money-themed UI** — floating bill animations, a coin-burst on copy, and a full-screen animated hero set the mood.

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

Create a Notion database with these properties:

| Property | Type   | Description                 |
| -------- | ------ | --------------------------- |
| `name`   | Title  | Service or platform name    |
| `code`   | Text   | Referral code               |
| `url`    | URL    | Referral link               |
| `type`   | Select | Category (finance, food, …) |

## Usage

```sh
npm run dev    # development server with Turbopack
npm run build  # production build
npm run start  # start production server
npm run lint   # lint
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
