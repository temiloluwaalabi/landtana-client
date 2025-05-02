/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { toast } from "sonner";

import { ApiError } from "../api/client";

export const handleMutationError = (error: unknown) => {
  console.error("API Error:", error);
  // If error is already an instance of ApiError, handle it normally
  if (error instanceof ApiError) {
    processApiError(error);
    return;
  }
  // If error is an object with a statusCode, transform it into an ApiError
  if (typeof error === "object" && error !== null && "statusCode" in error) {
    const apiError = new ApiError(error as any);
    processApiError(apiError);
    return;
  }

  // Handle generic JavaScript errors (e.g., network failures)
  if (error instanceof Error) {
    toast.error(error.message || "An unexpected error occurred.");
    return;
  }
  // Handle unknown errors
  toast.error("An unknown error occurred.");
};

// Helper function to process ApiError instances
const processApiError = (error: ApiError) => {
  const { statusCode, message, rawErrors } = error;

  const errorMessage = Array.isArray(message) ? message.join("; ") : message;

  switch (statusCode) {
    case 400:
      toast.error(errorMessage || "Invalid request.");
      break;
    case 401:
      toast.error(errorMessage || "Invalid credentials. Please try again.");
      break;
    case 403:
      toast.error("You do not have permission to perform this action.");
      break;
    case 404:
      toast.error("Resource not found.");
      break;
    case 408:
      toast.error("Request timed out. Please try again.");
      break;
    case 422:
      if (rawErrors) {
        Object.values(rawErrors).forEach((errorMessages: string[]) => {
          errorMessages.forEach((msg: string) => toast.error(msg));
        });
      } else {
        toast.error(
          errorMessage || "Validation failed. Please check your input.",
        );
      }
      break;
    case 429:
      toast.error("Too many requests. Please try again later.");
      break;
    case 500:
      toast.error("Server error. Please try again later.");
      break;
    default:
      toast.error(errorMessage || "An unexpected error occurred.");
  }
};
