"use client";
import * as React from "react";

import { Booking } from "@/types";

import BookedServicesSection from "./_components/booked-services-section";
type Props = {
  bookings: Booking[];
};
export const BookingPage = (props: Props) => {
  return (
    <BookedServicesSection
      filteredServices={props.bookings.filter(
        (service) => service.price !== null,
      )}
    />
  );
};
