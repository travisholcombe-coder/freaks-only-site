"use client"

import { useEffect, useState } from "react"
import { Smartphone, X, Share, MoreVertical, MoreHorizontal } from "lucide-react"

// beforeinstallprompt isn't in the DOM lib types yet
interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>
}

function isStandalone(): boolean {
  if (typeof window === "undefined") return false
  return (
    window.matchMedia("(display-mode: standalone)").matches ||
    // iOS Safari home-screen apps
    (window.navigator as unknown as { standalone?: boolean }).standalone === true
  )
}

function isIOS(): boolean {
  if (typeof window === "undefined") return false
  return /iphone|ipad|ipod/i.test(window.navigator.userAgent)
}

export function InstallButton() {
  const [mounted, setMounted] = useState(false)
  const [standalone, setStandalone] = useState(false)
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null)
  const [showModal, setShowModal] = useState(false)

  useEffect(() => {
    setMounted(true)
    setStandalone(isStandalone())

    const onBeforeInstall = (e: Event) => {
      // Stop Chrome's mini-infobar; we drive the prompt from our own button
      e.preventDefault()
      setDeferredPrompt(e as BeforeInstallPromptEvent)
    }
    const onInstalled = () => {
      setStandalone(true)
      setDeferredPrompt(null)
      setShowModal(false)
    }

    window.addEventListener("beforeinstallprompt", onBeforeInstall)
    window.addEventListener("appinstalled", onInstalled)
    return () => {
      window.removeEventListener("beforeinstallprompt", onBeforeInstall)
      window.removeEventListener("appinstalled", onInstalled)
    }
  }, [])

  // Nothing to show until mounted, or when already installed (display-mode: standalone)
  if (!mounted || standalone) return null

  const ios = isIOS()

  const handleClick = async () => {
    if (deferredPrompt) {
      // Android / Chromium: real one-tap install prompt (needs the service worker)
      await deferredPrompt.prompt()
      const choice = await deferredPrompt.userChoice
      if (choice.outcome === "accepted") setDeferredPrompt(null)
    } else {
      // iOS Safari (no prompt API), or Android before the prompt is captured:
      // show manual instructions
      setShowModal(true)
    }
  }

  return (
    <>
      <button
        onClick={handleClick}
        className="border-4 border-foreground bg-accent text-background p-4 shadow-[8px_8px_0px_0px_rgba(250,250,250,1)] hover:shadow-[4px_4px_0px_0px_rgba(250,250,250,1)] hover:translate-x-[4px] hover:translate-y-[4px] transition-all duration-100 flex flex-col justify-center items-center min-h-[140px] text-center w-full"
        aria-label="Install the FREAKS ONLY app"
      >
        <div className="flex items-center gap-2 mb-2">
          <Smartphone className="w-5 h-5" />
          <h2 className="text-lg font-bold tracking-wider">INSTALL THE APP</h2>
        </div>
        <div className="mt-1 border-2 border-background/50 px-2 py-1">
          <span className="text-xs tracking-widest">iOS + ANDROID</span>
        </div>
      </button>

      {showModal && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-4"
          onClick={() => setShowModal(false)}
        >
          <div
            className="border-4 border-foreground bg-secondary p-6 max-w-sm w-full shadow-[8px_8px_0px_0px_rgba(250,250,250,1)] relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-2 right-2 p-1 hover:text-accent transition-colors"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-lg font-bold tracking-wider mb-4 pr-6">
              INSTALL FREAKS ONLY
            </h3>

            {ios ? (
              <ol className="space-y-3 text-sm tracking-wide">
                <li className="flex items-start gap-2">
                  <span className="font-bold text-accent">1.</span>
                  <span>
                    Make sure you&rsquo;re using <strong>Safari</strong> (this only works in
                    Safari, not other browsers).
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-bold text-accent">2.</span>
                  <span>
                    Tap the{" "}
                    <MoreHorizontal className="inline w-4 h-4 mx-0.5 align-text-bottom" />{" "}
                    (&bull;&bull;&bull;) button next to the web address at the bottom of the
                    screen &mdash; or the{" "}
                    <Share className="inline w-4 h-4 mx-0.5 align-text-bottom" /> Share icon
                    (a square with an arrow pointing up).
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-bold text-accent">3.</span>
                  <span>
                    A menu slides up from the bottom. Scroll down and tap{" "}
                    <strong>Add to Home Screen</strong>.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-bold text-accent">4.</span>
                  <span>
                    Tap <strong>Add</strong> in the top-right corner. The FREAKS ONLY icon
                    appears on your home screen &mdash; open it like any app.
                  </span>
                </li>
              </ol>
            ) : (
              <ol className="space-y-3 text-sm tracking-wide">
                <li className="flex items-start gap-2">
                  <span className="font-bold text-accent">1.</span>
                  <span>
                    Open your browser&rsquo;s menu &mdash; the{" "}
                    <MoreVertical className="inline w-4 h-4 mx-0.5 align-text-bottom" />{" "}
                    (three dots), usually in the top-right corner.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-bold text-accent">2.</span>
                  <span>
                    Tap <strong>Add to Home screen</strong> (or <strong>Install app</strong>).
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-bold text-accent">3.</span>
                  <span>Confirm, and it lands on your home screen.</span>
                </li>
              </ol>
            )}
          </div>
        </div>
      )}
    </>
  )
}
