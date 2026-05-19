"use client"

import { useState, useEffect, useRef } from "react"

const METADATA_URL = "https://freaksonly-metadata.travis-holcombe.workers.dev/"

export function NowPlaying() {
  const [title, setTitle] = useState("WAITING FOR SIGNAL...")
  const [artist, setArtist] = useState("TUNE IN")
  const lastTrackRef = useRef("")
  const animRef = useRef<Animation | null>(null)
  const tickerRef = useRef<HTMLDivElement>(null)

  const fetchTrackData = async () => {
    try {
      const res = await fetch(METADATA_URL)
      const data = await res.json()
      const newKey = `${data.artist}-${data.title}`
      if (newKey !== lastTrackRef.current && data.title && data.artist) {
        lastTrackRef.current = newKey
        setTitle(data.title)
        setArtist(data.artist)
      }
    } catch (err) {
      console.error("Failed to fetch metadata:", err)
    }
  }

  useEffect(() => {
    fetchTrackData()
    const interval = setInterval(fetchTrackData, 15000)
    return () => clearInterval(interval)
  }, [])

  // Start the Web Animations API animation once on mount — never restart it
  useEffect(() => {
    const el = tickerRef.current
    if (!el) return

    const totalWidth = el.scrollWidth / 2

    animRef.current = el.animate(
      [
        { transform: "translateX(0)" },
        { transform: `translateX(-${totalWidth}px)` },
      ],
      {
        duration: 60000,
        iterations: Infinity,
        easing: "linear",
      }
    )

    return () => {
      animRef.current?.cancel()
    }
  }, [])

  const tickerItems = Array(12).fill(null)

  return (
    <div className="border-4 border-foreground bg-secondary overflow-hidden">
      <div className="bg-foreground text-background px-3 py-1 text-xs tracking-widest font-bold">
        NOW PLAYING
      </div>
      <div className="relative overflow-hidden py-4">
        <div
          ref={tickerRef}
          className="flex whitespace-nowrap will-change-transform"
        >
          {tickerItems.map((_, i) => (
            <span key={i} className="inline-flex items-center gap-6 px-8">
              <span className="text-accent text-2xl md:text-3xl font-bold tracking-tight whitespace-nowrap">
                {artist}
              </span>
              <span className="text-foreground">—</span>
              <span className="text-foreground text-2xl md:text-3xl font-bold tracking-tight whitespace-nowrap">
                {title}
              </span>
              <span className="text-accent">★</span>
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
