"use client";

import Link from "next/link";

export default function ComingSoon() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md rounded-lg bg-white p-8 text-center shadow-md">
        <h1 className="mb-4 text-3xl font-bold text-purple-600">Coming Soon</h1>
        <div className="mb-6">
          <svg
            className="mx-auto size-24 text-purple-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
            ></path>
          </svg>
        </div>
        <p className="mb-6 text-gray-600">
          This feature is under development and will be available soon. Stay
          tuned!
        </p>
        <Link
          href="/"
          className="rounded bg-purple-600 px-4 py-2 text-white transition-colors hover:bg-purple-700"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
}
