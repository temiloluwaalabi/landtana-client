/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, {
  AxiosError,
  AxiosInstance,
  AxiosResponse,
  // InternalAxiosRequestConfig,
} from "axios";

// import { AppError, UnauthorizedError, ValidationError } from "../error";

export class ApiError extends Error {
  readonly statusCode: number;
  readonly errorType: string;
  readonly rawErrors?: Record<string, any>;

  constructor(response: {
    statusCode: number;
    messages: string | string[];
    errorType?: string;
    rawErrors?: Record<string, any>;
  }) {
    console.log("🔥 Creating ApiError with:", response);
    // Normalize message to array
    const messages = Array.isArray(response.messages)
      ? response.messages
      : [response.messages];
    // Join messages for the Error parent class
    // Join messages for the Error parent class
    const finalMessage = messages.join("; ");
    console.log("🛑 Final error message:", finalMessage);

    super(finalMessage);
    this.name = "ApiError";
    this.statusCode = response.statusCode;
    this.errorType = response.errorType || "API_ERROR";
    Object.defineProperty(this, "message", {
      value: finalMessage,
      enumerable: true, // 👈 Make message visible during serialization
      writable: true,
      configurable: true,
    });
    // this.message = Array.isArray(response.messages)
    //   ? response.messages.join("; ")
    //   : "";

    this.rawErrors = response.rawErrors;

    // Maintain proper stack trace
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, ApiError);
    }
    console.log("✅ ApiError created successfully:", this);
  }
}

// Configuration
const API_CONFIG = {
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  timeout: 30000,
  headers: {
    "Content-Type": "application/json",
    Accept: "*/*",
  },
  withCredentials: true, // 👈 Ensure cookies are sent with requests
  // Add max body size and enable keep-alive connections
  maxBodyLength: 20 * 1024 * 1024, // 20MB
  maxContentLength: 20 * 1024 * 1024, // 20MB
} as const;

const AUTH_CONFIG = {
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  timeout: 30000,
  headers: {
    "Content-Type": "application/json",
    Accept: "*/*",
  },
  withCredentials: true, // 👈 Ensure cookies are sent with requests
  // Add max body size and enable keep-alive connections
  maxBodyLength: 20 * 1024 * 1024, // 20MB
  maxContentLength: 20 * 1024 * 1024, // 20MB
} as const;

// Create API clients
export const apiClient: AxiosInstance = axios.create(API_CONFIG);
export const authClient: AxiosInstance = axios.create(AUTH_CONFIG);

// Token management
export const setAuthToken = (token: string | null): void => {
  const bearerToken = token ? `Bearer ${token}` : null;
  [apiClient, authClient].forEach((client) => {
    if (bearerToken) {
      client.defaults.headers.common.Authorization = bearerToken;
    } else {
      delete client.defaults.headers.common.Authorization;
    }
  });
};

// Error handler
const handleApiError = (error: AxiosError<ApiError>) => {
  if (!error.response) {
    console.error("Network Error:", error);

    if (error.code === "ECONNABORTED") {
      return Promise.reject(
        new ApiError({
          statusCode: 408,
          messages: "Request timed out. Please try again.",
        })
      );
    }
    if (error.message.includes("Network Error")) {
      return Promise.reject(
        new ApiError({
          statusCode: 500,
          messages: "Network error. Please check your connection.",
        })
      );
    }
    return Promise.reject(
      new ApiError({ statusCode: 500, messages: "An unknown error occurred." })
    );
  }

  const { status, data } = error.response;
  console.error("API Error Response:", { status, data });
  console.error("🚨 FULL ERROR RESPONSE:", {
    status: error.response?.status,
    data: error.response?.data,
  });

  // Extract error message
  const errorMessages = Array.isArray(data?.message)
    ? data.message.filter((msg) => typeof msg === "string")
    : [typeof data?.message === "string" ? data.message : "An error occurred"];

  console.log("🛑 Extracted error messages:", errorMessages);

  return Promise.reject(
    new ApiError({
      statusCode: status,
      messages: errorMessages,
      errorType: data.errorType,
      rawErrors: data?.rawErrors || undefined,
    })
  );
};

// Success handler
const handleApiSuccess = <T>(response: AxiosResponse<T>) => response;

// Add request interceptors to both clients to handle FormData correctly
// const setupFormDataInterceptor = (client: AxiosInstance) => {
//   client.interceptors.request.use((config: InternalAxiosRequestConfig) => {
//     // If the request data is FormData, remove the Content-Type header
//     if (
//       config.data instanceof FormData ||
//       (typeof window !== "undefined" && config.data instanceof window.FormData)
//     ) {
//       // Use the proper headers API based on Axios version
//       config.headers.delete("Content-Type");
//       // For large file uploads, ensure we have appropriate timeouts
//       if (
//         config.method?.toLowerCase() === "put" ||
//         config.method?.toLowerCase() === "post"
//       ) {
//         config.timeout = 120000; // 2 minutes for upload requests
//       }
//     }

//     return config;
//   });
// };
// // Apply the interceptor to both clients
// setupFormDataInterceptor(apiClient);
// setupFormDataInterceptor(authClient);
// Apply interceptors
[apiClient, authClient].forEach((client) => {
  client.interceptors.response.use(handleApiSuccess, handleApiError);
});
// Utility function to implement retry logic for uploads
export const withRetry = async <T>(
  fn: () => Promise<T>,
  maxRetries = 3,
  delay = 1000
): Promise<T> => {
  let lastError: any;

  for (let attempt = 0; attempt < maxRetries; attempt++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error;

      // Only retry on network errors or 5xx server errors
      const isNetworkError = !axios.isAxiosError(error) || !error.response;
      const is5xxError =
        axios.isAxiosError(error) &&
        error.response?.status &&
        error.response.status >= 500;

      if ((isNetworkError || is5xxError) && attempt < maxRetries - 1) {
        // Wait before retrying with exponential backoff
        await new Promise((resolve) =>
          setTimeout(resolve, delay * Math.pow(2, attempt))
        );
        continue;
      }

      break;
    }
  }

  throw lastError;
};
