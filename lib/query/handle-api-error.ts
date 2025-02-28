"use client";
import { toast } from "sonner";

import { ApiError } from "../api/client";

type ErrorHandlerOptions = {
  onUnauthorized?: () => void; // Callback for 401 errors (e.g., logout, redirect)
  onForbidden?: () => void; // Callback for 403 errors (e.g., show permission error)
  onNotFound?: () => void; // Callback for 404 errors (e.g., redirect to 404 page)
  onValidationError?: (errors: Record<string, string[]>) => void; // Handle validation errors
};

export const handleMutationError = (
  error: unknown,
  options?: ErrorHandlerOptions,
) => {
  console.error("API Error:", error);

  if (!(error instanceof ApiError)) {
    toast.error("An unexpected error occurred.");
    return;
  }

  const { status, message, errors } = error;

  switch (status) {
    case 400:
      toast.error(message || "Invalid request.");
      return;

    case 401:
      toast.error(message || "Invalid credentials. Please try again.");
      options?.onUnauthorized?.(); // Execute optional callback
      return;

    case 403:
      toast.error("You do not have permission to perform this action.");
      options?.onForbidden?.(); // Execute optional callback
      return;

    case 404:
      toast.error("Resource not found.");
      options?.onNotFound?.(); // Execute optional callback
      return;

    case 408:
      toast.error("Request timed out. Please try again.");
      return;

    case 422:
      if (errors) {
        Object.values(errors).forEach((msgs) =>
          msgs.forEach((msg) => toast.error(msg)),
        );
        options?.onValidationError?.(errors); // Execute optional callback
      } else {
        toast.error("Validation failed.");
      }
      return;

    case 429:
      toast.error("Too many requests. Please try again later.");
      return;

    case 500:
      toast.error("Server error. Please try again later.");
      return;

    default:
      toast.error(message || "An unexpected error occurred.");
  }
};
