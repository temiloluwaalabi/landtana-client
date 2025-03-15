// This file should be in your client components folder
// e.g., app/components/pwa/pwa-register-client.ts

"use client";

import { useEffect } from "react";

export function usePWARegistration() {
  useEffect(() => {
    // Only run on client side
    if (typeof window === "undefined") return;

    // Register service worker
    if ("serviceWorker" in navigator) {
      window.addEventListener("load", () => {
        navigator.serviceWorker
          .register("/sw.js")
          .then((registration) => {
            console.log(
              "Service Worker registered successfully:",
              registration.scope,
            );

            // Track which pages have been visited while online
            const trackCachedPages = () => {
              const currentPath = window.location.pathname;
              const pageTitle = document.title || currentPath;

              // Get existing cached pages or initialize empty array
              const storedPages = localStorage.getItem("cachedPages");
              const cachedPages: {
                url: string;
                title: string;
                timestamp: number;
              }[] = storedPages ? JSON.parse(storedPages) : [];

              // Check if this page is already tracked
              const pageExists = cachedPages.some(
                (page: { url: string; title: string; timestamp: number }) =>
                  page.url === currentPath,
              );

              if (!pageExists) {
                // Add the current page to the list of cached pages
                cachedPages.push({
                  url: currentPath,
                  title: pageTitle,
                  timestamp: Date.now(),
                });

                // Store the updated list (limit to 20 most recent pages)
                if (cachedPages.length > 20) {
                  cachedPages.sort((a, b) => b.timestamp - a.timestamp);
                  cachedPages.splice(20);
                }

                localStorage.setItem(
                  "cachedPages",
                  JSON.stringify(cachedPages),
                );
              }
            };

            // Track pages when user is online
            if (navigator.onLine) {
              trackCachedPages();

              // Set up listeners for navigation
              document.addEventListener("visibilitychange", () => {
                if (
                  document.visibilityState === "visible" &&
                  navigator.onLine
                ) {
                  trackCachedPages();
                }
              });
            }
          })
          .catch((error) => {
            console.error("Service Worker registration failed:", error);
          });
      });

      // Listen for connectivity changes
      window.addEventListener("online", () => {
        console.log("You are now online");
        document.dispatchEvent(
          new CustomEvent("connectivity-changed", { detail: { online: true } }),
        );
      });

      window.addEventListener("offline", () => {
        console.log("You are now offline");
        document.dispatchEvent(
          new CustomEvent("connectivity-changed", {
            detail: { online: false },
          }),
        );
      });
    }
  }, []);
}

// Client component to register service worker
export default function PWARegistration() {
  usePWARegistration();
  return null; // This component doesn't render anything
}
