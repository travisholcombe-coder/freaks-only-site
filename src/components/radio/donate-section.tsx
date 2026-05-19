"use client"

import { Heart } from "lucide-react"

// IMPORTANT: Replace these placeholder URLs with your actual Stripe Payment Link URLs
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
  return (
    <div
      id="donate"
      className="border-4 border-foreground bg-secondary p-4 md:p-6 shadow-[8px_8px_0px_0px_rgba(250,250,250,1)] scroll-mt-4"
    >
      <div className="flex items-center gap-2 mb-3">
        <Heart className="w-5 h-5 text-accent" />
        <h2 className="text-lg font-bold tracking-wider">SUPPORT FREAKS ONLY FM</h2>
      </div>

      <p className="text-sm text-muted-foreground tracking-wide mb-6 max-w-2xl">
        FREAKS ONLY FM is a listener-supported online radio station. Your contribution keeps the
        signal alive — no ads, no corporate underwriting, just freaks playing records for freaks.
      </p>

      {/* Donation tiles grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 mb-4">
        {DONATION_TIERS.map((tier) => (
          
            key={tier.label}
            href={tier.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group block"
            aria-label={`Donate ${tier.label} ${tier.sublabel}`}
          >
            <div className="border-4 border-dashed border-accent p-1 transition-transform group-hover:scale-105">
              <div className="border-4 border-foreground bg-accent px-3 py-4 shadow-[4px_4px_0px_0px_rgba(250,250,250,1)] min-h-[120px] flex flex-col items-center justify-center gap-1">
                <span className="text-xs text-background/70 tracking-widest">
                  ★ {tier.note} ★
                </span>
                <span className="text-2xl md:text-3xl font-bold text-background tracking-tight text-center">
                  {tier.label}
                </span>
                <span className="text-xs text-background/70 tracking-widest text-center">
                  {tier.sublabel}
                </span>
              </div>
            </div>
          </a>
        ))}
      </div>

      <p className="text-xs text-muted-foreground tracking-wide text-center pt-2 border-t border-foreground/20">
        Contributions are not tax-deductible. Payments processed securely via Stripe.
      </p>
    </div>
  )
}
