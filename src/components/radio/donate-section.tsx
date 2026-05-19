"use client"

import { useState, useEffect } from "react"
import { Heart } from "lucide-react"

const DONATION_TIERS = [
  {
    label: "$10",
    sublabel: "PER MONTH",
    note: "MONTHLY SUPPORT",
    url: "https://buy.stripe.com/aFadR16l37VjcdvfWt3Nm00",
  },
  {
    label: "$25",
    sublabel: "PER MONTH",
    note: "MONTHLY SUPPORT",
    url: "https://buy.stripe.com/9B628jaBj3F3a5ncKh3Nm01",
  },
  {
    label: "CUSTOM",
    sublabel: "YOUR CHOICE",
    note: "ONE-TIME GIFT",
    url: "https://buy.stripe.com/dRm4grcJr6Rfa5n7pX3Nm05",
  },
  {
    label: "$100",
    sublabel: "ONE-TIME",
    note: "ONE-TIME GIFT",
    url: "https://buy.stripe.com/9B600b38R1wVb9r6lT3Nm02",
  },
  {
    label: "$1,000",
    sublabel: "ONE-TIME",
    note: "ONE-TIME GIFT",
    url: "https://buy.stripe.com/5kQ28j7p72AZ4L3aC93Nm03",
  },
]

export function DonateSection() {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const handleOpenDonate = () => setOpen(true)
    window.addEventListener("open-donate", handleOpenDonate)
    return () => window.removeEventListener("open-donate", handleOpenDonate)
  }, [])

  const handleClick = (url: string) => {
    window.open(url, "_blank", "noopener,noreferrer")
  }

  if (!open) return null

  return (
    <div
      id="donate"
      className="border-4 border-foreground bg-secondary p-4 shadow-[8px_8px_0px_0px_rgba(250,250,250,1)] scroll-mt-4"
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <Heart className="w-4 h-4 text-accent" />
          <h2 className="text-sm font-bold tracking-wider">SUPPORT FREAKS ONLY FM</h2>
        </div>
        <button
          onClick={() => setOpen(false)}
          className="text-xs text-muted-foreground hover:text-foreground tracking-widest"
          aria-label="Close donation options"
        >
          CLOSE ×
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-5 gap-2 mb-3">
        {DONATION_TIERS.map((tier) => (
          <button
            key={tier.label}
            onClick={() => handleClick(tier.url)}
            className="group block text-left"
            aria-label={`Donate ${tier.label} ${tier.sublabel}`}
          >
            <div className="border-2 border-dashed border-accent p-1 transition-transform group-hover:scale-105">
              <div className="border-2 border-foreground bg-accent px-2 py-3 shadow-[3px_3px_0px_0px_rgba(250,250,250,1)] min-h-[80px] flex flex-col items-center justify-center gap-0.5">
                <span className="text-[10px] text-background/70 tracking-widest">
                  ★ {tier.note} ★
                </span>
                <span className="text-lg md:text-xl font-bold text-background tracking-tight text-center">
                  {tier.label}
                </span>
                <span className="text-[10px] text-background/70 tracking-widest text-center">
                  {tier.sublabel}
                </span>
              </div>
            </div>
          </button>
        ))}
      </div>

      <p className="text-[10px] text-muted-foreground tracking-wide text-center pt-2 border-t border-foreground/20">
        Contributions are not tax-deductible. Payments processed securely via Stripe.
      </p>
    </div>
  )
}
