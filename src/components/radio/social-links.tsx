import { Instagram } from "lucide-react"

export function SocialLinks() {
  const links = [
    { label: "@freaksonlyfm", platform: "Instagram", href: "https://instagram.com/freaksonlyfm", icon: "ig" },
    { label: "@TravisHolcombe", platform: "Instagram", href: "https://instagram.com/TravisHolcombe", icon: "ig" },
    { label: "@TravisHolcombe", platform: "X", href: "https://x.com/TravisHolcombe", icon: "x" },
    { label: "@TravisJHolcombe", platform: "Facebook", href: "https://facebook.com/TravisJHolcombe", icon: "fb" },
    { label: "@TravisHolcombe", platform: "Threads", href: "https://threads.net/@TravisHolcombe", icon: "th" },
    { label: "@TravisHolcombe", platform: "Bluesky", href: "https://bsky.app/profile/travisholcombe.bsky.social", icon: "bs" },
  ]

  return (
    <div className="flex flex-wrap items-center justify-center gap-3">
      {links.map((link, index) => (
        <a
          key={index}
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center gap-1.5 border-2 border-foreground bg-background px-2 py-1 text-xs tracking-wider hover:bg-accent hover:text-background hover:border-accent transition-colors"
        >
          <span className="font-bold">{link.platform}</span>
          <span className="text-muted-foreground group-hover:text-background/70">{link.label}</span>
        </a>
      ))}
    </div>
  )
}
