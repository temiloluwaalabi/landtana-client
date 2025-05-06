import { notFound } from "next/navigation";
import React from "react";

import {
  getBookingsByUser,
  getGroupBookingsByUser,
} from "@/app/actions/bookings.action";
import { getAllServices } from "@/app/actions/services.action";
import BookingDetailsPage from "@/components/shared/pages/single-booking-details-page";

export default async function BookingDetailsPageDashboard({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = (await params).id;
  const groupBookings = await getGroupBookingsByUser();
  const singleBookings = await getBookingsByUser();

  const services = await getAllServices();
  const singleBooking =
    groupBookings.bookings?.find((booking) => booking.id === id) ||
    singleBookings.bookings?.find((booking) => booking.id === id);

  if (!singleBooking) {
    return notFound();
  }
  return (
    <BookingDetailsPage
      booking={singleBooking}
      services={services.services?.services || []}
    />
  );
}
