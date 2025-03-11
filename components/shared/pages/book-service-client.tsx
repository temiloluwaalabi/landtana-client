"use client";
import { ChevronUp, Minus, User } from "lucide-react";
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
import { calculateBookingDetails, cn, toCurrency } from "@/lib/utils";
import { Category, Service } from "@/types";

import MaxWidthContainer from "../max-width-container";
import { BookingStepFour } from "./steps/booking-step-four";
import { BookingGroupStep } from "./steps/booking-step-guests";
import { BookingStepOne } from "./steps/booking-step-one";
import { BookingStepThree } from "./steps/booking-step-three";
import { BookingStepTwo } from "./steps/booking-step-two";
import { StepHeader } from "./steps/step-header";
import { StepsBreadcrumbs } from "./steps/steps-breadcrumbs";

type Props = {
  services: Service[];
  categories: Category[];
};

export const BookServiceClient = (props: Props) => {
  useSyncBookingState();
  const [hideDetails, setHideDetails] = React.useState(false);
  const { step, bookings, removeBooking, updateState, type, guests } =
    useBookingStore();

  const sortedCategories = props.categories.sort((a, b) =>
    a.name.localeCompare(b.name)
  );
  const sortedServices = props.services.sort(
    (a, b) =>
      new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
  );

  // Calculate total price
  const totalPrice = calculateBookingDetails(
    bookings,
    props.services,
    props.services
  );

  // Updated navigation logic
  const handleNextStep = () => {
    if (type === "group") {
      updateState({ step: step + 1 });
    } else {
      // For individual, skip the group step
      updateState({ step: step + 1 });
    }
  };
  const renderStage = () => {
    if (type === "individual" || !type) {
      switch (step) {
        case 1:
          return <BookingStepOne />;
        case 2:
          return (
            <BookingStepTwo
              services={sortedServices}
              categories={sortedCategories}
            />
          );
        case 3:
          return <BookingStepThree services={sortedServices} />;
        case 4:
          return <BookingStepFour services={sortedServices} />;
        default:
          return null;
      }
    }

    // For group services
    if (type === "group") {
      switch (step) {
        case 1:
          return <BookingStepOne />;
        case 2:
          return (
            <BookingGroupStep
              services={sortedServices}
              categories={sortedCategories}
            />
          );
        case 3:
          return (
            <BookingStepTwo
              services={sortedServices}
              categories={sortedCategories}
            />
          );

        case 4:
          return <BookingStepThree services={sortedServices} />;
        case 5:
          return <BookingStepFour services={sortedServices} />;
        default:
          return null;
      }
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

      {((step === 2 && type !== "group") || step === 3) &&
        bookings.length > 0 && (
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
                      ${totalPrice.totalGroupPrice}
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
                      {totalPrice.bookingDetails.map((booking) => {
                        const service = props.services.find(
                          (s) => s.id === booking.bookingId
                        );
                        const bookingIndex = bookings.findIndex(
                          (b) => b.serviceId === booking.bookingId
                        );
                        return (
                          <div
                            key={booking.bookingId}
                            className="flex w-full items-center justify-between rounded-md border p-3"
                          >
                            <div>
                              {booking.guestId && (
                                <p className="flex w-fit items-center rounded-[12px] bg-primary px-3 py-1 font-lora text-sm font-normal text-white">
                                  <User className="me-2 size-4" />
                                  <span>
                                    {
                                      guests.find(
                                        (cat) => cat.id === booking?.guestId
                                      )?.name
                                    }
                                  </span>
                                </p>
                              )}
                              <h3 className="font-cormorant text-xl font-bold">
                                {service?.name}{" "}
                              </h3>
                              <p className="font-lora text-sm font-normal text-gray-500">
                                {
                                  props.categories.find(
                                    (cat) => cat.id === service?.category_id
                                  )?.name
                                }
                              </p>
                            </div>
                            <div className="flex items-center  gap-2">
                              <p className="space-x-1">
                                {/* <span className="font-lora text-sm font-normal text-gray-500">
                                from
                              </span> */}
                                <span className="font-cormorant text-2xl font-bold text-primary">
                                  {toCurrency(booking.totalPrice)}
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
                <Button onClick={handleNextStep} className="h-[48px] w-full">
                  Continue
                </Button>
              </CardFooter>
            </Card>
          </MaxWidthContainer>
        )}
    </MaxWidthContainer>
  );
};
