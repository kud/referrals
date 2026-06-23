"use client"

import { useMemo, useState } from "react"
import toast, { Toaster } from "react-hot-toast"
import { CoinBurst } from "@/components/coin-burst"
import { categoryEmoji, categoryGradient } from "@/lib/categories"
import type { ReferralItem } from "@/lib/referrals"

const COUNTDOWN_SECONDS = 3

const COPY_CHEERS = [
  (name: string) => `Cha-ching! ${name} code copied 🤑`,
  (name: string) => `${name} code yoinked to your clipboard 🪙`,
  (name: string) => `Money move. ${name} code is yours 💸`,
  (name: string) => `Paste it like it's hot — ${name} copied 🔥`,
  (name: string) => `${name} code secured. Go get that bag 💰`,
]

const pickCheer = (name: string) =>
  COPY_CHEERS[Math.floor(Math.random() * COPY_CHEERS.length)](name)

const displayText = (type: string) =>
  type === "all"
    ? "All"
    : `${categoryEmoji(type)} ${type.charAt(0).toUpperCase() + type.slice(1)}`

interface ReferralsListProps {
  items: ReferralItem[]
  availableTypes: string[]
}

export const ReferralsList = ({
  items,
  availableTypes,
}: ReferralsListProps) => {
  const [selectedType, setSelectedType] = useState("all")
  const [loadingIndex, setLoadingIndex] = useState<number | null>(null)
  const [countdown, setCountdown] = useState(0)

  const sortedItems = useMemo(() => {
    const sorted = [...items].sort((a, b) =>
      (a.name || "").localeCompare(b.name || ""),
    )

    if (selectedType === "all") return sorted

    const active = sorted.filter((item) => item.type === selectedType)
    const inactive = sorted.filter((item) => item.type !== selectedType)
    return [...active, ...inactive]
  }, [items, selectedType])

  const handleClick = async (
    item: ReferralItem,
    event: React.MouseEvent,
    idx: number,
  ) => {
    event.preventDefault()

    if (item.code) {
      await navigator.clipboard.writeText(item.code)
      toast.success(pickCheer(item.name || "That"))
    }

    setLoadingIndex(idx)
    setCountdown(COUNTDOWN_SECONDS)

    let seconds = COUNTDOWN_SECONDS
    const interval = setInterval(() => {
      seconds -= 1
      setCountdown(seconds)

      if (seconds === 0) {
        clearInterval(interval)
        setLoadingIndex(null)
        if (item.url) {
          window.open(item.url, "_blank")
        }
      }
    }, 1000)
  }

  return (
    <>
      <div className="mb-8 space-y-4">
        <p className="text-gray-400 text-center sm:text-left">
          Tap a card — the code lands in your clipboard, then we whisk you to
          the deal. 🪄
        </p>

        <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
          {availableTypes.map((type) => (
            <button
              key={type}
              type="button"
              onClick={() => setSelectedType(type)}
              className={`px-4 py-2 rounded-full text-sm font-mono border transition-colors ${
                selectedType === type
                  ? "bg-green-400 text-black border-green-400"
                  : "bg-gray-900 text-gray-300 border-gray-700 hover:border-gray-500 hover:text-white"
              }`}
            >
              {displayText(type)}
            </button>
          ))}
        </div>
      </div>

      {sortedItems.length === 0 ? (
        <div className="text-center py-24">
          <div className="text-6xl mb-4">🕳️</div>
          <p className="text-gray-400 font-mono">
            The vault&apos;s empty for this filter.
          </p>
          <p className="text-gray-600 font-mono text-sm mt-1">
            Try another category — the money printer never sleeps.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {sortedItems.map((item, idx) => {
            const isActive =
              selectedType === "all" || item.type === selectedType

            return (
              <a
                key={`${item.name}-${item.type}-${item.code}`}
                href={item.url || "#"}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => {
                  if (!isActive) {
                    e.preventDefault()
                    return
                  }
                  handleClick(item, e, idx)
                }}
                className={`card-shine group relative block aspect-[1.9/1] rounded-2xl overflow-hidden p-4 shadow-lg transition-transform duration-300 bg-gradient-to-br ${
                  isActive
                    ? `${categoryGradient(item.type)} hover:-translate-y-1 hover:shadow-2xl`
                    : "from-gray-800 to-gray-950 opacity-40 scale-95 hover:opacity-60 cursor-not-allowed"
                }`}
              >
                {loadingIndex === idx && (
                  <div className="absolute inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-20 rounded-2xl">
                    <CoinBurst />
                    <div className="flex items-center gap-3 relative z-10">
                      <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-green-400"></div>
                      <span className="text-green-300 text-sm font-mono">
                        Copied! Opening in {countdown}s…
                      </span>
                    </div>
                  </div>
                )}

                <div
                  aria-hidden
                  className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/5 to-white/0 pointer-events-none"
                />

                <div className="relative z-10 flex h-full flex-col justify-between text-white">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className="h-6 w-8 rounded bg-gradient-to-br from-yellow-200 to-yellow-500 shadow-inner" />
                      <svg
                        aria-hidden
                        viewBox="0 0 24 24"
                        className="h-5 w-5 text-white/70"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                      >
                        <path d="M9 8a6 6 0 0 1 0 8" />
                        <path d="M12.5 5.5a10 10 0 0 1 0 13" />
                      </svg>
                    </div>
                    {item.type && (
                      <span className="text-xs font-mono uppercase tracking-widest text-white/60">
                        {item.type}
                      </span>
                    )}
                  </div>

                  <div className="space-y-1">
                    <div className="font-mono text-base tracking-[0.18em] text-white/90 break-all">
                      {item.code || "DIRECT LINK"}
                    </div>
                    <div className="flex items-end justify-between gap-3">
                      <div className="truncate text-base font-semibold uppercase tracking-wide">
                        {item.name}
                      </div>
                      {isActive && (
                        <span className="shrink-0 text-xs font-mono text-white/70 opacity-0 group-hover:opacity-100 transition-opacity">
                          tap to pay 💳
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </a>
            )
          })}
        </div>
      )}

      <Toaster
        position="top-center"
        toastOptions={{
          style: {
            background: "#1f1f1f",
            color: "#fff",
            border: "1px solid #374151",
          },
        }}
      />
    </>
  )
}
