import { create } from "zustand";

import { getQueryParam } from "./utils";

export type ServiceVariation = {
  id: string;
  name: string;
  // price: number;
  // duration: number
};
export type StyleOption = {
  id: string;
  name: string;
  // price: number;
  // duration: number
};

export type Service = {
  id: string;
  name: string;
  basePrice?: number;
  duration?: number;
  isAddon?: boolean; // To differentiate between main services and addons
  variations?: ServiceVariation[]; // Array of service variations
  style_options?: StyleOption[]; // Array of service styles
};
export type Stylist = {
  id: string;
  name: string;
  avatar: string;
};
export type Guest = {
  id: string; // Unique identifier for each guest
  name: string;
  userId?: string;
  bookingIndex: number; // Index in the bookings array
};
export type Booking = {
  serviceId: string;
  stylist: string | null;
  // price: number;
  status?: "pending" | "confirmed" | "cancelled"; // Optional status field
  notes?: string; // Optional notes field
  addons?: string[]; // Array of addon service IDs
  variationId?: string; // ID of the selected variation
  styleOptionId?: string; // ID of the selected style option
  clientName?: string; // For group bookings, name of the client
  clientEmail?: string; // For group bookings, email of the client
  clientPhone?: string; // For group bookings, phone of the client
  guestId?: string; // Reference to the guest this booking is for
};
export type BookingState = {
  step: number;
  type: "individual" | "group" | "gift-card" | null;
  bookings: Booking[];
  date: Date | null; // Use Date object for better handling
  time: string | null;
  isStateUpdate: boolean;
  preview: boolean | null;
  checkout: boolean | null;
  confirmed: boolean | null;
  primaryGuestId?: string; // Added field to track primary guest
  currentGuestId?: string; // ID of the current guest for group bookings
  isGroupBooking?: boolean | null; // Flag to indicate if it's a group booking
  guests: Guest[]; // Array of guests for group bookings
};
type BookingActions = {
  updateState: (updates: Partial<BookingState>) => void;
  addBooking: (booking: Booking) => void;
  updateBooking: (index: number, updates: Partial<Booking>) => void;
  removeBooking: (index: number) => void;

  // Guest management actions
  addGuest: (guest: Omit<Guest, "id" | "bookingIndex">) => string; // Returns the new guest ID
  updateGuest: (
    guestId: string,
    updates: Partial<Omit<Guest, "id" | "bookingIndex">>,
  ) => void;
  removeGuest: (guestId: string) => void;
  setCurrentGuest: (guestId: string | undefined) => void;

  // Group booking actions
  startGroupBooking: () => void;
  finishGuestBooking: () => void;
  // setPrimaryGuestInfo: (info: { name: string; email: string; phone: string }) => void;

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
  isGroupBooking: null,
  primaryGuestId: undefined,
  guests: [],
};
export const useBookingStore = create<BookingState & BookingActions>(
  (set, get) => ({
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

    addGuest: (guest) => {
      const guestId =
        guest.userId ||
        `guest-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
      const bookingIndex = get().bookings.length; // Use the current length as the index
      const currentGuests = get().guests;
      const isPrimaryGuest = currentGuests.length === 0;
      set((state) => ({
        guests: [...state.guests, { ...guest, id: guestId, bookingIndex }],
        currentGuestId: guestId,
        primaryGuestId: isPrimaryGuest ? guestId : state.primaryGuestId,
      }));

      return guestId;
    },
    updateGuest: (guestId, updates) => {
      set((state) => ({
        guests: state.guests.map((guest) =>
          guest.id === guestId ? { ...guest, ...updates } : guest,
        ),
      }));
    },
    removeGuest: (guestId) =>
      set((state) => {
        // Don't allow removing the primary guest
        if (guestId === state.primaryGuestId) {
          console.warn("Cannot remove primary guest");
          return state;
        }

        const guestToRemove = state.guests.find((g) => g.id === guestId);
        if (!guestToRemove) return state;

        // Remove the guest and their associated booking
        const newBookings = [...state.bookings];
        newBookings.splice(guestToRemove.bookingIndex, 1);

        // Update bookingIndex for remaining guests
        const updatedGuests = state.guests
          .filter((g) => g.id !== guestId)
          .map((g) => ({
            ...g,
            bookingIndex:
              g.bookingIndex > guestToRemove.bookingIndex
                ? g.bookingIndex - 1
                : g.bookingIndex,
          }));

        return {
          guests: updatedGuests,
          bookings: newBookings,
          currentGuestId:
            state.currentGuestId === guestId ? undefined : state.currentGuestId,
        };
      }),
    setCurrentGuest: (guestId) => set({ currentGuestId: guestId }),
    startGroupBooking: () =>
      set({
        isGroupBooking: true,
        type: "group",
        bookings: [],
        guests: [],
        primaryGuestId: undefined,
      }),
    finishGuestBooking: () => set({ currentGuestId: undefined }),
    // setPrimaryGuestInfo: (info) => set({ primaryGuestInfo: info }),

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

      const isGroupBooking =
        getQueryParam(searchParamsString, "groupBooking") === "true";

      const currentGuestId = getQueryParam(
        searchParamsString,
        "currentGuestId",
      ) as string;

      const urlPrimaryGuestId = getQueryParam(
        searchParamsString,
        "primaryGuestId",
      ) as string;

      const urlPreview =
        getQueryParam(searchParamsString, "preview") === "true";
      const urlCheckout =
        getQueryParam(searchParamsString, "checkout") === "true";
      const urlConfirmed =
        getQueryParam(searchParamsString, "confirmed") === "true";

      // // Parse primary client info for group bookings
      // const primaryName = getQueryParam(searchParamsString, "primaryName");
      // const primaryEmail = getQueryParam(
      //   searchParamsString,
      //   "primaryEmail"
      // );
      // const primaryPhone = getQueryParam(
      //   searchParamsString,
      //   "primaryPhone"
      // );

      // const primaryGuestInfo = (primaryName && primaryEmail && primaryPhone)
      // ? { name: primaryName, email: primaryEmail, phone: primaryPhone }
      // : null;

      // Parse bookings
      const urlBookings = getQueryParam(searchParamsString, "bookings");
      const bookings: Booking[] =
        typeof urlBookings === "string"
          ? urlBookings.split("&bookings=").map((bookingStr) => {
              const parts = bookingStr.split(";");
              const booking: Partial<Booking> = {};

              // Process each part based on its identifier
              parts.forEach((part) => {
                if (!part) return;
                const [identifier, value] = part.split(":");

                switch (identifier) {
                  case "s":
                    booking.serviceId = value;
                    break;
                  case "v":
                    booking.variationId = value;
                    break;
                  case "so":
                    booking.styleOptionId = value;
                    break;
                  case "sy":
                    booking.stylist = value;
                    break;
                  case "a":
                    booking.addons = value
                      ? value.split(",").filter(Boolean)
                      : [];
                    break;
                  case "g":
                    booking.guestId = value;
                    break;
                }
              });

              return {
                serviceId: booking.serviceId || "",
                variationId: booking.variationId,
                styleOptionId: booking.styleOptionId,
                status: "pending",
                stylist: booking.stylist || null,
                addons: booking.addons || [],
                guestId: booking.guestId,
              };
            })
          : [];

      // Parse guests information
      const urlGuests = getQueryParam(searchParamsString, "guests");
      const guests: Guest[] =
        typeof urlGuests === "string"
          ? urlGuests.split("&guests=").map((guestStr) => {
              // Format: id:name:email:phone:bookingIndex
              const parts = guestStr.split(":");

              if (parts.length < 3) {
                console.warn("Invalid guest format:", guestStr);
                return {
                  id: parts[0],
                  name: parts[1] || "Guest",
                  bookingIndex: parseInt(parts[2] || "0"),
                };
              }

              return {
                id: parts[0],
                name: parts[1],
                bookingIndex: parseInt(parts[2]),
              };
            })
          : [];

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
        isGroupBooking,
        currentGuestId,
        guests,
        primaryGuestId: urlPrimaryGuestId,
      });
    },
    reset: () => set(initialState),
  }),
);
