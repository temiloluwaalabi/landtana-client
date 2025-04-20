"use client";
import { ServicePriceCard } from "@/components/cards/service-price-card";
import { Booking } from "@/types";
import Image from "next/image";
import React from "react";
import { useState } from "react";
import MaxWidthContainer from "../max-width-container";

// Define TypeScript interfaces

// Star rating component
const StarRating: React.FC<{ rating: number; reviewCount: number }> = ({
  rating,
  reviewCount,
}) => {
  return (
    <div className="flex items-center">
      <div className="flex text-yellow-400">
        {[...Array(5)].map((_, i) => (
          <svg
            key={i}
            className={`w-4 h-4 ${i < Math.floor(rating) ? "text-yellow-400" : "text-gray-300"}`}
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
      </div>
      <span className="ml-2 text-sm text-gray-600">
        ({reviewCount} reviews)
      </span>
    </div>
  );
};

interface BookingDetailsPageProps {
  booking: Booking;
}
// Main BookingDetailsPage component
const BookingDetailsPage: React.FC<BookingDetailsPageProps> = ({
  booking,
}: BookingDetailsPageProps) => {
  // Sample booking data (would be fetched from an API in a real app)
  //   const [booking, setBooking] = useState<Booking>({
  //     id: "ec000eb9-8268-49e8-8a39-bfb7112a32de",
  //     datetime: "2025-04-18T09:00:00.000Z",
  //     price: 100,
  //     duration: 240,
  //     status: "PENDING",
  //     additional_notes:
  //       "I'd prefer my braids to be medium-sized, and I'll bring my own hair extensions.",
  //     is_group: false,
  //     group_size: 1,
  //     created_at: "2025-04-17T08:19:44.672Z",
  //     updated_at: "2025-04-17T08:19:44.672Z",
  //     stylist: {
  //       name: "Tex Claire",
  //       rating: 4.5,
  //       reviewCount: 15,
  //       image:
  //         "https://res.cloudinary.com/dyrvigorh/image/upload/v1744629321/crownbraids-images/yqj6mipweswpcvs7slyl.jpg",
  //     },
  //     services: [
  //       {
  //         id: "5a82510c-4e71-4f2b-a67c-d7028df8300f",
  //         name: "Box Braid",
  //         description:
  //           "Box braids are a protective hairstyle that uses synthetic hair extensions for a low-maintenance look.",
  //         base_price: "100",
  //         duration: 240,
  //         featured_image:
  //           "https://res.cloudinary.com/dyrvigorh/image/upload/v1744629322/crownbraids-images/dngkxwqqm6a3di9nrg6a.jpg",
  //       },
  //     ],
  //   });
  // Group members for group bookings
  const [groupMembers, setGroupMembers] = useState<string[]>([
    "Smith Wooden",
    "John Doe",
    "Jane Smith",
  ]);
  // Form state
  const [formData, setFormData] = useState({
    fullName: "Smith Wooden",
    email: "smith@gmail.com",
  });

  // Generate booking title
  const generateBookingTitle = (booking: Booking): string => {
    if (!booking.services || booking.services.length === 0) {
      return "Untitled Booking";
    }

    // Use the main service (first non-addon service) as the primary title component
    const mainService =
      booking.services.find((service) => !service.is_addon) ||
      booking.services[0];

    if (booking.services.length === 1) {
      return mainService.name;
    }

    // For multiple services, show main service + count of additional services
    return `${mainService.name} + ${booking.services.length - 1} service${booking.services.length > 2 ? "s" : ""}`;
  };
  // Handlers
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCancelBooking = () => {
    alert("Booking cancellation process initiated");
    // In a real app, this would call an API
  };

  const handleMakePayment = () => {
    alert("Redirecting to payment gateway");
    // In a real app, this would redirect to payment
  };

  const handleRateService = () => {
    alert("Rating dialog would open");
    // In a real app, this would open a rating dialog
  };

  const handleMarkCompleted = () => {
    alert("Marking booking as completed");
    // In a real app, this would call an API
  };

  const handleReschedule = () => {
    alert("Rescheduling dialog would open");
    // In a real app, this would open a calendar dialog
  };
  // Format date and time
  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  const formatTime = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  };

  // Generate booking reference
  const generateBookingReference = (id: string): string => {
    // Create a shorter reference code using parts of the UUID
    return id.substring(0, 7).toUpperCase();
  };

  // Get status display details
  const getStatusDetails = (status: string) => {
    switch (status) {
      case "PENDING":
        return {
          className: "bg-yellow-50 border border-yellow-200 text-yellow-800",
          title: "Pending Confirmation",
          message: `Your booking with reference ${generateBookingReference(booking.id)} is pending confirmation`,
        };
      case "CONFIRMED":
        return {
          className: "bg-green-50 border border-green-200 text-green-800",
          title: "Confirmed",
          message: `Your booking with reference ${generateBookingReference(booking.id)} is confirmed`,
        };
      case "CANCELLED":
        return {
          className: "bg-red-50 border border-red-200 text-red-800",
          title: "Cancelled",
          message: `Your booking with reference ${generateBookingReference(booking.id)} has been cancelled`,
        };
      case "COMPLETED":
        return {
          className: "bg-blue-50 border border-blue-200 text-blue-800",
          title: "Completed",
          message: `Your booking with reference ${generateBookingReference(booking.id)} has been completed`,
        };
      default:
        return {
          className: "bg-gray-50 border border-gray-200 text-gray-800",
          title: "Processing",
          message: `Your booking with reference ${generateBookingReference(booking.id)} is being processed`,
        };
    }
  };
  // Extract style options from additional notes
  const extractStyleOptions = (notes: string | null): string[] => {
    if (!notes) return [];

    const styleOptions: string[] = [];
    const regex = /Style Option: ([^\n]+)/g;
    let match;

    while ((match = regex.exec(notes)) !== null) {
      styleOptions.push(match[1].trim());
    }

    return styleOptions;
  };
  const statusDetails = getStatusDetails(booking.status);
  const styleOptions = extractStyleOptions(booking.additional_notes);

  return (
    <MaxWidthContainer className="p-4 space-y-8">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-bold text-gray-800">Booking Details</h1>
        <span className="text-sm bg-gray-100 px-3 py-1 rounded-full">
          Ref: {generateBookingReference(booking.id)}
        </span>
      </div>

      {/* Main booking card */}
      <div className="bg-white rounded-lg overflow-hidden ">
        <div className="flex flex-col md:flex-row">
          {/* Left side - Image */}
          <div className="md:w-1/3">
            {booking.services[0]?.featured_image ? (
              <Image
                src={booking.services[0].featured_image}
                alt={booking.services[0].name}
                width={100}
                height={459}
                className="w-full h-[459px] border-4 border-primary object-cover rounded-lg"
              />
            ) : (
              <div className="w-full h-[459px] bg-gray-300 rounded-lg flex items-center justify-center">
                <span className="text-gray-500">No image available</span>
              </div>
            )}
          </div>

          {/* Right side - Details */}
          <div className="md:w-2/3 p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">
              {generateBookingTitle(booking)}
            </h2>

            <div className="mt-2">
              {/* <p className="text-gray-700">{booking.stylist.name}</p> */}
              <StarRating rating={5} reviewCount={40} />
            </div>
            {/* {booking.stylist && (
            )} */}

            <div className="grid grid-cols-2 gap-4 mt-6">
              <div>
                <h3 className="text-sm font-medium text-gray-500">
                  Booking reference
                </h3>
                <p className="font-medium">
                  {generateBookingReference(booking.id)}
                </p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">Date</h3>
                <p className="font-medium">{formatDate(booking.datetime)}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">Test 1</h3>
                <p className="font-medium">Description</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">Time</h3>
                <p className="font-medium">{formatTime(booking.datetime)}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">
                  Service Charge
                </h3>
                <p className="font-medium">${booking.price.toLocaleString()}</p>
              </div>
            </div>
            {styleOptions.length > 0 && (
              <div className="mt-4">
                <h3 className="text-sm font-medium text-gray-500">
                  Style Options
                </h3>
                <div className="flex flex-wrap gap-2 mt-1">
                  {styleOptions.map((option, idx) => (
                    <span
                      key={idx}
                      className="bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded-full"
                    >
                      {option}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Status banner */}
            <div className={`p-4 rounded-lg mt-6 ${statusDetails.className}`}>
              <p className="font-medium">{statusDetails.title}</p>
              <p className="text-sm">{statusDetails.message}</p>
            </div>
          </div>
        </div>
      </div>
      {/* Group booking section */}
      {booking.is_group && booking.group_size > 1 && (
        <div className="p-6 border-b border-gray-200 bg-purple-50">
          <h3 className="font-medium text-gray-800 mb-2">
            Group Booking ({booking.group_size} people)
          </h3>
          <div className="space-y-2">
            {groupMembers.slice(0, booking.group_size).map((member, idx) => (
              <div key={idx} className="flex items-center">
                <div className="w-8 h-8 rounded-full bg-purple-200 flex items-center justify-center mr-2">
                  <span className="text-purple-700 text-sm">
                    {member
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </span>
                </div>
                <span>{member}</span>
                {idx === 0 && (
                  <span className="ml-2 text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                    Lead
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
      {/* Services section */}
      <div className="mt-8">
        <h3 className="font-medium text-gray-800 text-xl mb-4">
          Services Booked
        </h3>
        <div className="space-y-4 grid md:grid-cols-2 xl:grid-cols-3">
          {booking.services.map((service, idx) => (
            <ServicePriceCard key={service.id} service={service} />
          ))}
        </div>
      </div>
      {/* Your Information Section */}
      <div className="bg-white rounded-lg p-6 mt-8 shadow-md">
        <h2 className="text-xl font-bold text-gray-800 mb-6">
          Your Information
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">
              FULL NAME
            </label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">
              EMAIL
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex flex-wrap gap-3 mt-6">
          <button
            onClick={handleReschedule}
            className="flex items-center px-4 py-2 border border-blue-500 text-blue-600 rounded-lg hover:bg-blue-50"
          >
            <svg
              className="w-5 h-5 mr-2"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                clipRule="evenodd"
              />
            </svg>
            Reschedule
          </button>
          <button
            onClick={handleCancelBooking}
            className="flex items-center px-4 py-2 border border-yellow-500 text-yellow-600 rounded-lg hover:bg-yellow-50"
          >
            <svg
              className="w-5 h-5 mr-2"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                clipRule="evenodd"
              />
            </svg>
            Cancel Booking
          </button>
          <button
            onClick={handleMakePayment}
            className="flex items-center px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
          >
            <svg
              className="w-5 h-5 mr-2"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z" />
              <path
                fillRule="evenodd"
                d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z"
                clipRule="evenodd"
              />
            </svg>
            Make Payment
          </button>
          <button
            onClick={handleRateService}
            className="flex items-center px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
          >
            <svg
              className="w-5 h-5 mr-2"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            Rate this Service
          </button>
          <button
            onClick={handleMarkCompleted}
            className="flex items-center px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
          >
            <svg
              className="w-5 h-5 mr-2"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
            Mark as Completed
          </button>
        </div>
      </div>

      {/* Notes section */}
      {(booking.additional_notes || booking.status === "PENDING") && (
        <div className="bg-gray-50 mt-8 rounded-lg p-6 border border-gray-200">
          <h3 className="font-medium text-gray-800 mb-2">PS: Note</h3>
          <p className="text-gray-600">
            {booking.additional_notes ||
              "Hey there! The service you requested has been submitted and is awaiting approval, once accepted, you'll be prompted to make payment. Please be patient."}
          </p>
        </div>
      )}
      {/* Policy Section */}
      <div className="bg-blue-50 mt-8 rounded-lg p-6 border border-blue-200">
        <h3 className="font-medium text-gray-800 mb-2">Booking Policies</h3>
        <ul className="space-y-2 text-sm text-gray-600">
          <li className="flex items-start">
            <svg
              className="w-5 h-5 text-blue-500 mr-2 mt-0.5"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                clipRule="evenodd"
              />
            </svg>
            <span>
              Free cancellation up to 24 hours before your appointment. After
              that, cancellations incur a 50% fee.
            </span>
          </li>
          <li className="flex items-start">
            <svg
              className="w-5 h-5 text-blue-500 mr-2 mt-0.5"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                clipRule="evenodd"
              />
            </svg>
            <span>
              Please arrive 10 minutes before your scheduled appointment time.
              Late arrivals may result in reduced service time.
            </span>
          </li>
          <li className="flex items-start">
            <svg
              className="w-5 h-5 text-blue-500 mr-2 mt-0.5"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                clipRule="evenodd"
              />
            </svg>
            <span>
              Full payment is required to confirm your booking for all services.
            </span>
          </li>
        </ul>
      </div>
    </MaxWidthContainer>
  );
};

export default BookingDetailsPage;
