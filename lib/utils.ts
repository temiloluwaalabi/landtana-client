/* eslint-disable @typescript-eslint/no-explicit-any */
import { clsx, type ClassValue } from "clsx";
import { format, parse } from "date-fns";
import qs from "query-string";
import { twMerge } from "tailwind-merge";

import { Service } from "@/types";

import { Booking, Guest } from "./use-booking-store";
export interface nBooking {
  serviceId: string;
  stylist: { id: string; name: string; avatar: string } | null;
  date: Date;
  time: string;
  status: string;
  notes: string;
}
export function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
interface UrlQueryParams {
  params: string;
  updates: Record<
    string,
    string | number | boolean | Date | null | undefined | any[]
  >;
}
interface RemoveUrlQueryParams {
  params: string;
  keysToRemove: string[];
}

export const formUrlQuery = ({ params, updates }: UrlQueryParams) => {
  console.log("PARAMS", params);
  console.log("VALUES", updates);
  const currentUrl = { ...qs.parse(params) };

  Object.entries(updates).forEach(([key, value]) => {
    if (
      value === null ||
      value === undefined ||
      (Array.isArray(value) && value.length === 0)
    ) {
      delete currentUrl[key]; // Remove key if value is null/undefined
    } else if (key === "bookings" && Array.isArray(value)) {
      const serializeBookings = value
        .map((booking: Booking) => {
          // Prepare all possible parts
          const parts = [];

          // Always add serviceId (required)
          parts.push(`s:${booking.serviceId}`);

          // Add optional parts only if they exist
          if (booking.variationId) parts.push(`v:${booking.variationId}`);
          if (booking.styleOptionId) parts.push(`so:${booking.styleOptionId}`);
          if (booking.stylist) parts.push(`sy:${booking.stylist}`);

          // Handle addons specially - only add if there are addons
          if (booking.addons?.length)
            parts.push(`a:${booking.addons.join(",")}`);

          // Add guestId only if it exists
          if (booking.guestId) parts.push(`g:${booking.guestId}`);

          // Join all parts with colons
          return parts.join(";");
        })
        .join("&bookings=");
      currentUrl[key] = serializeBookings;
    } else if (key === "guests" && Array.isArray(value)) {
      const serializeGuests = value
        .map((guest: Guest) => {
          return `${guest.id}:${guest.name}:${guest.bookingIndex}`;
        })
        .join("&guests=");
      currentUrl[key] = serializeGuests;
    } else if (value instanceof Date) {
      currentUrl[key] = value.toISOString(); // Convert Date to ISO string
    } else if (typeof value === "boolean") {
      currentUrl[key] = value.toString(); // Convert boolean to string
    } else if (Array.isArray(value)) {
      currentUrl[key] = value.join(","); // Convert array to comma-separated string
    } else {
      currentUrl[key] = value.toString(); // Ensure all values are strings
    }
  });

  return qs.stringifyUrl(
    {
      url: window.location.pathname,
      query: currentUrl,
    },
    {
      skipNull: true,
      skipEmptyString: true,
    }
  );
};

export const removeKeysFromQuery = ({
  params,
  keysToRemove,
}: RemoveUrlQueryParams) => {
  const currentUrl = { ...qs.parse(params) }; // Clone to avoid direct mutation

  keysToRemove.forEach((key) => {
    delete currentUrl[key];
  });

  return qs.stringifyUrl(
    {
      url: window.location.pathname,
      query: currentUrl,
    },
    {
      skipNull: true,
      skipEmptyString: true,
    }
  );
};

/**
 * Fetches a specific query parameter from the URL.
 */
export const getQueryParam = (params: string, key: string) => {
  const currentUrl = qs.parse(params);
  return currentUrl[key] || null;
};

export function generateSlug(title: string) {
  const slug = title.toLowerCase().replace(/\s+/g, "-");
  return slug.replace(/[^a-z0-9-]/g, "");
}
export function toCurrency(
  number: number | string,
  disableDecimal = false,
  decimalPlaces = 2
) {
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: disableDecimal ? 0 : decimalPlaces,
    maximumFractionDigits: disableDecimal ? 0 : decimalPlaces,
  });
  return formatter.format(+number);
}
export function formatNumber(value: number): string {
  // Check if the value is less than 0
  if (value < 0) {
    // Handle negative values separately and format the absolute value
    const absoluteValue = Math.abs(value);
    return `-${formatNumber(absoluteValue)}`;
  } else if (value >= 1e9) {
    // Format the value in billions
    const formattedValue = value / 1e9;
    return `${formattedValue.toFixed(1)}B`;
  } else if (value >= 1e6) {
    // Check if the value is between 1 million and 1 billion
    // Format the value in millions
    const formattedValue = value / 1e6;
    return `${formattedValue.toFixed(1)}M`;
  } else if (value >= 1000) {
    // Check if the value is between 1 thousand and 1 million
    // Format the value in thousands
    const formattedValue = value / 1000;
    return `${formattedValue.toFixed(1)}K`;
  } else {
    // If the value is less than 1 thousand, return the original value as a string
    return value.toString();
  }
}

export const convertAmountFromMilinunits = (amount: number) => {
  return amount / 1000;
};
export const convertAmountToMilinunits = (amount: number) => {
  return Math.round(amount * 1000);
};
/**
 * Debounces a function call.
 * @param func - The function to debounce.
 * @param delay - The delay in milliseconds.
 * @returns A debounced function.
 */
export const debounce = (func: (...args: any[]) => void, delay: number) => {
  let timeoutId: NodeJS.Timeout;
  return (...args: any[]) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
};
export const getGreeting = () => {
  const currentHour = new Date().getHours();

  let greeting = "";

  if (currentHour >= 5 && currentHour < 12) {
    greeting = "Morning";
  } else if (currentHour >= 12 && currentHour < 18) {
    greeting = "Afternoon";
  } else {
    greeting = "Evening";
  }

  return greeting;
};
/**
 * Converts minutes into a formatted string (e.g., "2 hours 48 minutes").
 * @param minutes - The total number of minutes.
 * @returns A formatted string (e.g., "2 hours 48 minutes").
 */
export const formatMinutes = (minutes: number): string => {
  const hours = Math.floor(minutes / 60); // Get the total hours
  const remainingMinutes = minutes % 60; // Get the remaining minutes

  // Format the string
  let result = "";
  if (hours > 0) {
    result += `${hours} hour${hours > 1 ? "s" : ""}`;
  }
  if (remainingMinutes > 0) {
    if (result) result += " "; // Add a space if hours are present
    result += `${remainingMinutes} minute${remainingMinutes > 1 ? "s" : ""}`;
  }

  return result || "0 minutes"; // Handle the case when minutes is 0
};
export function minutesToHours(minutes: number): number {
  return minutes / 60;
}
export const formatTimestamp = (timestamp: Date): string => {
  const options: Intl.DateTimeFormatOptions = {
    month: "short", // Abbreviated month name
    day: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false, // 24-hour format
  };

  return new Intl.DateTimeFormat("en-US", options).format(timestamp);
};

export const formatTime = (date: Date): string => {
  let hours = date.getHours();
  const minutes = date.getMinutes();
  const ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12;
  hours = hours || 12;
  return `${hours}:${minutes.toString().padStart(2, "0")} ${ampm}`;
};
/**
 * Converts seconds to a formatted time string (HH:MM:SS).
 * @param seconds - The number of seconds to convert.
 * @returns A formatted time string (e.g., "01:30:45").
 */
export const secondsToTime = (seconds: number): string => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = seconds % 60;

  // Pad hours, minutes, and seconds with leading zeros if necessary
  const pad = (num: number): string => num.toString().padStart(2, "0");

  return `${pad(hours)}:${pad(minutes)}:${pad(remainingSeconds)}`;
};

/**
 * Extracts the date and time from an ISO string.
 * @param isoString - The ISO string (e.g., "2025-02-01T11:00:00.000Z").
 * @returns An object containing the date and time (e.g., { date: "2025-02-01", time: "11:00:00" }).
 */
export const extractDateTime = (
  isoString: string
): { date: string; time: string } => {
  const dateObj = new Date(isoString);

  // Extract date in YYYY-MM-DD format
  const date = dateObj.toISOString().split("T")[0];

  // Extract time in HH:MM format
  const time = dateObj.toISOString().split("T")[1].split(".")[0].slice(0, 5);

  return { date, time };
};

export const formatDate = (dateString: string) => {
  if (!dateString) return "";
  const date = parse(dateString, "yyyy-MM-dd", new Date());
  return format(date, "MMMM d, yyyy");
};
/**
 * Formats a date string into the desired format (e.g., "14 Tuesday 2025").
 * @param dateString - The date string in YYYY-MM-DD format.
 * @returns The formatted date string (e.g., "14 Tuesday 2025").
 */
export const formatDateDay = (dateString: string): string => {
  const date = new Date(dateString);

  // Get the day of the month (e.g., 14)
  const day = date.getDate();

  // Get the day of the week (e.g., "Tuesday")
  const dayOfWeek = date.toLocaleDateString("en-US", { weekday: "long" });

  // Get the full year (e.g., 2025)
  const year = date.getFullYear();

  // Combine into the desired format
  return `${day} ${dayOfWeek} ${year}`;
};
export const formatDayDate = (dateString: Date): string => {
  const date = new Date(dateString);

  // Get the day of the month (e.g., 14)
  const day = date.getDate();

  // Get the day of the week (e.g., "Tuesday")
  const dayOfWeek = date.toLocaleDateString("en-US", { weekday: "long" });

  // Get the full year (e.g., 2025)
  const year = date.getFullYear();

  // Combine into the desired format
  return `${day} ${dayOfWeek} ${year}`;
};
// export const formatDate = (dateString: string) => {
//   if (!dateString) return "";
//   const date = parse(dateString, "yyyy-MM-dd", new Date());
//   return format(date, "MMMM d, yyyy");
// };
export const formatDateI = (dateString: Date) => {
  if (!dateString) return "";
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

// Helper function to calculate total price and duration for a booking
export const calculateBookingDetails = (
  bookings: Booking[],
  services: Service[],
  allAddons: Service[]
) => {
  const bookingDetails = bookings.map((booking) => {
    const service = services.find((s) => s.id === booking.serviceId);
    if (!service)
      return {
        bookingId: booking.serviceId,
        totalPrice: 0,
        totalDuration: 0,
        addons: [] as string[],
      };

    // start with 0 as total price
    let totalPrice = 0;
    let totalDuration = 0;

    const variation = service?.variations.find(
      (s) => s.id === booking.variationId
    );
    if (variation) {
      totalPrice = Number(service.base_price); // Replace base price with variation price
      totalDuration = service.duration;
    }

    const styleOption = service?.style_options.find(
      (s) => s.id === booking.styleOptionId
    );

    if (styleOption) {
      totalPrice += Number(service.base_price);
      totalDuration += service.duration;
    }

    if (!variation && !styleOption) {
      totalPrice += Number(service.base_price);
      totalDuration += service.duration;
    }

    const addons: string[] = [];

    // Add addon prices
    if (booking.addons && booking.addons.length) {
      booking.addons.forEach((addonId) => {
        // Check if the addonId matches a service.id
        const addonService = allAddons.find((a) => a.id === addonId);
        if (addonService) {
          addons.push(addonId);
          totalPrice += Number(addonService.base_price) || 0;
          totalDuration += addonService.duration || 0;
        }

        // Check if the addonId matches a style_option.id
        const addonStyleOption = allAddons
          .flatMap((a) => a.style_options)
          .find((styleOption) => styleOption.id === addonId);
        if (addonStyleOption) {
          addons.push(addonId);
          totalPrice += Number(addonService?.base_price) || 0;
          totalDuration += addonService?.duration || 0;
        }

        // Check if the addonId matches a variation.id
        const addonVariation = allAddons
          .flatMap((a) => a.variations)
          .find((variation) => variation.id === addonId);
        if (addonVariation) {
          addons.push(addonId);
          totalPrice += Number(addonService?.base_price) || 0;
          totalDuration += addonService?.duration || 0;
        }
      });
    }

    return {
      bookingId: booking.serviceId,
      guestId: booking.guestId,
      totalPrice,
      totalDuration,
      addons,
    };
  });

  const totalGroupPrice = bookingDetails.reduce(
    (sum, booking) => sum + booking.totalPrice,
    0
  );
  const totalGroupDuration = bookingDetails.reduce(
    (sum, booking) => sum + booking.totalDuration,
    0
  );

  return {
    bookingDetails,
    totalGroupPrice,
    totalGroupDuration,
  };
};

// // Helper function to calculate group booking totals
// export const calculateGroupTotals = (
//   state: BookingState,
//   services: Service[],
//   allAddons: Service[]
// ) => {
//   let totalPrice = 0;
//   let totalDuration = 0;
//   let longestServiceDuration = 0;

//   state.bookings.forEach((booking) => {
//     const { totalPrice: price, totalDuration: duration } =
//       calculateBookingDetails(booking, services, allAddons);

//     totalPrice += price;

//     // For group bookings, we track the longest service duration since they'll happen in parallel
//     if (state.isGroupBooking) {
//       longestServiceDuration = Math.max(longestServiceDuration, duration);
//     } else {
//       totalDuration += duration;
//     }
//   });

//   if (state.isGroupBooking) {
//     totalDuration = longestServiceDuration;
//   }

//   return { totalPrice, totalDuration };
// };
