"use client"

import { useState, useEffect } from "react"

interface Track {
  title: string
  artist: string
  cover_art: string | null
}

const METADATA_URL = "https://freaksonly-metadata.travis-holcombe.workers.dev/"

export function AlbumPlayer() {
  const [currentTrack, setCurrentTrack] = useState<Track>({
    title: "WAITING FOR SIGNAL",
    artist: "TUNE IN",
    cover_art: null,
  })
  const [loading, setLoading] = useState(true)

  const fetchTrackData = async () => {
    try {
      const res = await fetch(METADATA_URL)
      const data = await res.json()
      setCurrentTrack({
        title: data.title || "WAITING FOR SIGNAL",
        artist: data.artist || "TUNE IN",
        cover_art: data.cover_art || null,
      })
    } catch (err) {
      console.error("Failed to fetch track data:", err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchTrackData()
    const interval = setInterval(fetchTrackData, 15000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="border-4 border-foreground bg-secondary p-4 shadow-[8px_8px_0px_0px_rgba(250,250,250,1)] flex flex-col gap-4">

      {/* Album Art */}
      <div className="border-4 border-foreground bg-background w-full aspect-square relative overflow-hidden">
        <img
          src={currentTrack.cover_art || "/freaks-only-logo.jpg"}
          alt={currentTrack.cover_art ? `${currentTrack.title} by ${currentTrack.artist}` : "FREAKS ONLY FM"}
          className="w-full h-full object-cover"
          onError={(e) => {
            (e.target as HTMLImageElement).src = "/freaks-only-logo.jpg"
          }}
        />
      </div>

      {/* Track Info */}
      <div className="w-full text-center">
        <div className="border-2 border-foreground bg-background px-3 py-2 mb-2">
          <p className="text-sm font-bold tracking-wider truncate">
            {loading ? "TUNING IN..." : currentTrack.title}
          </p>
        </div>
        <p className="text-xs text-muted-foreground tracking-widest truncate">
          {loading ? "" : currentTrack.artist}
        </p>
      </div>

    </div>
  )
}
