"use client"

import { useState, useEffect } from "react"
import { Share2, Check } from "lucide-react"

interface Track {
  title: string
  artist: string
  cover_art: string | null
}

const METADATA_URL = "https://api.freaksonly.fm/"
const LOGO_URL = "https://freaksonly.fm/freaks-only-logo.jpg"
const SITE_URL = "https://freaksonly.fm"

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
  const [copied, setCopied] = useState(false)

  const fetchTrackData = async () => {
    try {
      // no-store so the live poll never serves a stale browser-cached copy.
      // The Worker's edge/in-isolate cache still shields Live365 from load.
      const res = await fetch(METADATA_URL, { cache: "no-store" })
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
    // Primary poll (works in the foreground).
    const interval = setInterval(fetchTrackData, 15000)

    // Refresh the moment the app returns to the foreground (catch-up after the
    // screen was locked).
    const onVisible = () => {
      if (document.visibilityState === "visible") fetchTrackData()
    }
    document.addEventListener("visibilitychange", onVisible)

    // Refresh driven by the audio pipeline (see audio-player.tsx). Media events
    // keep firing during background playback better than a JS timer does, so
    // this is what has a shot at updating the lock screen / car while locked.
    const onSignal = () => fetchTrackData()
    window.addEventListener("fofm:refresh-nowplaying", onSignal)

    return () => {
      clearInterval(interval)
      document.removeEventListener("visibilitychange", onVisible)
      window.removeEventListener("fofm:refresh-nowplaying", onSignal)
    }
  }, [])

  const handleShare = async () => {
    const isLive = !loading && currentTrack.artist !== "TUNE IN"
    const shareText = isLive
      ? `Listening to ${currentTrack.artist} – ${currentTrack.title} on FREAKS ONLY FM`
      : "Listening to FREAKS ONLY FM"

    // Native share sheet on mobile / supported browsers
    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share({ title: "FREAKS ONLY FM", text: shareText, url: SITE_URL })
      } catch {
        // user cancelled or share failed — no-op
      }
      return
    }

    // Desktop fallback: copy to clipboard
    try {
      await navigator.clipboard.writeText(`${shareText} — ${SITE_URL}`)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // clipboard blocked — no-op
    }
  }

  return (
    <div className="border-4 border-foreground bg-secondary p-4 shadow-[8px_8px_0px_0px_rgba(250,250,250,1)] flex flex-col gap-4">

      {/* Album Art */}
      <div className="border-4 border-foreground bg-background w-full aspect-square relative overflow-hidden">
        <img
          key={currentTrack.cover_art || "logo"}
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
        <div className="border-2 border-foreground bg-background px-3 py-2 mb-3">
          <p className="text-sm font-bold tracking-wider">
            {loading ? "TUNING IN..." : currentTrack.title}
          </p>
        </div>
        <p className="text-xs text-foreground tracking-widest">
          {loading ? "" : currentTrack.artist}
        </p>
      </div>

      {/* Share */}
      <button
        onClick={handleShare}
        className="border-4 border-foreground bg-background px-4 py-2 shadow-[4px_4px_0px_0px_rgba(250,250,250,1)] hover:shadow-[2px_2px_0px_0px_rgba(250,250,250,1)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all duration-100 flex items-center justify-center gap-2"
        aria-label="Share what's playing"
      >
        {copied ? (
          <>
            <Check className="w-4 h-4 text-accent" />
            <span className="text-xs font-bold tracking-widest">COPIED</span>
          </>
        ) : (
          <>
            <Share2 className="w-4 h-4" />
            <span className="text-xs font-bold tracking-widest">SHARE</span>
          </>
        )}
      </button>

    </div>
  )
}
