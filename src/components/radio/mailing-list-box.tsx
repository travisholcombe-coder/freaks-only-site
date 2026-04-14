"use client"

import { Mail } from "lucide-react"

export function MailingListBox() {
  return (
    <div className="border-4 border-foreground bg-secondary p-4 shadow-[8px_8px_0px_0px_rgba(250,250,250,1)] flex flex-col justify-center min-h-[140px]">
      <div className="flex items-center gap-2 mb-3">
        <Mail className="w-5 h-5 text-accent" />
        <h2 className="text-lg font-bold tracking-wider">MAILING LIST</h2>
      </div>
      <p className="text-xs text-muted-foreground tracking-wide mb-4">
        Get updates delivered to your inbox
      </p>
      <div 
        className="border-2 border-dashed border-foreground px-4 py-2 text-center text-sm font-bold tracking-widest cursor-not-allowed opacity-70"
      >
        COMING SOON
      </div>
    </div>
  )
}
