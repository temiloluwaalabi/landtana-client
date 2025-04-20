/* eslint-disable new-cap */
// app/confirmation/page.tsx
"use client";

import { motion } from "framer-motion";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";
import {
  Calendar,
  Clock,
  MapPin,
  Check,
  Home,
  Calendar as CalendarIcon,
  Download,
  Users,
} from "lucide-react";
import Link from "next/link";
import React, { useEffect } from "react";

export default function ConfirmationPage() {
  // This would come from your booking state or URL parameters in a real implementation
  const bookingDetails = {
    isGroupBooking: false,
    date: "April 10, 2025",
    time: "2:00 PM",
    bookingId: "LCB-2025041022",
    groupName: "Johnson Family",
    participants: [
      {
        name: "Aisha Johnson",
        service: "Box Braids",
        duration: "3 hours",
        stylist: "Tiana Williams",
        addons: ["Hair Treatment", "Scalp Massage"],
      },
      {
        name: "Maya Johnson",
        service: "Knotless Braids",
        duration: "3.5 hours",
        stylist: "Danielle Thompson",
        addons: ["Edge Treatment"],
      },
      {
        name: "Zoe Johnson",
        service: "Twists",
        duration: "2 hours",
        stylist: "Jasmine Rogers",
        addons: [],
      },
    ],
  };

  // For individual bookings, we'll convert it to the participants format
  const participants = bookingDetails.isGroupBooking
    ? bookingDetails.participants
    : [
        {
          name: "You",
          service: "Box Braids",
          duration: "3 hours",
          stylist: "Tiana Johnson",
          addons: ["Hair Treatment", "Scalp Massage"],
        },
      ];

  // Calculate total duration for the booking
  const calculateTotalDuration = () => {
    // This is a simplified calculation, in reality you would need to consider overlapping times
    let maxDurationHours = 0;

    participants.forEach((participant) => {
      const hours = parseFloat(participant.duration.split(" ")[0]);
      if (hours > maxDurationHours) {
        maxDurationHours = hours;
      }
    });

    return `${maxDurationHours} hours`;
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
      },
    },
  };

  const successVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    show: {
      scale: 1,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 15,
      },
    },
  };

  // Function to generate and download PDF
  const generatePDF = async () => {
    const confirmationElement = document.getElementById("confirmation-card");
    if (!confirmationElement) return;

    try {
      // Create canvas from the confirmation card
      const canvas = await html2canvas(confirmationElement, {
        scale: 2,
        logging: false,
        useCORS: true,
      });

      const imgData = canvas.toDataURL("image/png");

      // Create PDF
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "px",
        format: [canvas.width, canvas.height],
      });

      pdf.addImage(imgData, "PNG", 0, 0, canvas.width, canvas.height);
      pdf.save(`confirmation-${bookingDetails.bookingId}.pdf`);
    } catch (error) {
      console.error("Error generating PDF:", error);
      alert("There was an error generating your PDF. Please try again.");
    }
  };

  // Confetti effect (simplified version)
  useEffect(() => {
    const showConfetti = async () => {
      const confetti = (await import("canvas-confetti")).default;

      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      });
    };

    showConfetti();
  }, []);

  return (
    <motion.div
      className="min-h-screen bg-gray-50 px-4 py-12 sm:px-6 lg:px-8"
      initial="hidden"
      animate="show"
      variants={containerVariants}
    >
      <div className="mx-auto max-w-3xl">
        {/* Success Banner */}
        <motion.div
          className="relative mb-8 overflow-hidden border-l-4 border-green-500 bg-green-50 p-4"
          variants={successVariants}
        >
          <div className="flex">
            <div className="shrink-0">
              <motion.div
                initial={{ rotate: -180, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <Check className="size-6 text-green-500" />
              </motion.div>
            </div>
            <div className="ml-3">
              <h3 className="text-lg font-medium text-green-800">
                Booking Confirmed!
              </h3>
              <p className="mt-1 text-green-700">
                {bookingDetails.isGroupBooking
                  ? `Your group appointment has been successfully scheduled for ${participants.length} people.`
                  : "Your appointment has been successfully scheduled."}{" "}
                We&apos;ve sent a confirmation to your email.
              </p>
            </div>
          </div>
          <motion.div
            className="absolute inset-0 z-0 bg-green-100"
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: 1.5 }}
            style={{ opacity: 0.2 }}
          />
        </motion.div>

        {/* Booking Card */}
        <motion.div
          id="confirmation-card"
          className="relative mb-8 overflow-hidden rounded-lg bg-white shadow-lg"
          variants={itemVariants}
        >
          <div className="bg-black px-6 py-4 text-white">
            <h1 className="text-2xl font-bold">
              {bookingDetails.isGroupBooking
                ? `Group Appointment: ${bookingDetails.groupName}`
                : "Your Appointment at Landtana Crown Braids"}
            </h1>
            <p className="text-gray-200">
              Booking ID: {bookingDetails.bookingId}
            </p>
            {bookingDetails.isGroupBooking && (
              <div className="mt-2 flex items-center">
                <Users className="mr-2 size-4 text-gray-300" />
                <p className="text-gray-300">
                  {participants.length} participants
                </p>
              </div>
            )}
          </div>

          <div className="p-6">
            <div className="grid gap-6 md:grid-cols-2">
              <motion.div variants={itemVariants}>
                <h2 className="mb-4 text-xl font-semibold">Booking Details</h2>

                <div className="space-y-4">
                  <motion.div
                    className="flex items-start"
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.6 }}
                  >
                    <div className="mt-1 shrink-0">
                      <Calendar className="size-5 text-gray-500" />
                    </div>
                    <div className="ml-3">
                      <p className="text-sm font-medium text-gray-900">Date</p>
                      <p className="text-gray-700">{bookingDetails.date}</p>
                    </div>
                  </motion.div>

                  <motion.div
                    className="flex items-start"
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.7 }}
                  >
                    <div className="mt-1 shrink-0">
                      <Clock className="size-5 text-gray-500" />
                    </div>
                    <div className="ml-3">
                      <p className="text-sm font-medium text-gray-900">Time</p>
                      <p className="text-gray-700">
                        {bookingDetails.time} (Approx.{" "}
                        {calculateTotalDuration()})
                      </p>
                    </div>
                  </motion.div>
                </div>

                {/* Participants Section */}
                <div className="mt-6">
                  <h3 className="mb-3 text-lg font-medium text-gray-900">
                    {bookingDetails.isGroupBooking
                      ? "Participants"
                      : "Service Details"}
                  </h3>

                  <div className="space-y-4">
                    {participants.map((participant, index) => (
                      <div key={index} className="rounded-md bg-gray-50 p-3">
                        <p className="mb-1 font-medium text-gray-900">
                          {participant.name}
                        </p>
                        <div className="grid grid-cols-2 gap-2 text-sm">
                          <div>
                            <p className="text-gray-600">Service:</p>
                            <p className="text-gray-900">
                              {participant.service}
                            </p>
                          </div>
                          <div>
                            <p className="text-gray-600">Duration:</p>
                            <p className="text-gray-900">
                              {participant.duration}
                            </p>
                          </div>
                          <div>
                            <p className="text-gray-600">Stylist:</p>
                            <p className="text-gray-900">
                              {participant.stylist}
                            </p>
                          </div>
                          {participant.addons.length > 0 && (
                            <div>
                              <p className="text-gray-600">Add-ons:</p>
                              <p className="text-gray-900">
                                {participant.addons.join(", ")}
                              </p>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>

              <motion.div variants={itemVariants}>
                <h2 className="mb-4 text-xl font-semibold">
                  Salon Information
                </h2>

                <motion.div
                  className="mb-4 flex items-start"
                  initial={{ x: 20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.7 }}
                >
                  <div className="mt-1 shrink-0">
                    <MapPin className="size-5 text-gray-500" />
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-900">Address</p>
                    <p className="text-gray-700">
                      6923 W Loop 1604 N, Suite 214
                    </p>
                    <p className="text-gray-700">San Antonio, TX 78254</p>
                  </div>
                </motion.div>

                <motion.div
                  className="rounded-lg border border-gray-200 bg-gray-50 p-4"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.9 }}
                >
                  <h3 className="mb-2 font-medium text-gray-900">
                    What to expect
                  </h3>
                  <ul className="space-y-1 text-sm text-gray-700">
                    <li>• Please arrive 10 minutes before your appointment</li>
                    <li>
                      • Bring reference photos if you have a specific style in
                      mind
                    </li>
                    <li>• Make sure your hair is clean and detangled</li>
                    <li>
                      • Free parking is available in the shopping center lot
                    </li>
                    {bookingDetails.isGroupBooking && (
                      <li>
                        • For group bookings, please ensure all participants
                        arrive together
                      </li>
                    )}
                  </ul>
                </motion.div>

                {bookingDetails.isGroupBooking && (
                  <motion.div
                    className="mt-4 rounded-lg border border-blue-200 bg-blue-50 p-4"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 1.1 }}
                  >
                    <h3 className="mb-2 font-medium text-blue-900">
                      Group Booking Notes
                    </h3>
                    <ul className="space-y-1 text-sm text-blue-800">
                      <li>
                        • All participants will be served simultaneously by
                        different stylists
                      </li>
                      <li>
                        • The estimated completion time may vary for each
                        participant
                      </li>
                      <li>
                        • Changes to the group booking require 48-hour notice
                      </li>
                      <li>
                        • A 10% group discount has been applied to each service
                      </li>
                    </ul>
                  </motion.div>
                )}
              </motion.div>
            </div>

            {/* Payment info section */}
            <motion.div
              className="mt-8 border-t border-gray-200 pt-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2 }}
            >
              <p className="italic text-gray-500">
                {bookingDetails.isGroupBooking
                  ? "Payment for all services will be collected at the salon unless otherwise specified. A 10% deposit may be required for group bookings of 4 or more people."
                  : "Payment will be collected at the salon unless otherwise specified."}
              </p>
            </motion.div>
          </div>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          className="flex flex-col space-y-3 sm:flex-row sm:space-x-4 sm:space-y-0"
          variants={itemVariants}
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <Link
              href="/"
              className="inline-flex w-full items-center justify-center rounded-md border border-transparent bg-black px-4 py-2 text-sm font-medium text-white shadow-sm transition-colors duration-200 hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2"
            >
              <Home className="mr-2 size-4" /> Return to Home
            </Link>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <Link
              href="/dashboard/bookings"
              className="inline-flex w-full items-center justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm transition-colors duration-200 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2"
            >
              <CalendarIcon className="mr-2 size-4" /> Manage Bookings
            </Link>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <button
              className="inline-flex w-full items-center justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm transition-colors duration-200 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2"
              onClick={generatePDF}
            >
              <Download className="mr-2 size-4" /> Download Confirmation
            </button>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
}
