import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";

import { durations } from "@/config/constants";
import { useBookingStore } from "@/lib/use-booking-store";
import { cn } from "@/lib/utils";
import {
  cardVariants,
  fadeInUp,
  itemVariants,
  titleVariants,
} from "@/lib/variants";
import { Service } from "@/types";

import { StaggerContainer } from "../shared/pages/steps/booking-step-two";
import { Button } from "../ui/button";
import { Checkbox } from "../ui/checkbox";
import {
  DialogHeader,
  DialogFooter,
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "../ui/dialog";
import { Label } from "../ui/label";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";

type Props = {
  trigger: React.ReactNode;
  service: Service;
  isAddon?: boolean;
  parentService: Service;
};
export const AddonServiceCard = (props: Props) => {
  const [step, setStep] = useState(0);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedStyleOption, setSelectedStyleOption] = useState<string>("");
  const { bookings, updateBooking, type, currentGuestId } = useBookingStore();
  const [selectedVariations, setSelectedVariations] = useState<string[]>([]);
  const [animateIn, setAnimateIn] = useState(false);
  const [serviceRef] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0, height: 0 },
    visible: {
      opacity: 1,
      height: "auto",
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
    exit: {
      opacity: 0,
      transition: { staggerChildren: 0.05 },
      height: 0,
    },
  };

  // Find the booked service
  const bookedService = bookings.find(
    (book) => book.serviceId === props.parentService.id,
  );

  const bookingExists =
    type === "group"
      ? bookings
          .filter((book) => book.guestId === currentGuestId)
          .some((book) => {
            // Check if the service ID is in the addons array
            if (book.addons?.includes(props.service.id)) {
              return true;
            }

            // Check if any style_option or variation ID is in the addons array
            const hasStyleOptionInAddons = props.service.style_options.some(
              (option) => book.addons?.includes(option.id),
            );
            const hasVariationInAddons = props.service.variations.some(
              (variation) => book.addons?.includes(variation.id),
            );

            return hasStyleOptionInAddons || hasVariationInAddons;
          })
      : bookings.some((book) => {
          // Check if the service ID is in the addons array
          if (book.addons?.includes(props.service.id)) {
            return true;
          }

          // Check if any style_option or variation ID is in the addons array
          const hasStyleOptionInAddons = props.service.style_options.some(
            (option) => book.addons?.includes(option.id),
          );
          const hasVariationInAddons = props.service.variations.some(
            (variation) => book.addons?.includes(variation.id),
          );

          return hasStyleOptionInAddons || hasVariationInAddons;
        });

  useEffect(() => {
    if (bookingExists && bookedService?.addons) {
      // Initialize selectedStyleOption and selectedVariations based on the addons array
      const styleOptionInAddons = props.service.style_options.find((option) =>
        bookedService.addons?.includes(option.id),
      );
      const variationsInAddons = props.service.variations.filter((variation) =>
        bookedService.addons?.includes(variation.id),
      );

      if (styleOptionInAddons) {
        setSelectedStyleOption(styleOptionInAddons.id);
      }
      if (variationsInAddons.length > 0) {
        setSelectedVariations(variationsInAddons.map((v) => v.id));
      }
    }
  }, [
    bookedService?.addons,
    bookingExists,
    props.service.style_options,
    props.service.variations,
  ]);

  useEffect(() => {
    if (
      !props.service.style_options.length &&
      props.service.variations.length > 0
    ) {
      setStep(2);
    } else if (
      !props.service.variations.length &&
      !props.service.style_options.length
    ) {
      setStep(0);
    } else {
      setStep(1);
    }
  }, [props.service.style_options.length, props.service.variations.length]);

  const handleSelectStyleOption = (option: string) => {
    setSelectedStyleOption(option); // Only one style can be selected
  };

  // Trigger animation when dialog opens
  useEffect(() => {
    if (openDialog) {
      // Slight delay before animation to ensure DOM is ready
      const timer = setTimeout(() => setAnimateIn(true), 100);
      return () => clearTimeout(timer);
    } else {
      setAnimateIn(false);
    }
  }, [openDialog]);

  const handleToggleAddon = () => {
    setAnimateIn(false);
    setTimeout(() => {
      const parentBookingIndex = bookings.findIndex(
        (booking) => booking.serviceId === bookedService?.serviceId,
      );

      if (parentBookingIndex === -1) return;

      const parentBooking = bookings[parentBookingIndex];
      // Get a copy of the existing addons array
      const existingAddons = [...(parentBooking.addons ?? [])];
      // Check if main service is already added as an addon

      // Leave all other services and their addons untouched
      const updatedAddons = existingAddons.filter((id) => {
        // Check if this ID belongs to the current service or its options/variations
        const isCurrentService = id === props.service.id;
        const isCurrentStyleOption = props.service.style_options.some(
          (option) => option.id === id,
        );
        const isCurrentVariation = props.service.variations.some(
          (variation) => variation.id === id,
        );

        // Keep everything EXCEPT items related to current service (we'll add back selected ones)
        return !(
          isCurrentService ||
          isCurrentStyleOption ||
          isCurrentVariation
        );
      });

      // Handle style options
      if (props.service.style_options.length > 0 && selectedStyleOption) {
        updatedAddons.push(selectedStyleOption);
      }

      // Handle variations
      if (
        props.service.variations.length > 0 &&
        selectedVariations.length > 0
      ) {
        selectedVariations.forEach((variationId) => {
          updatedAddons.push(variationId);
        });
      }

      // Handle simple add/remove of this service as an addon (if no style options or variations)
      if (
        !props.service.style_options.length &&
        !props.service.variations.length
      ) {
        const serviceIsAddon = existingAddons.includes(props.service.id);

        if (!serviceIsAddon) {
          // Only add if it wasn't already an addon
          updatedAddons.push(props.service.id);
        }
        // If it was an addon, we've already filtered it out, so effectively removing it
      }

      updateBooking(parentBookingIndex, { addons: updatedAddons });
      setOpenDialog(false);
    }, 500);
  };
  const clearStyles = (styleId: string) => {
    setAnimateIn(false);
    setTimeout(() => {
      const parentBookingIndex = bookings.findIndex(
        (booking) => booking.serviceId === bookedService?.serviceId,
      );

      if (parentBookingIndex === -1) return;

      const parentBooking = bookings[parentBookingIndex];

      // Just remove the specific style ID, don't touch other addons
      const updatedAddons = (parentBooking.addons ?? []).filter(
        (id) => id !== styleId,
      );

      // Reset the selected style option if it matches the one being cleared
      if (selectedStyleOption === styleId) {
        setSelectedStyleOption("");
      }

      updateBooking(parentBookingIndex, { addons: updatedAddons });
      setOpenDialog(false);
    }, 500);
  };

  const handleVariationChange = (variationId: string) => {
    // Update the local state for selected variations
    setSelectedVariations((prev) => {
      // Create new array to avoid mutation
      const updatedVariations = prev.includes(variationId)
        ? prev.filter((id) => id !== variationId) // Remove if already selected
        : [...prev, variationId]; // Add if not selected

      // Find the parent booking
      const parentBookingIndex = bookings.findIndex(
        (booking) => booking.serviceId === bookedService?.serviceId,
      );

      if (parentBookingIndex !== -1) {
        const parentBooking = bookings[parentBookingIndex];

        // Get the IDs of all variations for the current service
        const allVariationIds = props.service.variations.map((v) => v.id);

        // Remove all variations of THIS service, keep everything else
        const updatedAddons = (parentBooking.addons ?? []).filter(
          (id) => !allVariationIds.includes(id),
        );

        // Add back only the currently selected variations
        updatedVariations.forEach((varId) => {
          updatedAddons.push(varId);
        });

        // Update the booking with the new addons
        updateBooking(parentBookingIndex, { addons: updatedAddons });
      }

      return updatedVariations;
    });
  };

  return (
    <Dialog open={openDialog} onOpenChange={setOpenDialog}>
      <DialogTrigger asChild className="w-full">
        {props.trigger}
      </DialogTrigger>
      <DialogContent
        className="max-w-2xl !rounded-[12px] bg-white px-0 py-4"
        closeClassName="hidden"
      >
        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              initial="hidden"
              animate={animateIn ? "visible" : "hidden"}
              exit="exit"
              variants={containerVariants}
              className="relative size-full"
            >
              {/* Decorative elements */}
              <div className="absolute -right-16 -top-16 size-32 rounded-full bg-pink-100/30 blur-2xl"></div>
              <div className="absolute -left-16 -top-8 size-24 rounded-full bg-blue-100/40 blur-xl"></div>
              <div className="absolute -bottom-16 right-32 size-28 rounded-full bg-purple-100/30 blur-xl"></div>

              <DialogHeader className="sticky left-0 top-0 z-10 w-full border-b border-slate-100 bg-white/80 px-8 py-6 pb-12 backdrop-blur-md">
                <motion.div variants={itemVariants}>
                  <DialogTitle className="text-2xl font-medium text-slate-800">
                    {props.service.name}
                  </DialogTitle>
                </motion.div>
                <motion.div variants={itemVariants}>
                  <DialogDescription className="mt-2 text-base text-slate-600">
                    Prices shown are base prices only. Final pricing will be
                    negotiated upon your arrival at the salon based on hair
                    length, style complexity, and any additional requests.
                  </DialogDescription>
                </motion.div>
              </DialogHeader>
              <div className="px-6 py-2">
                <div></div>
                <div
                  className="custom-scrollbar max-h-[480px] space-y-8 overflow-y-scroll lg:max-h-[408px] xl:!max-h-[560px]"
                  ref={serviceRef}
                >
                  {(props.service.variations.length > 0 ||
                    props.service.style_options.length > 0) && (
                    <motion.div
                      key={`step-${step}`}
                      variants={fadeInUp}
                      transition={{ duration: 0.3 }}
                      className="space-y-4 pb-14"
                    >
                      <div>
                        <motion.div className="mb-3" variants={titleVariants}>
                          <h3 className="text-lg font-semibold text-slate-800">
                            Select Your Perfect Style
                          </h3>
                          <p className="text-sm text-slate-500">
                            Choose the option that best suits your desired look
                          </p>
                        </motion.div>
                        {selectedStyleOption &&
                          selectedVariations.length === 0 && (
                            <Button
                              onClick={() => clearStyles(selectedStyleOption)}
                            >
                              Clear Selection
                            </Button>
                          )}
                      </div>

                      {step === 1 && props.service.style_options.length > 0 && (
                        <RadioGroup
                          className="cursor-pointer gap-3"
                          onValueChange={(value) =>
                            handleSelectStyleOption(value)
                          }
                          value={selectedStyleOption}
                          defaultValue={selectedStyleOption}
                        >
                          <StaggerContainer className="flex flex-col gap-2">
                            {props.service.style_options.map((item, i) => (
                              <motion.div
                                key={item.id}
                                variants={cardVariants}
                                custom={i}
                                whileHover={{ scale: 1.01 }}
                                onClick={() => handleSelectStyleOption(item.id)}
                                className={cn(
                                  "group relative overflow-hidden cursor-pointer rounded-xl border border-slate-100 bg-white p-4 shadow-sm transition-all hover:border-pink-100 hover:shadow-md",
                                  selectedStyleOption.includes(item.id) &&
                                    "border-pink-200 bg-pink-50/30 shadow-md",
                                )}
                              >
                                {/* Decorative gradient overlay when selected */}
                                {selectedStyleOption.includes(item.id) && (
                                  <motion.div
                                    className="absolute inset-0 bg-gradient-to-r from-pink-100/20 to-purple-100/20 opacity-60"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 0.6 }}
                                    transition={{ duration: 0.8 }}
                                  />
                                )}

                                <div className="flex cursor-pointer items-center space-x-3">
                                  <RadioGroupItem
                                    value={item.id}
                                    className="size-5 border-pink-400 text-pink-500 shadow-none"
                                  />
                                  <div className="flex w-full items-center justify-between">
                                    <div className="flex flex-col gap-0.5">
                                      <Label
                                        htmlFor={item.id}
                                        className="text-base font-medium text-slate-700"
                                      >
                                        {item.name}
                                      </Label>
                                      <div className="flex items-center gap-2">
                                        <motion.div
                                          className="flex items-center rounded-full bg-slate-100 px-2 py-0.5 text-xs text-slate-600"
                                          whileHover={{ scale: 1.05 }}
                                        >
                                          <span className="mr-1 text-pink-500">
                                            ○
                                          </span>
                                          {
                                            durations.find(
                                              (tr) =>
                                                tr.value === item.duration,
                                            )?.label
                                          }
                                        </motion.div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </motion.div>
                            ))}
                          </StaggerContainer>
                        </RadioGroup>
                      )}

                      {step === 2 && props.service.variations.length > 0 && (
                        <div className="space-y-3">
                          {props.service.variations.map((item, i) => (
                            <motion.div
                              key={item.id}
                              variants={itemVariants}
                              custom={i}
                              whileHover={{ scale: 1.01 }}
                              onClick={() => handleVariationChange(item.id)}
                              className={cn(
                                "group relative cursor-pointer overflow-hidden rounded-xl border border-slate-100 bg-white p-4 shadow-sm transition-all hover:border-purple-100 hover:shadow-md",
                                selectedVariations.includes(item.id) &&
                                  "border-purple-200 bg-purple-50/30 shadow-md",
                              )}
                            >
                              {selectedVariations.includes(item.id) && (
                                <motion.div
                                  className="absolute inset-0 z-10 bg-gradient-to-r from-purple-100/20 to-blue-100/20 opacity-60"
                                  initial={{ opacity: 0 }}
                                  animate={{ opacity: 0.6 }}
                                  transition={{ duration: 0.8 }}
                                />
                              )}

                              <div className="relative z-50 flex cursor-pointer items-center space-x-3">
                                <Checkbox
                                  checked={selectedVariations.includes(item.id)}
                                  onCheckedChange={() =>
                                    handleVariationChange(item.id)
                                  }
                                  className="size-5 border-purple-400 text-purple-500"
                                />
                                <div className="flex w-full items-center justify-between">
                                  <div className="flex flex-col gap-0.5">
                                    <Label
                                      htmlFor={item.id}
                                      className="text-base font-medium text-slate-700"
                                    >
                                      {item.name}
                                    </Label>
                                    <div className="flex items-center gap-2">
                                      <motion.div
                                        className="flex items-center rounded-full bg-slate-100 px-2 py-0.5 text-xs text-slate-600"
                                        whileHover={{ scale: 1.05 }}
                                      >
                                        <span className="mr-1 text-purple-500">
                                          ○
                                        </span>
                                        {
                                          durations.find(
                                            (tr) => tr.value === item.duration,
                                          )?.label
                                        }
                                      </motion.div>
                                    </div>
                                  </div>
                                  {/* <h3 className="text-lg font-semibold text-slate-800">
                                      {toCurrency(item.price)}
                                    </h3> */}
                                </div>
                              </div>
                            </motion.div>
                          ))}
                        </div>
                      )}
                    </motion.div>
                  )}
                </div>
              </div>
              <DialogFooter className="fixed bottom-0 left-0 z-50 flex w-full items-center justify-center rounded-b-[12px] border-t border-slate-100 bg-white px-6 py-3">
                <motion.div
                  className="flex w-full items-center justify-center"
                  variants={itemVariants}
                >
                  <Button
                    onClick={handleToggleAddon}
                    className="h-[48px] w-full"
                    disabled={
                      props.service.style_options.length > 0 &&
                      selectedStyleOption === ""
                    }
                  >
                    <motion.span
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.2 }}
                    >
                      {bookedService ? "Update Booking" : "Add to Booking"}
                    </motion.span>{" "}
                  </Button>
                </motion.div>
              </DialogFooter>
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  );
};
