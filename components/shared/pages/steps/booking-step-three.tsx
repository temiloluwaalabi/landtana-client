"use client";
import { Plus } from "lucide-react";
import * as React from "react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
// import { useIsMobile } from "@/hooks/use-mobile";
import { useBookingStore } from "@/lib/use-booking-store";
import { cn } from "@/lib/utils";

import { servicesList } from "./booking-step-two";
export const addonList = [
  { id: "6", name: "Washing Hair", price: 50 },
  { id: "7", name: "Dying", price: 30 },
  { id: "8", name: "Burning", price: 20 },
];
export const BookingStepThree = () => {
  const [openAccordionId, setOpenAccordionId] = React.useState<string | null>(
    null
  );
  const { step, bookings, updateBooking, updateState } = useBookingStore();
  // const isMobile = useIsMobile();
  // Utility function to toggle an item in an array
  // const toggleArrayItem = <T,>(array: T[], item: T): T[] => {
  //   const index = array.indexOf(item);
  //   return index === -1
  //     ? [...array, item] // Add item
  //     : array.filter((_, i) => i !== index); // Remove item
  // };

  const handleToggleService = (
    addonServiceId: string,
    parentServiceId: string
  ) => {
    console.log(
      "Toggling addon:",
      addonServiceId,
      "for service:",
      parentServiceId
    );

    const parentBookingIndex = bookings.findIndex(
      (booking) => booking.serviceId === parentServiceId
    );

    if (parentBookingIndex === -1) return;

    const parentBooking = bookings[parentBookingIndex];

    const isAddonBooked = parentBooking.addons?.includes(addonServiceId);
    // const updatedAddons = toggleArrayItem(
    //   parentBooking.addons ?? [],
    //   addonServiceId
    // );
    // Set the flag to indicate a state update
    // isStateUpdate.current = true;
    // // Create updated addons array
    const updatedAddons = isAddonBooked
      ? parentBooking.addons?.filter((id) => id !== addonServiceId) // Remove addon
      : [...(parentBooking.addons ?? []), addonServiceId]; // Add addon
    console.log("Updated addons:", updatedAddons);
    // Update the booking
    updateBooking(parentBookingIndex, { addons: updatedAddons });
  };

  return (
    <div className="flex h-full flex-col gap-6">
      {/* <div className="space-y-2">
        <h2 className="font-cormorant text-5xl font-bold">Select Addons</h2>
        <p className="max-w-md font-lora text-base font-normal">
          We have services available to all and delivered by our experienced
          specialists
        </p>
      </div> */}

      <div className="rounded-md border border-primary bg-[#E7FFE3] p-4 text-lg font-semibold text-primary">
        <h3>
          A Professional will be automatizally assigned to you and sent to your
          mail and registered phone number
        </h3>
      </div>
      <div className="space-y-3">
        <h2 className="font-lora text-lg font-medium text-gray-500">
          {bookings.length} {bookings.length > 1 ? "services" : "service"}{" "}
          selected
        </h2>
        <div className="w-full space-y-3">
          {bookings.map((booking) => {
            const service = servicesList.find(
              (s) => s.id === booking.serviceId
            );
            return (
              service && (
                <div
                  key={booking.serviceId}
                  className="flex w-full animate-accordion-down flex-col rounded-md border p-3 transition-transform"
                >
                  <div className="flex w-full items-center justify-between">
                    <div className="flex items-center gap-1">
                      <div>
                        <h3 className="font-cormorant text-xl font-bold">
                          {service?.name}{" "}
                        </h3>
                        {/* <p className="font-lora text-sm font-normal text-gray-500">
                      Hair Colouring
                    </p> */}
                      </div>
                      <Button
                        onClick={() =>
                          setOpenAccordionId((prevId) =>
                            prevId === booking.serviceId
                              ? null
                              : booking.serviceId
                          )
                        }
                        variant={"link"}
                        className="flex h-auto gap-0 p-0 text-xs"
                      >
                        <Plus /> Add Addon Services
                      </Button>
                    </div>
                    <div className="flex items-center  gap-2">
                      <p className="space-x-1">
                        <span className="font-lora text-sm font-normal text-gray-500">
                          from
                        </span>
                        <span className="font-cormorant text-2xl font-bold text-primary">
                          ${service?.price}
                        </span>
                      </p>
                    </div>
                  </div>
                  {openAccordionId === booking.serviceId && (
                    <div className="mt-2 space-y-3 py-4">
                      <Input placeholder="Search Addon Services" />
                      <div className="grid grid-cols-4 gap-4">
                        {addonList.map((item) => {
                          const isAddonBooked = booking.addons?.includes(
                            item.id
                          );

                          return (
                            <div
                              key={item.id}
                              className={cn(
                                "flex h-[130px] transition-all items-center justify-between rounded-[8px] border border-[#D9D9D9] p-6",
                                isAddonBooked && "border-secondary"
                              )}
                            >
                              <div className="space-y-4">
                                <div>
                                  <h6 className="font-cormorant text-xl font-semibold text-black">
                                    {item.name}
                                  </h6>
                                  <p className="text-sm text-gray-400">
                                    5 Hours
                                  </p>
                                </div>
                                <p className="space-x-1">
                                  <span className="text-sm text-gray-400">
                                    From
                                  </span>
                                  <span className="text-base font-bold text-primary">
                                    ${item.price}
                                  </span>
                                </p>
                              </div>
                              {isAddonBooked ? (
                                <Checkbox
                                  className="!size-10 rounded-[8px] !border-none shadow-none data-[state=checked]:bg-[#FFEBEE] data-[state=checked]:text-secondary"
                                  checked={isAddonBooked ?? false}
                                  onCheckedChange={() =>
                                    handleToggleService(
                                      item.id,
                                      booking.serviceId
                                    )
                                  }
                                  checkClassName="size-[32px]"
                                />
                              ) : (
                                <Button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleToggleService(
                                      item.id,
                                      booking.serviceId
                                    );
                                  }}
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
                  )}
                </div>
              )
            );
          })}
        </div>
      </div>
      <Button
        className="h-[48px]"
        onClick={() => updateState({ step: step + 1 })}
      >
        Proceed to select date
      </Button>
    </div>
  );
};
