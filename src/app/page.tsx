"use client"

import React, { useState, useMemo } from "react"
import toast, { Toaster } from "react-hot-toast"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface ReferralItem {
  name: string | null
  code: string | null
  url: string | null
  type: string | null
}

export default function HomePage() {
  const [items, setItems] = useState<ReferralItem[]>([])
  const [loading, setLoading] = useState(true)
  const [loadingIndex, setLoadingIndex] = useState<number | null>(null)
  const [countdown, setCountdown] = useState(0)
  const [selectedType, setSelectedType] = useState<string>("all")

  // Fetch data from API route
  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/referrals")
        if (!response.ok) {
          throw new Error("Failed to fetch referrals")
        }
        const data = await response.json()
        setItems(data.items)
      } catch (error) {
        console.error("Error fetching data:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  // Get unique types for filter
  const availableTypes = useMemo(() => {
    const types = items
      .map((item) => item.type)
      .filter((type): type is string => type !== null)
      .filter((type, index, arr) => arr.indexOf(type) === index)
      .sort()
    return ["all", ...types]
  }, [items])

  // Sort items - active first, then disabled, both alphabetically within groups
  const sortedItems = useMemo(() => {
    const sorted = items.sort((a, b) =>
      (a.name || "").localeCompare(b.name || ""),
    )

    if (selectedType === "all") return sorted

    // Separate active and disabled items
    const activeItems = sorted.filter((item) => item.type === selectedType)
    const disabledItems = sorted.filter((item) => item.type !== selectedType)

    return [...activeItems, ...disabledItems]
  }, [items, selectedType])

  // Get display text for selected type
  const getDisplayText = (type: string) => {
    return type === "all" ? "All" : type.charAt(0).toUpperCase() + type.slice(1)
  }

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
    setCountdown(3)

    let seconds = 3
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

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
      </div>
    )
  }

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Cash Back Referrals",
    "description": "Premium referral codes that pay you back. Get cashback on finance, tech, travel, food, and more.",
    "url": "https://referrals.kud.io",
    "sameAs": [
      "https://github.com/kud",
      "https://twitter.com/_kud"
    ],
    "offers": {
      "@type": "AggregateOffer",
      "offerCount": items.length,
      "offers": items.map(item => ({
        "@type": "Offer",
        "name": item.name,
        "description": `Get cashback with ${item.name} referral code`,
        "category": item.type,
        "url": item.url,
        "priceSpecification": {
          "@type": "PriceSpecification",
          "price": "0",
          "priceCurrency": "USD"
        }
      }))
    }
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData),
        }}
      />
      <div className="min-h-screen bg-black text-gray-300">
      {/* Floating Money Animation */}
      <div className="fixed inset-0 pointer-events-none z-10 overflow-hidden">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="money-floating"
            style={{
              top: `${Math.random() * 80 + 10}vh`,
              left: `${Math.random() * 80 + 10}vw`,
              animationDelay: `${i * 1}s`,
              animationDuration: `${5 + Math.random() * 3}s`,
            }}
          >
            💸
          </div>
        ))}
      </div>

      {/* Amazing Hero Cover */}
      <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          {/* Gradient Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black" />

          {/* Floating Money Bills Animation */}
          <div className="absolute inset-0 overflow-hidden">
            {[...Array(12)].map((_, i) => (
              <div
                key={i}
                className="absolute animate-pulse opacity-10"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 3}s`,
                  animationDuration: `${3 + Math.random() * 2}s`,
                }}
              >
                <div className="text-green-400 text-4xl transform rotate-12">
                  💵
                </div>
              </div>
            ))}

            {[...Array(8)].map((_, i) => (
              <div
                key={i + 12}
                className="absolute animate-bounce opacity-5"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 4}s`,
                  animationDuration: `${2 + Math.random() * 3}s`,
                }}
              >
                <div className="text-yellow-400 text-6xl transform -rotate-12">
                  💰
                </div>
              </div>
            ))}
          </div>

          {/* Grid Pattern Overlay */}
          <div className="absolute inset-0 opacity-5">
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
                backgroundSize: "50px 50px",
              }}
            />
          </div>

          {/* Animated Gradient Orbs */}
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full blur-3xl animate-pulse" />
          <div
            className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-green-500/20 to-yellow-500/20 rounded-full blur-3xl animate-pulse"
            style={{ animationDelay: "1s" }}
          />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 text-center px-6 max-w-7xl mx-auto">
          {/* ASCII Art Money */}
          <div 
            className="mb-8 font-mono text-green-400 text-xs leading-none hidden md:block"
            style={{
              animation: 'gentleFade 4s ease-in-out infinite'
            }}
          >
            <pre className="whitespace-pre">
              {`███╗   ███╗ ██████╗ ███╗   ██╗███████╗██╗   ██╗
████╗ ████║██╔═══██╗████╗  ██║██╔════╝╚██╗ ██╔╝
██╔████╔██║██║   ██║██╔██╗ ██║█████╗   ╚████╔╝
██║╚██╔╝██║██║   ██║██║╚██╗██║██╔══╝    ╚██╔╝
██║ ╚═╝ ██║╚██████╔╝██║ ╚████║███████╗   ██║
╚═╝     ╚═╝ ╚═════╝ ╚═╝  ╚═══╝╚══════╝   ╚═╝`}
            </pre>
          </div>

          {/* Main Title */}
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

          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-4xl mx-auto leading-relaxed font-light">
            Turn every click into{" "}
            <span className="text-green-400 font-semibold">cold hard cash</span>
            . Premium referral codes that actually{" "}
            <span className="text-yellow-400 font-semibold">pay you back</span>.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
            <div className="group relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-green-400 to-yellow-400 rounded-lg blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200" />
              <button
                onClick={() => {
                  document.querySelector(".referrals-section")?.scrollIntoView({
                    behavior: "smooth",
                  })
                }}
                className="relative px-8 py-4 bg-black rounded-lg leading-none flex items-center gap-3 text-white font-semibold hover:scale-105 transition-transform duration-200"
              >
                <span className="text-2xl">💰</span>
                <span>START EARNING NOW</span>
                <span className="text-green-400">→</span>
              </button>
            </div>

            <div className="flex items-center gap-2 px-6 py-3 border border-gray-600 rounded-full text-sm text-gray-300 backdrop-blur-sm bg-black/30">
              <span className="animate-pulse text-green-400">●</span>
              <span className="font-mono">Click → Copy → Earn</span>
            </div>
          </div>

          {/* Stats */}
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
                {availableTypes.length - 1}
              </div>
              <div className="text-gray-400 font-mono text-sm">Categories</div>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-2">🔓</div>
              <div className="text-3xl font-bold text-white mb-1">100%</div>
              <div className="text-gray-400 font-mono text-sm">Free Access</div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
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

      <div className="min-h-screen max-w-6xl mx-auto px-6 relative z-20 bg-black pt-16">
        {/* Filter Section */}
        <div className="referrals-section mb-8 flex flex-col sm:flex-row gap-4 items-center justify-between">
          <p className="text-gray-400 text-center sm:text-left">
            Each card contains a referral code that gets copied to your
            clipboard when clicked.
          </p>

          <div className="flex items-center gap-3">
            <label
              htmlFor="type-filter"
              className="text-sm text-gray-400 font-mono"
            >
              Filter by type:
            </label>
            <Select value={selectedType} onValueChange={setSelectedType}>
              <SelectTrigger className="w-40 bg-gray-900 border-gray-700 text-white">
                <SelectValue>{getDisplayText(selectedType)}</SelectValue>
              </SelectTrigger>
              <SelectContent className="bg-gray-900 border-gray-700">
                {availableTypes.map((type) => (
                  <SelectItem key={type} value={type} className="text-white hover:bg-gray-800 focus:bg-gray-800">
                    {getDisplayText(type)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Cards Grid */}
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
                {/* Loading Overlay */}
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

                {/* Code Section */}
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

                {/* Name Section */}
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
      </div>
    </div>
    </>
  )
}
