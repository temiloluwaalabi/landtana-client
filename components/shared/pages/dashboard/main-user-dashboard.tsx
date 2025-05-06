"use client";
import { format } from "date-fns";
import {
  AlertCircle,
  Bookmark,
  CalendarDays,
  Check,
  Clock,
  CreditCard,
  Star,
  Users,
} from "lucide-react";
import Link from "next/link";
import * as React from "react";

import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { allRoutes } from "@/config/routes";
import { cn } from "@/lib/utils";
import { Booking } from "@/types";

import PageTitleHeader from "../../page-title-header";

type MainUserDashboardProps = {
  singleBookings: Booking[];
  groupBooking: Booking[];
};
export const MainUserDashboard = (props: MainUserDashboardProps) => {
  const [activeTab, setActiveTab] = React.useState("upcoming");
  const totalBookings = props.singleBookings.length;
  const totalGroupBooking = props.groupBooking.length;
  const upcomingBookingsCount = props.singleBookings.filter(
    (booking) => booking.datetime && new Date(booking.datetime) > new Date(),
  ).length;

  // Calculate most booked service and other metrics
  const getMostBookedService = () => {
    const serviceCount: Record<string, number> = {};

    // Count services from single bookings
    props.singleBookings.forEach((booking) => {
      booking.services?.forEach((service) => {
        serviceCount[service.name] = (serviceCount[service.name] || 0) + 1;
      });
    });

    // Count services from group bookings
    props.groupBooking.forEach((booking) => {
      booking.group_members?.forEach((member) => {
        member.services.forEach((service) => {
          serviceCount[service.name] = (serviceCount[service.name] || 0) + 1;
        });
      });
    });

    // Find the most common service
    let maxCount = 0;
    let mostBooked = "";

    Object.entries(serviceCount).forEach(([name, count]) => {
      if (count > maxCount) {
        maxCount = count;
        mostBooked = name;
      }
    });

    return mostBooked;
  };

  // Calculate total spent
  const calculateTotalSpent = () => {
    let total = 0;

    // Add up costs from single bookings
    props.singleBookings.forEach((booking) => {
      booking.services?.forEach((service) => {
        total += parseFloat(service.base_price);
      });
    });

    // Add up costs from group bookings (only "Me" services)
    props.groupBooking.forEach((booking) => {
      const myServices =
        booking.group_members?.find((member) => member.name === "Me")
          ?.services || [];
      myServices.forEach((service) => {
        total += parseFloat(service.base_price);
      });
    });

    return total;
  };

  // Calculate average booking value
  const calculateAvgBookingValue = () => {
    const totalCost = calculateTotalSpent();
    const bookingCount =
      props.singleBookings.length + props.groupBooking.length;
    return bookingCount > 0 ? Math.round(totalCost / bookingCount) : 0;
  };
  const mostBookedService = getMostBookedService();
  const totalSpent = calculateTotalSpent();
  const avgBookingValue = calculateAvgBookingValue();

  return (
    <section>
      <PageTitleHeader
        page="Dashboard"
        className="border-b px-[15px] py-[14px] lg:px-[15px] 2xl:px-[20px]"
        pageDesc="Track and manage client information and activities"
        addLabel="Book Service"
      />
      <section className="space-y-6  px-[15px] pb-[14px] lg:px-[15px] 2xl:px-[20px] ">
        <div className="mt-4 grid  gap-4 md:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-lg bg-blue-100 p-4">
            <div className="flex items-center justify-between">
              <div className="rounded-md bg-blue-500/10 p-2">
                <Bookmark className="size-5 text-blue-600" />
              </div>
              <span className="text-xs font-medium text-blue-600">Today</span>
            </div>
            <div className="mt-3">
              <h4 className="text-2xl font-semibold text-gray-900 dark:text-black">
                {totalBookings}
              </h4>
              <p className="text-sm text-gray-500 dark:text-light-400">
                Total Bookings
              </p>
            </div>
          </div>

          <div className="rounded-lg bg-green-100 p-4">
            <div className="flex items-center justify-between">
              <div className="rounded-md bg-green-500/10 p-2">
                <Users className="size-5 text-green-600" />
              </div>
              <span className="text-xs font-medium text-green-600">Today</span>
            </div>
            <div className="mt-3">
              <h4 className="text-2xl font-semibold text-gray-900 dark:text-black">
                {totalGroupBooking}
              </h4>
              <p className="text-sm text-gray-500 dark:text-light-400">
                Group Bookings
              </p>
            </div>
          </div>

          <div className="rounded-lg bg-purple-100 p-4">
            <div className="flex items-center justify-between">
              <div className="rounded-md bg-purple-500/10 p-2">
                <CreditCard className="size-5 text-purple-600" />
              </div>
              <span className="text-xs font-medium text-purple-600">Today</span>
            </div>
            <div className="mt-3">
              <h4 className="text-2xl font-semibold text-gray-900 dark:text-black">
                {totalSpent}
              </h4>
              <p className="text-sm text-gray-500 dark:text-light-400">
                Total Spent
              </p>
            </div>
          </div>

          <div className="rounded-lg bg-orange-100 p-4">
            <div className="flex items-center justify-between">
              <div className="rounded-md bg-orange-500/10 p-2">
                <CalendarDays className="size-5 text-orange-600" />
              </div>
              <span className="text-xs font-medium text-orange-600">Now</span>
            </div>
            <div className="mt-3">
              <h4 className="text-2xl font-semibold text-gray-900 dark:text-black">
                {upcomingBookingsCount}
              </h4>
              <p className="text-sm text-gray-500 dark:text-light-400">
                Upcoming Appointment
              </p>
            </div>
          </div>
        </div>
        {/* Main Content Grid */}
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
          {/* Left Column - User Profile */}
          <div className=" lg:col-span-1">
            <div className="overflow-hidden rounded-lg border border-gray-100 bg-white shadow-sm dark:border-dark-400 dark:bg-dark-300">
              <div className="bg-gradient-to-r from-green-800 to-green-900 p-6 text-white dark:from-orange-500 dark:to-orange-600">
                <div className="flex items-center gap-4">
                  <Avatar className="size-16 border-4 border-white">
                    <AvatarImage src="https://res.cloudinary.com/davidleo/image/upload/v1744896654/aa876a7a2f9aac97c39f34649357f02b_eqqhqh.jpg" />
                  </Avatar>
                  <div>
                    <h2 className="text-xl font-bold">Hafsat Idris</h2>
                    <p className="text-blue-100">hafsat.idris@gmail.com</p>
                  </div>
                </div>
              </div>

              <div className="p-4">
                <h3 className="mb-2 font-medium text-gray-800 dark:text-light-800 ">
                  Booking Summary
                </h3>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600 dark:text-light-600">
                      Most Booked Service
                    </span>
                    <span className="font-medium text-gray-900 dark:text-white">
                      {mostBookedService}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600 dark:text-light-600">
                      Average Booking Value
                    </span>
                    <span className="font-medium text-gray-900 dark:text-white">
                      ${avgBookingValue}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600 dark:text-light-600">
                      Membership Status
                    </span>
                    <span className="rounded bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800">
                      Regular
                    </span>
                  </div>
                </div>

                <Separator className="my-4" />

                <div className="mt-3">
                  <div className="mb-2 flex justify-between">
                    <span className="text-sm text-gray-600 dark:text-light-600">
                      Loyalty Points
                    </span>
                    <span className="text-sm font-medium">240/500</span>
                  </div>
                  <Progress value={48} className="h-2" />
                  <p className="mt-1 text-xs text-gray-500 dark:text-light-400">
                    260 more points for next reward
                  </p>
                </div>

                <div className="mt-4">
                  <Button className="w-full">Manage Profile</Button>
                </div>
              </div>
            </div>
            <div className="hidden lg:block">
              {/* Latest Notifications */}
              <div className="mt-4 rounded-lg border border-gray-100 bg-white p-4 shadow-sm dark:border-dark-400 dark:bg-dark-300">
                <h3 className="mb-4 font-medium text-gray-800 dark:text-light-800">
                  Notifications
                </h3>

                <div className="mt-4 space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="rounded bg-blue-100 p-2">
                      <CalendarDays className="size-4 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">
                        Appointment Reminder
                      </p>
                      <p className="text-xs text-gray-500 dark:text-light-400">
                        Your Knotless Braids appointment is scheduled for Apr
                        18, 2025
                      </p>
                      <p className="mt-1 text-xs text-gray-400">1 day ago</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="rounded bg-amber-100 p-2">
                      <AlertCircle className="size-4 text-amber-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">
                        New Service Available
                      </p>
                      <p className="text-xs text-gray-500 dark:text-light-400">
                        Try our new Fulani Braids style with beads
                      </p>
                      <p className="mt-1 text-xs text-gray-400">3 days ago</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="rounded bg-green-100 p-2">
                      <Star className="size-4 text-green-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">
                        Loyalty Points Updated
                      </p>
                      <p className="text-xs text-gray-500 dark:text-light-400">
                        You&apos;ve earned 50 new points from your last
                        appointment
                      </p>
                      <p className="mt-1 text-xs text-gray-400">1 week ago</p>
                    </div>
                  </div>
                </div>
              </div>
              {/* Service History Breakdown */}
              <div className="mt-4 rounded-lg border border-gray-100 bg-white p-4 shadow-sm dark:border-dark-400 dark:bg-dark-300">
                <h3 className="mb-4 font-medium text-gray-800 dark:text-light-800">
                  Your Service History
                </h3>

                <div className="space-y-3">
                  {/* Calculate service history dynamically */}
                  {(() => {
                    // Gather all services from both single and group bookings
                    const serviceStats: Record<string, number> = {};
                    const colors = {
                      "Knotless Braids": "bg-blue-500",
                      Cornrows: "bg-purple-500",
                      "Mohawk Braids": "bg-green-500",
                      "Hair Wash": "bg-amber-500",
                      "Take Down": "bg-red-500",
                      "Cornrows (Men)": "bg-indigo-500",
                      "Micro Braids": "bg-pink-500",
                      "Lemonade Braids": "bg-teal-500",
                    };

                    // Count services from single bookings
                    props.singleBookings.forEach((booking) => {
                      booking.services?.forEach((service) => {
                        if (!service.is_addon) {
                          // Only count main services, not add-ons
                          serviceStats[service.name] =
                            (serviceStats[service.name] || 0) + 1;
                        }
                      });
                    });

                    // Count services from group bookings (only "Me" services)
                    props.groupBooking.forEach((booking) => {
                      const myServices =
                        booking.group_members?.find(
                          (member) => member.name === "Me",
                        )?.services || [];
                      myServices.forEach((service) => {
                        serviceStats[service.name] =
                          (serviceStats[service.name] || 0) + 1;
                      });
                    });

                    // Calculate total count and percentages
                    const totalCount = Object.values(serviceStats).reduce(
                      (sum, count) => sum + Number(count),
                      0,
                    );

                    // Sort services by count (descending)
                    const sortedServices = Object.entries(serviceStats)
                      .sort((a, b) => b[1] - a[1])
                      .slice(0, 4); // Show top 4 services

                    return sortedServices.map(([name, count], index) => {
                      const percentage =
                        totalCount > 0
                          ? Math.round((count / totalCount) * 100)
                          : 0;
                      const color =
                        colors[name as keyof typeof colors] || "bg-gray-500";

                      return (
                        <div key={index}>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <div
                                className={`size-3 rounded-full ${color}`}
                              ></div>
                              <span className="text-sm">{name}</span>
                            </div>
                            <span className="text-sm font-medium">
                              {percentage}%
                            </span>
                          </div>
                          <Progress
                            value={percentage}
                            className="h-2 bg-gray-100 dark:bg-dark-100"
                          />
                        </div>
                      );
                    });
                  })()}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Bookings and Stats */}
          <div className="space-y-5 lg:col-span-2">
            {/* Upcoming Bookings */}
            <div className="rounded-lg border border-gray-100 bg-white p-4 shadow-sm dark:border-dark-400 dark:bg-dark-300">
              <div className="mb-4 flex items-center justify-between">
                <h3 className="font-medium text-gray-800 dark:text-light-800">
                  Your Bookings
                </h3>
                <div className="flex rounded-md bg-gray-100 dark:bg-dark-100">
                  <button
                    className={cn(
                      "px-3 py-1 text-sm rounded-md",
                      activeTab === "upcoming"
                        ? "bg-orange-600 text-white"
                        : "text-gray-600 dark:text-light-600",
                    )}
                    onClick={() => setActiveTab("upcoming")}
                  >
                    Upcoming
                  </button>
                  <button
                    className={cn(
                      "px-3 py-1 text-sm rounded-md",
                      activeTab === "group"
                        ? "bg-orange-600 text-white"
                        : "text-gray-600 dark:text-light-600",
                    )}
                    onClick={() => setActiveTab("group")}
                  >
                    Group
                  </button>
                </div>
              </div>

              {activeTab === "upcoming" ? (
                <div className="space-y-3">
                  {props.singleBookings.map((booking) => (
                    <div
                      key={booking.id}
                      className="relative rounded-lg border border-gray-100 p-3 transition-colors hover:border-blue-300 dark:border-dark-400"
                    >
                      <Link
                        className="absolute left-0 top-0 z-50 size-full"
                        href={`${allRoutes.bookings.url}/${booking.id}`}
                      />
                      <div className="flex items-start justify-between">
                        <div>
                          <div className="flex items-center gap-2">
                            <CalendarDays className="size-4 text-orange-600" />
                            <span className="font-medium text-gray-900 dark:text-white">
                              {booking.datetime
                                ? format(
                                    new Date(booking.datetime),
                                    "EEEE, MMMM dd",
                                  )
                                : "Unknown Date"}{" "}
                            </span>
                          </div>
                          <div className="mt-1 flex items-center gap-2">
                            <Clock className="size-4 text-gray-400" />
                            <span className="text-sm text-gray-600 dark:text-light-600">
                              {booking.datetime
                                ? format(new Date(booking.datetime), "hh:mm a")
                                : "N/A"}
                            </span>
                          </div>
                        </div>
                        <div className="rounded bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700">
                          PENDING
                        </div>
                      </div>

                      <Separator className="my-3" />

                      <div className="space-y-2">
                        {booking.services?.map((service, index) => (
                          <div
                            key={index}
                            className="flex items-center justify-between"
                          >
                            <div className="flex items-center gap-2">
                              <Check className="size-4 text-green-500" />
                              <span className="text-sm">{service.name}</span>
                            </div>
                            <div className="flex gap-4">
                              <span className="text-sm text-gray-500 dark:text-light-400">
                                {service.duration} min
                              </span>
                              <span className="text-sm font-medium">
                                ${service.base_price}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}

                  <Button variant="outline" className="mt-2 w-full">
                    View All Bookings
                  </Button>
                </div>
              ) : (
                <div className="space-y-3">
                  {props.groupBooking.map((booking) => (
                    <div
                      key={booking.id}
                      className="rounded-lg border border-gray-100 p-3 transition-colors hover:border-purple-300 dark:border-dark-400"
                    >
                      <div className="flex items-start justify-between">
                        <div>
                          <div className="flex items-center gap-2">
                            <CalendarDays className="size-4 text-purple-600" />
                            <span className="font-medium text-gray-900 dark:text-white">
                              {booking.datetime
                                ? format(
                                    new Date(booking.datetime),
                                    "EEEE, MMMM dd",
                                  )
                                : "Unknown Date"}{" "}
                            </span>
                          </div>
                          <div className="mt-1 flex items-center gap-2">
                            <Users className="size-4 text-gray-400" />
                            <span className="text-sm text-gray-600 dark:text-light-600">
                              Group Size: {booking.group_size}
                            </span>
                          </div>
                        </div>
                        <div className="rounded bg-purple-50 px-2 py-1 text-xs font-medium text-purple-700">
                          GROUP
                        </div>
                      </div>

                      <Separator className="my-3" />

                      <div className="space-y-3">
                        {booking.group_members?.map((member, index) => (
                          <div
                            key={index}
                            className="border-l-2 border-purple-400 pl-3"
                          >
                            <div className="text-sm font-medium">
                              {member.name}
                            </div>
                            {member.services.map((service, sIndex) => (
                              <div
                                key={sIndex}
                                className="mt-1 flex items-center justify-between"
                              >
                                <span className="text-sm text-gray-600 dark:text-light-600">
                                  {service.name}
                                </span>
                                <span className="text-sm font-medium">
                                  ${service.base_price}
                                </span>
                              </div>
                            ))}
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}

                  <Button variant="outline" className="mt-2 w-full">
                    View All Group Bookings
                  </Button>
                </div>
              )}
            </div>

            {/* Service History Breakdown */}
            <div className="block rounded-lg border border-gray-100 bg-white p-4 shadow-sm dark:border-dark-400 dark:bg-dark-300 lg:hidden">
              <h3 className="mb-4 font-medium text-gray-800 dark:text-light-800">
                Your Service History
              </h3>

              <div className="space-y-3">
                {/* Calculate service history dynamically */}
                {(() => {
                  // Gather all services from both single and group bookings
                  const serviceStats: Record<string, number> = {};
                  const colors = {
                    "Knotless Braids": "bg-blue-500",
                    Cornrows: "bg-purple-500",
                    "Mohawk Braids": "bg-green-500",
                    "Hair Wash": "bg-amber-500",
                    "Take Down": "bg-red-500",
                    "Cornrows (Men)": "bg-indigo-500",
                    "Micro Braids": "bg-pink-500",
                    "Lemonade Braids": "bg-teal-500",
                  };

                  // Count services from single bookings
                  props.singleBookings.forEach((booking) => {
                    booking.services?.forEach((service) => {
                      if (!service.is_addon) {
                        // Only count main services, not add-ons
                        serviceStats[service.name] =
                          (serviceStats[service.name] || 0) + 1;
                      }
                    });
                  });

                  // Count services from group bookings (only "Me" services)
                  props.groupBooking.forEach((booking) => {
                    const myServices =
                      booking.group_members?.find(
                        (member) => member.name === "Me",
                      )?.services || [];
                    myServices.forEach((service) => {
                      serviceStats[service.name] =
                        (serviceStats[service.name] || 0) + 1;
                    });
                  });

                  // Calculate total count and percentages
                  const totalCount = Object.values(serviceStats).reduce(
                    (sum, count) => sum + Number(count),
                    0,
                  );

                  // Sort services by count (descending)
                  const sortedServices = Object.entries(serviceStats)
                    .sort((a, b) => b[1] - a[1])
                    .slice(0, 4); // Show top 4 services

                  return sortedServices.map(([name, count], index) => {
                    const percentage =
                      totalCount > 0
                        ? Math.round((count / totalCount) * 100)
                        : 0;
                    const color =
                      colors[name as keyof typeof colors] || "bg-gray-500";

                    return (
                      <div key={index}>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div
                              className={`size-3 rounded-full ${color}`}
                            ></div>
                            <span className="text-sm">{name}</span>
                          </div>
                          <span className="text-sm font-medium">
                            {percentage}%
                          </span>
                        </div>
                        <Progress
                          value={percentage}
                          className="h-2 bg-gray-100 dark:bg-dark-100"
                        />
                      </div>
                    );
                  });
                })()}
              </div>
            </div>
          </div>

          <div className="block rounded-lg border border-gray-100 bg-white p-4 shadow-sm dark:border-dark-400 dark:bg-dark-300 lg:hidden">
            <h3 className="mb-4 font-medium text-gray-800 dark:text-light-800">
              Notifications
            </h3>

            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="rounded bg-blue-100 p-2">
                  <CalendarDays className="size-4 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm font-medium">Appointment Reminder</p>
                  <p className="text-xs text-gray-500 dark:text-light-400">
                    Your Knotless Braids appointment is scheduled for Apr 18,
                    2025
                  </p>
                  <p className="mt-1 text-xs text-gray-400">1 day ago</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="rounded bg-amber-100 p-2">
                  <AlertCircle className="size-4 text-amber-600" />
                </div>
                <div>
                  <p className="text-sm font-medium">New Service Available</p>
                  <p className="text-xs text-gray-500 dark:text-light-400">
                    Try our new Fulani Braids style with beads
                  </p>
                  <p className="mt-1 text-xs text-gray-400">3 days ago</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="rounded bg-green-100 p-2">
                  <Star className="size-4 text-green-600" />
                </div>
                <div>
                  <p className="text-sm font-medium">Loyalty Points Updated</p>
                  <p className="text-xs text-gray-500 dark:text-light-400">
                    You&apos;ve earned 50 new points from your last appointment
                  </p>
                  <p className="mt-1 text-xs text-gray-400">1 week ago</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </section>
  );
};
