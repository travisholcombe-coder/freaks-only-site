"use client"

import { SupportButton } from "./support-button"
import { MerchButton } from "./merch-button"
import { AlbumPlayer } from "./album-player"
import { MailingListBox } from "./mailing-list-box"
import { SocialLinks } from "./social-links"
import { Zap, Smartphone } from "lucide-react"

const schedule = [
  { day: "MON", slots: [
    { time: "8AM-12PM", show: "TBA" },
    { time: "12PM-8PM", show: "TBA" },
    { time: "8PM-10PM", show: "TBA" },
    { time: "10PM-12AM", show: "TBA" },
    { time: "12AM-8AM", show: "TBA" },
  ]},
  { day: "TUE", slots: [
    { time: "8AM-12PM", show: "TBA" },
    { time: "12PM-8PM", show: "TBA" },
    { time: "8PM-10PM", show: "TBA" },
    { time: "10PM-12AM", show: "TBA" },
    { time: "12AM-8AM", show: "TBA" },
  ]},
  { day: "WED", slots: [
    { time: "8AM-12PM", show: "TBA" },
    { time: "12PM-8PM", show: "TBA" },
    { time: "8PM-10PM", show: "TBA" },
    { time: "10PM-12AM", show: "TBA" },
    { time: "12AM-8AM", show: "TBA" },
  ]},
  { day: "THU", slots: [
    { time: "8AM-12PM", show: "TBA" },
    { time: "12PM-8PM", show: "TBA" },
    { time: "8PM-10PM", show: "TBA" },
    { time: "10PM-12AM", show: "TBA" },
    { time: "12AM-8AM", show: "TBA" },
  ]},
  { day: "FRI", slots: [
    { time: "8AM-12PM", show: "TBA" },
    { time: "12PM-8PM", show: "TBA" },
    { time: "8PM-10PM", show: "TBA" },
    { time: "10PM-12AM", show: "TBA" },
    { time: "12AM-8AM", show: "TBA" },
  ]},
  { day: "SAT", slots: [
    { time: "6AM-12PM", show: "TBA" },
    { time: "12PM-6PM", show: "TBA" },
    { time: "6PM-12AM", show: "TBA" },
    { time: "12AM-6AM", show: "TBA" },
  ]},
  { day: "SUN", slots: [
    { time: "6AM-12PM", show: "TBA" },
    { time: "12PM-6PM", show: "TBA" },
    { time: "6PM-12AM", show: "TBA" },
    { time: "12AM-6AM", show: "TBA" },
  ]},
]

const dayKeys = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"]

function getSortedSchedule() {
  const todayIndex = new Date().getDay() // 0 = SUN, 1 = MON, etc.
  const todayKey = dayKeys[todayIndex]
  const startIndex = schedule.findIndex((d) => d.day === todayKey)
  return [...schedule.slice(startIndex), ...schedule.slice(0, startIndex)]
}

export function ContentGrid() {
  const sortedSchedule = getSortedSchedule()

  return (
    <div className="flex flex-col gap-4 p-4 pb-24">
      {/* Main Content Row - Player and Schedule Equal Width */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Album Player */}
        <AlbumPlayer />

        {/* Transmission Schedule */}
        <div className="border-4 border-foreground bg-secondary p-4 shadow-[8px_8px_0px_0px_rgba(250,250,250,1)] flex flex-col">
          <div className="flex items-center gap-2 mb-4">
            <Zap className="w-5 h-5 text-accent" />
            <h2 className="text-lg font-bold tracking-wider">TRANSMISSION SCHEDULE</h2>
          </div>
          <div className="flex-1 overflow-y-auto max-h-[400px] space-y-0 text-sm">
            {sortedSchedule.map((daySchedule, dayIndex) => (
              <div
                key={daySchedule.day}
                className={`${dayIndex !== sortedSchedule.length - 1 ? "border-b border-foreground/30" : ""}`}
              >
                <div className="bg-accent text-background px-2 py-1 font-bold text-sm tracking-wider">
                  {daySchedule.day}
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
          <div className="mt-4 pt-4 border-t-2 border-foreground/30">
            <p className="text-xs text-muted-foreground tracking-wider text-center">
              ALL TIMES PST // SCHEDULE SUBJECT TO CHANGE
            </p>
          </div>
        </div>
      </div>

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

        {/* App Coming Soon */}
        <div className="border-4 border-foreground bg-accent text-background p-4 shadow-[8px_8px_0px_0px_rgba(250,250,250,1)] flex flex-col justify-center min-h-[140px]">
          <div className="flex items-center gap-2 mb-2">
            <Smartphone className="w-5 h-5" />
            <h2 className="text-lg font-bold tracking-wider">APP</h2>
          </div>
          <p className="text-sm opacity-90 tracking-wide">
            COMING SOON
          </p>
          <div className="mt-3 border-2 border-background/50 px-2 py-1 inline-block w-fit">
            <span className="text-xs tracking-widest">iOS + ANDROID</span>
          </div>
        </div>
      </div>

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
