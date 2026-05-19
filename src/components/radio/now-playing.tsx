"use client"

import { useState, useEffect, useRef } from "react"

const METADATA_URL = "https://freaksonly-metadata.travis-holcombe.workers.dev/"

export function NowPlaying() {
  const [title, setTitle] = useState("WAITING FOR SIGNAL...")
  const [artist, setArtist] = useState("TUNE IN")
  const [opacity, setOpacity] = useState(1)
  const lastTrackRef = useRef("")
  const [duration, setDuration] = useState("90s")

  useEffect(() => {
    const updateDuration = () => {
      setDuration(window.innerWidth < 768 ? "18s" : "90s")
    }
    updateDuration()
    window.addEventListener("resize", updateDuration)
    return () => window.removeEventListener("resize", updateDuration)
  }, [])

  const fetchTrackData = async () => {
    try {
      const res = await fetch(METADATA_URL)
      const data = await res.json()
      const newKey = `${data.artist}-${data.title}`

      if (newKey !== lastTrackRef.current && data.title && data.artist) {
        lastTrackRef.current = newKey
        setOpacity(0)
        setTimeout(() => {
          setTitle(data.title.toUpperCase())
          setArtist(data.artist.toUpperCase())
          setOpacity(1)
        }, 1500)
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

  return (
    <div className="border-4 border-foreground bg-secondary overflow-hidden">
      <div className="bg-foreground text-background px-3 py-1 text-xs tracking-widest font-bold">
        NOW PLAYING
      </div>
      <div className="relative overflow-hidden py-4">
        <div
          className="flex whitespace-nowrap"
          style={{
            animation: `seamless-ticker ${duration} linear infinite`,
            willChange: "transform",
            opacity: opacity,
            transition: opacity === 0
              ? "opacity 1.5s ease-out"
              : "opacity 0.3s ease-in",
          }}
        >
          {Array(2).fill(null).map((_, seg) => (
            <span key={seg} className="inline-flex items-center shrink-0">
              {Array(6).fill(null).map((_, i) => (
                <span key={i} className="inline-flex items-center gap-6 px-8">
                  <span className="text-accent text-2xl md:text-3xl font-bold tracking-tight whitespace-nowrap">
                    {artist}
                  </span>
                  <span className="text-foreground mx-1">—</span>
                  <span className="text-foreground text-2xl md:text-3xl font-bold tracking-tight whitespace-nowrap">
                    {title}
                  </span>
                  <span className="text-accent ml-4">★</span>
                </span>
              ))}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
