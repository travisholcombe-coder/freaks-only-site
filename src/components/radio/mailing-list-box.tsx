"use client"

import { useState } from "react"
import { Mail, Check } from "lucide-react"

// MailerLite embedded-form subscribe endpoint (from the form's embed code).
// We post to it directly (fire-and-forget) so we can use our own on-brand form
// instead of MailerLite's default styling. MailerLite's confirmation email does
// the real validation.
const MAILERLITE_ENDPOINT =
  "https://assets.mailerlite.com/jsonp/2505860/forms/192833612119279544/subscribe"

export function MailingListBox() {
  const [email, setEmail] = useState("")
  const [status, setStatus] = useState<"idle" | "submitting" | "success">("idle")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (status === "submitting" || status === "success") return
    const value = email.trim()
    if (!value) return

    setStatus("submitting")

    const body = new URLSearchParams()
    body.append("fields[email]", value)
    body.append("ml-submit", "1")
    body.append("anticsrf", "true")

    try {
      await fetch(MAILERLITE_ENDPOINT, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: body.toString(),
      })
    } catch {
      // no-cors returns an opaque response; nothing to read, treat as sent
    }

    setStatus("success")
    setEmail("")
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
            Check your inbox to confirm.
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
          </form>
        </>
      )}
    </div>
  )
}
