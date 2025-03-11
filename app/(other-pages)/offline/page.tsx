"use client";

import { Button } from "react-day-picker";

// app/offline/page.tsx
export default function Offline() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md rounded-lg bg-white p-8 text-center shadow-md">
        <h1 className="mb-4 text-3xl font-bold text-amber-600">
          No Internet Connection
        </h1>
        <div className="mb-6">
          <svg
            className="mx-auto size-24 text-amber-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            ></path>
          </svg>
        </div>
        <p className="mb-6 text-gray-600">
          You are currently offline. Please check your internet connection and
          try again.
        </p>
        <Button
          onClick={() => window.location.reload()}
          className="rounded bg-amber-600 px-4 py-2 text-white transition-colors hover:bg-amber-700"
        >
          Retry Connection
        </Button>
      </div>
    </div>
  );
}
