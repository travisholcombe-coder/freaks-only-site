"use client"

export function NowPlaying() {
  return (
    <div className="border-2 border-foreground bg-secondary p-4 mb-4 shadow-[4px_4px_0px_0px_rgba(250,250,250,1)]">
      <div className="flex flex-col w-full">
        <p className="text-xs font-bold tracking-widest uppercase text-foreground mb-2">Now Playing</p>
        <div className="overflow-hidden bg-black border border-foreground p-2">
          <div
            style={{
              display: "inline-block",
              whiteSpace: "nowrap",
              animation: "marquee-left 25s linear infinite",
            }}
          >
            <span className="text-2xl md:text-4xl font-black uppercase italic tracking-tighter text-white">
              TUNE IN — WAITING FOR SIGNAL — TUNE IN — WAITING FOR SIGNAL — TUNE IN — WAITING FOR SIGNAL —&nbsp;
            </span>
            <span className="text-2xl md:text-4xl font-black uppercase italic tracking-tighter text-white">
              TUNE IN — WAITING FOR SIGNAL — TUNE IN — WAITING FOR SIGNAL — TUNE IN — WAITING FOR SIGNAL —&nbsp;
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
