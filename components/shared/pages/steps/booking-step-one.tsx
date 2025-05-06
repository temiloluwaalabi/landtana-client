"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import * as React from "react";

import { Button } from "@/components/ui/button";
import { useBookingStore } from "@/lib/use-booking-store";
import { cn } from "@/lib/utils";

const transition = { type: "spring", damping: 25, stiffness: 120 };

export const BookingStepOne = () => {
  const {
    type,
    updateState,
    addGuest,
    guests,
    bookings,
    updateBooking,
    primaryGuestId,
  } = useBookingStore();

  const handleSelectType = (type: "individual" | "group" | "gift-card") => {
    let primaryId = primaryGuestId;
    if (!primaryGuestId) {
      if (guests.length > 0) {
        primaryId = guests[0].id;
      } else {
        primaryId = addGuest({
          name: "Me",
        });
      }
      updateState({
        primaryGuestId: primaryId,
      });
    }
    if (type === "group") {
      // Add "Me" guest if they don't exist yet

      if (bookings && bookings.length > 0) {
        bookings.forEach((booking, index) => {
          if (!booking.guestId) {
            updateBooking(index, {
              guestId: primaryId,
            });
          }
        });
        updateState({
          type,
          step: 2,
          isGroupBooking: true,
        });
      } else {
        updateState({
          type,
          step: 3,
          isGroupBooking: true,
        });
      }
    } else {
      // For individual or gift-card types, explicitly set isGroupBooking to false
      updateState({
        type,
        step: 2,
        isGroupBooking: false,
      });
    }
  };
  const bookingOptions: {
    type: "individual" | "group" | "gift-card";
    icon: string;
    title: string;
    subtitle: string;
  }[] = [
    {
      type: "individual",
      icon: "/assets/icons/face_2.svg",
      title: "Book an Appointment",
      subtitle: "Schedule services for yourself",
    },
    {
      type: "group",
      icon: "/assets/icons/Group.svg",
      title: "Group Appointment",
      subtitle: "For yourself and others",
    },
    {
      type: "gift-card",
      icon: "/assets/icons/face_4.svg",
      title: "Giftcard",
      subtitle: "Buy our gift voucher",
    },
  ];
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={transition}
      className="flex h-full flex-col gap-6"
    >
      <motion.div
        className="grid grid-cols-1 gap-6 md:grid-cols-3"
        initial="hidden"
        animate="visible"
        variants={{
          visible: { transition: { staggerChildren: 0.1 } },
          hidden: {},
        }}
      >
        {bookingOptions.map((option) => (
          <motion.div
            key={option.type}
            variants={{
              hidden: { opacity: 0, scale: 0.95 },
              visible: { opacity: 1, scale: 1 },
            }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Button
              onClick={() => handleSelectType(option.type)}
              disabled={option.type === "gift-card"}
              className={cn(
                "group flex h-[75px] w-full items-center justify-start gap-6 rounded-[8px] border bg-white/50 p-6 transition-all",
                "hover:border-primary hover:bg-white/80",
                type === option.type
                  ? "border-secondary bg-white"
                  : "border-[#D9D9D9] shadow-md"
              )}
            >
              <motion.div
                className="relative size-12"
                whileHover={{ rotate: [0, -10, 10, 0] }}
                transition={{ duration: 0.6 }}
              >
                <Image
                  src={option.icon}
                  alt={option.title}
                  width={48}
                  height={48}
                  className="size-full object-contain"
                />
              </motion.div>

              <div className="flex flex-col items-start text-left">
                <motion.span
                  className="font-lora text-xl font-bold text-gray-900 group-hover:text-primary"
                  transition={{ duration: 0.2 }}
                >
                  {option.title}
                </motion.span>
                <motion.span
                  className="font-lora text-sm font-medium text-gray-500 group-hover:text-gray-700"
                  transition={{ duration: 0.2 }}
                >
                  {option.subtitle}
                </motion.span>
              </div>
            </Button>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
};
