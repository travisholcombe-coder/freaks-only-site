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
                <div classNa"use client"

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
