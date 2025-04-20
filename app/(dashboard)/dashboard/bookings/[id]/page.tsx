import { getBookingsByUser } from "@/app/actions/bookings.action";
import BookingDetailsPage from "@/components/shared/pages/single-booking-details-page";
import { notFound } from "next/navigation";
import React from "react";

export default async function BookingDetailsPageDashboard({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = (await params).id;
  const bookings = await getBookingsByUser();

  const singleBooking = bookings.bookings?.find((booking) => booking.id === id);

  if (!singleBooking) {
    return notFound();
  }
  return <BookingDetailsPage booking={singleBooking} />;
}
