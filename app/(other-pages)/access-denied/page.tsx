"use client";

// app/access-denied/page.tsx
import Link from "next/link";

export default function AccessDenied() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md rounded-lg bg-white p-8 text-center shadow-md">
        <h1 className="mb-4 text-3xl font-bold text-red-600">Access Denied</h1>
        <div className="mb-6">
          <svg
            className="mx-auto size-24 text-red-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 15v2m0 0v2m0-2h2m-2 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
            ></path>
          </svg>
        </div>
        <p className="mb-6 text-gray-600">
          You need to be signed in to access this page. Please log in to
          continue.
        </p>
        <div className="flex flex-col space-y-4">
          <Link
            href="/login"
            className="rounded bg-blue-600 px-4 py-2 text-white transition-colors hover:bg-blue-700"
          >
            Sign in
          </Link>
          <Link
            href="/"
            className="rounded bg-gray-200 px-4 py-2 text-gray-700 transition-colors hover:bg-gray-300"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
