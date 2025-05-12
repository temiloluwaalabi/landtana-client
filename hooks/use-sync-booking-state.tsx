"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect } from "react";

import { useBookingStore } from "@/lib/use-booking-store";
import { formUrlQuery } from "@/lib/utils";

export default function useSyncBookingState() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const {
    step,
    type,
    preview,
    bookings,
    guests,
    currentGuestId,
    primaryGuestId,
    checkout,
    confirmed,
    syncFromUrl,
  } = useBookingStore();

  // Debounced function to update the URL
  const debouncedUpdateUrl = useCallback(() => {
    const newUrl = formUrlQuery({
      params: searchParams.toString(),
      updates: {
        step,
        type,
        currentGuestId,
        primaryGuestId,
        bookings: bookings.length > 0 ? bookings : undefined,
        guests: guests.length > 0 ? guests : undefined,
        checkout,
        preview,
        confirmed,
      },
    });

    // Only push the new URL if it's different from the current URL
    if (newUrl !== window.location.href) {
      // console.log("Pushing new URL:", newUrl);
      router.push(newUrl, { scroll: false });
    }
  }, [
    bookings,
    checkout,
    confirmed,
    currentGuestId,
    guests,
    preview,
    primaryGuestId,
    router,
    searchParams,
    step,
    type,
  ]);

  // Sync URL from state (debounced)
  useEffect(() => {
    debouncedUpdateUrl();
  }, [debouncedUpdateUrl]);

  useEffect(() => {
    if (searchParams) {
      syncFromUrl(searchParams);
    }
  }, [searchParams, syncFromUrl]);
}
