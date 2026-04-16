export function NowPlaying() {
  return (
    <div className="bg-[#FF4500] border-2 border-white p-4 mb-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
      <div className="flex flex-col md:flex-row gap-6 items-center">
        {/* The Logo Box */}
        <img 
          src="/freaks-only-logo.jpg" 
          alt="Now Playing" 
          className="w-48 h-48 object-cover border-4 border-white shadow-[8px_8px_0px_0px_rgba(212,0,0,1)]" 
        />
        
        {/* The Text Box */}
        <div className="flex-1 w-full">
          <div className="overflow-hidden bg-black border border-white p-2 mb-4">
            <div className="animate-marquee inline-block whitespace-nowrap">
              <span className="text-2xl md:text-4xl font-black uppercase italic tracking-tighter text-white">
                TUNE IN — WAITING FOR SIGNAL — TUNE IN — WAITING FOR SIGNAL — 
              </span>
            </div>
          </div>
          <div className="bg-white text-black p-2 border-2 border-black font-bold uppercase tracking-tighter">
            FREAKS ONLY RADIO
          </div>
        </div>
      </div>
    </div>
  )
}
