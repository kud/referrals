import { getReferrals, type ReferralItem } from "@/lib/referrals"
import { ReferralsList } from "@/components/referrals-list"
import { HeroAmbience } from "@/components/money-decorations"

export const revalidate = 3600

const buildStructuredData = (items: ReferralItem[]) => ({
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Cash Back Referrals",
  description:
    "Premium referral codes that pay you back. Get cashback on finance, tech, travel, food, and more.",
  url: "https://referrals.kud.io",
  sameAs: ["https://github.com/kud", "https://twitter.com/_kud"],
  offers: {
    "@type": "AggregateOffer",
    offerCount: items.length,
    offers: items.map((item) => ({
      "@type": "Offer",
      name: item.name,
      description: `Get cashback with ${item.name} referral code`,
      category: item.type,
      url: item.url,
      priceSpecification: {
        "@type": "PriceSpecification",
        price: "0",
        priceCurrency: "USD",
      },
    })),
  },
})

export default async function HomePage() {
  const { items, error } = await getReferrals()

  const categories = Array.from(
    new Set(
      items
        .map((item) => item.type)
        .filter((type): type is string => type !== null),
    ),
  ).sort()
  const availableTypes = ["all", ...categories]

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(buildStructuredData(items)),
        }}
      />
      <div className="min-h-screen bg-black text-gray-300">
        <div className="relative min-h-screen flex items-center justify-center overflow-hidden snap-start">
          <HeroAmbience />

          <div className="relative z-10 text-center px-6 max-w-7xl mx-auto">
            <div className="mb-6 font-mono text-green-500/25 text-xs leading-none hidden md:block">
              <pre className="whitespace-pre">
                {`███╗   ███╗ ██████╗ ███╗   ██╗███████╗██╗   ██╗
████╗ ████║██╔═══██╗████╗  ██║██╔════╝╚██╗ ██╔╝
██╔████╔██║██║   ██║██╔██╗ ██║█████╗   ╚████╔╝
██║╚██╔╝██║██║   ██║██║╚██╗██║██╔══╝    ╚██╔╝
██║ ╚═╝ ██║╚██████╔╝██║ ╚████║███████╗   ██║
╚═╝     ╚═╝ ╚═════╝ ╚═╝  ╚═══╝╚══════╝   ╚═╝`}
              </pre>
            </div>

            <div className="mb-12">
              <div className="inline-flex items-center gap-4 mb-6">
                <div className="w-2 h-20 bg-gradient-to-b from-green-400 to-yellow-400 rounded-full" />
                <h1 className="text-6xl md:text-8xl lg:text-9xl font-black bg-gradient-to-r from-green-400 via-yellow-400 to-green-400 bg-clip-text text-transparent tracking-tighter">
                  CASH
                </h1>
                <div className="w-2 h-20 bg-gradient-to-b from-yellow-400 to-green-400 rounded-full" />
              </div>

              <div className="mb-6">
                <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-4 tracking-tight">
                  BACK REFERRALS
                </h2>
                <div className="h-1 w-48 bg-gradient-to-r from-green-400 to-yellow-400 mx-auto rounded-full" />
              </div>
            </div>

            <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-4xl mx-auto leading-relaxed font-light">
              Turn every click into{" "}
              <span className="text-green-400 font-semibold">
                cold hard cash
              </span>
              . Premium referral codes that actually{" "}
              <span className="text-yellow-400 font-semibold">
                pay you back
              </span>
              .
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
              <div className="group relative">
                <div className="absolute -inset-1 bg-gradient-to-r from-green-400 to-yellow-400 rounded-lg blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200" />
                <a
                  href="#referrals"
                  className="relative px-8 py-4 bg-black rounded-lg leading-none flex items-center gap-3 text-white font-semibold hover:scale-105 transition-transform duration-200"
                >
                  <span className="text-2xl">💰</span>
                  <span>START EARNING NOW</span>
                  <span className="text-green-400">→</span>
                </a>
              </div>

              <div className="flex items-center gap-2 px-6 py-3 border border-gray-600 rounded-full text-sm text-gray-300 backdrop-blur-sm bg-black/30">
                <span className="animate-pulse text-green-400">●</span>
                <span className="font-mono">Click → Copy → Earn</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <div className="text-center">
                <div className="text-4xl mb-2">🎯</div>
                <div className="text-3xl font-bold text-white mb-1">
                  {items.length}
                </div>
                <div className="text-gray-400 font-mono text-sm">
                  Premium Codes
                </div>
              </div>
              <div className="text-center">
                <div className="text-4xl mb-2">📂</div>
                <div className="text-3xl font-bold text-white mb-1">
                  {categories.length}
                </div>
                <div className="text-gray-400 font-mono text-sm">
                  Categories
                </div>
              </div>
              <div className="text-center">
                <div className="text-4xl mb-2">🔓</div>
                <div className="text-3xl font-bold text-white mb-1">100%</div>
                <div className="text-gray-400 font-mono text-sm">
                  Free Access
                </div>
              </div>
            </div>
          </div>

          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
            <div className="flex flex-col items-center text-gray-400">
              <span className="text-sm font-mono mb-2">Scroll for codes</span>
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 14l-7 7m0 0l-7-7m7 7V3"
                />
              </svg>
            </div>
          </div>
        </div>

        <div
          id="referrals"
          className="min-h-screen max-w-6xl mx-auto px-6 relative z-20 bg-black pt-10 pb-20 snap-start"
        >
          {error ? (
            <div className="text-center py-24">
              <div className="text-6xl mb-4">🫠</div>
              <p className="text-gray-400 font-mono">
                Our money counter fell over.
              </p>
              <p className="text-gray-600 font-mono text-sm mt-1">
                Give it a sec and refresh — the codes will be right back.
              </p>
            </div>
          ) : (
            <ReferralsList items={items} availableTypes={availableTypes} />
          )}
        </div>
      </div>
    </>
  )
}
