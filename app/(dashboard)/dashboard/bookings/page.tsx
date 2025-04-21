import React from "react";

import { getBookingsByUser } from "@/app/actions/bookings.action";
import { BookingPage } from "@/components/shared/pages/booking-page";

export default async function DashboadBookingsPage() {
  const bookings = await getBookingsByUser();
  console.log(bookings.bookings?.length);

  return <BookingPage bookings={bookings.bookings || []} />;
}
