// components/ui/ErrorStates.tsx
import Link from "next/link";
import { ReactNode } from "react";

type ErrorStateProps = {
  title: string;
  message: string;
  icon: ReactNode;
  actionText?: string;
  actionHref?: string;
  onAction?: () => void;
  color: string;
};

export function ErrorState({
  title,
  message,
  icon,
  actionText,
  actionHref,
  onAction,
  color,
}: ErrorStateProps) {
  return (
    <div className="w-full p-6 bg-white rounded-lg shadow-sm border border-gray-100">
      <div className="text-center">
        <div className={`text-${color}-500 mx-auto mb-4`}>{icon}</div>
        <h3 className={`text-xl font-semibold text-${color}-600 mb-2`}>
          {title}
        </h3>
        <p className="text-gray-600 mb-4">{message}</p>

        {actionText &&
          (actionHref || onAction) &&
          (actionHref ? (
            <Link
              href={actionHref}
              className={`px-4 py-2 bg-${color}-600 text-white rounded hover:bg-${color}-700 transition-colors inline-block`}
            >
              {actionText}
            </Link>
          ) : (
            <button
              onClick={onAction}
              className={`px-4 py-2 bg-${color}-600 text-white rounded hover:bg-${color}-700 transition-colors`}
            >
              {actionText}
            </button>
          ))}
      </div>
    </div>
  );
}

// Pre-defined error components
export function NoInternetError({ onRetry }: { onRetry?: () => void }) {
  return (
    <ErrorState
      title="No Internet Connection"
      message="Unable to connect to the server. Please check your internet connection."
      icon={
        <svg
          className="w-12 h-12 mx-auto"
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
      }
      actionText="Retry"
      onAction={onRetry || (() => window.location.reload())}
      color="amber"
    />
  );
}

export function UnauthenticatedError() {
  return (
    <ErrorState
      title="Authentication Required"
      message="You need to be signed in to view this content."
      icon={
        <svg
          className="w-12 h-12 mx-auto"
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
      }
      actionText="Sign In"
      actionHref="/login"
      color="red"
    />
  );
}

export function NotFoundError() {
  return (
    <ErrorState
      title="Content Not Found"
      message="The content you're looking for doesn't exist or is not available."
      icon={
        <svg
          className="w-12 h-12 mx-auto"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          ></path>
        </svg>
      }
      color="indigo"
    />
  );
}
