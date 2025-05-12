"use client";
import { format, formatDate, parse } from "date-fns";
import { MotionConfig, motion } from "framer-motion";
import {
  ArrowRight,
  Calendar,
  Clock,
  Loader2,
  Minus,
  Plus,
} from "lucide-react";
import { useRouter } from "next/navigation";
import * as React from "react";
import { useInView } from "react-intersection-observer";
import { toast } from "sonner";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { allRoutes } from "@/config/routes";
import useSession from "@/hooks/use-session";
import { useCreateBooking } from "@/lib/query/booking.service";
import { useBookingStore } from "@/lib/use-booking-store";
import {
  calculateBookingDetails,
  cn,
  formatDayDate,
  formatMinutes,
  toCurrency,
} from "@/lib/utils";
import { CreateBookingSchemaType } from "@/lib/validations/main-schema";
import { cardVariants } from "@/lib/variants";
import { Service } from "@/types";

import DateSelectionStep from "../../booking/date-selection-comp";

type Props = {
  services: Service[];
};

export const BookingStepFour = ({ services }: Props) => {
  const { mutateAsync, isPending } = useCreateBooking();
  const { session } = useSession();
  const router = useRouter();
  const { ref: summaryRef, inView: summaryInView } = useInView({
    threshold: 0.1,
    triggerOnce: false,
  });
  const [openAccordionId, setOpenAccordionId] = React.useState<boolean>(true);
  // const [hideDetails, setHideDetails] = React.useState(false);

  const { bookings, primaryGuestId, removeBooking, date, time, guests, type } =
    useBookingStore();

  console.log("Bookings", bookings);

  const totalPrice = calculateBookingDetails(bookings, services, services);
  console.log("TotalPrice", totalPrice);

  const getAddonDetails = (booking: {
    bookingId: string;
    guestId?: string; // Make guestId optional here
    totalPrice: number;
    totalDuration: number;
    addons: string[];
  }) => {
    if (!booking.addons || booking.addons.length === 0) {
      return [];
    }

    const addonDetails = booking.addons.map((addonId) => {
      let foundAddon = null;
      let type = null;

      for (const service of services) {
        if (service.id === addonId) {
          foundAddon = service;
          type = "service";
          break;
        }

        const styleOption = service.style_options.find(
          (opt) => opt.id === addonId,
        );

        if (styleOption) {
          foundAddon = styleOption;
          type = "style_option";
          break;
        }

        const variation = service.variations.find(
          (variation) => variation.id === addonId,
        );
        if (variation) {
          foundAddon = variation;
          type = "variation";
          break;
        }
      }
      return {
        id: addonId,
        type,
        details: foundAddon,
        parentService:
          type !== "service" && foundAddon
            ? services.find(
                (s) =>
                  s.style_options.some((o) => o.id === addonId) ||
                  s.variations.some((v) => v.id === addonId),
              )
            : null,
      };
    });
    return addonDetails;
  };

  const serviceSummaries = bookings.map((booking) => {
    const service = services.find((s) => s.id === booking.serviceId);
    if (!service) return "";

    const parts: string[] = [];

    parts.push(`Service: ${service.name}`);

    if (booking.styleOptionId) {
      const styleOption = service.style_options.find(
        (opt) => opt.id === booking.styleOptionId,
      );
      if (styleOption) {
        parts.push(`Style Option: ${styleOption.name}`);
      }
    }

    if (booking.variationId) {
      const variation = service.variations.find(
        (v) => v.id === booking.variationId,
      );
      if (variation) {
        parts.push(`Variation: ${variation.name}`);
      }
    }

    // We'll deal with addons later, once clarified

    return parts.join(" — ");
  });

  // Combine into a note
  const finalNotes = [bookings[0]?.notes, ...serviceSummaries]
    .filter(Boolean)
    .join("\n");
  const showConfetti = async () => {
    const confetti = (await import("canvas-confetti")).default;

    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
    });
  };
  const handleSubmitBooking = async () => {
    if (!date || !time) {
      toast.error("Please select a date and time");
      return;
    }
    const isGroup = type === "group";

    const hostBookings = bookings.filter((b) => b.guestId === primaryGuestId);

    const hostBooking = bookings.find((b) => b.guestId === primaryGuestId);

    // const guestBookings = bookings.filter((b) => b.guestId !== primaryGuestId);

    // Style option (choose host’s if group, or first available)
    const styleOptionId =
      type === "group"
        ? hostBooking?.styleOptionId
        : bookings.find((b) => b.styleOptionId)?.styleOptionId;

    let serIds = [];
    // For non-group, just send service_id directly
    if (!isGroup) {
      // For individual, include all serviceIds and their addons
      serIds = bookings.flatMap((b) => [b.serviceId, ...(b.addons || [])]);
    } else {
      // For group, include only host services and addons
      serIds = hostBookings.flatMap((b) => [b.serviceId, ...(b.addons || [])]);
    }
    const bookingValue: CreateBookingSchemaType = {
      service_id: serIds,
      date: formatDate(new Date(date), "yyyy-MM-dd"),
      time: format(parse(time, "h:mm a", new Date()), "HH:mm"),
      price: totalPrice.totalGroupPrice.toString(),
      style_options: styleOptionId || "",
      variations: bookings
        .map((b) => b.variationId)
        .filter(Boolean) as string[],
      group_size: isGroup ? guests.length : undefined,
      is_group: type === "group",
      duration: totalPrice.totalGroupDuration.toString(),
      group_members: isGroup
        ? guests
            .filter((b) => b.id)
            .map((b) => ({
              name: b.name || "Guest",
              email: session.email || "",
              contact: "+12025550173",
              service_ids: [
                bookings.find((boo) => boo.guestId === b.id)?.serviceId || "",
              ],
            }))
        : [],
      additional_notes: finalNotes,
    };

    console.log("Submitting booking:", bookingValue);

    await mutateAsync(bookingValue, {
      onSuccess: () => {
        showConfetti();
        toast("Booking successfully created", {
          description: "Redirecting to Dashboard",
        });
        router.push(allRoutes.bookings.url);
      },
    });

    // console.log(bookingValue);
  };

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
                                .map((service, idx) => {
                                  // const bookingIndex = bookings.findIndex(
                                  //   (b) => b.serviceId === service.bookingId
                                  // );

                                  const addonDetails = getAddonDetails(service);

                                  const serviceD = services.find(
                                    (s) => s.id === service.bookingId,
                                  );

                                  return (
                                    <motion.div
                                      key={service.bookingId}
                                      className="group flex items-start justify-between"
                                      initial={{ opacity: 0, x: -10 }}
                                      animate={{ opacity: 1, x: 0 }}
                                      transition={{ delay: 0.4 + idx * 0.1 }}
                                    >
                                      <div>
                                        <h3 className="font-cormorant text-lg font-bold">
                                          {serviceD?.name}{" "}
                                        </h3>
                                        <p className="font-lora text-sm font-normal text-gray-500">
                                          {formatMinutes(service.totalDuration)}
                                        </p>

                                        {addonDetails.length > 0 && (
                                          <div className="mt-2 space-y-1">
                                            <h4 className="font-cormorant text-sm font-medium">
                                              Add-ons:
                                            </h4>
                                            {addonDetails.map((addon) => (
                                              <p
                                                key={addon.id}
                                                className="font-lora text-sm font-normal text-gray-500"
                                              >
                                                <b>
                                                  {addon.parentService?.name}{" "}
                                                  -{" "}
                                                </b>
                                                {addon.details?.name ||
                                                  "Unknown Add-on"}
                                              </p>
                                            ))}
                                          </div>
                                        )}
                                      </div>
                                      <div>
                                        <span className="font-cormorant text-2xl font-bold text-primary">
                                          {toCurrency(service.totalPrice)}
                                        </span>
                                      </div>
                                    </motion.div>
                                  );
                                })}
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
                      disabled={!time || !date || isPending}
                      onClick={handleSubmitBooking}
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
                        {}
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

                          const addonDetails = getAddonDetails(booking);

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

                                {addonDetails.length > 0 && (
                                  <div className="mt-2 space-y-1">
                                    <h4 className="font-cormorant text-sm font-medium">
                                      Add-ons:
                                    </h4>
                                    {addonDetails.map((addon) => (
                                      <p
                                        key={addon.id}
                                        className="font-lora text-sm font-normal text-gray-500"
                                      >
                                        <b>{addon.parentService?.name} - </b>
                                        {addon.details?.name ||
                                          "Unknown Add-on"}
                                      </p>
                                    ))}
                                  </div>
                                )}
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
                      disabled={!time || !date || isPending}
                      onClick={handleSubmitBooking}
                      className="flex h-[48px] w-full items-center "
                    >
                      {isPending && (
                        <Loader2 className="me-2 size-4 animate-spin" />
                      )}
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
      </motion.section>
    </MotionConfig>
  );
};
