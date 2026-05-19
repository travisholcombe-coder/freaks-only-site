"use client"

import { SupportButton } from "./support-button"
import { MerchButton } from "./merch-button"
import { AlbumPlayer } from "./album-player"
import { MailingListBox } from "./mailing-list-box"
import { SocialLinks } from "./social-links"
import { DonateSection } from "./donate-section"
import { Zap, Smartphone } from "lucide-react"

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
        <di
