"use client"

import { useState, useEffect } from "react"

interface Track {
  title: string
  artist: string
  cover_art: string | null
}

const METADATA_URL = "https://freaksonly-metadata.travis-holcombe.workers.dev/"
const LOGO_URL = "https://freaksonly.fm/freaks-only-logo.jpg"

// Push current track to the OS lock screen / car display via the Media Session API.
// Writing to the global navigator.mediaSession is completely decoupled from playback
// (that lives in audio-player.tsx) — this just supplies what to show.
function updateMediaSessionMetadata(track: Track) {
  if (typeof navigator === "undefined" || !("mediaSession" in navigator)) return
  const art = track.cover_art || LOGO_URL
  try {
    navigator.mediaSession.metadata = new MediaMetadata({
      title: track.title,
      artist: track.artist,
      album: "FREAKS ONLY FM",
      artwork: [
        { src: art, sizes: "96x96" },
        { src: art, sizes: "128x128" },
        { src: art, sizes: "192x192" },
        { src: art, sizes: "256x256" },
        { src: art, sizes: "384x384" },
        { src: art, sizes: "512x512" },
      ],
    })
  } catch {
    // MediaMetadata unsupported on this browser — ignore, playback is unaffected
  }
}

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
      const next: Track = {
        title: data.title ? data.title.toUpperCase() : "WAITING FOR SIGNAL",
        artist: data.artist ? data.artist.toUpperCase() : "TUNE IN",
        cover_art: data.cover_art || null,
      }
      setCurrentTrack(next)
      updateMediaSessionMetadata(next)
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
      <div className="w-full text-center pb-6">
        <div className="border-2 border-foreground bg-background px-3 py-2 mb-3">
          <p className="text-sm font-bold tracking-wider">
            {loading ? "TUNING IN..." : currentTrack.title}
          </p>
        </div>
        <p className="text-xs text-foreground tracking-widest">
          {loading ? "" : currentTrack.artist}
        </p>
      </div>

    </div>
  )
}
