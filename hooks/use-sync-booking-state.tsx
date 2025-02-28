"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

import { useBookingStore } from "@/lib/use-booking-store";
import { debounce, formUrlQuery } from "@/lib/utils";

export default function useSyncBookingState() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const {
    step,
    type,
    preview,
    isStateUpdate,
    setIsStateUpdate,
    bookings,
    checkout,
    confirmed,
    syncFromUrl,
  } = useBookingStore();
  console.log("USE STORE BOOKINGS", bookings);

  // Debounced function to update the URL
  const debouncedUpdateUrl = debounce(() => {
    console.log("DEBOUNCED EFFECT CALLED - Updating URL");

    const newUrl = formUrlQuery({
      params: searchParams.toString(),
      updates: {
        step,
        type,
        bookings: bookings.length > 0 ? bookings : undefined,
        checkout,
        preview,
        confirmed,
      },
    });

    // Only push the new URL if it's different from the current URL
    if (newUrl !== window.location.href) {
      console.log("Pushing new URL:", newUrl);
      router.push(newUrl, { scroll: false });
    }
  }, 300); // 300ms delay

  // Sync URL from state (debounced)
  useEffect(() => {
    debouncedUpdateUrl();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    step,
    type,
    bookings,
    checkout,
    preview,
    confirmed,
    searchParams,
    router,
  ]);

  useEffect(() => {
    console.log("EFFECT CALLED FROM");

    // if (isStateUpdate) {
    //   setIsStateUpdate(false); // Reset the flag
    //   return;
    // }
    if (searchParams) {
      syncFromUrl(searchParams);
    }
  }, [isStateUpdate, searchParams, setIsStateUpdate, syncFromUrl]);
}
