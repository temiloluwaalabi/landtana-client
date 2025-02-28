"use client";
import { ChevronUp, Minus } from "lucide-react";
import * as React from "react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import useSyncBookingState from "@/hooks/use-sync-booking-state";
import { useBookingStore } from "@/lib/use-booking-store";
import { cn } from "@/lib/utils";

import MaxWidthContainer from "../max-width-container";
import { BookingStepFour } from "./steps/booking-step-four";
import { BookingStepOne } from "./steps/booking-step-one";
import { BookingStepThree } from "./steps/booking-step-three";
import { BookingStepTwo, servicesList } from "./steps/booking-step-two";
import { StepHeader } from "./steps/step-header";
import { StepsBreadcrumbs } from "./steps/steps-breadcrumbs";
export const BookServiceClient = () => {
  useSyncBookingState();
  const [hideDetails, setHideDetails] = React.useState(false);
  const { step, bookings, removeBooking, updateState } = useBookingStore();
  // Calculate total price
  const totalPrice = bookings
    .map(
      (booking) =>
        servicesList.find((service) => service.id === booking.serviceId)
          ?.price || 0
    )
    .reduce((sum, price) => sum + price, 0);
  const renderStage = () => {
    if (step === 1) {
      return <BookingStepOne />;
    } else if (step === 2) {
      return <BookingStepTwo />;
    } else if (step === 3) {
      return <BookingStepThree />;
    } else if (step === 4) {
      return <BookingStepFour />;
    }
  };
  return (
    <MaxWidthContainer className="relative h-full  !py-[80px]">
      <StepsBreadcrumbs />
      <div className="mt-10 pb-28">
        <StepHeader
          currentStep={step}
          onGoBack={() =>
            updateState({
              step: step - 1,
            })
          }
        />
        {renderStage()}
      </div>

      {step === 2 && bookings.length > 0 && (
        <MaxWidthContainer className="fixed bottom-0 left-0 z-50 flex h-fit w-full items-end !py-0 transition-all animate-in">
          <Card className="relative !h-full animate-accordion-down rounded-none rounded-se-lg  rounded-ss-lg border p-0 shadow-lg transition-transform">
            <CardHeader
              className={cn(
                "flex w-full flex-row items-center justify-between  pb-4 shadow-none outline-none",
                hideDetails && "border-b-[3px]"
              )}
            >
              <div>
                <h2 className="font-lora text-lg font-medium text-gray-500">
                  {bookings.length}{" "}
                  {bookings.length > 1 ? "services" : "service"} selected
                </h2>
                <p className="space-x-1">
                  <span className="font-lora text-sm font-normal text-gray-500">
                    from
                  </span>
                  <span className="font-lora text-xl font-bold text-primary">
                    ${totalPrice}
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
                      const service = servicesList.find(
                        (s) => s.id === booking.serviceId
                      );
                      const bookingIndex = bookings.findIndex(
                        (b) => b.serviceId === booking.serviceId
                      );
                      return (
                        <div
                          key={booking.serviceId}
                          className="flex w-full items-center justify-between rounded-md border p-3"
                        >
                          <div>
                            <h3 className="font-cormorant text-xl font-bold">
                              {service?.name}{" "}
                            </h3>
                            <p className="font-lora text-sm font-normal text-gray-500">
                              Hair Colouring
                            </p>
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
            <CardFooter>
              <Button
                onClick={() => updateState({ step: step + 1 })}
                className="h-[48px] w-full"
              >
                Continue
              </Button>
            </CardFooter>
          </Card>
        </MaxWidthContainer>
      )}
    </MaxWidthContainer>
  );
};
