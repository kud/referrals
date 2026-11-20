"use client"

import type { ReactNode } from "react"
import { ALL, useFilter } from "@/components/filter"

interface OfferBrowserProps {
  items: Array<{ id: string; category: string; node: ReactNode }>
}

export const OfferBrowser = ({ items }: OfferBrowserProps) => {
  const { selected } = useFilter()
  const visible =
    selected === ALL ? items : items.filter((item) => item.category === selected)

  return (
    <ul className="offers" aria-label="Offers">
      {visible.map((item) => (
        <li key={item.id} id={item.id} data-category={item.category}>
          {item.node}
        </li>
      ))}
    </ul>
  )
}
