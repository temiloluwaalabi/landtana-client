// This is an optional custom service worker
// The built-in next-pwa service worker handles most things automatically

self.addEventListener("install", (event) => {
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(clients.claim());
});

// Optional: Add custom cache strategies, offline functionality, or push notifications
