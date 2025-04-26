import React from "react";

import { getBookingsByUser } from "@/app/actions/bookings.action";
import { BookingPage } from "@/components/shared/pages/booking-page";

export default async function DashboadBookingsPage() {
  const bookings = await getBookingsByUser();

  return <BookingPage bookings={bookings.bookings || []} />;
}
