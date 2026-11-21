"use client"

import { useEffect, useState } from "react"

interface CopyCodeProps {
  code: string
  brand: string
}

export const CopyCode = ({ code, brand }: CopyCodeProps) => {
  const [status, setStatus] = useState<"idle" | "copied" | "failed">("idle")

  useEffect(() => {
    if (status === "idle") return
    const timer = setTimeout(() => setStatus("idle"), 2500)
    return () => clearTimeout(timer)
  }, [status])

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(code)
      setStatus("copied")
    } catch {
      setStatus("failed")
    }
  }

  return (
    <div className="code" data-state={status}>
      <code className="code-value">{code}</code>
      <button
        type="button"
        className="code-copy"
        onClick={copy}
        aria-label={`Copy the ${brand} code ${code}`}
      >
        {status === "copied" ? "Copied" : "Copy"}
      </button>
      <span className="visually-hidden" aria-live="polite" role="status">
        {status === "copied" && `Copied the ${brand} code`}
        {status === "failed" && "Copy failed; select the code to copy it"}
      </span>
    </div>
  )
}
