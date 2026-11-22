"use client"

import { createContext, useContext, useState, type ReactNode } from "react"

export const ALL = "All"

interface FilterState {
  categories: string[]
  selected: string
  select: (category: string) => void
}

const FilterContext = createContext<FilterState | null>(null)

export const FilterProvider = ({
  categories,
  children,
}: {
  categories: string[]
  children: ReactNode
}) => {
  const [selected, select] = useState(ALL)

  return (
    <FilterContext.Provider value={{ categories, selected, select }}>
      {children}
    </FilterContext.Provider>
  )
}

export const useFilter = () => {
  const state = useContext(FilterContext)
  if (!state) throw new Error("useFilter needs a FilterProvider")
  return state
}

export const CategoryChips = () => {
  const { categories, selected, select } = useFilter()

  return (
    <div className="filter" role="group" aria-label="Filter by category">
      {[ALL, ...categories].map((category) => (
        <button
          key={category}
          type="button"
          className="chip"
          aria-pressed={selected === category}
          onClick={() => select(category)}
        >
          {category}
        </button>
      ))}
    </div>
  )
}

export const countLabel = (
  counts: Record<string, number>,
  selected: string,
) => {
  const total = Object.values(counts).reduce((sum, n) => sum + n, 0)
  const offers = (n: number) => `${n} ${n === 1 ? "offer" : "offers"}`
  if (selected === ALL) {
    const categories = Object.keys(counts).length
    const noun = categories === 1 ? "category" : "categories"
    return `${offers(total)} in ${categories} ${noun}`
  }
  return `${counts[selected] ?? 0} of ${offers(total)}`
}

// Says how many offers the chips leave on screen; announced politely when
// the filter changes.
export const OfferCount = ({ counts }: { counts: Record<string, number> }) => {
  const { selected } = useFilter()
  return (
    <p className="count" aria-live="polite">
      {countLabel(counts, selected)}
    </p>
  )
}
