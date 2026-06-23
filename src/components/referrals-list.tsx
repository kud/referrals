"use client"

import { useMemo, useState } from "react"
import toast, { Toaster } from "react-hot-toast"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import type { ReferralItem } from "@/lib/referrals"

const COUNTDOWN_SECONDS = 3

const displayText = (type: string) =>
  type === "all" ? "All" : type.charAt(0).toUpperCase() + type.slice(1)

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
      toast.success(`Code for ${item.name} copied to clipboard! 🎉`)
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
      <div className="mb-8 flex flex-col sm:flex-row gap-4 items-center justify-between">
        <p className="text-gray-400 text-center sm:text-left">
          Each card contains a referral code that gets copied to your clipboard
          when clicked.
        </p>

        <div className="flex items-center gap-3">
          <label
            htmlFor="type-filter"
            className="text-sm text-gray-400 font-mono"
          >
            Filter by type:
          </label>
          <Select value={selectedType} onValueChange={setSelectedType}>
            <SelectTrigger
              id="type-filter"
              className="w-40 bg-gray-900 border-gray-700 text-white"
            >
              <SelectValue>{displayText(selectedType)}</SelectValue>
            </SelectTrigger>
            <SelectContent className="bg-gray-900 border-gray-700">
              {availableTypes.map((type) => (
                <SelectItem
                  key={type}
                  value={type}
                  className="text-white hover:bg-gray-800 focus:bg-gray-800"
                >
                  {displayText(type)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {sortedItems.length === 0 ? (
        <div className="text-center text-gray-500 font-mono py-24">
          No referral codes available right now — check back soon.
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
                className={`group block rounded-xl overflow-hidden transition-all duration-500 relative ${
                  isActive
                    ? "bg-gray-900 border border-gray-800 hover:border-gray-600 hover:bg-gray-800 hover:-translate-y-1 opacity-100 scale-100"
                    : "bg-gray-950/50 border border-gray-900/50 opacity-40 scale-95 hover:opacity-60 hover:scale-100 cursor-not-allowed"
                }`}
              >
                {loadingIndex === idx && (
                  <div className="absolute inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-10 rounded-xl">
                    <div className="flex items-center gap-3">
                      <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-gray-400"></div>
                      <span className="text-gray-400 text-sm font-mono">
                        Opening in {countdown}s…
                      </span>
                    </div>
                  </div>
                )}

                <div
                  className={`p-6 border-b min-h-[80px] flex items-center ${
                    isActive
                      ? "bg-black/50 border-gray-800"
                      : "bg-black/20 border-gray-900"
                  }`}
                >
                  <span
                    className={`text-sm font-mono leading-relaxed transition-colors ${
                      isActive ? "text-gray-400" : "text-gray-600"
                    }`}
                  >
                    {item.code || "Direct link 🔗"}
                  </span>
                </div>

                <div className="p-6">
                  <div className="flex items-center justify-between">
                    <span
                      className={`text-lg font-medium transition-colors ${
                        isActive
                          ? "text-white group-hover:text-gray-200"
                          : "text-gray-500"
                      }`}
                    >
                      {item.name}
                    </span>
                    {item.type && (
                      <span
                        className={`text-xs px-2 py-1 rounded-md font-mono ${
                          isActive
                            ? "text-gray-500 bg-gray-800"
                            : "text-gray-600 bg-gray-900/50"
                        }`}
                      >
                        {item.type}
                      </span>
                    )}
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
