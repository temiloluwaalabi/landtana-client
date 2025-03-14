"use client";
import { AnimatePresence, motion } from "framer-motion";
import { Check, Plus, Search, X } from "lucide-react";
import * as React from "react";
import { useInView } from "react-intersection-observer";

import { AddonServiceCard } from "@/components/dialogs/addon-service-card-dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
// import { useIsMobile } from "@/hooks/use-mobile";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { durations } from "@/config/constants";
import { useBookingStore } from "@/lib/use-booking-store";
import { calculateBookingDetails, cn } from "@/lib/utils";
import { Service } from "@/types";

type Props = {
  services: Service[];
};

export const BookingStepThree = ({ services }: Props) => {
  const [openAccordionId, setOpenAccordionId] = React.useState<string | null>(
    null
  );
  const [searchTerm, setSearchTerm] = React.useState("");

  const { ref: servicesRef, inView: servicesInView } = useInView({
    threshold: 0.1,
    triggerOnce: false,
  });
  const { step, bookings, updateState, currentGuestId, type } =
    useBookingStore();

  const totalPrice = calculateBookingDetails(
    bookings,
    services,
    services.filter((serv) => serv.is_addon === true)
  );

  const mappedService =
    type === "group"
      ? totalPrice.bookingDetails.filter(
          (book) => book.guestId === currentGuestId
        )
      : totalPrice.bookingDetails;

  const filteredServices = services.filter((service) =>
    service.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="flex h-full flex-col"
    >
      <Tabs defaultValue="services">
        <TabsList className="mb-4 flex h-full justify-start space-x-6 lg:mb-8">
          <TabsTrigger
            value="services"
            asChild
            className="relative h-full rounded-full bg-gray-100 px-4 py-2 text-sm font-medium text-gray-600 data-[state=active]:bg-primary data-[state=active]:text-white lg:px-6 lg:py-3 lg:text-base"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              // className={`relative rounded-full px-4 py-2 font-medium ${activeSection === "services" ? "bg-primary text-white" : "bg-gray-100 text-gray-600"}`}
              // onClick={() => setActiveSection("services")}
            >
              Your Services
              {/* {activeSection === "services" && (
                <motion.div
                  layoutId="activePill"
                  className="absolute inset-0 -z-10 rounded-full bg-primary"
                />
              )} */}
            </motion.button>
          </TabsTrigger>
          <TabsTrigger
            value="stylist"
            asChild
            className="relative h-full rounded-full bg-gray-100 px-4 py-2 text-sm font-medium text-gray-600 data-[state=active]:bg-primary data-[state=active]:text-white lg:px-6 lg:py-3 lg:text-base"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              // className={`relative rounded-full px-4 py-2 font-medium ${activeSection === "stylist" ? "bg-primary text-white" : "bg-gray-100 text-gray-600"}`}
              // onClick={() => setActiveSection("stylist")}
            >
              Stylist Info
              {/* <motion.div
                layoutId="activePill"
                className="absolute inset-0 -z-10 rounded-full bg-primary"
              /> */}
            </motion.button>
          </TabsTrigger>
        </TabsList>
        <AnimatePresence mode="wait">
          <TabsContent value="services">
            <motion.div
              key="services"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.5 }}
              className="space-y-6"
            >
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="rounded-2xl border border-primary/20 bg-gradient-to-r from-[#E7FFE3] to-[#F0FFF0] px-6 py-3 text-sm font-medium text-primary shadow-sm lg:text-lg"
              >
                <div className="flex items-center gap-3">
                  <div className="rounded-full bg-primary/10 p-3">
                    <Check className="size-4 text-primary lg:size-6" />
                  </div>
                  <h3 className="text-xs lg:text-sm 2xl:text-base">
                    A stylist will be automatically assigned to you and
                    confirmation sent to your email and phone
                  </h3>
                </div>
              </motion.div>

              <motion.div
                ref={servicesRef}
                initial={{ opacity: 0, y: 20 }}
                animate={{
                  opacity: servicesInView ? 1 : 0,
                  y: servicesInView ? 0 : 20,
                }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="space-y-3"
              >
                <h2 className="flex items-center font-lora text-lg font-medium text-gray-700 lg:text-xl">
                  <span className="mr-2 inline-flex size-8 items-center justify-center rounded-full bg-primary/10 text-primary">
                    {mappedService.length}
                  </span>
                  {mappedService.length > 1 ? "Services" : "Service"} Selected
                </h2>

                <div className="w-full space-y-4">
                  {mappedService.map((booking, index) => {
                    const service = services.find(
                      (s) => s.id === booking.bookingId
                    );

                    return (
                      service && (
                        <motion.div
                          key={booking.bookingId}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.4, delay: index * 0.1 }}
                          className="w-full cursor-pointer overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition-all hover:shadow-md"
                        >
                          <div className="flex w-full items-center justify-between border-b border-gray-100 p-3 lg:p-5">
                            <div className="flex items-center gap-3">
                              <div className="rounded-xl bg-primary/10 p-3">
                                <motion.div
                                  initial={{ rotate: 0 }}
                                  animate={{ rotate: 360 }}
                                  transition={{
                                    duration: 0.8,
                                    delay: index * 0.2,
                                  }}
                                >
                                  {/* Icon based on service type could go here */}
                                  <Check className="size-4 text-primary lg:size-5" />
                                </motion.div>
                              </div>
                              <div>
                                <h3 className="font-cormorant text-base font-bold text-gray-800 md:text-lg lg:text-2xl">
                                  {service?.name}
                                </h3>
                                <p className="font-lora text-sm font-normal text-gray-500">
                                  {booking.addons?.length || 0} add-ons selected
                                </p>
                              </div>
                            </div>

                            <div className="flex items-center gap-4">
                              <p className="flex flex-col items-end">
                                <span className="text-sm text-gray-500">
                                  Price
                                </span>
                                <span className="font-cormorant text-lg font-bold text-primary lg:text-2xl">
                                  ${booking?.totalPrice}
                                </span>
                              </p>
                              <motion.div
                                whileHover={{ scale: 1.1, rotate: 90 }}
                                whileTap={{ scale: 0.9 }}
                              >
                                <Button
                                  onClick={() =>
                                    setOpenAccordionId((prev) =>
                                      prev === booking.bookingId
                                        ? null
                                        : booking.bookingId
                                    )
                                  }
                                  variant="outline"
                                  size="icon"
                                  className="size-10 rounded-full border-primary/30 text-primary"
                                >
                                  {openAccordionId === booking.bookingId ? (
                                    <X className="size-5" />
                                  ) : (
                                    <Plus className="size-5" />
                                  )}
                                </Button>
                              </motion.div>
                            </div>
                          </div>

                          <AnimatePresence>
                            {openAccordionId === booking.bookingId && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.3 }}
                                className="overflow-hidden"
                              >
                                <div className="space-y-4 px-5 py-4">
                                  <div className="relative">
                                    <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-gray-400" />
                                    <Input
                                      placeholder="Search add-on services"
                                      className="rounded-xl border-gray-200 pl-10 focus:border-primary focus:ring-primary"
                                      value={searchTerm}
                                      onChange={(e) =>
                                        setSearchTerm(e.target.value)
                                      }
                                    />
                                  </div>

                                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
                                    {filteredServices
                                      .filter(
                                        (serv) =>
                                          serv.is_addon === true &&
                                          serv.id !== booking.bookingId
                                      )
                                      .map((item, addonIndex) => {
                                        const parentService = services.find(
                                          (service) =>
                                            service.id === booking.bookingId
                                        );

                                        const isAddonBooked =
                                          type === "group"
                                            ? bookings
                                                .filter(
                                                  (book) =>
                                                    book.guestId ===
                                                    currentGuestId
                                                )
                                                .some((book) => {
                                                  // Check if the service ID is in the addons array
                                                  if (
                                                    book.addons?.includes(
                                                      item.id
                                                    )
                                                  ) {
                                                    return true;
                                                  }

                                                  // Check if any style_option or variation ID is in the addons array
                                                  const hasStyleOptionInAddons =
                                                    item.style_options.some(
                                                      (option) =>
                                                        book.addons?.includes(
                                                          option.id
                                                        )
                                                    );
                                                  const hasVariationInAddons =
                                                    item.variations.some(
                                                      (variation) =>
                                                        book.addons?.includes(
                                                          variation.id
                                                        )
                                                    );

                                                  return (
                                                    hasStyleOptionInAddons ||
                                                    hasVariationInAddons
                                                  );
                                                })
                                            : bookings.some((book) => {
                                                // Check if the service ID is in the addons array
                                                if (
                                                  book.addons?.includes(item.id)
                                                ) {
                                                  return true;
                                                }

                                                // Check if any style_option or variation ID is in the addons array
                                                const hasStyleOptionInAddons =
                                                  item.style_options.some(
                                                    (option) =>
                                                      book.addons?.includes(
                                                        option.id
                                                      )
                                                  );
                                                const hasVariationInAddons =
                                                  item.variations.some(
                                                    (variation) =>
                                                      book.addons?.includes(
                                                        variation.id
                                                      )
                                                  );

                                                return (
                                                  hasStyleOptionInAddons ||
                                                  hasVariationInAddons
                                                );
                                              });

                                        return (
                                          <AddonServiceCard
                                            parentService={
                                              parentService as Service
                                            }
                                            service={item}
                                            key={`${service.id}, addonInex ${addonIndex}`}
                                            trigger={
                                              <motion.div
                                                key={item.id}
                                                initial={{ opacity: 0, y: 15 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{
                                                  duration: 0.3,
                                                  delay: addonIndex * 0.05,
                                                }}
                                                whileHover={{
                                                  y: -5,
                                                  boxShadow:
                                                    "0 10px 25px -5px rgba(0, 0, 0, 0.1)",
                                                }}
                                                className={cn(
                                                  "flex flex-col justify-between rounded-xl border p-4 h-[120px] transition-all cursor-pointer",
                                                  isAddonBooked
                                                    ? "border-secondary/50 bg-secondary/5"
                                                    : "border-gray-200 hover:border-primary/30"
                                                )}
                                                // onClick={() =>
                                                //   handleToggleService(
                                                //     item.id,
                                                //     booking.bookingId
                                                //   )
                                                // }
                                              >
                                                <div className="space-y-2">
                                                  <div className="flex items-start justify-between">
                                                    <h6 className="font-cormorant text-base font-semibold text-gray-800 lg:text-lg 2xl:text-xl">
                                                      {item.name}
                                                    </h6>
                                                    {isAddonBooked && (
                                                      <motion.div
                                                        initial={{ scale: 0 }}
                                                        animate={{ scale: 1 }}
                                                        transition={{
                                                          type: "spring",
                                                          stiffness: 500,
                                                          damping: 15,
                                                        }}
                                                        className="rounded-full bg-secondary/10 p-1"
                                                      >
                                                        <Check className="size-4 text-secondary" />
                                                      </motion.div>
                                                    )}
                                                  </div>
                                                  <p className="text-left text-sm text-gray-500">
                                                    {
                                                      durations.find(
                                                        (dur) =>
                                                          dur.value ===
                                                          item.duration
                                                      )?.label
                                                    }
                                                  </p>
                                                </div>

                                                <div className="flex items-center justify-between">
                                                  <p className="space-x-1">
                                                    <span className="text-xs text-gray-400">
                                                      From
                                                    </span>
                                                    <span className="text-lg font-bold text-primary">
                                                      ${item.base_price}
                                                    </span>
                                                  </p>

                                                  {!isAddonBooked && (
                                                    <motion.div
                                                      whileHover={{
                                                        scale: 1.1,
                                                      }}
                                                      whileTap={{ scale: 0.9 }}
                                                    >
                                                      <div className="flex items-center text-sm font-medium text-secondary">
                                                        <Plus className="mr-1 size-4" />{" "}
                                                        Add
                                                      </div>
                                                    </motion.div>
                                                  )}
                                                </div>
                                              </motion.div>
                                            }
                                          />
                                        );
                                      })}
                                  </div>
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </motion.div>
                      )
                    );
                  })}
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                className="pt-4"
              >
                <Button
                  className="h-[56px] w-full rounded-xl text-sm font-medium shadow-lg shadow-primary/20 transition-all hover:shadow-primary/30 md:text-base lg:text-lg"
                  onClick={() => {
                    if (type === "group") {
                      updateState({ step: step - 2 });
                    } else {
                      updateState({ step: step + 1 });
                    }
                  }}
                >
                  <motion.span
                    initial={{ x: 0 }}
                    whileHover={{ x: 5 }}
                    className="flex items-center"
                  >
                    {type === "group" ? "Continue" : "Proceed to select date"}
                    <motion.svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="ml-2"
                    >
                      <path d="M5 12h14"></path>
                      <path d="m12 5 7 7-7 7"></path>
                    </motion.svg>
                  </motion.span>
                </Button>
              </motion.div>
            </motion.div>
          </TabsContent>
          <TabsContent value="stylist">
            <motion.div
              key="stylist"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.5 }}
              className="space-y-6 rounded-2xl border border-gray-100 bg-white p-6"
            >
              <div className="flex flex-col items-center justify-center space-y-4 text-center">
                <div className="mb-2 flex size-24 items-center justify-center rounded-full bg-primary/10">
                  <motion.div
                    animate={{
                      scale: [1, 1.1, 1],
                    }}
                    transition={{
                      repeat: Infinity,
                      duration: 2,
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="40"
                      height="40"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-primary"
                    >
                      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
                      <circle cx="9" cy="7" r="4"></circle>
                      <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
                      <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                    </svg>
                  </motion.div>
                </div>
                <div>
                  <h3 className="font-cormorant text-2xl font-bold text-gray-800">
                    Stylist Assignment
                  </h3>
                  <p className="mt-2 text-gray-600">
                    We&apos;ll match you with an available stylist based on your
                    selected services and schedule
                  </p>
                </div>

                <div className="mt-4 w-full max-w-md rounded-xl bg-gray-50 p-4 text-left">
                  <h4 className="mb-2 font-medium text-gray-800">
                    What to expect:
                  </h4>
                  <ul className="space-y-2">
                    <li className="flex items-center text-sm text-gray-600">
                      <Check className="mr-2 size-4 text-primary" />
                      Confirmation email with stylist details
                    </li>
                    <li className="flex items-center text-sm text-gray-600">
                      <Check className="mr-2 size-4 text-primary" />
                      SMS notification on the day of appointment
                    </li>
                    <li className="flex items-center text-sm text-gray-600">
                      <Check className="mr-2 size-4 text-primary" />
                      Opportunity to request a different stylist if needed
                    </li>
                  </ul>
                </div>

                {/* <Button
                  variant="outline"
                  className="mt-6 border-gray-200"
                  onClick={() => setActiveSection("services")}
                >
                  Back to Services
                </Button> */}
              </div>
            </motion.div>
          </TabsContent>
        </AnimatePresence>
      </Tabs>
      {/* <div className="mb-8 flex space-x-6">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={`relative rounded-full px-4 py-2 font-medium ${activeSection === "services" ? "bg-primary text-white" : "bg-gray-100 text-gray-600"}`}
          onClick={() => setActiveSection("services")}
        >
          Your Services
          {activeSection === "services" && (
            <motion.div
              layoutId="activePill"
              className="absolute inset-0 -z-10 rounded-full bg-primary"
            />
          )}
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={`relative rounded-full px-4 py-2 font-medium ${activeSection === "stylist" ? "bg-primary text-white" : "bg-gray-100 text-gray-600"}`}
          onClick={() => setActiveSection("stylist")}
        >
          Stylist Info
          {activeSection === "stylist" && (
            <motion.div
              layoutId="activePill"
              className="absolute inset-0 -z-10 rounded-full bg-primary"
            />
          )}
        </motion.button>
      </div> */}
    </motion.div>
  );
};
