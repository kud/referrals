"use client"

import { useSyncExternalStore } from "react"

import { THEME_KEY as KEY, type Theme } from "@/lib/theme"

const THEMES: Array<{ value: Theme; label: string }> = [
  { value: "system", label: "Auto" },
  { value: "light", label: "Light" },
  { value: "dark", label: "Dark" },
]


const listeners = new Set<() => void>()

const read = (): Theme => {
  const value = document.documentElement.getAttribute("data-theme")
  return value === "light" || value === "dark" ? value : "system"
}

const subscribe = (listener: () => void) => {
  listeners.add(listener)
  return () => listeners.delete(listener)
}

const apply = (theme: Theme) => {
  const root = document.documentElement
  try {
    if (theme === "system") localStorage.removeItem(KEY)
    else localStorage.setItem(KEY, theme)
  } catch {}
  if (theme === "system") root.removeAttribute("data-theme")
  else root.setAttribute("data-theme", theme)
  listeners.forEach((listener) => listener())
}

export const ThemeControl = () => {
  const theme = useSyncExternalStore(subscribe, read, () => "system" as Theme)

  return (
    <div className="theme" role="group" aria-label="Colour theme">
      {THEMES.map(({ value, label }) => (
        <button
          key={value}
          type="button"
          aria-pressed={theme === value}
          onClick={() => apply(value)}
        >
          {label}
        </button>
      ))}
    </div>
  )
}
