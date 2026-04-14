"use client"

export function MerchButton() {
  return (
    <div
      className="inline-block stamp-effect cursor-not-allowed opacity-90"
    >
      <div className="relative">
        <div className="border-4 border-dashed border-foreground p-1">
          <div className="border-4 border-foreground bg-background px-6 py-4 shadow-[6px_6px_0px_0px_rgba(193,58,49,1)]">
            <div className="flex flex-col items-center gap-1">
              <span className="text-xs text-muted-foreground tracking-widest">
                ★ SHOP ★
              </span>
              <span className="text-xl md:text-2xl font-bold text-foreground tracking-tight">
                MERCH
              </span>
              <span className="text-xs text-muted-foreground tracking-widest">
                REP FREAKS ONLY
              </span>
            </div>
          </div>
        </div>
        
        <div className="absolute inset-0 pointer-events-none opacity-20 mix-blend-multiply">
          <div className="w-full h-full bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,rgba(0,0,0,0.1)_2px,rgba(0,0,0,0.1)_4px)]" />
        </div>
      </div>
    </div>
  )
}
