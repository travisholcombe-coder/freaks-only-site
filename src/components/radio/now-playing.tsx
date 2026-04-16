"use client"

export function NowPlaying() {
  return (
    <div className="bg-[#FF4500] border-2 border-white p-4 mb-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
      <div className="flex flex-col w-full">
        <p className="text-xs font-bold tracking-widest uppercase text-white mb-2">Now Playing</p>
        <div className="overflow-hidden bg-black border border-white p-2">
          <div className="animate-marquee inline-block whitespace-nowrap">
            <span className="text-2xl md:text-4xl font-black uppercase italic tracking-tighter text-white">
              TUNE IN — WAITING FOR SIGNAL — TUNE IN — WAITING FOR SIGNAL — TUNE IN — WAITING FOR SIGNAL —&nbsp;
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
