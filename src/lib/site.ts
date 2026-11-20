export const site = {
  url: "https://referrals.kud.io",
  name: "Referral links",
  owner: {
    name: "Erwann Mest",
    firstName: "Erwann",
    initials: "EM",
    url: "https://kud.io",
    sameAs: ["https://github.com/kud", "https://twitter.com/_kud"],
  },
  source: "https://github.com/kud/referrals",
  title: "Erwann's referral codes: Boursorama, Revolut, Octopus…",
  description:
    "Referral links I actually use, for Boursorama, Revolut, Octopus Energy and more: what you get, what I get, and when each offer was last checked.",
  headline: "Services I use, with my referral links",
  intro:
    "These are the banks, apps and suppliers I pay for myself and would recommend without any bonus. If one suits you, signing up through my link usually gets us both something.",
  disclosure:
    "These are referral links: I get a reward when you use one, and it never costs you more.",
}

const dateFormatter = new Intl.DateTimeFormat("en-GB", {
  day: "numeric",
  month: "short",
  year: "numeric",
  timeZone: "UTC",
})

export const formatDate = (iso: string) => dateFormatter.format(new Date(iso))

export const slugify = (value: string) =>
  value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")
