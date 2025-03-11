"use client";
import { Plus } from "lucide-react";
import * as React from "react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
// import { useIsMobile } from "@/hooks/use-mobile";
import { useBookingStore } from "@/lib/use-booking-store";
import { calculateBookingDetails, cn } from "@/lib/utils";
import { Service } from "@/types";

type Props = {
  services: Service[];
};

export const BookingStepThree = ({ services }: Props) => {
  const [openAccordionId, setOpenAccordionId] = React.useState<string | null>(
    null,
  );
  const { step, bookings, updateBooking, updateState, currentGuestId, type } =
    useBookingStore();

  const handleToggleService = (
    addonServiceId: string,
    parentServiceId: string,
  ) => {
    console.log(
      "Toggling addon:",
      addonServiceId,
      "for service:",
      parentServiceId,
    );

    const parentBookingIndex = bookings.findIndex(
      (booking) => booking.serviceId === parentServiceId,
    );

    if (parentBookingIndex === -1) return;

    const parentBooking = bookings[parentBookingIndex];

    const isAddonBooked = parentBooking.addons?.includes(addonServiceId);

    // // Create updated addons array
    const updatedAddons = isAddonBooked
      ? parentBooking.addons?.filter((id) => id !== addonServiceId) // Remove addon
      : [...(parentBooking.addons ?? []), addonServiceId]; // Add addon
    console.log("Updated addons:", updatedAddons);
    // Update the booking
    updateBooking(parentBookingIndex, { addons: updatedAddons });
  };

  const totalPrice = calculateBookingDetails(bookings, services, services);

  const mappedService =
    type === "group"
      ? totalPrice.bookingDetails.filter(
          (book) => book.guestId === currentGuestId,
        )
      : totalPrice.bookingDetails;
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
          A stylist will be automatically assigned to you and sent to your mail
          and registered phone number
        </h3>
      </div>
      <div className="space-y-3">
        <h2 className="font-lora text-lg font-medium text-gray-500">
          {mappedService.length}{" "}
          {mappedService.length > 1 ? "services" : "service"} selected
        </h2>
        <div className="w-full space-y-3">
          {mappedService.map((booking) => {
            const service = services.find((s) => s.id === booking.bookingId);
            return (
              service && (
                <div
                  key={booking.bookingId}
                  className="flex w-full animate-accordion-down flex-col rounded-[12px]  border bg-white  transition-transform"
                >
                  <div className="flex w-full items-center justify-between border-b p-3">
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
                            prevId === booking.bookingId
                              ? null
                              : booking.bookingId!,
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
                        <span className="font-cormorant text-2xl font-bold text-primary">
                          ${booking?.totalPrice}
                        </span>
                      </p>
                    </div>
                  </div>
                  {openAccordionId === booking.bookingId && (
                    <div className="mt-2 space-y-3 px-3 py-4">
                      <Input placeholder="Search Addon Services" />
                      <div className="grid grid-cols-4 gap-4">
                        {services.slice(0, 6).map((item) => {
                          const isAddonBooked = booking.addons?.includes(
                            item.id,
                          );
                          return (
                            <div
                              key={item.id}
                              className={cn(
                                "flex h-[130px] transition-all items-center justify-between rounded-[8px] border border-[#D9D9D9] p-6",
                                isAddonBooked && "border-secondary",
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
                                    ${item.base_price}
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
                                      booking.bookingId,
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
                                      booking.bookingId,
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
        onClick={() => {
          if (type === "group") {
            updateState({ step: step - 2 });
          } else {
            updateState({ step: step + 1 });
          }
        }}
      >
        {type === "group" ? "Continue" : "Proceed to select date"}
      </Button>
    </div>
  );
};
