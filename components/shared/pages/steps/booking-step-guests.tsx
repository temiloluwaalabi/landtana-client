"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { AnimatePresence, MotionConfig, motion } from "framer-motion";
import {
  ArrowRight,
  Calendar,
  Check,
  ChevronDown,
  Scissors,
  Sparkles,
  UserPlus,
  Users,
  X,
} from "lucide-react";
import * as React from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { useInView } from "react-intersection-observer";
import * as z from "zod";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Form } from "@/components/ui/form";
import { durations } from "@/config/constants";
import { FormFieldTypes } from "@/config/enums";
import { useBookingStore } from "@/lib/use-booking-store";
import { calculateBookingDetails, cn, toCurrency } from "@/lib/utils";
import { GuestFormSchema } from "@/lib/validations/main-schema";
import { cardVariants } from "@/lib/variants";
import { Category, Service } from "@/types";

import { CustomFormField } from "../../custom-form-field";

type Props = {
  services: Service[];
  categories: Category[];
};

export const BookingGroupStep = ({ services }: Props) => {
  const { ref: guestsRef } = useInView({
    threshold: 0.1,
    triggerOnce: false,
  });
  const { ref: summaryRef, inView: summaryInView } = useInView({
    threshold: 0.1,
    triggerOnce: false,
  });
  const [showForm, setShowForm] = React.useState(false);
  const {
    bookings,
    addGuest,
    removeGuest,
    updateState,
    primaryGuestId,
    guests,
    step,
  } = useBookingStore();

  // const store = useBookingStore.getState();

  const totalPrice = calculateBookingDetails(bookings, services, services);

  const form = useForm<z.infer<typeof GuestFormSchema>>({
    resolver: zodResolver(GuestFormSchema),
    defaultValues: {
      guests: [
        {
          name: "",
        },
      ],
    },
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const { fields, remove } = useFieldArray({
    control: form.control,
    name: "guests",
  });

  const onSubmit = (values: z.infer<typeof GuestFormSchema>) => {
    const validGuests = values.guests.filter(
      (guest) => guest.name.trim() !== ""
    );

    validGuests.forEach((guest) => {
      const guestId = addGuest({
        name: guest.name,
      });

      updateState({
        currentGuestId: guestId,
        step: step + 1,
      });
    });

    form.reset({ guests: [{ name: "" }] });
  };

  React.useEffect(() => {
    if (guests.length > 0 && !primaryGuestId) {
      updateState({
        primaryGuestId: guests[0].id,
      });
    }
  }, [guests, primaryGuestId, updateState]);

  // Handle editing a guest's services
  const handleEditServices = (guestId: string) => {
    updateState({
      currentGuestId: guestId,
      step: step + 1,
    });
    // UPDATE STEP
  };

  // Handle removing a guest
  const handleRemoveGuest = (guestId: string) => {
    removeGuest(guestId);
  };

  // Get number of services for each guest
  const getGuestServiceCount = (guestId: string) => {
    return bookings.filter((booking) => booking.guestId === guestId).length;
  };

  return (
    <MotionConfig reducedMotion="user">
      <motion.section
        className="grid grid-cols-12 gap-6"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <motion.div
          ref={guestsRef}
          variants={fadeInUp}
          className="col-span-12 space-y-4 lg:col-span-8"
        >
          <motion.div
            className="mb-6 flex items-center space-x-3"
            variants={itemVariants}
          >
            <div className="rounded-full bg-primary/10 p-3">
              <Users className="size-6 text-primary" />
            </div>
            <div>
              <h2 className="font-lora text-lg font-medium text-gray-800 lg:text-2xl">
                Your Party
              </h2>
              <p className="text-xs text-gray-500 lg:text-base">
                Manage guests and their services. Book a group appointment for
                up to 4 guests. Select the services you need for each guest.
              </p>
            </div>
          </motion.div>

          <AnimatePresence>
            {guests.length > 0 && (
              <motion.div
                className="mb-8 space-y-4"
                variants={containerVariants}
              >
                {guests.map((guest, index) => (
                  <motion.div
                    key={guest.id}
                    variants={itemVariants}
                    initial="hidden"
                    animate="visible"
                    exit={{
                      opacity: 0,
                      y: -20,
                      transition: { duration: 0.2 },
                    }}
                    whileHover={{
                      y: -5,
                      boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)",
                    }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    className="relative overflow-hidden rounded-2xl border bg-white shadow-sm"
                  >
                    {/* Decorative accent */}
                    <div
                      className={cn(
                        "absolute left-0 top-0 h-full w-1",
                        index % 3 === 0
                          ? "bg-primary"
                          : index % 3 === 1
                            ? "bg-secondary"
                            : "bg-violet-500"
                      )}
                    />

                    <div className="flex flex-col items-start justify-between gap-4 p-5 pl-6 lg:flex-row lg:items-center">
                      <div className="flex items-center gap-4">
                        <Avatar className="size-12 border-2 border-primary/10 shadow-md lg:size-16">
                          <AvatarFallback
                            className={cn(
                              "bg-gradient-to-br text-white",
                              index % 3 === 0
                                ? "from-primary to-blue-500"
                                : index % 3 === 1
                                  ? "from-secondary to-pink-400"
                                  : "from-violet-500 to-purple-700"
                            )}
                          >
                            {guest.id === primaryGuestId
                              ? "ME"
                              : guest.name.substring(0, 2).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-col lg:flex-row">
                          <h3 className="flex items-center text-xl font-bold text-gray-800">
                            {guest.id === primaryGuestId ? "Me" : guest.name}
                            {guest.id === primaryGuestId && (
                              <motion.span
                                className="ml-2 flex items-center gap-1 rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary"
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.2 + index * 0.05 }}
                              >
                                <Sparkles className="size-3" />
                                Primary Guest
                              </motion.span>
                            )}
                          </h3>
                          <div className="mt-2 flex items-center">
                            <motion.span
                              className="mr-2 inline-flex size-6 items-center justify-center rounded-full bg-primary/10 text-xs font-medium text-primary"
                              initial={{ opacity: 0, scale: 0.8 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ delay: 0.3 + index * 0.05 }}
                            >
                              {getGuestServiceCount(guest.id)}
                            </motion.span>
                            <p className="text-sm text-gray-500">
                              {getGuestServiceCount(guest.id)}{" "}
                              {getGuestServiceCount(guest.id) === 1
                                ? "Service"
                                : "Services"}{" "}
                              Selected
                            </p>
                          </div>
                        </div>
                      </div>

                      <DropdownMenu>
                        <DropdownMenuTrigger className="flex items-center rounded-full border bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm transition-all hover:bg-gray-50">
                          Options <ChevronDown className="ms-2 size-4" />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                          <DropdownMenuItem
                            className="flex cursor-pointer items-center gap-2"
                            onSelect={() => handleEditServices(guest.id)}
                          >
                            <Scissors className="size-4" />
                            Edit Services
                          </DropdownMenuItem>
                          {/* Only show Remove option for non-primary guests */}
                          {guest.id !== primaryGuestId && (
                            <DropdownMenuItem
                              className="flex cursor-pointer items-center gap-2 text-red-500"
                              onSelect={() => handleRemoveGuest(guest.id)}
                            >
                              <X className="size-4" />
                              Remove Guest
                            </DropdownMenuItem>
                          )}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Add Guest Button */}
          <motion.div className="mt-4" variants={itemVariants}>
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                setShowForm(true);
              }}
              className="group h-auto rounded-full border-2 border-primary/20 px-6 py-3 font-medium text-primary transition-all duration-300 hover:border-primary/50 hover:bg-primary/5 hover:text-primary"
            >
              <div className="flex items-center gap-2">
                <div className="rounded-full bg-primary/10 p-2 transition-all duration-300 group-hover:bg-primary/20">
                  <UserPlus className="size-5" />
                </div>
                <span>Add Guest to Your Party</span>
              </div>
            </Button>
          </motion.div>

          {/* Add Guest Form */}
          <AnimatePresence>
            {showForm && (
              <motion.div
                initial={{ opacity: 0, height: 0, y: -20 }}
                animate={{ opacity: 1, height: "auto", y: 0 }}
                exit={{ opacity: 0, height: 0, y: -20 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
              >
                <Card className="mb-6 mt-4 overflow-hidden rounded-2xl border border-primary/10 p-6 shadow-md">
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                  >
                    <h2 className="mb-4 flex items-center gap-2 text-xl font-semibold">
                      <UserPlus className="size-5 text-primary" />
                      Add New Guest
                    </h2>
                    <Form {...form}>
                      <form onSubmit={form.handleSubmit(onSubmit)}>
                        {fields.map((field, index) => (
                          <motion.div
                            key={field.id}
                            className="mb-4 space-y-3 rounded-xl border border-gray-200 bg-gray-50/50 p-5"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                          >
                            {index > 0 && (
                              <Button
                                type="button"
                                variant="destructive"
                                className="mb-2"
                                onClick={() => remove(index)}
                              >
                                <X className="mr-1 size-4" /> Remove
                              </Button>
                            )}
                            <div className="flex flex-col gap-4 lg:flex-row lg:items-end">
                              <div className="flex-1">
                                <CustomFormField
                                  control={form.control}
                                  name={`guests.${index}.name`}
                                  label="Guest Name"
                                  fieldType={FormFieldTypes.INPUT}
                                  inputType="text"
                                  placeholder="Enter guest name"
                                />
                              </div>
                              <Button
                                type="submit"
                                className="bg-primary hover:bg-primary/90"
                              >
                                <Check className="mr-1 size-4" /> Add Guest
                              </Button>
                            </div>
                          </motion.div>
                        ))}
                      </form>
                    </Form>
                  </motion.div>
                </Card>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        <motion.div
          className="col-span-12 lg:col-span-4"
          variants={cardVariants}
        >
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
                    {bookings.length > 1 ? "services" : "service"} selected for{" "}
                    {guests.length} {guests.length > 1 ? "guests" : "guest"}
                  </p>
                  <div className="mt-2 font-lora text-3xl font-bold">
                    {toCurrency(totalPrice.totalGroupPrice)}
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
                          guests.length - 1 === i && "!border-none !pb-0"
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
                                    : "from-violet-500 to-purple-700"
                              )}
                            >
                              {guest.id === primaryGuestId
                                ? "ME"
                                : guest.name.substring(0, 2).toUpperCase()}
                            </AvatarFallback>
                          </Avatar>
                          <h3 className="text-lg font-bold text-gray-800">
                            {guest.id === primaryGuestId ? "Me" : guest.name}
                          </h3>
                        </div>

                        <div>
                          {totalPrice.bookingDetails.filter(
                            (book) => book.guestId === guest.id
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
                                          servicee.id === service.bookingId
                                      )?.name
                                    }
                                  </h3>
                                  <p className="font-lora text-sm font-normal text-gray-500">
                                    {
                                      durations.find(
                                        (dur) =>
                                          dur.value === service.totalDuration
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
                  onClick={() => updateState({ step: step + 3 })}
                  className="h-[48px] w-full"
                >
                  <span>Continue to Scheduling</span>
                  <motion.div
                    className="ml-2"
                    initial={{ x: 0 }}
                    whileHover={{ x: 5 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                  </motion.div>
                </Button>
              </CardFooter>
            </Card>
          </motion.div>
        </motion.div>
      </motion.section>
    </MotionConfig>
  );
};
