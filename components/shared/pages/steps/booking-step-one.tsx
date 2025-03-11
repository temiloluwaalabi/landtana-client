"use client";
import Image from "next/image";
import * as React from "react";

import { Button } from "@/components/ui/button";
import { useBookingStore } from "@/lib/use-booking-store";
import { cn } from "@/lib/utils";
export const BookingStepOne = () => {
  const { type, updateState, addGuest, primaryGuestId, currentGuestId } =
    useBookingStore();
  console.log("currentUser", currentGuestId);
  console.log("primaryUser", primaryGuestId);
  const handleSelectType = (type: "individual" | "group" | "gift-card") => {
    if (type === "group") {
      updateState({
        type,
        step: 3,
        isGroupBooking: true,
      });
      addGuest({
        name: "Me",
      });
    } else {
      updateState({ type, step: 2 }); // Update state and move to next step
    }
  };

  return (
    <div className="flex h-[70vh] flex-col gap-6 ">
      <div className="grid grid-cols-3 gap-10">
        <Button
          onClick={() => handleSelectType("individual")}
          className={cn(
            "group flex h-[75px] items-center justify-start gap-4 rounded-[8px] border border-[#D9D9D9] bg-transparent p-6 shadow-none",
            type === "individual" && "border-primary"
          )}
        >
          <Image
            alt="Individual"
            src="/assets/icons/face_2.svg"
            width={35}
            height={35}
          />
          <span className="flex flex-col items-start ">
            <span className="font-lora text-lg font-bold text-black group-hover:text-white">
              Book an appointment
            </span>
            <span className="font-lora text-sm font-normal text-[#4E4E4E] group-hover:text-gray-300">
              Schedule services for yourself
            </span>
          </span>
        </Button>
        <Button
          onClick={() => handleSelectType("group")}
          className={cn(
            "group flex h-[75px] items-center justify-start gap-4 rounded-[8px] border border-[#D9D9D9] bg-transparent p-6 shadow-none",
            type === "group" && "border-primary"
          )}
        >
          <Image
            alt="Individual"
            src="/assets/icons/Group.svg"
            width={35}
            height={35}
          />
          <span className="flex flex-col items-start ">
            <span className="font-lora text-lg font-bold text-black group-hover:text-white">
              Group Appointment
            </span>
            <span className="font-lora text-sm font-normal text-[#4E4E4E] group-hover:text-gray-300">
              For yourself and others
            </span>
          </span>
        </Button>
        <Button
          onClick={() => handleSelectType("gift-card")}
          className={cn(
            "group flex h-[75px] items-center justify-start gap-4 rounded-[8px] border border-[#D9D9D9] bg-transparent p-6 shadow-none",
            type === "gift-card" && "border-primary"
          )}
        >
          <Image
            alt="Individual"
            src="/assets/icons/face_4.svg"
            width={35}
            height={35}
          />
          <span className="flex flex-col items-start ">
            <span className="font-lora text-lg font-bold text-black group-hover:text-white">
              Giftcard
            </span>
            <span className="font-lora text-sm font-normal text-[#4E4E4E] group-hover:text-gray-300">
              Buy our gift voucher
            </span>
          </span>
        </Button>
      </div>
    </div>
  );
};
