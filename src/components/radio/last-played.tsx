"use client"
import { useState, useEffect } from "react"
import { Clock } from "lucide-react"

interface HistoryTrack {
  title: string
  artist: string
  cover_art: string | null
  played_at: number
}

const HISTORY_URL = "https://freaksonly-metadata.travis-holcombe.workers.dev/history"

function timeAgo(timestamp: number): string {
  const mins = Math.floor((Date.now() - timestamp) / 60000)
  if (mins < 1) return "JUST NOW"
  if (mins === 1) return "1 MIN AGO"
  if (mins < 60) return `${mins} MINS AGO`
  const hrs = Math.floor(mins / 60)
  if (hrs === 1) return "1 HR AGO"
  return `${hrs} HRS AGO`
}

export function LastPlayed() {
  const [history, setHistory] = useState<HistoryTrack[]>([])
  const [loading, setLoading] = useState(true)

  const fetchHistory = async () => {
    try {
      const res = await fetch(HISTORY_URL)
      const data = await res.json()
      setHistory(data)
    } catch (err) {
      console.error("Failed to fetch history:", err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchHistory()
    const interval = setInterval(fetchHistory, 30000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="border-4 border-foreground bg-secondary p-4 shadow-[8px_8px_0px_0px_rgba(250,250,250,1)] flex-1">
      <div className="flex items-center gap-2 mb-4">
        <Clock className="w-5 h-5 text-accent" />
        <h2 className="text-lg font-bold tracking-wider">LAST PLAYED</h2>
      </div>
      {loading ? (
        <p className="text-xs text-muted-foreground tracking-widest">LOADING...</p>
      ) : history.length === 0 ? (
        <p className="text-xs text-muted-foreground tracking-widest">NO HISTORY YET — CHECK BACK SOON</p>
      ) : (
        <>
          <div className="space-y-0">
            {history.map((track, i) => (
              <div
                key={i}
                className={`flex items-center gap-4 py-3 ${
                  i !== history.length - 1 ? "border-b border-foreground/10" : ""
                }`}
              >
                {/* Album Art */}
                <div className="w-12 h-12 flex-shrink-0 border-2 border-foreground overflow-hidden">
                  <img
                    src={track.cover_art || "/freaks-only-logo.jpg"}
                    alt={track.title}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = "/freaks-only-logo.jpg"
                    }}
                  />
                </div>
                {/* Track Info + Time */}
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold tracking-wider truncate">
                    {track.title.toUpperCase()}
                  </p>
                  <p className="text-xs text-muted-foreground tracking-widest truncate">
                    {track.artist.toUpperCase()}
                  </p>
                  {/* Time on its own line — always visible */}
                  <p className="text-xs text-muted-foreground tracking-wider mt-0.5">
                    {timeAgo(track.played_at)}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Setlist archive link — desktop web only, hidden on mobile and in PWA via CSS */}
          <a
            href="https://d382q4x0yf7o85.cloudfront.net/index.html"
            target="_blank"
            rel="noopener noreferrer"
            className="setlist-archive-link mt-4 pt-3 border-t border-foreground/20 flex flex-col items-center gap-0.5 text-center hover:text-accent transition-colors group"
          >
            <span className="text-xs font-bold tracking-widest group-hover:text-accent">
              FULL SETLIST ARCHIVE ↗
            </span>
            <span className="text-[10px] text-muted-foreground tracking-widest">
              BUILT BY @SPERRYFREAK01
            </span>
          </a>
        </>
      )}
    </div>
  )
}
