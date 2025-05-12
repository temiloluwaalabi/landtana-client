"use client";
import { format } from "date-fns";
import {
  ArrowLeft,
  Calendar,
  Check,
  Clock,
  Download,
  MapPin,
  Phone,
  Share2,
  Users,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Booking, Service } from "@/types";

import PageTitleHeader from "../page-title-header";

interface BookingDetailsProps {
  booking: Booking;
  services: Service[];
}

export const BookingDetails = ({ booking, services }: BookingDetailsProps) => {
  const router = useRouter();
  const [showAftercareInfo, setShowAftercareInfo] = useState(false);

  /**
   * Generates a descriptive title for a booking
   * - For single-person bookings: Service name or "Service + N others"
   * - For group bookings: Shows the group size and combines services
   */
  const generateBookingTitle = (booking: Booking): string => {
    // Handle empty booking case
    if (!booking) return "Untitled Booking";

    // For group bookings
    if (
      booking.is_group &&
      booking.group_members &&
      booking.group_members.length > 0
    ) {
      const totalPeople = booking.group_size || booking.group_members.length;

      // Get all unique service names across group members
      const allServiceNames = new Set<string>();
      booking.group_members.forEach((member) => {
        member.services?.forEach((service) => {
          allServiceNames.add(service.name);
        });
      });

      // Create descriptive group title
      if (allServiceNames.size === 0) {
        return `Group Booking (${totalPeople} people)`;
      } else if (allServiceNames.size === 1) {
        return `Group ${Array.from(allServiceNames)[0]} (${totalPeople} people)`;
      } else {
        const mainService = Array.from(allServiceNames)[0];
        return `Group ${mainService} + ${allServiceNames.size - 1} other service${allServiceNames.size > 2 ? "s" : ""} (${totalPeople} people)`;
      }
    }

    // For individual bookings
    if (!booking.services || booking.services.length === 0) {
      return "Untitled Booking";
    }

    // Find main service (first non-addon service or first service)
    const mainService =
      booking.services.find((service) => !service.is_addon) ||
      booking.services[0];

    if (booking.services.length === 1) {
      return mainService.name;
    }

    // Count additional services
    const additionalServices = booking.services.length - 1;
    return `${mainService.name} + ${additionalServices} service${additionalServices > 1 ? "s" : ""}`;
  };

  /**
   * Calculates the total price for a booking
   * Handles both individual and group bookings
   */
  // const calculateTotalPrice = (booking: Booking): number => {
  //   // For group bookings
  //   if (booking.is_group && booking.group_members && booking.group_members.length > 0) {
  //     return booking.group_members.reduce((groupTotal, member) => {
  //       // Calculate total for each member's services
  //       const memberTotal = member.services?.reduce((memberSum, service) =>
  //         memberSum + parseFloat(service.base_price || '0'), 0) || 0;

  //       return groupTotal + memberTotal;
  //     }, 0);
  //   }

  //   // For individual bookings
  //   if (!booking.services || booking.services.length === 0) {
  //     return 0;
  //   }

  //   return booking.services.reduce((total, service) =>
  //     total + parseFloat(service.base_price || '0'), 0);

  // }
  // Calculate total cost
  const calculateTotalCost = () => {
    let total = 0;
    if (booking.is_group) {
      // // For group bookings, only calculate "Me" services
      // const myServices = booking.group_members?.find(
      //   (member) => member.name === "Me"
      // )?.services;
      booking.group_members?.forEach((member) => {
        member.services?.forEach((service) => {
          total += parseFloat(service.base_price || "0");
        });
      });
      // if (myServices) {
      //   myServices.forEach((service) => {
      //     total += parseFloat(service.base_price);
      //   });
      // }
    } else {
      // For individual bookings
      booking.services?.forEach((service) => {
        total += parseFloat(service.base_price);
      });
    }
    return total;
  };

  // Calculate total duration
  const calculateTotalDuration = () => {
    let totalMinutes = 0;
    if (!booking.is_group && booking.services) {
      booking.services.forEach((service) => {
        totalMinutes += service.duration || 0;
      });
    }
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    return `${hours > 0 ? `${hours}h ` : ""}${minutes > 0 ? `${minutes}min` : ""}`;
  };

  // Helper function to get status badge color
  const getStatusColor = () => {
    switch (booking.status) {
      case "PENDING":
        return "bg-yellow-100 text-yellow-800";
      case "CONFIRMED":
        return "bg-green-100 text-green-800";
      case "CANCELLED":
        return "bg-red-100 text-red-800";
      case "COMPLETED":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  // Find main service (non-addon)
  const mainService = booking.is_group
    ? booking.group_members?.find((member) => member.name === "Me")?.services[0]
    : booking.services?.find((s) => !s.is_addon);

  // Determine if there are aftercare tips available
  const hasAftercareTips = services.find(
    (ser) => ser.name === mainService?.name
  );

  return (
    <div className="">
      <PageTitleHeader
        page={generateBookingTitle(booking)}
        className="border-b px-[15px] py-[14px] lg:px-[15px] 2xl:px-[20px]"
        pageDesc="Track and manage client information and activities"
        secondBtn={
          <Button
            variant="ghost"
            className="mb-6 flex items-center gap-2 pl-0"
            onClick={() => router.back()}
          >
            <ArrowLeft className="size-4" />
            Back to Bookings
          </Button>
        }
      />

      <div className="grid gap-6 px-[15px] py-[14px] md:grid-cols-3 lg:px-[15px] 2xl:px-[20px]">
        {/* Left Column - Main Info */}
        <div className="space-y-6 md:col-span-2">
          <Card className="dark:border-dark-400 dark:bg-dark-300">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-2xl font-bold">
                    {booking.is_group
                      ? "Group Appointment"
                      : mainService?.name || "Appointment"}
                  </CardTitle>
                  <CardDescription>
                    Booking ID: {booking.id.substring(0, 8)}
                  </CardDescription>
                </div>
                <Badge className={getStatusColor()}>{booking.status}</Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="rounded-full bg-blue-100 p-2">
                  <Calendar className="size-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Date & Time</p>
                  <p className="font-medium">
                    {booking.datetime
                      ? format(new Date(booking.datetime), "EEEE, MMMM d, yyyy")
                      : "Date not set"}
                  </p>
                  <p className="text-sm">
                    {booking.datetime
                      ? format(new Date(booking.datetime), "h:mm a")
                      : ""}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="rounded-full bg-purple-100 p-2">
                  <Clock className="size-5 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Duration</p>
                  <p className="font-medium">{calculateTotalDuration()}</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="rounded-full bg-green-100 p-2">
                  <MapPin className="size-5 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Location</p>
                  <p className="font-medium"> Landtana Crown Braids</p>
                  <p className="text-sm">
                    6923 W Loop 1604 N suite 214,
                    <br />
                    San Antonio, TX 78254
                  </p>
                </div>
              </div>

              {booking.is_group && (
                <div className="flex items-center gap-4">
                  <div className="rounded-full bg-amber-100 p-2">
                    <Users className="size-5 text-amber-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Group Size</p>
                    <p className="font-medium">{booking.group_size} people</p>
                  </div>
                </div>
              )}

              <Separator />

              <div>
                <h3 className="mb-3 font-medium">Services</h3>
                <div className="space-y-3">
                  {booking.is_group
                    ? booking.group_members?.map((member, index) => (
                        <div
                          key={index}
                          className="rounded-lg border border-gray-100 p-3"
                        >
                          <p className="font-medium">{member.name}</p>
                          {member.services.map((service, sIndex) => (
                            <div
                              key={sIndex}
                              className="mt-2 flex items-center justify-between"
                            >
                              <div className="flex items-center gap-2">
                                <Check className="size-4 text-green-500" />
                                <span>{service.name}</span>
                              </div>
                              <span className="font-medium">
                                ${service.base_price}
                              </span>
                            </div>
                          ))}
                        </div>
                      ))
                    : booking.services?.map((service, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between"
                        >
                          <div className="flex items-center gap-2">
                            <Check
                              className={`size-4 ${
                                service.is_addon
                                  ? "text-purple-500"
                                  : "text-green-500"
                              }`}
                            />
                            <span>
                              {service.name}{" "}
                              {service.is_addon && (
                                <span className="text-xs text-gray-500">
                                  (Add-on)
                                </span>
                              )}
                            </span>
                          </div>
                          <div className="flex items-center gap-4">
                            {service.duration && (
                              <span className="text-sm text-gray-500">
                                {service.duration} min
                              </span>
                            )}
                            <span className="font-medium">
                              ${service.base_price}
                            </span>
                          </div>
                        </div>
                      ))}
                </div>
              </div>

              {hasAftercareTips && (
                <div className="mt-6">
                  <Button
                    variant="outline"
                    onClick={() => setShowAftercareInfo(!showAftercareInfo)}
                    className="w-full justify-between"
                  >
                    <span>Aftercare Tips</span>
                    <span>{showAftercareInfo ? "Hide" : "Show"}</span>
                  </Button>
                  {showAftercareInfo && (
                    <div className="mt-3 rounded-lg bg-blue-50 p-4 text-sm">
                      <h4 className="mb-2 font-medium">
                        Care Tips for {mainService?.name}
                      </h4>
                      <ul className="list-disc space-y-1 pl-5">
                        <li>Wrap your braids with a satin scarf at night.</li>
                        <li>
                          Apply oil to your scalp 2-3 times per week to prevent
                          dryness.
                        </li>
                        <li>
                          Wash your braids every 2-3 weeks using a diluted
                          shampoo.
                        </li>
                        <li>
                          Avoid excessive tension or pulling on your braids.
                        </li>
                        <li>
                          Schedule a maintenance appointment in 4-6 weeks.
                        </li>
                      </ul>
                    </div>
                  )}
                </div>
              )}
            </CardContent>
            <CardFooter className="flex flex-col items-start space-y-4">
              <div className="flex w-full items-center justify-between rounded-lg bg-gray-50 p-4">
                <span className="font-medium">Total</span>
                <span className="text-xl font-bold">
                  ${calculateTotalCost()}
                </span>
              </div>
              <div className="flex w-full gap-3">
                <Button variant="outline" className="flex-1">
                  <Phone className="mr-2 size-4" />
                  Contact
                </Button>
                <Button className="flex-1">Reschedule</Button>
              </div>
            </CardFooter>
          </Card>
        </div>

        {/* Right Column - Stylist Info & Actions */}
        <div className="space-y-4">
          <Card className="dark:border-dark-400 dark:bg-dark-300">
            <CardHeader>
              <CardTitle>Your Stylist</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center text-center">
              <Avatar className="mb-3 size-20">
                <AvatarImage src="https://res.cloudinary.com/davidleo/image/upload/v1744896654/aa876a7a2f9aac97c39f34649357f02b_eqqhqh.jpg" />
              </Avatar>
              <h3 className="font-medium">ANITA ABAWAH</h3>
              <p className="text-sm text-gray-500">Professional Hair stylist</p>
              <p className="text-sm text-gray-500">
                Specializes in Hair Braiding
              </p>
              <p className="text-sm text-gray-500">Over 7 years + experience</p>
              <p className="text-sm text-gray-500">
                Holder of BSC in ECONOMICS
              </p>
              <p className="mt-2 flex items-center justify-center">
                <span className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      xmlns="http://www.w3.org/2000/svg"
                      className="size-4"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </span>
                <span className="ml-1 text-sm text-gray-500">
                  (240 reviews)
                </span>
              </p>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">
                View Profile
              </Button>
            </CardFooter>
          </Card>

          <Card className="dark:border-dark-400 dark:bg-dark-300">
            <CardHeader>
              <CardTitle>Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button variant="outline" className="w-full justify-start">
                <Download className="mr-2 size-4" />
                Download Receipt
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Share2 className="mr-2 size-4" />
                Share Appointment
              </Button>
              <Button
                variant="outline"
                className="w-full justify-start text-red-600 hover:bg-red-50 hover:text-red-700"
              >
                Cancel Booking
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default BookingDetails;
