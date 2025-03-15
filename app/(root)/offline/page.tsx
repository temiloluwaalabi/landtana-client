"use client";
import Link from "next/link";

export default function Offline() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-6 text-center">
      <h1 className="mb-4 text-3xl font-bold">You&apos;re currently offline</h1>
      <p className="mb-6">
        It looks like you don&apos;t have an internet connection right now. Some
        features of Landtana Crown Braids may not be available.
      </p>
      <div className="space-y-4">
        <div className="rounded-lg border p-4">
          <h2 className="mb-2 font-semibold">Available Offline:</h2>
          <ul className="list-inside list-disc text-left">
            <li>Previously viewed pages</li>
            <li>Saved contact information</li>
          </ul>
        </div>

        <Link
          href="/"
          className="inline-block rounded-lg bg-teal-600 px-6 py-3 font-medium text-white"
        >
          Try going home
        </Link>
      </div>
    </div>
  );
}
