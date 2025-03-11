import { useEffect, useState } from "react";

import { durations } from "@/config/constants";
import { useIsMobile } from "@/hooks/use-mobile";
import { useBookingStore } from "@/lib/use-booking-store";
import { cn, toCurrency } from "@/lib/utils";
import { Service, StyleOption } from "@/types";

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
  const { bookings, addBooking, type, guests, currentGuestId } =
    useBookingStore();
  const [selectedVariations, setSelectedVariations] = useState<StyleOption[]>(
    []
  );

  const guest = guests.find((guest) => guest.id === currentGuestId);

  const bookingExists =
    type === "group"
      ? bookings
          .filter((book) => book.guestId === currentGuestId)
          .some((book) => book.serviceId === props.service.id)
      : bookings.some((book) => book.serviceId === props.service.id);

  const bookedService = bookings.find(
    (book) => book.serviceId === props.service.id
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

  const handleBooking = () => {
    if (type === "group") {
      addBooking({
        serviceId: props.service.id,
        stylist: null,
        status: "pending",
        styleOptionId: selectedStyleOption,
        guestId: currentGuestId,
        clientName: guest?.name,
      });
    } else {
      addBooking({
        serviceId: props.service.id,
        stylist: null,
        status: "pending",
        styleOptionId: selectedStyleOption,
      });
    }
    setOpenDialog(false);
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
        <DialogTrigger asChild>{props.trigger}</DialogTrigger>
        <DialogContent
          className="max-w-2xl !rounded-[12px] bg-white px-0 py-4"
          closeClassName="hidden"
        >
          <DialogHeader className="sticky left-0 top-0 w-full border border-x-0 border-t-0 px-6 py-2 pb-6">
            <DialogTitle>{props.service.name}</DialogTitle>
            <DialogDescription className="mb-4 mr-2 text-base">
              Prices exclude hair extensions but is inclusive of complimentary
              hair wash service and blow dry only. Additional fee will be
              applied for hair detangling service.
            </DialogDescription>
          </DialogHeader>
          <div className="px-6 py-2">
            <div></div>
            <div className="custom-scrollbar h-full max-h-[480px] space-y-8 overflow-y-scroll lg:max-h-[408px] xl:max-h-[750px]">
              {props.service.variations.length > 0 ||
                (props.service.style_options.length > 0 && (
                  <div className="space-y-2 pb-14">
                    <div>
                      <h3 className="text-lg font-semibold">
                        Select an option
                      </h3>
                    </div>

                    {step === 1 && props.service.style_options.length > 0 && (
                      <RadioGroup
                        className="gap-0"
                        onValueChange={(value) =>
                          handleSelectStyleOption(value)
                        }
                        defaultValue={selectedStyleOption}
                      >
                        {props.service.style_options.length > 0 &&
                          props.service.style_options.map((item, i) => (
                            <div
                              key={item.id}
                              className={cn(
                                "borber-b flex cursor-pointer items-center space-x-2 border border-x-0 border-t-0 px-2  py-5 hover:rounded-[12px] hover:bg-gray-100",
                                i === props.service.style_options.length - 1 &&
                                  "border-none"
                              )}
                            >
                              <RadioGroupItem
                                value={item.id}
                                className="size-5 border-gray-400 shadow-none"
                              />
                              <div className="flex w-full items-center justify-between space-y-2">
                                <div className="gap-0">
                                  <Label htmlFor="r1" className="text-base ">
                                    {item.name}
                                  </Label>
                                  <p className=" text-sm text-gray-500">
                                    {
                                      durations.find(
                                        (tr) => tr.value === item.duration
                                      )?.label
                                    }
                                  </p>
                                </div>
                                <h3>{toCurrency(item.price)}</h3>
                              </div>
                            </div>
                          ))}
                      </RadioGroup>
                    )}

                    {step === 2 && props.service.variations.length > 0 && (
                      <div className="space-y-2">
                        {props.service.variations.map((item, i) => (
                          <div
                            key={item.id}
                            className={cn(
                              "borber-b flex cursor-pointer items-center space-x-2 border border-x-0 border-t-0 px-2  py-5 hover:rounded-[12px] hover:bg-gray-100",
                              i === props.service.variations.length - 1 &&
                                "border-none"
                            )}
                          >
                            <Checkbox
                              checked={selectedVariations.includes(item)}
                              onChange={() => handleVariationChange(item)}
                              className="size-8"
                            />
                            <div className="flex w-full items-center justify-between space-y-2">
                              <div className="gap-0">
                                <Label htmlFor="r1" className="text-base ">
                                  {item.name}
                                </Label>
                                <p className=" text-sm text-gray-500">
                                  {
                                    durations.find(
                                      (tr) => tr.value === item.duration
                                    )?.label
                                  }
                                </p>
                              </div>
                              <h3>{toCurrency(item.price)}</h3>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
            </div>
          </div>
          <DialogFooter className="fixed bottom-0 left-0 flex w-full items-center justify-center rounded-[12px] bg-white px-6 py-3">
            <div className="flex w-full items-center justify-center">
              <Button
                onClick={handleBooking}
                className="h-[48px] w-full"
                disabled={
                  props.service.style_options.length > 0 &&
                  selectedStyleOption === ""
                }
              >
                Add to Booking
              </Button>
            </div>
          </DialogFooter>
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
          <div className="custom-scrollbar h-full space-y-8 overflow-y-scroll">
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
