"use client"

import { useState, useEffect } from "react"

const METADATA_URL = "https://freaksonly-metadata.travis-holcombe.workers.dev/"

export function NowPlaying() {
  const [title, setTitle] = useState("WAITING FOR SIGNAL...")
  const [artist, setArtist] = useState("TUNE IN")

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

  const tickerText = `${artist} — ${title}`

  return (
    <div className="border-4 border-foreground bg-secondary overflow-hidden">
      <div className="bg-foreground text-background px-3 py-1 text-xs tracking-widest font-bold">
        NOW PLAYING
      </div>
      <div className="relative overflow-hidden py-4 px-2">
        <div className="flex whitespace-nowrap animate-ticker">
          <div className="flex items-center gap-8 px-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="flex items-center gap-4">
                <span className="text-accent text-2xl md:text-3xl font-bold tracking-tight">
                  {artist}
                </span>
                <span className="text-foreground">—</span>
                <span className="text-foreground text-2xl md:text-3xl font-bold tracking-tight">
                  {title}
                </span>
                <span className="text-accent">★</span>
              </div>
            ))}
          </div>
          <div className="flex items-center gap-8 px-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="flex items-center gap-4">
                <span className="text-accent text-2xl md:text-3xl font-bold tracking-tight">
                  {artist}
                </span>
                <span className="text-foreground">—</span>
                <span className="text-foreground text-2xl md:text-3xl font-bold tracking-tight">
                  {title}
                </span>
                <span className="text-accent">★</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
