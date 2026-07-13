"use client"

import { useState } from "react"
import { Mail, Check } from "lucide-react"

// Posts to our own Cloudflare Pages Function (/subscribe), which forwards to the
// MailerLite API server-side. Same-origin, so no CORS and real success/error.
export function MailingListBox() {
  const [email, setEmail] = useState("")
  const [status, setStatus] = useState<"idle" | "submitting" | "success">("idle")
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (status === "submitting" || status === "success") return
    const value = email.trim()
    if (!value) return

    setStatus("submitting")
    setError("")

    try {
      const res = await fetch("/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: value }),
      })
      if (res.ok) {
        setStatus("success")
        setEmail("")
      } else {
        const data = await res.json().catch(() => ({}))
        setError(data.error || "Something went wrong. Try again.")
        setStatus("idle")
      }
    } catch {
      setError("Network error. Try again.")
      setStatus("idle")
    }
  }

  return (
    <div className="border-4 border-foreground bg-secondary p-4 shadow-[8px_8px_0px_0px_rgba(250,250,250,1)] flex flex-col justify-center items-center min-h-[140px] text-center">
      <div className="flex items-center justify-center gap-2 mb-3">
        <Mail className="w-5 h-5 text-accent" />
        <h2 className="text-lg font-bold tracking-wider">MAILING LIST</h2>
      </div>

      {status === "success" ? (
        <div className="flex flex-col items-center gap-1">
          <div className="flex items-center gap-2 text-accent">
            <Check className="w-5 h-5" />
            <span className="text-sm font-bold tracking-widest">YOU&rsquo;RE ON THE LIST</span>
          </div>
          <p className="text-xs text-muted-foreground tracking-wide">
            Thanks for tuning in.
          </p>
        </div>
      ) : (
        <>
          <p className="text-xs text-muted-foreground tracking-wide mb-4">
            Get updates delivered to your inbox
          </p>
          <form onSubmit={handleSubmit} className="w-full flex flex-col gap-2">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="YOUR EMAIL"
              aria-label="Email address"
              className="w-full border-2 border-foreground bg-background text-foreground placeholder:text-muted-foreground text-sm tracking-wider px-3 py-2 focus:outline-none focus:border-accent"
            />
            <button
              type="submit"
              disabled={status === "submitting"}
              className="w-full border-2 border-foreground bg-accent text-background text-sm font-bold tracking-widest px-3 py-2 shadow-[3px_3px_0px_0px_rgba(250,250,250,1)] hover:shadow-[1px_1px_0px_0px_rgba(250,250,250,1)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all duration-100 disabled:opacity-60"
            >
              {status === "submitting" ? "SUBMITTING..." : "SUBSCRIBE"}
            </button>
            {error && (
              <p className="text-[10px] text-accent tracking-wide">{error}</p>
            )}
          </form>
        </>
      )}
    </div>
  )
}
