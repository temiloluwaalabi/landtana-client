/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";
import Image from "next/image";
import { useState, useEffect } from "react";

export default function PWAInstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [showInstallBanner, setShowInstallBanner] = useState(false);
  const [installPlatform, setInstallPlatform] = useState("default");

  useEffect(() => {
    // Check if the app is already installed
    const isAppInstalled = window.matchMedia(
      "(display-mode: standalone)",
    ).matches;
    if (isAppInstalled) {
      return; // Don't show install prompt if already installed
    }

    // Detect platform
    if (/iPhone|iPad|iPod/.test(navigator.userAgent)) {
      setInstallPlatform("ios");

      // For iOS, we'll show the banner if the app is in Safari
      const isInSafari =
        /Safari/.test(navigator.userAgent) &&
        !/Chrome/.test(navigator.userAgent);
      if (isInSafari) {
        // Show after a brief delay to allow the page to load
        setTimeout(() => setShowInstallBanner(true), 2000);
      }
    } else if (/Android/.test(navigator.userAgent)) {
      setInstallPlatform("android");
    }

    // Listen for the beforeinstallprompt event (Chrome/Edge/Android)
    window.addEventListener("beforeinstallprompt", (e) => {
      // Prevent Chrome from automatically showing the prompt
      e.preventDefault();
      // Stash the event so it can be triggered later
      setDeferredPrompt(e);
      // Show the install banner
      setShowInstallBanner(true);
    });

    // Cleanup
    return () => {
      window.removeEventListener("beforeinstallprompt", () => {});
    };
  }, []);

  const handleInstallClick = () => {
    if (!deferredPrompt) {
      // If no deferred prompt (iOS), just keep the instructions visible
      return;
    }

    // Show the install prompt
    deferredPrompt.prompt();

    // Wait for the user to respond to the prompt
    deferredPrompt.userChoice.then((choiceResult: { outcome: string }) => {
      if (choiceResult.outcome === "accepted") {
        console.log("User accepted the install prompt");
      } else {
        console.log("User dismissed the install prompt");
      }
      // Clear the saved prompt since it can't be used again
      setDeferredPrompt(null);
      setShowInstallBanner(false);
    });
  };

  const dismissPrompt = () => {
    setShowInstallBanner(false);

    // Optionally store in localStorage to prevent showing again for a while
    localStorage.setItem("pwaPromptDismissed", Date.now().toString());
  };

  if (!showInstallBanner) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 border-t border-gray-200 bg-white shadow-lg">
      <div className="mx-auto max-w-6xl p-4">
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          {/* App Info */}
          <div className="flex items-center gap-4">
            <div className="hidden shrink-0 sm:block">
              <Image
                src="/android-chrome-192x192.png"
                alt="Landtana Crown Braids"
                width={56}
                height={56}
                className="rounded-lg"
              />
            </div>

            <div className="text-center md:text-left">
              <h3 className="text-lg font-semibold text-gray-900">
                Install Landtana Crown Braids
              </h3>
              <p className="text-gray-600">
                Get quick access to appointments and services, even offline
              </p>
            </div>
          </div>

          {/* Platform-specific instructions */}
          {installPlatform === "ios" && (
            <div className="flex max-w-md items-center rounded-lg bg-blue-50 p-3">
              <div className="text-blue-700">
                <svg
                  className="mr-2 inline-block size-8"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 18.5c0 .276-.224.5-.5.5h-9c-.276 0-.5-.224-.5-.5v-13c0-.276.224-.5.5-.5h9c.276 0 .5.224.5.5v13zm-4-10.5c-.552 0-1 .448-1 1s.448 1 1 1 1-.448 1-1-.448-1-1-1zm4 8c0-.552-.448-1-1-1h-6c-.552 0-1 .448-1 1s.448 1 1 1h6c.552 0 1-.448 1-1z" />
                </svg>
              </div>
              <div className="flex-1 text-sm">
                <p className="font-medium">To install:</p>
                <p>
                  1. Tap{" "}
                  <span className="inline-block px-2">
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M5 9c1.654 0 3 1.346 3 3s-1.346 3-3 3-3-1.346-3-3 1.346-3 3-3zm9 0c1.654 0 3 1.346 3 3s-1.346 3-3 3-3-1.346-3-3 1.346-3 3-3zm9 0c1.654 0 3 1.346 3 3s-1.346 3-3 3-3-1.346-3-3 1.346-3 3-3z" />
                    </svg>
                  </span>{" "}
                  or{" "}
                  <span className="inline-block px-2">
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M12 2c5.514 0 10 4.486 10 10s-4.486 10-10 10-10-4.486-10-10 4.486-10 10-10zm0-2c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm2 12l-4.5 4.5 1.5 1.5 6-6-6-6-1.5 1.5 4.5 4.5z" />
                    </svg>
                  </span>
                </p>
                <p>2. Select &quot;Add to Home Screen&quot;</p>
              </div>
            </div>
          )}

          {/* Buttons for all platforms */}
          <div className="flex gap-2">
            <button
              onClick={dismissPrompt}
              className="rounded-lg bg-gray-100 px-4 py-2 text-gray-600 hover:text-gray-800"
            >
              Not now
            </button>

            {installPlatform !== "ios" && (
              <button
                onClick={handleInstallClick}
                className="rounded-lg bg-teal-600 px-4 py-2 text-white hover:bg-teal-700"
              >
                Install App
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
