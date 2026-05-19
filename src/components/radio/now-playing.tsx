"use client"

import { useState, useEffect, useRef } from "react"

const METADATA_URL = "https://freaksonly-metadata.travis-holcombe.workers.dev/"

export function NowPlaying() {
  const [title, setTitle] = useState("WAITING FOR SIGNAL...")
  const [artist, setArtist] = useState("TUNE IN")
  const tickerRef = useRef<HTMLDivElement>(null)

  const fetchTrackData = async () => {
    try {
      const res = await fetch(METADATA_URL)
      const data = await res.json()
      if (data.title) setTitle(data.title)
      if (data.artist) setArtist(data.artist)
    } catch (err) {
      console.error("Failed to fetch metadata:", err)
    }
  }

  useEffect(() => {
    fetchTrackData()
    const interval = setInterval(fetchTrackData, 15000)
    return () => clearInterval(interval)
  }, [])

  const tickerContent = Array(8).fill(null).map((_, i) => (
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
  ))

  return (
    <div className="border-4 border-foreground bg-secondary overflow-hidden">
      <div className="bg-foreground text-background px-3 py-1 text-xs tracking-widest font-bold">
        NOW PLAYING
      </div>
      <div className="relative overflow-hidden py-4">
        <div
          ref={tickerRef}
          className="flex whitespace-nowrap"
          style={{
            animation: "seamless-ticker 60s linear infinite",
            willChange: "transform",
          }}
        >
          {tickerContent}
          {tickerContent}
        </div>
      </div>
    </div>
  )
}
