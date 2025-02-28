"use client";

import { Calendar, ChevronUp, Clock, Minus, Plus } from "lucide-react";
import * as React from "react";

// import { useIsMobile } from "@/hooks/use-mobile";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { useBookingStore } from "@/lib/use-booking-store";
import { cn, formatDayDate, formatMinutes, toCurrency } from "@/lib/utils";

import { servicesList } from "./booking-step-two";
import DateSelectionStep from "../../booking/date-selection-comp";
import {
  calculateTotalDuration,
  calculateTotalPrice,
} from "../../booking/time-selection-step";
export const addonList = [
  { id: "6", name: "Washing Hair", price: 50 },
  { id: "7", name: "Dying", price: 30 },
  { id: "8", name: "Burning", price: 20 },
];
export const BookingStepFour = () => {
  const [openAccordionId, setOpenAccordionId] = React.useState<boolean>(true);
  const [hideDetails, setHideDetails] = React.useState(false);
  const [hideDetailsD, setHideDetailsD] = React.useState(true);

  const { step, bookings, updateState, removeBooking, date, time } =
    useBookingStore();
  const totalDuration = calculateTotalDuration(
    bookings,
    servicesList,
    addonList,
  );
  // const isMobile = useIsMobile();

  // const handleToggleService = (
  //   addonServiceId: string,
  //   parentServiceId: string
  // ) => {
  //   const parentBookingIndex = bookings.findIndex(
  //     (booking) => booking.serviceId === parentServiceId
  //   );

  //   if (parentBookingIndex === -1) return;

  //   const parentBooking = bookings[parentBookingIndex];
  //   const isAddonBooked = parentBooking.addons?.includes(addonServiceId);

  //   if (isAddonBooked) {
  //     const updatedAddons = parentBooking.addons?.filter(
  //       (id) => id !== addonServiceId
  //     );

  //     updateBooking(parentBookingIndex, { addons: updatedAddons });
  //   } else {
  //     // Add the addon if it's not booked
  //     const updatedAddons = [...(parentBooking.addons || []), addonServiceId];
  //     updateBooking(parentBookingIndex, { addons: updatedAddons });
  //   }
  // };

  return (
    <section className="relative flex h-full flex-col gap-6 ">
      <div className="grid w-full grid-cols-12 gap-10">
        <div className="col-span-12 w-full space-y-3 md:col-span-7">
          {/* <h2 className="font-lora text-lg font-medium text-gray-500">
            {bookings.length} {bookings.length > 1 ? "services" : "service"}{" "}
            selected
          </h2> */}
          <div className="flex w-full animate-accordion-down flex-col  transition-transform">
            <div
              className={cn(
                "flex w-full  items-center justify-between  bg-white  p-3",
                openAccordionId === true
                  ? "rounded-se-lg rounded-ss-lg"
                  : "rounded-lg",
              )}
            >
              <div className="flex items-center gap-1">
                <div>
                  <h3 className="font-cormorant text-xl font-bold">
                    Select a day
                  </h3>
                  {/* <p className="font-lora text-sm font-normal text-gray-500">
                      Hair Colouring
                    </p> */}
                </div>
              </div>
              <Button
                onClick={() => setOpenAccordionId((prevId) => !prevId)}
                variant={"link"}
                className="flex h-auto gap-0 p-0 text-xs"
              >
                <Plus /> Select Date
              </Button>
            </div>
            {openAccordionId && (
              <div className="relative !mb-32 !h-fit animate-accordion-down space-y-3 rounded-none rounded-ee-lg rounded-es-lg border-t-2 bg-white px-3 py-4 transition-transform">
                <DateSelectionStep
                  onNext={() => console.log("DATE SELECTED")}
                  onBack={() => console.log("DATE Not SELECTED")}
                />
              </div>
            )}
          </div>
        </div>
        <div className="col-span-5 hidden flex-col gap-6 md:flex">
          <Card className="relative h-fit w-full animate-accordion-down rounded-none rounded-se-lg  rounded-ss-lg border p-0 shadow-none transition-transform">
            <CardHeader
              className={cn(
                "flex w-full flex-row items-start justify-between  pb-4 shadow-none outline-none",
                hideDetailsD && "border-b-[3px]",
              )}
            >
              <div className="space-y-3">
                <h2 className="font-lora text-lg font-medium text-gray-500">
                  {bookings.length}{" "}
                  {bookings.length > 1 ? "services" : "service"} selected
                </h2>
                <div className="space-y-2">
                  {date && (
                    <span className="flex items-center gap-1 text-base">
                      <Calendar className="size-4 text-gray-500" />
                      {date ? formatDayDate(date) : "No date selected"}
                    </span>
                  )}
                  {time && (
                    <span className="flex items-center gap-1 text-base">
                      <Clock className="size-4 text-gray-500" />
                      {time} ({formatMinutes(totalDuration)})
                    </span>
                  )}
                </div>
                {/* <p className="space-x-1">
                  <span className="font-lora text-sm font-normal text-gray-500">
                    from
                  </span>
                  <span className="font-lora text-xl font-bold text-primary">
                    ${calculateTotalPrice(bookings, servicesList, addonList)}
                  </span>
                </p> */}
              </div>
              <div>
                <Button
                  onClick={() => setHideDetailsD((prev) => !prev)}
                  className="w-fit p-0"
                  variant={"link"}
                >
                  Details
                  <ChevronUp className="size-4" />
                </Button>
              </div>
            </CardHeader>
            {hideDetailsD && (
              <CardContent className=" space-y-6 py-6 transition-transform">
                <div className="flex flex-col items-start justify-between gap-4">
                  <h3 className="font-semibold">Selected Services</h3>
                  <div className="w-full space-y-3">
                    {bookings.map((booking) => {
                      const bookingIndex = bookings.findIndex(
                        (b) => b.serviceId === booking.serviceId,
                      );

                      const service = servicesList.find(
                        (s) => s.id === booking.serviceId,
                      );
                      let totalDuration = 0;
                      let totalPrice = 0;

                      if (service) {
                        totalDuration += 60;
                        totalPrice += service.price;
                      }

                      if (booking.addons) {
                        booking.addons.forEach((addonID) => {
                          const addonService = addonList.find(
                            (s) => s.id === addonID,
                          );
                          if (addonService) {
                            totalDuration += 12;
                            totalPrice += addonService.price;
                          }
                        });
                      }
                      return (
                        <div
                          key={booking.serviceId}
                          className="flex w-full items-center justify-between rounded-md "
                        >
                          <div>
                            <h3 className="font-cormorant text-xl font-bold">
                              {service?.name}{" "}
                            </h3>
                            <p className="font-lora text-sm font-normal text-gray-500">
                              {formatMinutes(totalDuration)}
                            </p>
                          </div>
                          <div className="flex items-center  gap-2">
                            <p className="space-x-1">
                              <span className="font-cormorant text-2xl font-bold text-primary">
                                {toCurrency(totalPrice)}
                              </span>
                            </p>
                            <Button
                              onClick={() => {
                                if (bookingIndex !== -1) {
                                  removeBooking(bookingIndex);
                                }
                              }}
                              size={"icon"}
                              className="!size-[14px] rounded-full border border-secondary bg-transparent p-0 text-secondary shadow-none hover:border-none hover:bg-accent hover:text-white"
                            >
                              <Minus className="!size-2" />
                            </Button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="w-full border border-x-0 border-[#D9D9D9] py-2">
                    <span className="flex items-center justify-between text-sm">
                      <span>TAX</span>
                      <span>{toCurrency(12)}</span>
                    </span>
                  </div>
                  <div className="w-full ">
                    <span className="flex items-center justify-between">
                      <span className="text-sm">Total</span>
                      <span className="text-base font-bold text-primary">
                        {toCurrency(
                          calculateTotalPrice(
                            bookings,
                            servicesList,
                            addonList,
                          ),
                        )}
                      </span>
                    </span>
                  </div>
                </div>
              </CardContent>
            )}
            <CardFooter>
              <Button
                onClick={() => updateState({ step: step + 1 })}
                className="h-[48px] w-full"
              >
                Continue
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
      <div className=" fixed bottom-0 left-0 z-20 flex h-fit w-full items-end !py-0 transition-all animate-in md:hidden">
        <Card className="relative h-fit w-full animate-accordion-down rounded-none rounded-se-lg  rounded-ss-lg border p-0 shadow-lg transition-transform">
          <CardHeader
            className={cn(
              "flex w-full flex-row items-center justify-between  pb-4 shadow-none outline-none",
              hideDetails && "border-b-[3px]",
            )}
          >
            <div>
              <h2 className="font-lora text-lg font-medium text-gray-500">
                {bookings.length} {bookings.length > 1 ? "services" : "service"}{" "}
                selected
              </h2>
              <p className="space-x-1">
                <span className="font-lora text-sm font-normal text-gray-500">
                  from
                </span>
                <span className="font-lora text-xl font-bold text-primary">
                  ${totalDuration}
                </span>
              </p>
            </div>
            <div>
              <Button
                onClick={() => setHideDetails((prev) => !prev)}
                className="w-fit p-0"
                variant={"link"}
              >
                Details
                <ChevronUp className="size-4" />
              </Button>
            </div>
          </CardHeader>
          {hideDetails && (
            <CardContent className=" py-6 transition-transform">
              <div className="flex flex-col items-start justify-between gap-4">
                <h3 className="font-semibold">Selected Services</h3>
                <div className="w-full space-y-3">
                  {bookings.map((booking) => {
                    const bookingIndex = bookings.findIndex(
                      (b) => b.serviceId === booking.serviceId,
                    );

                    const service = servicesList.find(
                      (s) => s.id === booking.serviceId,
                    );
                    let totalDuration = 0;
                    let totalPrice = 0;

                    if (service) {
                      totalDuration += 60;
                      totalPrice += service.price;
                    }

                    if (booking.addons) {
                      booking.addons.forEach((addonID) => {
                        const addonService = addonList.find(
                          (s) => s.id === addonID,
                        );
                        if (addonService) {
                          totalDuration += 12;
                          totalPrice += addonService.price;
                        }
                      });
                    }
                    return (
                      <div
                        key={booking.serviceId}
                        className="flex w-full items-center justify-between rounded-md "
                      >
                        <div>
                          <h3 className="font-cormorant text-xl font-bold">
                            {service?.name}{" "}
                          </h3>
                          <p className="font-lora text-sm font-normal text-gray-500">
                            {formatMinutes(totalDuration)}
                          </p>
                        </div>
                        <div className="flex items-center  gap-2">
                          <p className="space-x-1">
                            <span className="font-cormorant text-2xl font-bold text-primary">
                              {toCurrency(totalPrice)}
                            </span>
                          </p>
                          <Button
                            onClick={() => {
                              if (bookingIndex !== -1) {
                                removeBooking(bookingIndex);
                              }
                            }}
                            size={"icon"}
                            className="!size-[14px] rounded-full border border-secondary bg-transparent p-0 text-secondary shadow-none hover:border-none hover:bg-accent hover:text-white"
                          >
                            <Minus className="!size-2" />
                          </Button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </CardContent>
          )}
          {/* <CardFooter>
            <Button
              onClick={() => updateState({ step: step + 1 })}
              className="h-[48px] w-full"
            >
              Continue
            </Button>
          </CardFooter> */}
        </Card>
      </div>
    </section>
  );
};
