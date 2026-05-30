"use client"

export function SupportButton() {
  const handleClick = () => {
    window.dispatchEvent(new Event("open-donate"))
    setTimeout(() => {
      const donateSection = document.getElementById("donate")
      if (donateSection) {
        donateSection.scrollIntoView({ behavior: "smooth", block: "start" })
      }
    }, 50)
  }

  return (
    <button
      onClick={handleClick}
      className="inline-block stamp-effect cursor-pointer hover:scale-105 transition-transform"
      aria-label="Open donation options"
    >
      <div className="relative">
        {/* Outer stamp border */}
        <div className="border-4 border-dashed border-background p-1">
          {/* Inner content */}
          <div className="border-4 border-foreground bg-accent px-6 py-4 shadow-[6px_6px_0px_0px_rgba(250,250,250,1)]">
            <div className="flex flex-col items-center gap-1.5">
              <span className="text-3xl md:text-4xl font-bold text-background tracking-tight leading-none">
                SUPPORT
              </span>
              <span className="text-xs text-background tracking-widest">
                FREAKS ONLY FM
              </span>
              <span className="text-[10px] text-background/90 tracking-wide leading-tight text-center max-w-[180px] pt-1">
                Listener-funded. No algorithm. Your donation keeps us on the air.
              </span>
            </div>
          </div>
        </div>
        {/* Stamp texture overlay */}
        <div className="absolute inset-0 pointer-events-none opacity-20 mix-blend-multiply">
          <div className="w-full h-full bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,rgba(0,0,0,0.1)_2px,rgba(0,0,0,0.1)_4px)]" />
        </div>
      </div>
    </button>
  )
}
