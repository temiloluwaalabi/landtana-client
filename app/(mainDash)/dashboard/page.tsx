import React from "react";

import {
  getBookingsByUser,
  getGroupBookingsByUser,
} from "@/app/actions/bookings.action";
import { MainUserDashboard } from "@/components/shared/pages/dashboard/main-user-dashboard";

export default async function Dashboard() {
  const singleBookings = await getBookingsByUser();
  const groupBookings = await getGroupBookingsByUser();
  return (
    <MainUserDashboard
      singleBookings={singleBookings.bookings || []}
      groupBooking={groupBookings.bookings || []}
    />
  );
}
