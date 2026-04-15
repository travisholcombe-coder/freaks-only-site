"use client"



export function AlbumPlayer() {
  return (
    <div className="border-4 border-foreground bg-secondary p-4 shadow-[8px_8px_0px_0px_rgba(250,250,250,1)]">
      <div className="flex flex-col items-center gap-4">
        {/* Album Artwork */}
        <div className="border-4 border-foreground bg-background w-full aspect-square relative overflow-hidden">
          <img
            src="/images/freaks-only-logo.png"
            alt="Now Playing Album Art"
            fill
            className="object-cover"
          />
        </div>
        
        {/* Track Info */}
        <div className="w-full text-center">
          <div className="border-2 border-foreground bg-background px-3 py-2 mb-2">
            <p className="text-sm font-bold tracking-wider truncate">TRACK TITLE</p>
          </div>
          <p className="text-xs text-muted-foreground tracking-widest">ARTIST NAME</p>
        </div>
      </div>
    </div>
  )
}
