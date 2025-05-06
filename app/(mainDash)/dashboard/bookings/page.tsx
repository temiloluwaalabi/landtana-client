import React from "react";

import {
  getBookingsByUser,
  getGroupBookingsByUser,
} from "@/app/actions/bookings.action";
import { getAllServices } from "@/app/actions/services.action";
import { BookingPage } from "@/components/shared/pages/booking-page";

export default async function DashboadBookingsPage() {
  const bookings = await getBookingsByUser();
  const grp = await getGroupBookingsByUser();

  const MainBook = [...(bookings.bookings || []), ...(grp.bookings || [])];
  const services = await getAllServices();
  return (
    <BookingPage
      bookings={MainBook || []}
      services={services.services?.services || []}
    />
  );
}
