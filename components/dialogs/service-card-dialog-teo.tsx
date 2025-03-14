import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";

import { durations } from "@/config/constants";
import { useIsMobile } from "@/hooks/use-mobile";
import { useBookingStore } from "@/lib/use-booking-store";
import { cn, toCurrency } from "@/lib/utils";
import {
  cardVariants,
  fadeInUp,
  itemVariants,
  titleVariants,
} from "@/lib/variants";
import { Service, StyleOption } from "@/types";

import { StaggerContainer } from "../shared/pages/steps/booking-step-two";
import { Button } from "../ui/button";
import { Checkbox } from "../ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import {
  Drawer,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "../ui/drawer";
import { Label } from "../ui/label";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";

type Props = {
  trigger: React.ReactNode;
  service: Service;
};
export const ServiceCardDialog = (props: Props) => {
  const [step, setStep] = useState(0);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedStyleOption, setSelectedStyleOption] = useState<string>("");
  const { bookings, addBooking, updateBooking, type, guests, currentGuestId } =
    useBookingStore();
  const [selectedVariations, setSelectedVariations] = useState<StyleOption[]>(
    [],
  );
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

  // const itemVariants = {
  //   hidden: { opacity: 0, y: 20 },
  //   visible: {
  //     opacity: 1,
  //     y: 0,
  //     transition: {
  //       type: "spring",
  //       stiffness: 300,
  //       damping: 24,
  //     },
  //   },
  //   exit: { opacity: 0, y: -20 },
  // };

  const guest = guests.find((guest) => guest.id === currentGuestId);

  const bookingExists =
    type === "group"
      ? bookings
          .filter((book) => book.guestId === currentGuestId)
          .some((book) => book.serviceId === props.service.id)
      : bookings.some((book) => book.serviceId === props.service.id);

  const bookedService = bookings.find(
    (book) => book.serviceId === props.service.id,
  );

  useEffect(() => {
    if (bookingExists && bookedService?.styleOptionId) {
      setSelectedStyleOption(bookedService.styleOptionId);
    }
  }, [bookedService?.styleOptionId, bookingExists]);

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
    setSelectedStyleOption(option);
  };
  // Trigger animation when dialog opens
  useEffect(() => {
    if (openDialog) {
      setTimeout(() => setAnimateIn(true), 100);
    } else {
      setAnimateIn(false);
    }
  }, [openDialog]);

  const handleBooking = () => {
    // Create nice exit animation
    setAnimateIn(false);
    setTimeout(() => {
      if (type === "group") {
        if (bookedService) {
          updateBooking(
            bookings.findIndex(
              (book) => book.serviceId === bookedService.serviceId,
            ),
            {
              serviceId: props.service.id,
              stylist: null,
              status: "pending",
              styleOptionId: selectedStyleOption,
              guestId: currentGuestId,
              clientName: guest?.name,
            },
          );
        } else {
          addBooking({
            serviceId: props.service.id,
            stylist: null,
            status: "pending",
            styleOptionId: selectedStyleOption,
            guestId: currentGuestId,
            clientName: guest?.name,
          });
        }
      } else {
        if (bookedService) {
          updateBooking(
            bookings.findIndex(
              (book) => book.serviceId === bookedService.serviceId,
            ),
            {
              serviceId: props.service.id,
              stylist: null,
              status: "pending",
              styleOptionId: selectedStyleOption,
            },
          );
        } else {
          addBooking({
            serviceId: props.service.id,
            stylist: null,
            status: "pending",
            styleOptionId: selectedStyleOption,
          });
        }
      }
      setOpenDialog(false);
    }, 500);
  };
  const handleVariationChange = (variation: StyleOption) => {
    if (selectedVariations.includes(variation)) {
      setSelectedVariations(selectedVariations.filter((v) => v !== variation));
    } else {
      setSelectedVariations([...selectedVariations, variation]);
    }
  };

  // // useEffect to handle initial step setup
  // useEffect(() => {
  //   if(!props.service.variations)
  // }, [service.variations, service.style_options]);

  const isMobile = useIsMobile();

  if (!isMobile) {
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

                <DialogHeader className="sticky left-0 top-0 z-10 w-full border-b border-slate-100 bg-white/80 px-8 py-6 backdrop-blur-md">
                  <motion.div variants={itemVariants}>
                    <DialogTitle className="text-2xl font-medium text-slate-800">
                      {props.service.name}
                    </DialogTitle>
                  </motion.div>
                  <motion.div variants={itemVariants}>
                    <DialogDescription className="mt-2 text-base text-slate-600">
                      Prices exclude hair extensions but include our
                      complimentary hair wash service and blow dry.
                      <span className="mt-1 block text-sm font-medium text-pink-500">
                        Additional fees apply for hair detangling services.
                      </span>
                    </DialogDescription>
                  </motion.div>
                </DialogHeader>
                <div className="px-6 py-2">
                  <div></div>
                  <div
                    className="custom-scrollbar h-full max-h-[480px] space-y-8 overflow-y-scroll lg:max-h-[408px] xl:max-h-[750px]"
                    ref={serviceRef}
                  >
                    {props.service.variations.length > 0 ||
                      (props.service.style_options.length > 0 && (
                        <motion.div
                          key={`step-${step}`}
                          variants={fadeInUp}
                          transition={{ duration: 0.3 }}
                          className="space-y-4 pb-14"
                        >
                          <motion.div className="mb-3" variants={titleVariants}>
                            <h3 className="text-lg font-semibold text-slate-800">
                              Select Your Perfect Style
                            </h3>
                            <p className="text-sm text-slate-500">
                              Choose the option that best suits your desired
                              look
                            </p>
                          </motion.div>

                          {step === 1 &&
                            props.service.style_options.length > 0 && (
                              <RadioGroup
                                className="cursor-pointer gap-3"
                                onValueChange={(value) =>
                                  handleSelectStyleOption(value)
                                }
                                value={selectedStyleOption}
                                defaultValue={selectedStyleOption}
                              >
                                <StaggerContainer className="flex flex-col gap-2">
                                  {props.service.style_options.map(
                                    (item, i) => (
                                      <motion.div
                                        key={item.id}
                                        variants={cardVariants}
                                        custom={i}
                                        whileHover={{ scale: 1.01 }}
                                        onClick={() =>
                                          handleSelectStyleOption(item.id)
                                        }
                                        className={cn(
                                          "group relative overflow-hidden cursor-pointer rounded-xl border border-slate-100 bg-white p-4 shadow-sm transition-all hover:border-pink-100 hover:shadow-md",
                                          selectedStyleOption === item.id &&
                                            "border-pink-200 bg-pink-50/30 shadow-md",
                                        )}
                                      >
                                        {/* Decorative gradient overlay when selected */}
                                        {selectedStyleOption === item.id && (
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
                                                        tr.value ===
                                                        item.duration,
                                                    )?.label
                                                  }
                                                </motion.div>
                                              </div>
                                            </div>
                                            <h3 className="text-lg font-semibold text-slate-800">
                                              {toCurrency(item.price)}
                                            </h3>
                                          </div>
                                        </div>
                                      </motion.div>
                                    ),
                                  )}
                                </StaggerContainer>
                              </RadioGroup>
                            )}

                          {step === 2 &&
                            props.service.variations.length > 0 && (
                              <div className="space-y-3">
                                {props.service.variations.map((item, i) => (
                                  <motion.div
                                    key={item.id}
                                    variants={itemVariants}
                                    custom={i}
                                    whileHover={{ scale: 1.01 }}
                                    className={cn(
                                      "group relative overflow-hidden rounded-xl border border-slate-100 bg-white p-4 shadow-sm transition-all hover:border-purple-100 hover:shadow-md",
                                      selectedVariations.includes(item) &&
                                        "border-purple-200 bg-purple-50/30 shadow-md",
                                    )}
                                  >
                                    {selectedVariations.includes(item) && (
                                      <motion.div
                                        className="absolute inset-0 bg-gradient-to-r from-purple-100/20 to-blue-100/20 opacity-60"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 0.6 }}
                                        transition={{ duration: 0.8 }}
                                      />
                                    )}

                                    <div className="flex cursor-pointer items-center space-x-3">
                                      <Checkbox
                                        checked={selectedVariations.includes(
                                          item,
                                        )}
                                        onChange={() =>
                                          handleVariationChange(item)
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
                                                  (tr) =>
                                                    tr.value === item.duration,
                                                )?.label
                                              }
                                            </motion.div>
                                          </div>
                                        </div>
                                        <h3 className="text-lg font-semibold text-slate-800">
                                          {toCurrency(item.price)}
                                        </h3>
                                      </div>
                                    </div>
                                  </motion.div>
                                ))}
                              </div>
                            )}
                        </motion.div>
                      ))}
                  </div>
                </div>
                <DialogFooter className="fixed bottom-0 left-0 z-50 flex w-full items-center justify-center rounded-b-[12px] border-t border-slate-100 bg-white px-6 py-3">
                  <motion.div
                    className="flex w-full items-center justify-center"
                    variants={itemVariants}
                  >
                    <Button
                      onClick={handleBooking}
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
  }

  return (
    <Drawer open={openDialog} onOpenChange={setOpenDialog}>
      <DrawerTrigger>{props.trigger}</DrawerTrigger>
      <DrawerContent className="no-focus bg-white !p-0">
        <DrawerHeader className="sticky left-0 top-0 w-full border border-x-0 border-t-0 px-6 py-2 pb-6">
          <DrawerTitle>Braids Medium (Knotless Braids)</DrawerTitle>
        </DrawerHeader>
        <div className="px-6 py-2">
          <div></div>
          <div className="custom-scrollbar max-h-[450px] space-y-8 overflow-y-scroll bg-red-900">
            <div>
              <p className="mr-2 text-base">
                Prices exclude hair extensions but is inclusive of complimentary
                hair wash service and blow dry only. Additional fee will be
                applied for hair detangling service.
              </p>
            </div>
            <div className="space-y-2 pb-14">
              <h3 className="text-lg font-semibold">Select an option</h3>
              <RadioGroup className="gap-0">
                <div className="borber-b flex cursor-pointer items-center space-x-2 border border-x-0 border-t-0 px-2  py-5 hover:rounded-[12px] hover:bg-gray-100">
                  <RadioGroupItem
                    value="default"
                    id="r1"
                    className="size-5 border-gray-400 shadow-none"
                  />
                  <div className="flex w-full items-center justify-between space-y-2">
                    <div className="gap-0">
                      <Label htmlFor="r1" className="text-base ">
                        Bob
                      </Label>
                      <p className=" text-sm text-gray-500">3 hrs</p>
                    </div>
                    <h3>{toCurrency(120)}</h3>
                  </div>
                </div>
                <div className="borber-b flex cursor-pointer items-center space-x-2 border border-x-0 border-t-0 px-2  py-5 hover:rounded-[12px] hover:bg-gray-100">
                  <RadioGroupItem
                    value="LENGTH"
                    id="r1"
                    className="size-5 border-gray-400 shadow-none"
                  />
                  <div className="flex w-full items-center justify-between space-y-2">
                    <div className="gap-0">
                      <Label htmlFor="r1" className="text-base ">
                        Bob
                      </Label>
                      <p className=" text-sm text-gray-500">3 hrs</p>
                    </div>
                    <h3>{toCurrency(120)}</h3>
                  </div>
                </div>
                <div className="borber-b flex cursor-pointer items-center space-x-2 border border-x-0 border-t-0 px-2  py-5 hover:rounded-[12px] hover:bg-gray-100">
                  <RadioGroupItem
                    value="dfc"
                    id="r1"
                    className="size-5 border-gray-400 shadow-none"
                  />
                  <div className="flex w-full items-center justify-between space-y-2">
                    <div className="gap-0">
                      <Label htmlFor="r1" className="text-base ">
                        Bob
                      </Label>
                      <p className=" text-sm text-gray-500">3 hrs</p>
                    </div>
                    <h3>{toCurrency(120)}</h3>
                  </div>
                </div>
                <div className="borber-b flex cursor-pointer items-center space-x-2 border border-x-0 border-t-0 px-2  py-5 hover:rounded-[12px] hover:bg-gray-100">
                  <RadioGroupItem
                    value="fcv"
                    id="r1"
                    className="size-5 border-gray-400 shadow-none"
                  />
                  <div className="flex w-full items-center justify-between space-y-2">
                    <div className="gap-0">
                      <Label htmlFor="r1" className="text-base ">
                        Bob
                      </Label>
                      <p className=" text-sm text-gray-500">3 hrs</p>
                    </div>
                    <h3>{toCurrency(120)}</h3>
                  </div>
                </div>
                <div className="borber-none flex cursor-pointer items-center space-x-2  px-2  py-5 hover:rounded-[12px] hover:bg-gray-100">
                  <RadioGroupItem
                    value="dc"
                    id="r1"
                    className="size-5 border-gray-400 shadow-none"
                  />
                  <div className="flex w-full items-center justify-between space-y-2">
                    <div className="gap-0">
                      <Label htmlFor="r1" className="text-base ">
                        Bob
                      </Label>
                      <p className=" text-sm text-gray-500">3 hrs</p>
                    </div>
                    <h3>{toCurrency(120)}</h3>
                  </div>
                </div>
              </RadioGroup>
            </div>
          </div>
        </div>{" "}
        <DrawerFooter className="fixed bottom-0 left-0 flex w-full items-center justify-center rounded-[12px] border border-x-0 border-b-0 bg-white px-6 py-3">
          <Button className="relative flex self-center">Add to Booking</Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};
