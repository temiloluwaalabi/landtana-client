"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function OfflinePage() {
  const [cachedPages, setCachedPages] = useState<
    { url: string; title: string; timestamp: number }[]
  >([]);

  useEffect(() => {
    // Get list of cached pages if available in localStorage
    // This would be populated by a script that runs when online
    const storedPages = localStorage.getItem("cachedPages");
    if (storedPages) {
      setCachedPages(JSON.parse(storedPages));
    }
  }, []);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 px-4 py-12">
      <div className="mx-auto max-w-md text-center">
        <div className="mb-8 flex justify-center">
          <Image
            src="/android-chrome-192x192.png"
            alt="Landtana Crown Braids"
            width={96}
            height={96}
            className="rounded-lg shadow-md"
          />
        </div>

        <h1 className="mb-2 text-3xl font-bold text-gray-900">
          You&apos;re Offline
        </h1>
        <div className="mx-auto mb-8 h-1 w-24 rounded bg-teal-600"></div>

        <p className="mb-8 text-gray-600">
          It looks like you&apos;re currently offline. Don&apos;t worry, you can
          still access some pages that have been saved for offline viewing.
        </p>

        <div className="mb-8 rounded-lg bg-white p-6 shadow-md">
          <h2 className="mb-4 text-xl font-semibold text-gray-800">
            Available Pages
          </h2>

          {cachedPages && cachedPages.length > 0 ? (
            <ul className="space-y-2">
              {cachedPages.map((page, index) => (
                <li key={index}>
                  <Link
                    href={page.url}
                    className="block rounded-md bg-teal-50 p-3 text-teal-700 transition-colors hover:bg-teal-100"
                  >
                    {page.title}
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <div className="space-y-2">
              <Link
                href="/"
                className="block rounded-md bg-teal-50 p-3 text-teal-700 transition-colors hover:bg-teal-100"
              >
                Home
              </Link>
              <Link
                href="/about"
                className="block rounded-md bg-teal-50 p-3 text-teal-700 transition-colors hover:bg-teal-100"
              >
                About
              </Link>
              <Link
                href="/services"
                className="block rounded-md bg-teal-50 p-3 text-teal-700 transition-colors hover:bg-teal-100"
              >
                Services
              </Link>
            </div>
          )}
        </div>

        <div className="text-sm text-gray-600">
          <p>Please check your internet connection and try again.</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 rounded-md bg-teal-600 px-6 py-2 text-white transition-colors hover:bg-teal-700"
          >
            Refresh Page
          </button>
        </div>
      </div>
    </div>
  );
}
