// FREAKS ONLY FM - service worker (v1)
// Deliberately minimal and fail-safe. Design rules:
//   * NEVER intercept cross-origin requests. The audio stream (live365), the
//     metadata Worker, album art, YouTube embeds, and Google Fonts are all
//     cross-origin and pass straight through untouched.
//   * Same-origin navigations: network-first, falling back to a cached shell
//     only when offline. This means online visitors ALWAYS get the fresh build
//     (no "stuck on an old version" trap).
//   * Same-origin static assets (Vite's hashed JS/CSS, icons, logo):
//     stale-while-revalidate.
//   * Versioned cache, old versions purged on activate.
//
// KILL SWITCH: if this ever misbehaves in production, replace this file with a
// self-unregistering stub (provided separately) and redeploy. It clears caches
// and unregisters, restoring the plain website with no rebuild required.

const VERSION = "fofm-v1";
const CACHE = VERSION;
const OFFLINE_URL = "/";

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open(CACHE)
      .then((cache) => cache.addAll([OFFLINE_URL, "/freaks-only-logo.jpg"]))
      .catch(() => {})
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (event) => {
  const req = event.request;

  // Only GET requests are cacheable; leave everything else alone.
  if (req.method !== "GET") return;

  const url = new URL(req.url);

  // Cross-origin (audio stream, metadata API, album art, YouTube, fonts):
  // do not intercept at all.
  if (url.origin !== self.location.origin) return;

  // Navigations: network-first, fall back to the cached shell when offline.
  if (req.mode === "navigate") {
    event.respondWith(
      fetch(req)
        .then((res) => {
          const copy = res.clone();
          caches.open(CACHE).then((c) => c.put(OFFLINE_URL, copy)).catch(() => {});
          return res;
        })
        .catch(() => caches.match(OFFLINE_URL).then((r) => r || Response.error()))
    );
    return;
  }

  // Same-origin static assets: stale-while-revalidate.
  event.respondWith(
    caches.match(req).then((cached) => {
      const network = fetch(req)
        .then((res) => {
          if (res && res.status === 200) {
            const copy = res.clone();
            caches.open(CACHE).then((c) => c.put(req, copy)).catch(() => {});
          }
          return res;
        })
        .catch(() => cached);
      return cached || network;
    })
  );
});
