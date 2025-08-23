'use client'

import React, { useState, useMemo } from 'react'
import toast, { Toaster } from 'react-hot-toast'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

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
  const [selectedType, setSelectedType] = useState<string>('all')

  // Fetch data from API route
  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/referrals')
        if (!response.ok) {
          throw new Error('Failed to fetch referrals')
        }
        const data = await response.json()
        setItems(data.items)
      } catch (error) {
        console.error('Error fetching data:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  // Get unique types for filter
  const availableTypes = useMemo(() => {
    const types = items
      .map(item => item.type)
      .filter((type): type is string => type !== null)
      .filter((type, index, arr) => arr.indexOf(type) === index)
      .sort()
    return ['all', ...types]
  }, [items])

  // Filter items by selected type
  const filteredItems = useMemo(() => {
    const filtered = selectedType === 'all' ? items : items.filter(item => item.type === selectedType)
    return filtered.sort((a, b) => (a.name || '').localeCompare(b.name || ''))
  }, [items, selectedType])

  // Get display text for selected type
  const getDisplayText = (type: string) => {
    return type === 'all' ? 'All' : type.charAt(0).toUpperCase() + type.slice(1)
  }

  const handleClick = async (item: ReferralItem, event: React.MouseEvent, idx: number) => {
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
      }
    }, 1000)
    
    setTimeout(() => {
      setLoadingIndex(null)
      if (item.url) {
        window.open(item.url, '_blank')
      }
    }, 3000)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black text-gray-300">
      <div className="max-w-6xl mx-auto px-6">
        {/* Hero Section */}
        <div className="mt-12 mb-8 p-16 bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-800 rounded-xl relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-transparent to-purple-500/10 pointer-events-none" />
          <div className="relative z-10 text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl mb-8 text-3xl">
              🔗
            </div>
            <h1 className="text-4xl md:text-6xl font-semibold text-white mb-6 tracking-tight font-mono">
              exclusive referrals
            </h1>
            <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto leading-relaxed">
              Curated collection of referral codes and links for various platforms and services.
            </p>
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gray-800 border border-gray-600 rounded-full text-sm text-gray-300 font-mono">
              ⚡ Click to copy & redirect
            </div>
          </div>
        </div>

        {/* Filter Section */}
        <div className="mb-8 flex flex-col sm:flex-row gap-4 items-center justify-between">
          <p className="text-gray-400 text-center sm:text-left">
            Each card contains a referral code that gets copied to your clipboard when clicked.
          </p>
          
          <div className="flex items-center gap-3">
            <label htmlFor="type-filter" className="text-sm text-gray-400 font-mono">
              Filter by type:
            </label>
            <Select value={selectedType} onValueChange={setSelectedType}>
              <SelectTrigger className="w-40 bg-gray-900 border-gray-700 text-white">
                <SelectValue>
                  {getDisplayText(selectedType)}
                </SelectValue>
              </SelectTrigger>
              <SelectContent>
                {availableTypes.map(type => (
                  <SelectItem key={type} value={type}>
                    {getDisplayText(type)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {filteredItems.map((item, idx) => (
            <a
              key={`${item.name}-${idx}`}
              href={item.url || '#'}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => handleClick(item, e, idx)}
              className="group block bg-gray-900 border border-gray-800 rounded-xl overflow-hidden transition-all duration-200 hover:border-gray-600 hover:bg-gray-800 hover:-translate-y-1 relative"
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
              <div className="p-6 bg-black/50 border-b border-gray-800 min-h-[80px] flex items-center">
                <span className="text-gray-400 text-sm font-mono leading-relaxed">
                  {item.code || 'Direct link 🔗'}
                </span>
              </div>

              {/* Name Section */}
              <div className="p-6">
                <div className="flex items-center justify-between">
                  <span className="text-white text-lg font-medium group-hover:text-gray-200 transition-colors">
                    {item.name}
                  </span>
                  {item.type && (
                    <span className="text-xs text-gray-500 bg-gray-800 px-2 py-1 rounded-md font-mono">
                      {item.type}
                    </span>
                  )}
                </div>
              </div>
            </a>
          ))}
        </div>

        {filteredItems.length === 0 && !loading && (
          <div className="text-center py-16">
            <p className="text-gray-500 text-lg">No referrals found for the selected type.</p>
          </div>
        )}

        <Toaster 
          position="bottom-right"
          toastOptions={{
            style: {
              background: '#1f1f1f',
              color: '#fff',
              border: '1px solid #374151'
            }
          }}
        />
      </div>
    </div>
  )
}
