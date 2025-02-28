"use client";
import { Plus } from "lucide-react";
import * as React from "react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
// import { useIsMobile } from "@/hooks/use-mobile";
import { Service, useBookingStore } from "@/lib/use-booking-store";
import { cn } from "@/lib/utils";
export const servicesList = [
  { id: "1", name: "Braiding", price: 50 },
  { id: "2", name: "Hair Treatment", price: 30 },
  { id: "3", name: "Scalp Massage", price: 20 },
];
export const BookingStepTwo = () => {
  const { bookings, addBooking, removeBooking } = useBookingStore();
  console.log(bookings);
  // const isMobile = useIsMobile();

  const handleToggleService = (service: Service) => {
    const isServiceBooked = bookings.some(
      (booking) => booking.serviceId === service.id,
    );

    if (isServiceBooked) {
      // Remove the booking if the service is already booked
      const bookingIndex = bookings.findIndex(
        (booking) => booking.serviceId === service.id,
      );
      if (bookingIndex !== -1) {
        removeBooking(bookingIndex);
      }
    } else {
      // Add a new booking if the service is not booked
      addBooking({
        serviceId: service.id,
        status: "pending",
        stylist: null,
        // date: null,
        // time: null,
      });
    }
  };

  return (
    <div className="flex h-full flex-col gap-6 ">
      {/* <div className="space-y-2">
        <h2 className="font-cormorant text-5xl font-bold">Select Service</h2>
        <p className="max-w-md font-lora text-base font-normal">
          We have services available to all and delivered by our experienced
          specialists
        </p>
      </div> */}

      <div className="grid grid-cols-12 gap-10">
        <aside className="hidden flex-col space-y-3 md:col-span-4 md:flex">
          <Button className="flex h-[40px] w-full items-center justify-between rounded-[16px] px-[16px] py-[8px]">
            <span className="text-base font-normal">Braids</span>{" "}
            <div className="flex size-6 items-center justify-center rounded-full bg-[#e2f5e8] text-primary">
              9
            </div>
          </Button>
          <Button className="flex h-[40px] w-full items-center justify-between rounded-[16px] border-none bg-transparent px-[16px] py-[8px] text-[#5F5F5F] shadow-none hover:text-white">
            <span className="text-base font-normal">Hair Coloring</span>{" "}
            <div className="flex size-6 items-center justify-center rounded-full bg-[#e2f5e8] text-primary">
              9
            </div>
          </Button>
          <Button className="flex h-[40px] w-full items-center justify-between rounded-[16px] border-none bg-transparent px-[16px] py-[8px] text-[#5F5F5F] shadow-none hover:text-white">
            <span className="text-base font-normal">Hair Cutting & Blow</span>{" "}
            <div className="flex size-6 items-center justify-center rounded-full bg-[#e2f5e8] text-primary">
              9
            </div>
          </Button>
          <Button className="flex h-[40px] w-full items-center justify-between rounded-[16px] border-none bg-transparent px-[16px] py-[8px] text-[#5F5F5F] shadow-none hover:text-white">
            <span className="text-base font-normal">Hair Extensions</span>{" "}
            <div className="flex size-6 items-center justify-center rounded-full bg-[#e2f5e8] text-primary">
              9
            </div>
          </Button>
          <Button className="flex h-[40px] w-full items-center justify-between rounded-[16px] border-none bg-transparent px-[16px] py-[8px] text-[#5F5F5F] shadow-none hover:text-white">
            <span className="text-base font-normal">Weavons</span>{" "}
            <div className="flex size-6 items-center justify-center rounded-full bg-[#e2f5e8] text-primary">
              9
            </div>
          </Button>
          <Button className="flex h-[40px] w-full items-center justify-between rounded-[16px] border-none bg-transparent px-[16px] py-[8px] text-[#5F5F5F] shadow-none hover:text-white">
            <span className="text-base font-normal">Consultation</span>{" "}
            <div className="flex size-6 items-center justify-center rounded-full bg-[#e2f5e8] text-primary">
              9
            </div>
          </Button>
          <Button className="flex h-[40px] w-full items-center justify-between rounded-[16px] border-none bg-transparent px-[16px] py-[8px] text-[#5F5F5F] shadow-none hover:text-white">
            <span className="text-base font-normal">Others</span>{" "}
            <div className="flex size-6 items-center justify-center rounded-full bg-[#e2f5e8] text-primary">
              9
            </div>
          </Button>
        </aside>
        <div className="col-span-12 md:col-span-8">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {servicesList.map((item) => {
              const isBooked = bookings.some(
                (booking) => booking.serviceId === item.id,
              );
              return (
                <div
                  key={item.id}
                  className={cn(
                    "flex h-[130px] transition-all items-center justify-between rounded-[8px] border border-[#D9D9D9] p-6",
                    isBooked && "border-secondary",
                  )}
                >
                  <div className="space-y-4">
                    <div>
                      <h6 className="font-cormorant text-xl font-semibold text-black">
                        {item.name}
                      </h6>
                      <p className="text-sm text-gray-400">5 Hours</p>
                    </div>
                    <p className="space-x-1">
                      <span className="text-sm text-gray-400">From</span>
                      <span className="text-base font-bold text-primary">
                        ${item.price}
                      </span>
                    </p>
                  </div>
                  {isBooked ? (
                    <Checkbox
                      className="!size-10 rounded-[8px] !border-none shadow-none data-[state=checked]:bg-[#FFEBEE] data-[state=checked]:text-secondary"
                      checked={isBooked}
                      onCheckedChange={() => handleToggleService(item)}
                      checkClassName="size-[32px]"
                    />
                  ) : (
                    <Button
                      onClick={() => handleToggleService(item)}
                      variant={"link"}
                      className="text-secondary"
                    >
                      <Plus /> Add
                    </Button>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
