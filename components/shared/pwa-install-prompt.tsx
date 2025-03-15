/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Image from "next/image";
import { useState, useEffect } from "react";

export default function PWAInstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [showInstallBanner, setShowInstallBanner] = useState(false);
  const [isIOS, setIsIOS] = useState(false);

  useEffect(() => {
    setIsIOS(
      /iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as any).MSStream
    );

    // Check if the app is already installed
    const isAppInstalled = window.matchMedia(
      "(display-mode: standalone)"
    ).matches;

    if (isAppInstalled) {
      return; // Don't show install prompt if already installed
    }

    // Listen for the beforeinstallprompt event
    window.addEventListener("beforeinstallprompt", (e) => {
      // Prevent Chrome 67 and earlier from automatically showing the prompt
      e.preventDefault();
      // Stash the event so it can be triggered later
      setDeferredPrompt(e);
      // Show the install banner
      setShowInstallBanner(true);
    });

    // Clean up
    return () => {
      window.removeEventListener("beforeinstallprompt", () => {});
    };
  }, []);

  const handleInstallClick = () => {
    if (!deferredPrompt) return;

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
  };

  if (!showInstallBanner) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 border-t bg-white p-4 shadow-lg">
      <div className="mx-auto flex max-w-6xl items-center justify-between">
        <div className="flex items-center space-x-4">
          {isIOS && (
            <p>
              To install this app on your iOS device, tap the share button
              <span role="img" aria-label="share icon">
                {" "}
                ⎋{" "}
              </span>
              and then &quot;Add to Home Screen&quot;
              <span role="img" aria-label="plus icon">
                {" "}
                ➕{" "}
              </span>
              .
            </p>
          )}
          <div className="hidden sm:block">
            <Image
              src="android-chrome-192x192.png"
              alt="Landtana Crown Braids"
              className="size-12 rounded-lg"
            />
          </div>
          <div>
            <h3 className="font-semibold">Install Landtana Crown Braids</h3>
            <p className="text-sm text-gray-600">
              Get easy access to appointments and services
            </p>
          </div>
        </div>
        <div className="flex space-x-2">
          <button
            onClick={dismissPrompt}
            className="px-4 py-2 text-gray-600 hover:text-gray-800"
          >
            Not now
          </button>
          <button
            onClick={handleInstallClick}
            className="rounded-lg bg-teal-600 px-4 py-2 text-white hover:bg-teal-700"
          >
            Install
          </button>
        </div>
      </div>
    </div>
  );
}
