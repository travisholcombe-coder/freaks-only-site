"use client"

import { useState, useEffect } from "react"

interface Track {
  title: string
  artist: string
  cover_art?: string
}

const STATION_ID = "a77923"
const API_URL = `https://api.live365.com/station/${STATION_ID}`

export function AlbumPlayer() {
  const [currentTrack, setCurrentTrack] = useState<Track | null>(null)
  const [history, setHistory] = useState<Track[]>([])
  const [loading, setLoading] = useState(true)

  const fetchTrackData = async () => {
    try {
      const res = await fetch(API_URL)
      const data = await res.json()

      // Current track
      if (data?.track) {
        setCurrentTrack({
          title: data.track.title || "UNKNOWN TRACK",
          artist: data.track.artist || "UNKNOWN ARTIST",
          cover_art: data.track.cover_art_url || null,
        })
      }

      // Recently played history
      if (data?.history && Array.isArray(data.history)) {
        setHistory(
          data.history.slice(0, 4).map((t: any) => ({
            title: t.title || "UNKNOWN TRACK",
            artist: t.artist || "UNKNOWN ARTIST",
            cover_art: t.cover_art_url || null,
          }))
        )
      }
    } catch (err) {
      console.error("Failed to fetch track data:", err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchTrackData()
    const interval = setInterval(fetchTrackData, 30000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="border-4 border-foreground bg-secondary p-4 shadow-[8px_8px_0px_0px_rgba(250,250,250,1)] flex flex-col gap-4">

      {/* Now Playing */}
      <div className="flex items-center gap-4">
        {/* Album Art */}
        <div className="border-4 border-foreground bg-background w-24 h-24 flex-shrink-0 overflow-hidden">
          <img
            src={currentTrack?.cover_art || "/freaks-only-logo.jpg"}
            alt={currentTrack ? `${currentTrack.title} by ${currentTrack.artist}` : "Now Playing Album Art"}
            className="w-full h-full object-cover"
            onError={(e) => {
              (e.target as HTMLImageElement).src = "/freaks-only-logo.jpg"
            }}
          />
        </div>

        {/* Track Info */}
        <div className="flex flex-col gap-1 min-w-0">
          <span className="text-xs font-bold tracking-widest text-muted-foreground uppercase">Now Playing</span>
          {loading ? (
            <span className="text-sm font-bold tracking-wider text-muted-foreground animate-pulse">
              TUNING IN...
            </span>
          ) : (
            <>
              <div className="border-2 border-foreground bg-background px-3 py-2">
                <p className="text-sm font-bold tracking-wider truncate">
                  {currentTrack?.title || "WAITING FOR SIGNAL"}
                </p>
              </div>
              <p className="text-xs text-muted-foreground tracking-widest truncate">
                {currentTrack?.artist || "TUNE IN"}
              </p>
            </>
          )}
        </div>
      </div>

      {/* Recently Played */}
      {history.length > 0 && (
        <div className="border-t-2 border-foreground/30 pt-3">
          <p className="text-xs font-bold tracking-widest text-muted-foreground mb-2 uppercase">
            Recently Played
          </p>
          <div className="space-y-0">
            {history.map((track, i) => (
              <div
                key={i}
                className={`flex items-center gap-3 py-2 ${
                  i !== history.length - 1 ? "border-b border-foreground/10" : ""
                }`}
              >
                {/* Mini album art */}
                <div className="w-8 h-8 flex-shrink-0 border border-foreground/30 overflow-hidden">
                  <img
                    src={track.cover_art || "/freaks-only-logo.jpg"}
                    alt={track.title}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = "/freaks-only-logo.jpg"
                    }}
                  />
                </div>
                <div className="flex justify-between items-center flex-1 min-w-0 gap-2">
                  <span className="text-xs font-bold tracking-wider text-foreground truncate">
                    {track.title}
                  </span>
                  <span className="text-xs text-muted-foreground tracking-wider truncate flex-shrink-0">
                    {track.artist}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  )
}
