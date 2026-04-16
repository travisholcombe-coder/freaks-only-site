"use client"

export function NowPlaying() {
  const currentTrack = "WAITING FOR SIGNAL..."
  const artist = "TUNE IN"

  return (
    <div className="border-4 border-foreground bg-secondary overflow-hidden">
      <div className="bg-foreground text-background px-3 py-1 text-xs tracking-widest font-bold">
        NOW PLAYING
      </div>
      {/* Dymo Label Style Ticker */}
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
                  {currentTrack}
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
                  {currentTrack}
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
