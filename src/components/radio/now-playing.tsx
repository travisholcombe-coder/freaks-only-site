import { Radio, Music2 } from "lucide-react"

export default function NowPlaying() {
  return (
    <div className="bg-secondary p-4 mb-4 border-2 border-foreground shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
      <div className="flex flex-col md:flex-row gap-6 items-center">
        {/* The Logo / Album Art Placeholder */}
        <img 
          src="/freaks-only-logo.jpg" 
          alt="Now Playing" 
          className="w-48 h-48 object-cover border-4 border-foreground shadow-[8px_8px_0px_0px_rgba(212,0,0,1)]" 
        />
        
        {/* The Station Info */}
        <div className="flex-1 w-full">
          <div className="flex items-center gap-2 mb-2">
            <Radio className="w-5 h-5 text-accent animate-pulse" />
            <span className="font-bold uppercase tracking-tighter text-sm">Live Broadcast</span>
          </div>
          
          <div className="overflow-hidden bg-black border border-foreground p-2 mb-4">
            <div className="animate-marquee inline-block whitespace-nowrap">
              <span className="text-2xl md:text-4xl font-black uppercase italic tracking-tighter">
                TUNE IN — WAITING FOR SIGNAL — TUNE IN — WAITING FOR SIGNAL — 
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3 bg-white text-black p-2 border-2 border-black">
            <div className="bg-accent p-1">
              <Music2 className="w-4 h-4 text-white" />
            </div>
            <div className="font-bold uppercase tracking-tighter text-sm">
              FREAKS ONLY RADIO
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
