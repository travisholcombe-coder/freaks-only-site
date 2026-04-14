"use client"

import { useState, useRef } from "react"
import { Play, Pause, Volume2, VolumeX } from "lucide-react"

export function AudioPlayer() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [volume, setVolume] = useState(0.8)
  const audioRef = useRef<HTMLAudioElement>(null)

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause()
      } else {
        audioRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted
      setIsMuted(!isMuted)
    }
  }

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value)
    setVolume(newVolume)
    if (audioRef.current) {
      audioRef.current.volume = newVolume
    }
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 border-t-4 border-foreground bg-background z-50">
      {/* Live365 stream - replace with actual stream URL */}
      <audio
        ref={audioRef}
        src="https://stream.live365.com/placeholder"
        preload="none"
      />
      
      <div className="flex items-center justify-between px-4 py-3 gap-4">
        {/* Live Indicator */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-accent rounded-full animate-glow" />
            <span className="text-xs font-bold tracking-widest text-accent">
              LIVE
            </span>
          </div>
          <div className="hidden sm:block h-6 w-px bg-foreground/30" />
          <span className="hidden sm:block text-xs text-muted-foreground tracking-wider">
            24/7 BROADCAST
          </span>
        </div>

        {/* Player Controls */}
        <div className="flex items-center gap-4">
          {/* Play/Pause Button */}
          <button
            onClick={togglePlay}
            className="border-4 border-foreground bg-accent p-3 shadow-[4px_4px_0px_0px_rgba(250,250,250,1)] hover:shadow-[2px_2px_0px_0px_rgba(250,250,250,1)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all duration-100 active:shadow-none active:translate-x-1 active:translate-y-1"
            aria-label={isPlaying ? "Pause" : "Play"}
          >
            {isPlaying ? (
              <Pause className="w-6 h-6 text-background" fill="currentColor" />
            ) : (
              <Play className="w-6 h-6 text-background" fill="currentColor" />
            )}
          </button>

          {/* Volume Controls */}
          <div className="hidden md:flex items-center gap-2">
            <button
              onClick={toggleMute}
              className="p-2 hover:text-accent transition-colors"
              aria-label={isMuted ? "Unmute" : "Mute"}
            >
              {isMuted ? (
                <VolumeX className="w-5 h-5" />
              ) : (
                <Volume2 className="w-5 h-5" />
              )}
            </button>
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={isMuted ? 0 : volume}
              onChange={handleVolumeChange}
              className="w-20 h-2 bg-secondary border-2 border-foreground appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:bg-accent [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-foreground [&::-webkit-slider-thumb]:cursor-pointer"
              aria-label="Volume"
            />
          </div>
        </div>

        {/* Station ID */}
        <div className="hidden sm:flex items-center gap-2 border-2 border-foreground px-3 py-1 bg-secondary">
          <span className="text-xs tracking-widest">FREAKSONLY.FM</span>
        </div>
      </div>
    </div>
  )
}
