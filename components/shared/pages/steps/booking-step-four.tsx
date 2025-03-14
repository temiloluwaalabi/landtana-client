"use client";
import { MotionConfig, motion } from "framer-motion";
import { ArrowRight, Calendar, Clock, Minus, Plus } from "lucide-react";
import * as React from "react";
import { useInView } from "react-intersection-observer";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { durations } from "@/config/constants";
import { useBookingStore } from "@/lib/use-booking-store";
import {
  calculateBookingDetails,
  cn,
  formatDayDate,
  formatMinutes,
  toCurrency,
} from "@/lib/utils";
import { cardVariants } from "@/lib/variants";
import { Service } from "@/types";

import DateSelectionStep from "../../booking/date-selection-comp";

type Props = {
  services: Service[];
};

export const BookingStepFour = ({ services }: Props) => {
  const { ref: summaryRef, inView: summaryInView } = useInView({
    threshold: 0.1,
    triggerOnce: false,
  });
  const [openAccordionId, setOpenAccordionId] = React.useState<boolean>(true);
  // const [hideDetails, setHideDetails] = React.useState(false);

  const {
    step,
    bookings,
    updateState,
    primaryGuestId,
    removeBooking,
    date,
    time,
    guests,
    type,
  } = useBookingStore();

  const totalPrice = calculateBookingDetails(bookings, services, services);

  return (
    <MotionConfig reducedMotion="user">
      <motion.section className="relative flex h-full flex-col gap-6 ">
        <div className="flex w-full flex-col gap-4 lg:grid lg:grid-cols-12 2xl:gap-10">
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
                <div className="relative mb-4 !h-fit animate-accordion-down space-y-3 rounded-none rounded-ee-lg rounded-es-lg border-t-2 bg-white px-3 py-4 transition-transform">
                  <DateSelectionStep
                    services={services}
                    onNext={() => console.log("DATE SELECTED")}
                    onBack={() => console.log("DATE Not SELECTED")}
                  />
                </div>
              )}
            </div>
          </div>
          <motion.div
            variants={cardVariants}
            className="col-span-5  flex flex-col gap-6"
          >
            {type === "group" ? (
              <motion.div
                ref={summaryRef}
                initial="hidden"
                animate={summaryInView ? "visible" : "hidden"}
                variants={cardVariants}
                className="sticky top-6"
              >
                <Card className="relative h-fit w-full animate-accordion-down rounded-[12px]  border-none p-0 shadow-none transition-transform">
                  <CardHeader className="bg-gradient-to-r from-primary/90 to-primary pb-6 text-white">
                    <motion.div
                      className="flex items-center space-x-2"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                    >
                      <Calendar className="size-5" />
                      <h2 className="font-lora text-xl font-medium">
                        Booking Summary
                      </h2>
                    </motion.div>
                    <motion.div
                      className="mt-2"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.3 }}
                    >
                      <p className="text-sm text-white/80">
                        {bookings.length}{" "}
                        {bookings.length > 1 ? "services" : "service"} selected
                        for {guests.length}{" "}
                        {guests.length > 1 ? "guests" : "guest"}
                      </p>
                      <div className="mt-2 font-lora text-3xl font-bold">
                        {toCurrency(totalPrice.totalGroupPrice)}
                      </div>
                    </motion.div>
                    <motion.div
                      className="mt-2"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.4 }}
                    >
                      <div className="space-y-3">
                        <div className="space-y-2 text-white/80">
                          {date && (
                            <span className="flex items-center gap-1 text-base">
                              <Calendar className="text-white/800 size-4" />
                              {date ? formatDayDate(date) : "No date selected"}
                            </span>
                          )}
                          {time && (
                            <span className="flex items-center gap-1 text-base">
                              <Clock className="text-white/800 size-4" />
                              {time} (
                              {formatMinutes(totalPrice.totalGroupDuration)})
                            </span>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  </CardHeader>

                  <CardContent className=" py-6 transition-transform">
                    <div className="flex flex-col items-start justify-between gap-4">
                      <div className="w-full space-y-3">
                        {guests.map((guest, i) => (
                          <motion.div
                            key={guest.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 + i * 0.1 }}
                            className={cn(
                              "space-y-2 border-b pb-3",
                              guests.length - 1 === i && "!border-none !pb-0",
                            )}
                          >
                            <div className="flex items-center gap-2">
                              <Avatar className="size-8 border border-primary/10">
                                <AvatarFallback
                                  className={cn(
                                    "bg-gradient-to-br text-white text-xs",
                                    i % 3 === 0
                                      ? "from-primary to-blue-500"
                                      : i % 3 === 1
                                        ? "from-secondary to-pink-400"
                                        : "from-violet-500 to-purple-700",
                                  )}
                                >
                                  {guest.id === primaryGuestId
                                    ? "ME"
                                    : guest.name.substring(0, 2).toUpperCase()}
                                </AvatarFallback>
                              </Avatar>
                              <h3 className="text-lg font-bold text-gray-800">
                                {guest.id === primaryGuestId
                                  ? "Me"
                                  : guest.name}
                              </h3>
                            </div>
                            <div>
                              {totalPrice.bookingDetails.filter(
                                (book) => book.guestId === guest.id,
                              ).length === 0 && (
                                <p className="text-sm text-gray-300">
                                  No services selected
                                </p>
                              )}
                              {totalPrice.bookingDetails
                                .filter((book) => book.guestId === guest.id)
                                .map((service, idx) => (
                                  <motion.div
                                    key={service.bookingId}
                                    className="group flex items-start justify-between"
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.4 + idx * 0.1 }}
                                  >
                                    <div className="flex flex-col">
                                      <h3 className="font-cormorant text-lg font-medium">
                                        {
                                          services.find(
                                            (servicee) =>
                                              servicee.id === service.bookingId,
                                          )?.name
                                        }
                                      </h3>
                                      <p className="font-lora text-sm font-normal text-gray-500">
                                        {
                                          durations.find(
                                            (dur) =>
                                              dur.value ===
                                              service.totalDuration,
                                          )?.label
                                        }
                                      </p>
                                    </div>
                                    <div>
                                      <span className="font-cormorant text-2xl font-bold text-primary">
                                        {toCurrency(service.totalPrice)}
                                      </span>
                                    </div>
                                  </motion.div>
                                ))}
                            </div>
                          </motion.div>
                        ))}
                      </div>
                      <motion.div
                        className="w-full space-y-2"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                      >
                        <div className="w-full border border-x-0 border-[#D9D9D9] py-3">
                          <span className="flex items-center justify-between text-sm">
                            <span>TAX</span>
                            <span>{toCurrency(12)}</span>
                          </span>
                        </div>
                        <div className="w-full ">
                          <span className="flex items-center justify-between">
                            <span className="text-sm">Total</span>
                            <span className="text-base font-bold text-primary">
                              {toCurrency(totalPrice.totalGroupPrice)}
                            </span>
                          </span>
                        </div>
                      </motion.div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button
                      onClick={() => updateState({ step: step + 1 })}
                      className="h-[48px] w-full"
                    >
                      <span>Continue</span>
                      <motion.div
                        className="ml-2"
                        initial={{ x: 0 }}
                        whileHover={{ x: 5 }}
                        transition={{
                          type: "spring",
                          stiffness: 400,
                          damping: 10,
                        }}
                      >
                        <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                      </motion.div>
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            ) : (
              <motion.div
                ref={summaryRef}
                initial="hidden"
                animate={summaryInView ? "visible" : "hidden"}
                variants={cardVariants}
                className="sticky top-6"
              >
                <Card className="relative h-fit w-full animate-accordion-down rounded-none rounded-se-lg  rounded-ss-lg border p-0 shadow-none transition-transform">
                  <CardHeader className="bg-gradient-to-r from-primary/90 to-primary pb-6 text-white">
                    <motion.div
                      className="flex items-center space-x-2"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                    >
                      <Calendar className="size-5" />
                      <h2 className="font-lora text-xl font-medium">
                        Booking Summary
                      </h2>
                    </motion.div>
                    <motion.div
                      className="mt-2"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.3 }}
                    >
                      <p className="text-sm text-white/80">
                        {bookings.length}{" "}
                        {bookings.length > 1 ? "services" : "service"} selected
                        for {guests.length < 1 ? "1" : guests.length}{" "}
                        {guests.length > 1 ? "guests" : "guest"}
                      </p>
                      <div className="mt-2 font-lora text-3xl font-bold">
                        {toCurrency(totalPrice.totalGroupPrice)}
                      </div>
                    </motion.div>
                    <motion.div
                      className="mt-2"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.4 }}
                    >
                      <div className="space-y-3">
                        <div className="space-y-2 text-white/80">
                          {date && (
                            <span className="flex items-center gap-1 text-base">
                              <Calendar className="text-white/800 size-4" />
                              {date ? formatDayDate(date) : "No date selected"}
                            </span>
                          )}
                          {time && (
                            <span className="flex items-center gap-1 text-base">
                              <Clock className="text-white/800 size-4" />
                              {time} (
                              {formatMinutes(totalPrice.totalGroupDuration)})
                            </span>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  </CardHeader>
                  <CardContent className=" space-y-6 py-6 transition-transform">
                    <div className="flex flex-col items-start justify-between gap-4">
                      <h3 className="font-semibold">Selected Services</h3>
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className={cn("space-y-2 border-b pb-3")}
                      >
                        <div className="flex items-center gap-2">
                          <Avatar className="size-8 border border-primary/10">
                            <AvatarFallback
                              className={cn(
                                "bg-gradient-to-br text-white text-xs from-primary to-blue-500",
                              )}
                            >
                              ME
                            </AvatarFallback>
                          </Avatar>
                          <h3 className="text-lg font-bold text-gray-800">
                            ME
                          </h3>
                        </div>
                      </motion.div>

                      <div className="w-full space-y-3">
                        {totalPrice.bookingDetails.map((booking, idx) => {
                          const bookingIndex = bookings.findIndex(
                            (b) => b.serviceId === booking.bookingId,
                          );

                          const service = services.find(
                            (s) => s.id === booking.bookingId,
                          );

                          return (
                            <motion.div
                              key={booking.bookingId}
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: 0.4 + idx * 0.1 }}
                              className="flex w-full items-center justify-between rounded-md "
                            >
                              <div>
                                <h3 className="font-cormorant text-xl font-bold">
                                  {service?.name}{" "}
                                </h3>
                                <p className="font-lora text-sm font-normal text-gray-500">
                                  {formatMinutes(booking.totalDuration)}
                                </p>
                              </div>
                              <div className="flex items-center  gap-2">
                                <p className="space-x-1">
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
                            </motion.div>
                          );
                        })}
                      </div>
                    </div>
                    <motion.div
                      className="w-full space-y-2"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.5 }}
                    >
                      <div className="w-full border border-x-0 border-[#D9D9D9] py-3">
                        <span className="flex items-center justify-between text-sm">
                          <span>TAX</span>
                          <span>{toCurrency(12)}</span>
                        </span>
                      </div>
                      <div className="w-full ">
                        <span className="flex items-center justify-between">
                          <span className="text-sm">Total</span>
                          <span className="text-base font-bold text-primary">
                            {toCurrency(totalPrice.totalGroupPrice)}
                          </span>
                        </span>
                      </div>
                    </motion.div>
                  </CardContent>
                  <CardFooter>
                    <Button
                      disabled={!time || !date}
                      onClick={() => updateState({ step: step + 1 })}
                      className="h-[48px] w-full"
                    >
                      Continue
                      <motion.div
                        className="ml-2"
                        initial={{ x: 0 }}
                        whileHover={{ x: 5 }}
                        transition={{
                          type: "spring",
                          stiffness: 400,
                          damping: 10,
                        }}
                      >
                        <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                      </motion.div>
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            )}
          </motion.div>
        </div>

        {/* <div className=" fixed bottom-0 left-0 z-20 flex h-fit w-full items-end !py-0 transition-all animate-in md:hidden">
          <Card className="relative h-fit w-full animate-accordion-down rounded-none rounded-se-lg  rounded-ss-lg border p-0 shadow-lg transition-transform">
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
                      const bookingIndex = bookings.findIndex(
                        (b) => b.serviceId === booking.bookingId
                      );

                      const service = services.find(
                        (s) => s.id === booking.bookingId
                      );

                      return (
                        <div
                          key={booking.bookingId}
                          className="flex w-full items-center justify-between rounded-md "
                        >
                          <div>
                            <h3 className="font-cormorant text-xl font-bold">
                              {service?.name}{" "}
                            </h3>
                            <p className="font-lora text-sm font-normal text-gray-500">
                              {formatMinutes(booking.totalDuration)}
                            </p>
                          </div>
                          <div className="flex items-center  gap-2">
                            <p className="space-x-1">
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
       
          </Card>
        </div> */}
      </motion.section>
    </MotionConfig>
  );
};
