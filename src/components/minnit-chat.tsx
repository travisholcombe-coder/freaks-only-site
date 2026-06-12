import { useEffect } from "react"

export function MinnitChat() {
  useEffect(() => {
    const script = document.createElement("script")
    script.src = "https://minnit.chat/js/embed.js?c=1772345192"
    script.defer = true
    document.body.appendChild(script)

    return () => {
      document.body.removeChild(script)
    }
  }, [])

  return (
    <>
      <span
        style={{ display: "none" }}
        className="minnit-chat-sembed"
        data-chatname="https://organizations.minnit.chat/562854651725297/c/Main?embed"
        data-style="width:100%; height:360px;"
        data-version="1.55"
      >
        Chat
      </span>
      <p className="powered-by-minnit text-xs text-muted-foreground text-center mt-2">
        <a href="https://minnit.chat" target="_blank" rel="noopener noreferrer">
          Add a group chat to your website with Minnit Chat
        </a>
      </p>
    </>
  )
}
