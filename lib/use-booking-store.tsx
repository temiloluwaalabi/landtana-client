import { create } from "zustand";

import { getQueryParam } from "./utils";
export type Service = {
  id: string;
  name: string;
  price: number;
  isAddon?: boolean; // To differentiate between main services and addons
};
export type Stylist = {
  id: string;
  name: string;
  avatar: string;
};

export type Booking = {
  serviceId: string;
  stylist: string | null;
  // date: Date | null;
  // time: string | null;
  status?: "pending" | "confirmed" | "cancelled"; // Optional status field
  notes?: string; // Optional notes field
  addons?: string[]; // Array of addon service IDs
};
export type BookingState = {
  step: number;
  type: "individual" | "group" | "gift-card" | null;
  bookings: Booking[];
  // serviceIds: string[]; // Array of selected service IDs
  // professional: string | null;
  date: Date | null; // Use Date object for better handling
  time: string | null;
  isStateUpdate: boolean;

  preview: boolean | null;
  checkout: boolean | null;
  confirmed: boolean | null;

  // setBookingData: (data: Partial<BookingState>) => void;
};
type BookingActions = {
  updateState: (updates: Partial<BookingState>) => void;
  addBooking: (booking: Booking) => void;
  updateBooking: (index: number, updates: Partial<Booking>) => void;
  removeBooking: (index: number) => void;
  syncFromUrl: (params: URLSearchParams) => void; // New action
  setIsStateUpdate: (isStateUpdate: boolean) => void;

  reset: () => void;
};
const initialState: BookingState = {
  step: 1,
  type: null,
  bookings: [], // Initialize with an empty array of bookings
  preview: null,
  checkout: null,
  isStateUpdate: false,

  date: null,
  time: null,
  confirmed: null,
};
export const useBookingStore = create<BookingState & BookingActions>((set) => ({
  ...initialState,
  updateState: (updates) => set((state) => ({ ...state, ...updates })),
  addBooking: (booking) =>
    set((state) => ({
      bookings: [...state.bookings, booking], // Add the new booking
    })),
  updateBooking: (index, updates) =>
    set((state) => {
      const updatedBookings = [...state.bookings];
      updatedBookings[index] = { ...updatedBookings[index], ...updates }; // Update the booking
      return { bookings: updatedBookings };
    }),
  removeBooking: (index) =>
    set((state) => ({
      bookings: state.bookings.filter((_, i) => i !== index), // Remove the booking
    })),
  setIsStateUpdate: (isStateUpdate) => set({ isStateUpdate }),

  syncFromUrl: (params) => {
    const searchParamsString = params ? params.toString() : "";

    // Parse basic fields
    const urlStep = Number(getQueryParam(searchParamsString, "step")) || 1;
    const urlType = getQueryParam(searchParamsString, "type") as
      | "individual"
      | "group"
      | "gift-card"
      | null;

    const urlPreview = getQueryParam(searchParamsString, "preview") === "true";
    const urlCheckout =
      getQueryParam(searchParamsString, "checkout") === "true";
    const urlConfirmed =
      getQueryParam(searchParamsString, "confirmed") === "true";

    // Parse bookings
    const urlBookings = getQueryParam(searchParamsString, "bookings");
    // const bookings: Booking[] =
    //   typeof urlBookings === "string" ? deserializeBookings(urlBookings) : [];
    const bookings: Booking[] =
      typeof urlBookings === "string"
        ? urlBookings.split("&bookings=").map((bookingStr) => {
            const parts = bookingStr.split(":");

            const serviceId = parts[0];
            const stylist = parts.length === 3 ? parts[1] : null; // If 3 parts, stylist is present
            const addonStr = parts.length === 3 ? parts[2] : parts[1]; // Addons are always the last part
            const addons = addonStr ? addonStr.split(",") : [];
            // Parse date
            // const date = dateStr !== "null" ? new Date(dateStr) : null;
            return {
              serviceId,
              status: "pending",
              stylist: stylist === "null" ? null : stylist, // Handle "null" stylist
              addons,
            };
          })
        : [];
    // const bookings: Booking[] =
    //   typeof urlBookings === "string"
    //     ? JSON.parse(decodeURIComponent(urlBookings))
    //         .map((booking: Booking) => {
    //           // Validate required fields
    //           if (
    //             !booking.serviceId ||
    //             !booking.date ||
    //             !booking.time ||
    //             isNaN(new Date(booking.date).getTime()) // Check if date is valid
    //           ) {
    //             console.warn("Invalid booking data:", booking);
    //             return null; // Skip invalid bookings
    //           }

    //           // Validate stylist (if present)
    //           if (!booking.stylist) {
    //             console.warn("Invalid stylist data:", booking.stylist);
    //             booking.stylist = null; // Remove invalid stylist data
    //           }

    //           return {
    //             serviceId: booking.serviceId,
    //             stylist: booking.stylist || null,
    //             date: new Date(booking.date),
    //             time: booking.time,
    //             status: booking.status || "pending",
    //             notes: booking.notes || "",
    //           };
    //         })
    //         .filter((booking: Booking | null) => booking !== null) // Remove invalid bookings
    //     : [];

    // Update the store state
    set({
      step: urlStep,
      type: urlType,
      bookings,
      date: null,
      time: null,
      preview: urlPreview,
      checkout: urlCheckout,
      confirmed: urlConfirmed,
    });
  },
  reset: () => set(initialState),
}));
