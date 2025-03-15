/* eslint-disable no-undef */
const CACHE_NAME = "landtana-pwa-cache-v1";
const OFFLINE_PAGE = "/offline"; // Path to your offline page
const CACHED_ASSETS = [
  "/", // Home page
  "/offline", // Offline page
  "/favicon.ico", // Favicon
  "/android-chrome-512x512.png", // Example image
  "/manifest.json", // PWA manifest
  "/_next/static/css/styles.css", // Example CSS file
  "/_next/static/js/main.js", // Example JS file
  // Add other critical assets here
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(CACHED_ASSETS); // Cache critical assets
    }),
  );
  self.skipWaiting(); // Activate the new service worker immediately
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.forEach((cache) => {
          if (cache !== CACHE_NAME) {
            caches.delete(cache); // Delete old caches
          }
        }),
      );
    }),
  );
  clients.claim(); // Take control of all clients
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      // Return cached response if available
      if (response) {
        return response;
      }

      // Fetch from network
      return fetch(event.request).catch(() => {
        // If network fails, return the offline page
        return caches.match(OFFLINE_PAGE);
      });
    }),
  );
});
