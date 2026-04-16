export default function NowPlaying() {
  return (
    <div className="bg-white border-2 border-black p-4 mb-4">
      <div className="flex gap-4 items-center">
        {/* Simple logo placeholder */}
        <div className="bg-black text-white w-48 h-48 flex items-center justify-center font-bold">
           LOGO HERE
        </div>
        
        {/* Basic text */}
        <div className="flex-1">
          <p className="text-xl font-black uppercase tracking-tighter bg-black text-white p-2">TUNE IN — WAITING FOR SIGNAL —</p>
          <p className="text-sm font-bold mt-2">FREAKS ONLY RADIO</p>
        </div>
      </div>
    </div>
  )
}
