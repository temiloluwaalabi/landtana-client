/* eslint-disable no-undef */
const CACHE_NAME = "landtana-pwa-cache-v1";
const DYNAMIC_CACHE = "landtana-dynamic-cache-v1";

const OFFLINE_PAGE = "/offline"; // Path to your offline page
const PRECACHE_PAGES = [
  "/", // Home page
  "/about-us",
  "/services",
  "/contact",
  "/book-service",
  OFFLINE_PAGE,
];

// Assets to cache - these should all be in your public folder
const CACHED_ASSETS = [
  // Core PWA assets
  "/manifest.json",
  "/favicon.ico",
  "/android-chrome-192x192.png",
  "/android-chrome-512x512.png",
  "/apple-touch-icon.png",
  "/maskable_icon.png",
  // Placeholder for images that fail to load
  "/placeholder-image.svg",
  // CSS and JS will be cached dynamically
];
// Combined assets to cache on install
const PRECACHE_ASSETS = [...PRECACHE_PAGES, ...CACHED_ASSETS];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(PRECACHE_ASSETS); // Cache critical assets
    }),
  );
  self.skipWaiting(); // Activate the new service worker immediately
});

// Activate event - clean up old caches
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.forEach((cache) => {
          if (cache !== CACHE_NAME && cache !== DYNAMIC_CACHE) {
            caches.delete(cache); // Delete old caches
          }
        }),
      );
    }),
  );
  clients.claim(); // Take control of all clients
});

// Fetch event - network-first strategy with offline fallback
self.addEventListener("fetch", (event) => {
  const request = event.request;

  // Skip non-GET requests and cross-origin requests
  if (
    request.method !== "GET" ||
    !request.url.startsWith(self.location.origin)
  ) {
    return;
  }
  // const url = new URL(request.url);

  // HTML page requests - network first, then cache, then offline page
  if (request.mode === "navigate") {
    event.respondWith(
      fetch(request)
        .then((networkResponse) => {
          // Clone the response before putting in cache
          const responseToCache = networkResponse.clone();

          // Store in dynamic cache for future offline use
          caches.open(DYNAMIC_CACHE).then((cache) => {
            cache.put(request, responseToCache);
          });

          return networkResponse;
        })
        .catch(async () => {
          // Try to get the page from cache
          const cachedResponse = await caches.match(request);

          if (cachedResponse) {
            return cachedResponse;
          }

          // If not in cache, return the offline page
          return caches.match(OFFLINE_PAGE);
        }),
    );
    return;
  }
  // For images (including those from Cloudinary)
  if (request.destination === "image") {
    event.respondWith(
      // Try the cache first
      caches.match(request).then((cachedResponse) => {
        if (cachedResponse) {
          return cachedResponse;
        }

        // If not in cache, try the network
        return fetch(request)
          .then((networkResponse) => {
            // Add successful responses to cache
            const responseToCache = networkResponse.clone();
            caches.open(DYNAMIC_CACHE).then((cache) => {
              cache.put(request, responseToCache);
            });
            return networkResponse;
          })
          .catch(() => {
            // For failed images, return placeholder
            return caches.match("/placeholder-image.svg");
          });
      }),
    );
    return;
  }

  // For CSS, JS, and other assets - cache first, network as backup
  if (
    request.destination === "style" ||
    request.destination === "script" ||
    request.destination === "font"
  ) {
    event.respondWith(
      caches.match(request).then((cachedResponse) => {
        // Return cached response if available
        if (cachedResponse) {
          return cachedResponse;
        }

        // Otherwise fetch from network and cache dynamically
        return fetch(request)
          .then((networkResponse) => {
            const responseToCache = networkResponse.clone();
            caches.open(DYNAMIC_CACHE).then((cache) => {
              cache.put(request, responseToCache);
            });
            return networkResponse;
          })
          .catch(() => {
            return new Response("Resource not available offline", {
              status: 503,
              statusText: "Service Unavailable",
            });
          });
      }),
    );
    return;
  }

  // Default strategy for other requests
  event.respondWith(
    fetch(request).catch(() => {
      return caches.match(request);
    }),
  );
});
