import { Header } from "@/components/radio/header"
import { NowPlaying } from "@/components/radio/now-playing"
import { ContentGrid } from "@/components/radio/content-grid"
import { AudioPlayer } from "@/components/radio/audio-player"

export default function Home() {
  return (
    <main className="min-h-screen pb-20">
      {/* Aggressive Header */}
      <Header />

      {/* Now Playing Ticker */}
      <div className="p-4">
        <NowPlaying />
      </div>

      {/* Raw Grid Content */}
      <ContentGrid />

      {/* Fixed Audio Player */}
      <AudioPlayer />
    </main>
  )
}
