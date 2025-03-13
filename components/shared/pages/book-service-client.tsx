/* eslint-disable no-unused-vars */
"use client";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ChevronUp, Minus, Sparkles, User } from "lucide-react";
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
// Subtle animated background pattern component
const AnimatedBackground = () => (
  <div className="absolute inset-0 -z-10 overflow-hidden opacity-10">
    <motion.div
      className="absolute inset-0"
      initial={{ backgroundPosition: "0% 0%" }}
      animate={{
        backgroundPosition: ["0% 0%", "100% 100%"],
      }}
      transition={{
        repeat: Infinity,
        repeatType: "mirror",
        duration: 20,
        ease: "linear",
      }}
      style={{
        backgroundImage:
          'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%239C92AC" fill-opacity="0.2"%3E%3Cpath d="M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
        backgroundSize: "60px 60px",
      }}
    />
  </div>
);
export const BookServiceClient = (props: Props) => {
  useSyncBookingState();
  // Add intersection observer for scroll animations
  // const [ref, inView] = useInView({
  //   triggerOnce: false,
  //   threshold: 0.1,
  // });

  // const controls = useAnimation();

  // React.useEffect(() => {
  //   if (inView) {
  //     controls.start("visible");
  //   }
  // }, [controls, inView]);
  const [hideDetails, setHideDetails] = React.useState(false);
  const { step, bookings, removeBooking, updateState, type, guests } =
    useBookingStore();

  const previousStep = step - 1;
  const sortedCategories = props.categories.sort((a, b) =>
    a.name.localeCompare(b.name)
  );
  const sortedServices = props.services.sort(
    (a, b) =>
      new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
  );
  const [animateIcon, setAnimateIcon] = React.useState(false);

  // Custom spring transition for smoother animations
  const springTransition = {
    type: "spring",
    stiffness: 120,
    damping: 16,
  };

  // Different transition for page changes
  const pageTransition = {
    type: "spring",
    stiffness: 100,
    damping: 20,
    duration: 0.5,
  };
  // Calculate total price
  const totalPrice = calculateBookingDetails(
    bookings,
    props.services,
    props.services
  );
  // Auto-animate icon occasionally
  React.useEffect(() => {
    const interval = setInterval(() => {
      setAnimateIcon(true);
      setTimeout(() => setAnimateIcon(false), 1500);
    }, 5000);
    return () => clearInterval(interval);
  }, []);
  // Updated navigation logic
  const handleNextStep = () => {
    if (type === "group") {
      updateState({ step: step + 1 });
    } else {
      // For individual, skip the group step
      updateState({ step: step + 1 });
    }
  };

  // Service Card with hover animations
  const ServiceCard = ({
    service,
    category,
    price,
    onRemove,
    guest,
  }: {
    service: string;
    category: string;
    price: string;
    onRemove: () => void;
    guest?: string | undefined;
  }) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [hovered, setHovered] = React.useState(false);

    return (
      <motion.div
        // initial={{ opacity: 0, y: 20 }}
        // animate={{ opacity: 1, y: 0 }}
        // exit={{ opacity: 0, scale: 0.95 }}
        whileHover={{
          scale: 1.02,
          boxShadow:
            "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)",
        }}
        className="relative w-full overflow-hidden rounded-xl border bg-white px-4 py-2 transition-all"
        onHoverStart={() => setHovered(true)}
        onHoverEnd={() => setHovered(false)}
      >
        {/* Background gradient that appears on hover */}
        {/* <motion.div
          className="absolute inset-0 rounded-xl bg-gradient-to-br from-primary/5 to-primary/10"
          initial={{ opacity: 0 }}
          animate={{ opacity: hovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        /> */}

        {guest && (
          <motion.div
            className="mb-2 flex w-fit items-center rounded-full bg-primary/10 px-3 py-1"
            whileHover={{ scale: 1.05 }}
          >
            <User className="mr-2 size-4 text-primary" />
            <span className="font-medium text-primary">{guest}</span>
          </motion.div>
        )}

        <div className="flex justify-between">
          <div className="relative z-10">
            <h3 className="font-cormorant text-2xl font-bold tracking-tight text-gray-900">
              {service}
            </h3>
            <p className="font-lora text-sm text-gray-500">{category}</p>
          </div>

          <div className="flex items-center gap-3">
            <span className="font-cormorant text-2xl font-bold text-primary">
              {price}
            </span>
            <motion.div whileTap={{ scale: 0.9 }}>
              <Button
                className="z-50 flex size-8 cursor-pointer items-center justify-center rounded-full border border-secondary bg-white text-secondary transition-colors hover:bg-secondary hover:text-white"
                onClick={onRemove}
              >
                <Minus className="size-3" />
              </Button>
            </motion.div>
          </div>
        </div>
      </motion.div>
    );
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
      <AnimatedBackground />
      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{
            opacity: 0,
            x: step > previousStep ? 50 : -50,
            filter: "blur(3px)",
          }}
          animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
          exit={{
            opacity: 0,
            x: step > previousStep ? -50 : 50,
            filter: "blur(3px)",
          }}
          transition={pageTransition}
          className="relative"
        >
          {/* Enhanced breadcrumb with decorative element */}
          <div className="relative mb-3">
            <motion.div
              className="absolute -left-4 top-0 h-full w-1 rounded-full bg-gradient-to-b from-secondary/80 to-secondary/20"
              initial={{ scaleY: 0 }}
              animate={{ scaleY: 1 }}
              transition={{ delay: 0.3, ...springTransition }}
            />
            <StepsBreadcrumbs />
          </div>
          <div className="mt-2 pb-28">
            <StepHeader
              currentStep={step}
              onGoBack={() => {
                if (type === "group" && step === 5) {
                  updateState({ step: 2 });
                } else {
                  updateState({ step: step - 1 });
                }
              }}
            />

            {/* Main content with staggered animations */}
            {renderStage()}
          </div>
        </motion.div>
      </AnimatePresence>

      {step === 2 ||
        (step === 3 && type === "group" && bookings.length > 0 && (
          <MaxWidthContainer
            innerClass="!px-0 lg:!px-[30px] 2xl:!px-[30px]"
            className="fixed bottom-0 !px-0 md:!px-[30px] lg:!px-[40px] 2xl:!px-[96px] left-0 z-50 flex w-full items-end !p-0 transition-all animate-in"
          >
            <motion.div
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={springTransition}
            >
              <Card className="relative !h-full animate-accordion-down rounded-none rounded-se-lg  rounded-ss-lg border p-0 shadow-lg transition-all">
                <CardHeader
                  className={cn(
                    "flex w-full flex-row items-center justify-between pb-4 shadow-none outline-none",
                    hideDetails && "border-b border-gray-100"
                  )}
                >
                  <div>
                    <motion.div
                      className="flex items-center gap-2"
                      whileHover={{ x: 3 }}
                    >
                      <Sparkles className="size-5 text-primary" />
                      <h2 className="font-lora text-xl font-bold text-gray-800">
                        {bookings.length}{" "}
                        {bookings.length > 1 ? "services" : "service"} selected
                      </h2>
                    </motion.div>
                    <p className="mt-1 flex items-baseline gap-1">
                      <span className="font-lora text-sm font-normal text-gray-500">
                        from
                      </span>
                      <motion.span
                        className="font-cormorant text-2xl font-bold text-primary"
                        // animate={{
                        //   scale: animateIcon ? [1, 1.1, 1] : 1,
                        // }}
                        transition={{ duration: 0.5 }}
                      >
                        ${totalPrice.totalGroupPrice}
                      </motion.span>
                    </p>
                  </div>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button
                      onClick={() => setHideDetails((prev) => !prev)}
                      className="flex items-center gap-1 rounded-full bg-gray-100 px-4 py-2 text-gray-700 hover:bg-primary"
                      variant="ghost"
                    >
                      Details
                      <motion.span animate={{ rotate: hideDetails ? 180 : 0 }}>
                        <ChevronUp className="size-4" />
                      </motion.span>
                    </Button>
                  </motion.div>
                </CardHeader>
                <AnimatePresence>
                  {hideDetails && (
                    <CardContent className=" py-6 transition-all">
                      <motion.div
                        className="flex flex-col items-start justify-between gap-4"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <h3 className="font-semibold">Selected Services</h3>
                        <div className="w-full space-y-3">
                          {totalPrice.bookingDetails.map((booking) => {
                            const service = props.services.find(
                              (s) => s.id === booking.bookingId
                            );
                            const bookingIndex = bookings.findIndex(
                              (b) => b.serviceId === booking.bookingId
                            );
                            const guest = booking.guestId
                              ? guests.find((g) => g.id === booking.guestId)
                                  ?.name
                              : null;
                            return (
                              <ServiceCard
                                key={booking.bookingId}
                                service={service?.name || ""}
                                category={
                                  props.categories.find(
                                    (cat) => cat.id === service?.category_id
                                  )?.name || ""
                                }
                                price={toCurrency(booking.totalPrice)}
                                onRemove={() => {
                                  if (bookingIndex !== -1) {
                                    removeBooking(bookingIndex);
                                  }
                                }}
                                guest={guest ?? undefined}
                              />
                            );
                          })}
                        </div>
                      </motion.div>
                    </CardContent>
                  )}
                </AnimatePresence>
                <CardFooter className="w-full">
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full"
                  >
                    <Button
                      onClick={handleNextStep}
                      className="relative flex h-[48px] w-full items-center gap-1 overflow-hidden"
                    >
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-primary via-primary/80 to-primary"
                        animate={{
                          x: ["-100%", "100%"],
                        }}
                        transition={{
                          repeat: Infinity,
                          repeatType: "mirror",
                          duration: 3,
                          ease: "easeInOut",
                        }}
                      />

                      <span className="relative z-10">
                        Continue to Next Step
                      </span>
                      <motion.span
                        className="relative z-10"
                        animate={{
                          x: animateIcon ? [0, 5, 0] : [0, 4, 0],
                        }}
                        transition={{
                          repeat: Infinity,
                          duration: 1.2,
                          ease: "easeInOut",
                        }}
                      >
                        <ArrowRight className="size-5" />
                      </motion.span>
                    </Button>
                  </motion.div>
                </CardFooter>
              </Card>
            </motion.div>
          </MaxWidthContainer>
        ))}
    </MaxWidthContainer>
  );
};
