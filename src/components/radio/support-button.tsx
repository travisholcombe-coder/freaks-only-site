"use client"

export function SupportButton() {
  return (
    <div
      className="inline-block stamp-effect cursor-not-allowed opacity-90"
    >
      <div className="relative">
        {/* Outer stamp border */}
        <div className="border-4 border-dashed border-accent p-1">
          {/* Inner content */}
          <div className="border-4 border-foreground bg-accent px-6 py-4 shadow-[6px_6px_0px_0px_rgba(250,250,250,1)]">
            <div className="flex flex-col items-center gap-1">
              <span className="text-xs text-background/70 tracking-widest">
                ★ SUPPORT ★
              </span>
              <span className="text-xl md:text-2xl font-bold text-background tracking-tight text-center">
                FREAKS ONLY
              </span>
              <span className="text-xs text-background/70 tracking-widest">
                KEEP US ON AIR
              </span>
            </div>
          </div>
        </div>
        
        {/* Stamp texture overlay */}
        <div className="absolute inset-0 pointer-events-none opacity-20 mix-blend-multiply">
          <div className="w-full h-full bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,rgba(0,0,0,0.1)_2px,rgba(0,0,0,0.1)_4px)]" />
        </div>
      </div>
    </div>
  )
}
