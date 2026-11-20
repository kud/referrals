"use client"

import { useState, type ReactNode } from "react"

interface OfferBrowserProps {
  categories: string[]
  items: Array<{ id: string; category: string; node: ReactNode }>
}

const ALL = "All"

export const OfferBrowser = ({ categories, items }: OfferBrowserProps) => {
  const [selected, setSelected] = useState(ALL)
  const visible =
    selected === ALL ? items : items.filter((item) => item.category === selected)

  return (
    <>
      <div className="filter" role="group" aria-label="Filter by category">
        {[ALL, ...categories].map((category) => (
          <button
            key={category}
            type="button"
            className="chip"
            aria-pressed={selected === category}
            onClick={() => setSelected(category)}
          >
            {category}
          </button>
        ))}
      </div>

      <ul className="offers" aria-label="Offers">
        {visible.map((item) => (
          <li key={item.id} id={item.id}>
            {item.node}
          </li>
        ))}
      </ul>
    </>
  )
}
