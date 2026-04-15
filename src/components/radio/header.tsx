"use client"



export function Header() {
  return (
    <header className="border-b-4 border-foreground p-4 md:p-6">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="border-4 border-foreground bg-accent p-1 shadow-[8px_8px_0px_0px_rgba(250,250,250,1)]">
            <img
              src="/images/freaks-only-logo.png"
              alt="FREAKS ONLY Logo"
              width={120}
              height={120}
              className="w-20 h-20 md:w-28 md:h-28"
            />
          </div>
          <div className="flex flex-col">
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tighter uppercase">
              FREAKS ONLY
            </h1>
            <span className="text-xs md:text-sm text-foreground tracking-widest">
              With Travis Holcombe
            </span>
            <span className="text-xs md:text-sm text-muted-foreground tracking-widest">
              FREAKSONLY.FM
            </span>
          </div>
        </div>
        
        <div className="flex flex-col items-end gap-2">
          <div className="border-4 border-foreground bg-secondary px-3 py-1">
            <span className="text-xs tracking-widest">LOS ANGELES</span>
          </div>
        </div>
      </div>
    </header>
  )
}
