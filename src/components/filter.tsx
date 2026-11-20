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
