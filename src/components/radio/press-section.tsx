"use client"

import { useEffect, useState } from "react"
import { ExternalLink } from "lucide-react"

interface PressItem {
  title: string
  source: string
  url: string
  image?: string
  date?: string
  cta?: string
  imageFit?: "cover" | "contain"
}

const LOGO_URL = "/freaks-only-logo.jpg"

// Add new interviews / videos / releases here. A YouTube link renders an inline
// player automatically; anything else renders a click-out thumbnail card. For a
// YouTube item you can leave "image" out.
//
// Optional per-item knobs on click-out cards:
//   cta      -> button label, defaults to "READ" (use "LISTEN", "WATCH", etc.)
//   imageFit -> "cover" (default, fills + crops) or "contain" (fits whole image,
//               good for square album art in the 16:9 thumbnail box)
const PRESS_ITEMS: PressItem[] = [
  {
    title: "FREAKS ONLY ESKIMO SELECTS",
    source: "Eskimo Recordings",
    url: "https://eskimorecordings.bandcamp.com/album/freaks-only-eskimo-selects-2014-2026",
    image: "https://f4.bcbits.com/img/a3790661534_5.jpg",
    date: "August 2026",
    cta: "LISTEN",
    imageFit: "contain",
  },
  {
    title: "In Conversation: Travis Holcombe presents Freaks Only FM",
    source: "In Sheep's Clothing",
    url: "https://insheepsclothinghifi.com/travis-holcombe-freaks-only/",
    image: "https://insheepsclothinghifi.com/wordpress/wp-content/uploads/2026/06/travis-1200x630.jpg",
    date: "June 2026",
  },
  {
    title: "Freaks Only at The Lot Radio",
    source: "The Lot Radio",
    url: "https://www.youtube.com/watch?v=9VqmIjo9m_g",
  },
]

function youtubeId(url: string): string | null {
  const patterns = [
    /youtu\.be\/([\w-]{11})/,
    /youtube\.com\/watch\?v=([\w-]{11})/,
    /youtube\.com\/embed\/([\w-]{11})/,
    /youtube\.com\/shorts\/([\w-]{11})/,
  ]
  for (const re of patterns) {
    const m = url.match(re)
    if (m) return m[1]
  }
  return null
}

function isStandalone(): boolean {
  if (typeof window === "undefined") return false
  return (
    window.matchMedia("(display-mode: standalone)").matches ||
    (window.navigator as unknown as { standalone?: boolean }).standalone === true
  )
}

export function PressSection() {
  const [mounted, setMounted] = useState(false)
  const [standalone, setStandalone] = useState(false)

  useEffect(() => {
    setMounted(true)
    setStandalone(isStandalone())
  }, [])

  // Website only: render nothing in the installed app, or if there are no items.
  if (!mounted || standalone || PRESS_ITEMS.length === 0) return null

  return (
    <div className="border-4 border-foreground bg-secondary p-4 shadow-[8px_8px_0px_0px_rgba(250,250,250,1)]">
      <h2 className="text-lg font-bold tracking-wider mb-4">OUTSIDE TRANSMISSIONS</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {PRESS_ITEMS.map((item, i) => {
          const ytId = youtubeId(item.url)

          if (ytId) {
            // Inline YouTube player
            return (
              <div
                key={i}
                className="border-4 border-foreground bg-background overflow-hidden shadow-[4px_4px_0px_0px_rgba(250,250,250,1)]"
              >
                <div className="aspect-video w-full border-b-4 border-foreground bg-black">
                  <iframe
                    src={"https://www.youtube-nocookie.com/embed/" + ytId}
                    title={item.title}
                    loading="lazy"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                    className="w-full h-full"
                  />
                </div>
                <div className="p-3">
                  <div className="flex items-center flex-wrap gap-x-1 mb-1 text-[10px] tracking-widest text-accent">
                    <span>{item.source.toUpperCase()}</span>
                    {item.date ? <span className="text-muted-foreground">/ {item.date.toUpperCase()}</span> : null}
                  </div>
                  <p className="text-sm font-bold tracking-wide leading-snug">{item.title}</p>
                </div>
              </div>
            )
          }

          // Click-out thumbnail card (articles, releases, podcasts, etc.)
          return (
            <a
              key={i}
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group border-4 border-foreground bg-background overflow-hidden shadow-[4px_4px_0px_0px_rgba(250,250,250,1)] hover:shadow-[2px_2px_0px_0px_rgba(250,250,250,1)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all duration-100"
            >
              <div className="aspect-video w-full overflow-hidden border-b-4 border-foreground bg-secondary">
                <img
                  src={item.image || LOGO_URL}
                  alt={item.title}
                  className={
                    "w-full h-full " + (item.imageFit === "contain" ? "object-contain" : "object-cover")
                  }
                  onError={(e) => { (e.target as HTMLImageElement).src = LOGO_URL }}
                />
              </div>
              <div className="p-3">
                <div className="flex items-center flex-wrap gap-x-1 mb-1 text-[10px] tracking-widest text-accent">
                  <span>{item.source.toUpperCase()}</span>
                  {item.date ? <span className="text-muted-foreground">/ {item.date.toUpperCase()}</span> : null}
                </div>
                <p className="text-sm font-bold tracking-wide leading-snug">{item.title}</p>
                <div className="mt-2 flex items-center gap-1 text-[10px] tracking-widest text-muted-foreground group-hover:text-accent">
                  <ExternalLink className="w-3 h-3" />
                  <span>{item.cta || "READ"}</span>
                </div>
              </div>
            </a>
          )
        })}
      </div>
    </div>
  )
}
