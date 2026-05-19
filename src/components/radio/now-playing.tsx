"use client"

import { useState, useEffect, useRef } from "react"

const METADATA_URL = "https://freaksonly-metadata.travis-holcombe.workers.dev/"

interface TrackInfo {
  title: string
  artist: string
}

export function NowPlaying() {
  const [current, setCurrent] = useState<TrackInfo>({ title: "WAITING FOR SIGNAL...", artist: "TUNE IN" })
  const [next, setNext] = useState<TrackInfo | null>(null)
  const [transitioning, setTransitioning] = useState(false)
  const lastTrackRef = useRef("")

  const fetchTrackData = async () => {
    try {
      const res = await fetch(METADATA_URL)
      const data = await res.json()
      const newKey = `${data.artist}-${data.title}`

      if (newKey !== lastTrackRef.current && data.title && data.artist) {
        lastTrackRef.current = newKey

        if (lastTrackRef.current === "") {
          // First load — just set it directly
          setCurrent({ title: data.title, artist: data.artist })
        } else {
          // New track — trigger transition
          setNext({ title: data.title, artist: data.artist })
          setTransitioning(true)

          // After the outgoing track scrolls out, swap to new track
          setTimeout(() => {
            setCurrent({ title: data.title, artist: data.artist })
            setNext(null)
            setTransitioning(false)
          }, 2000)
        }
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

  const renderTickerContent = (track: TrackInfo) =>
    Array(8).fill(null).map((_, i) => (
      <span key={i} className="inline-flex items-center gap-6 px-8">
        <span className="text-accent text-2xl md:text-3xl font-bold tracking-tight whitespace-nowrap">
          {track.artist}
        </span>
        <span className="text-foreground">—</span>
        <span className="text-foreground text-2xl md:text-3xl font-bold tracking-tight whitespace-nowrap">
          {track.title}
        </span>
        <span className="text-accent">★</span>
      </span>
    ))

  return (
    <div className="border-4 border-foreground bg-secondary overflow-hidden">
      <div className="bg-foreground text-background px-3 py-1 text-xs tracking-widest font-bold">
        NOW PLAYING
      </div>
      <div className="relative overflow-hidden py-4" style={{ height: "80px" }}>

        {/* Current track — scrolls out when transitioning */}
        <div
          className="absolute top-0 left-0 flex whitespace-nowrap items-center h-full"
          style={{
            animation: "seamless-ticker 60s linear infinite",
            willChange: "transform",
            transition: "opacity 1s ease, transform 2s ease",
            opacity: transitioning ? 0 : 1,
            transform: transitioning ? "translateY(-100%)" : "translateY(0)",
          }}
        >
          {renderTickerContent(current)}
          {renderTickerContent(current)}
        </div>

        {/* Incoming track — scrolls in when transitioning */}
        {next && (
          <div
            className="absolute top-0 left-0 flex whitespace-nowrap items-center h-full"
            style={{
              animation: "seamless-ticker 60s linear infinite",
              willChange: "transform",
              transition: "opacity 1s ease, transform 2s ease",
              opacity: transitioning ? 1 : 0,
              transform: transitioning ? "translateY(0)" : "translateY(100%)",
            }}
          >
            {renderTickerContent(next)}
            {renderTickerContent(next)}
          </div>
        )}

      </div>
    </div>
  )
}
