"use client"

import { useState, useEffect } from "react"
import { SupportButton } from "./support-button"
import { MerchButton } from "./merch-button"
import { AlbumPlayer } from "./album-player"
import { MailingListBox } from "./mailing-list-box"
import { SocialLinks } from "./social-links"
import { DonateSection } from "./donate-section"
import { LastPlayed } from "./last-played"
import { InstallButton } from "./install-button"
import { PressSection } from "./press-section"
import { MinnitChat } from "../minnit-chat"
import { Zap, MessageCircle } from "lucide-react"

const schedule = [
  { day: "MON", slots: [
    { time: "8AM-12PM", show: "THE PERCOLATOR" },
    { time: "12PM-8PM", show: "FREAK PARADE" },
    { time: "8PM-12AM", show: "AUX OUT" },
    { time: "12AM-8AM", show: "FREAK PARADE" },
  ]},
  { day: "TUE", slots: [
    { time: "8AM-12PM", show: "THE PERCOLATOR" },
    { time: "12PM-8PM", show: "FREAK PARADE" },
    { time: "8PM-12AM", show: "AUX OUT" },
    { time: "12AM-8AM", show: "FREAK PARADE" },
  ]},
  { day: "WED", slots: [
    { time: "8AM-12PM", show: "THE PERCOLATOR" },
    { time: "12PM-8PM", show: "FREAK PARADE" },
    { time: "8PM-12AM", show: "AUX OUT" },
    { time: "12AM-8AM", show: "FREAK PARADE" },
  ]},
  { day: "THU", slots: [
    { time: "8AM-12PM", show: "THE PERCOLATOR" },
    { time: "12PM-8PM", show: "FREAK PARADE" },
    { time: "8PM-12AM", show: "AUX OUT" },
    { time: "12AM-8AM", show: "FREAK PARADE" },
  ]},
  { day: "FRI", slots: [
    { time: "8AM-12PM", show: "THE PERCOLATOR" },
    { time: "12PM-8PM", show: "FREAK PARADE" },
    { time: "8PM-12AM", show: "AUX OUT" },
    { time: "12AM-8AM", show: "FREAK PARADE" },
  ]},
{ day: "SAT", slots: [
  { time: "8AM-8PM", show: "FREAK PARADE" },
  { time: "8PM-4AM", show: "AUX OUT" },
]},
{ day: "SUN", slots: [
  { time: "4AM-8PM", show: "THE PERCOLATOR" },
  { time: "8PM-8AM", show: "FREAK PARADE" },
]},
]

const dayKeys = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"]

function getSortedSchedule() {
  const todayIndex = new Date().getDay()
  const todayKey = dayKeys[todayIndex]
  const startIndex = schedule.findIndex((d) => d.day === todayKey)
  return [...schedule.slice(startIndex), ...schedule.slice(0, startIndex)]
}

// --- "On now" helpers (schedule is in PST; compute against LA time so a
// listener anywhere sees the correct slot) ---
function parseHour(s: string): number {
  const m = s.trim().match(/^(\d+)(AM|PM)$/i)
  if (!m) return 0
  let h = parseInt(m[1], 10) % 12
  if (m[2].toUpperCase() === "PM") h += 12
  return h
}

interface Interval { start: number; end: number; show: string; time: string; startLabel: string }

function buildIntervals(): Interval[] {
  const out: Interval[] = []
  for (const d of schedule) {
    const di = dayKeys.indexOf(d.day)
    for (const slot of d.slots) {
      const [a, b] = slot.time.split("-")
      const sh = parseHour(a)
      const eh = parseHour(b)
      let dur = (eh - sh + 24) % 24
      if (dur === 0) dur = 24
      const start = di * 24 + sh
      out.push({ start, end: start + dur, show: slot.show, time: slot.time, startLabel: a.trim() })
    }
  }
  return out
}

function laHourOfWeek(): number {
  const la = new Date(new Date().toLocaleString("en-US", { timeZone: "America/Los_Angeles" }))
  return la.getDay() * 24 + la.getHours() + la.getMinutes() / 60
}

function getOnNow(): { current: Interval | null; next: Interval | null } {
  const t = laHourOfWeek()
  const iv = buildIntervals()
  let current: Interval | null = null
  for (const x of iv) {
    if ((t >= x.start && t < x.end) || (t + 168 >= x.start && t + 168 < x.end)) {
      current = x
      break
    }
  }
  let next: Interval | null = null
  let best = Infinity
  for (const x of iv) {
    if (x === current) continue
    // Skip a next slot that's the same show as what's on now (avoids a
    // redundant "UP NEXT" when overnight blocks overlap).
    if (current && x.show === current.show) continue
    let d = (x.start - t) % 168
    if (d <= 0) d += 168
    if (d < best) {
      best = d
      next = x
    }
  }
  return { current, next }
}

function isStandalone(): boolean {
  if (typeof window === "undefined") return false
  return (
    window.matchMedia("(display-mode: standalone)").matches ||
    (window.navigator as unknown as { standalone?: boolean }).standalone === true
  )
}

export function ContentGrid() {
  const sortedSchedule = getSortedSchedule()
  const [onNow, setOnNow] = useState<{ current: Interval | null; next: Interval | null }>(getOnNow)
  const [standalone, setStandalone] = useState(false)

  useEffect(() => {
    setStandalone(isStandalone())
    setOnNow(getOnNow())
    const id = setInterval(() => setOnNow(getOnNow()), 60000)
    return () => clearInterval(id)
  }, [])

  return (
    <div className="flex flex-col gap-4 p-4 pt-2 pb-36">

      {/*
        Main content grid.
        Mobile (grid-cols-1): order-* controls stacking —
          1. AlbumPlayer
          2. LastPlayed
          3. Chat
          4. Schedule
        Desktop (md:grid-cols-4): explicit spans/order place AlbumPlayer
        as a big left block (2 cols x 2 rows), with Schedule + Chat
        50/50 in the top-right and LastPlayed spanning the bottom-right.
      */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:items-start">

        {/* Album Player */}
        <div className="order-1 md:order-1 md:col-span-2 md:row-span-2">
          <AlbumPlayer />
        </div>

        {/* Last Played */}
        <div className="order-2 md:order-4 md:col-span-2">
          <LastPlayed />
        </div>

        {/* Minnit Chat Widget */}
        <div className="order-3 md:order-3 border-4 border-foreground bg-secondary p-4 shadow-[8px_8px_0px_0px_rgba(250,250,250,1)] flex flex-col">
          <div className="flex items-center gap-2 mb-4">
            <MessageCircle className="w-5 h-5 text-accent" />
            <h2 className="text-lg font-bold tracking-wider">LISTENER CHAT</h2>
          </div>
          <MinnitChat />
        </div>

        {/* Transmission Schedule */}
        <div className="order-4 md:order-2 border-4 border-foreground bg-secondary p-4 shadow-[8px_8px_0px_0px_rgba(250,250,250,1)] flex flex-col">
          <div className="flex items-center gap-2 mb-4">
            <Zap className="w-5 h-5 text-accent" />
            <h2 className="text-lg font-bold tracking-wider">TRANSMISSION SCHEDULE</h2>
          </div>

          {/* ON NOW - pinned highlight, visible everywhere */}
          {onNow.current && (
            <div className="mb-4 border-2 border-accent bg-accent/10 p-3">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                <span className="text-xs font-bold tracking-widest text-accent">ON NOW</span>
              </div>
              <p className="text-base font-bold tracking-wider mt-1">{onNow.current.show}</p>
              <p className="text-xs text-muted-foreground tracking-wider">{onNow.current.time} PST</p>
              {onNow.next && (
                <p className="text-[10px] text-muted-foreground tracking-widest mt-2 pt-2 border-t border-foreground/20">
                  UP NEXT: {onNow.next.show} / {onNow.next.startLabel}
                </p>
              )}
            </div>
          )}

          {/* Full day grid - hidden in the installed app (standalone) */}
          {!standalone && (
            <div className="flex-1 overflow-y-auto max-h-[280px] space-y-0 text-sm">
              {sortedSchedule.map((daySchedule, dayIndex) => (
                <div
                  key={daySchedule.day}
                  className={`${dayIndex !== sortedSchedule.length - 1 ? "border-b border-foreground/30" : ""}`}
                >
                  <div className="bg-accent text-background px-2 py-1 font-bold text-sm tracking-wider sticky top-0">
                    {dayIndex === 0 ? `${daySchedule.day} — TODAY` : dayIndex === 1 ? `${daySchedule.day} — TOMORROW` : daySchedule.day}
                  </div>
                  {daySchedule.slots.map((slot, slotIndex) => (
                    <div
                      key={`${daySchedule.day}-${slotIndex}`}
                      className={`flex justify-between items-center px-2 py-2 ${
                        slotIndex !== daySchedule.slots.length - 1 ? "border-b border-foreground/10" : ""
                      }`}
                    >
                      <span className="text-muted-foreground text-xs tracking-wider w-24">{slot.time}</span>
                      <span className="text-foreground text-xs tracking-wider">{slot.show}</span>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          )}

          <div className="mt-4 pt-4 border-t-2 border-foreground/30">
            <p className="text-xs text-muted-foreground tracking-wider text-center">
              ALL TIMES PST // SCHEDULE SUBJECT TO CHANGE
            </p>
          </div>
        </div>

      </div>{/* end main grid */}

      {/* Bottom Row - Action Items */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">

        {/* Support Block */}
        <div className="border-4 border-foreground bg-secondary p-4 shadow-[8px_8px_0px_0px_rgba(250,250,250,1)] flex items-center justify-center min-h-[140px]">
          <SupportButton />
        </div>

        {/* Merch Block */}
        <div className="border-4 border-foreground bg-secondary p-4 shadow-[8px_8px_0px_0px_rgba(250,250,250,1)] flex items-center justify-center min-h-[140px]">
          <MerchButton />
        </div>

        {/* Mailing List Block */}
        <MailingListBox />

        {/* Install App (replaces "App Coming Soon"; hides itself in standalone) */}
        <InstallButton />
      </div>

      {/* Donate Section */}
      <DonateSection />

      {/* In The Press / Outside Transmissions - media (website only; hidden in the app) */}
      <PressSection />

      {/* Social Links */}
      <div className="border-4 border-foreground bg-secondary p-4 shadow-[8px_8px_0px_0px_rgba(250,250,250,1)]">
        <h3 className="text-xs font-bold tracking-widest text-center mb-3 text-muted-foreground">CONNECT</h3>
        <SocialLinks />
      </div>

      {/* Legal Disclaimer */}
      <div className="border-t-2 border-foreground/30 pt-4 mt-2">
        <p className="text-xs text-muted-foreground tracking-wider text-center">
          FREAKS ONLY was originally created at KCRW
        </p>
      </div>
    </div>
  )
}
