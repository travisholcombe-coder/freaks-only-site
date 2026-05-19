"use client"

import { useEffect, useState } from "react"
import { Heart, X } from "lucide-react"

export function ThanksBanner() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    if (params.get("donated") === "true") {
      setVisible(true)
      // Remove the query param from URL so refresh doesn't re-trigger
      const newUrl = window.location.pathname + window.location.hash
      window.history.replaceState({}, "", newUrl)
      // Auto-dismiss after 10 seconds
      const timer = setTimeout(() => setVisible(false), 10000)
      return () => clearTimeout(timer)
    }
  }, [])

  if (!visible) return null

  return (
    <div className="border-4 border-foreground bg-accent text-background mx-4 mt-4 p-4 shadow-[8px_8px_0px_0px_rgba(250,250,250,1)] flex items-center justify-between gap-4">
      <div className="flex items-center gap-3">
        <Heart className="w-5 h-5 flex-shrink-0" />
        <div>
          <p className="font-bold tracking-wider text-sm md:text-base">
            ★ THANKS FOR SUPPORTING FREAKS ONLY FM ★
          </p>
          <p className="text-xs opacity-90 tracking-wide mt-1">
            Your contribution keeps the signal alive. Check your email for a receipt.
          </p>
        </div>
      </div>
      <button
        onClick={() => setVisible(false)}
        className="flex-shrink-0 hover:opacity-70 transition-opacity"
        aria-label="Dismiss"
      >
        <X className="w-5 h-5" />
      </button>
    </div>
  )
}
