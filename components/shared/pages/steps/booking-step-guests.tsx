"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { ChevronDown, Plus, UserCog } from "lucide-react";
import * as React from "react";
import { useFieldArray, useForm } from "react-hook-form";
import * as z from "zod";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
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
import { Category, Service } from "@/types";

import { CustomFormField } from "../../custom-form-field";

type Props = {
  services: Service[];
  categories: Category[];
};

export const BookingGroupStep = ({ services }: Props) => {
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

  const store = useBookingStore.getState();

  console.log(store);

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
    <section className="grid grid-cols-12 gap-6">
      <div className="col-span-8 space-y-3">
        <div>
          {/* <h1 className="mb-6 text-2xl font-bold">
            Add Guests to Your Booking
          </h1> */}
          {guests.length > 0 && (
            <div className="mb-8 space-y-3">
              {guests.map((guest) => (
                <div
                  key={guest.id}
                  className="flex w-full items-center justify-between gap-2 rounded-[12px] border bg-white px-6 py-4"
                >
                  <div className="flex items-center gap-2">
                    <Avatar>
                      <AvatarFallback className="bg-gray-100">
                        <UserCog className="size-5" />
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="text-base font-bold uppercase">
                        {guest.id === primaryGuestId ? "Me" : guest.name}
                      </h3>{" "}
                      <p>
                        {getGuestServiceCount(guest.id)}{" "}
                        {getGuestServiceCount(guest.id) > 1
                          ? "Services"
                          : "Service"}
                      </p>
                    </div>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger className="flex items-center rounded-full border px-3 py-1 text-base ">
                      Options <ChevronDown className="ms-2 size-4" />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuItem
                        className="cursor-pointer"
                        onSelect={() => handleEditServices(guest.id)}
                      >
                        Edit Services
                      </DropdownMenuItem>
                      {/* Only show Remove option for non-primary guests */}
                      {guest.id !== primaryGuestId && (
                        <DropdownMenuItem
                          className="cursor-pointer"
                          onSelect={() => handleRemoveGuest(guest.id)}
                        >
                          Remove Guest
                        </DropdownMenuItem>
                      )}{" "}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              ))}
            </div>
          )}
          {/* FORM TO ADD NEW GUEST */}
          <div className="mt-2 flex items-center justify-between">
            <Button
              type="button"
              variant={"outline"}
              onClick={() => {
                setShowForm(true);
              }}
              className="mb-2 flex items-center gap-1 text-primary"
            >
              <Plus className="size-4" /> Add Guest
            </Button>
          </div>
          {showForm && (
            <Card className="mb-6 p-6 shadow-none">
              <h2 className="mb-4 text-lg font-semibold">Add New Guest</h2>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                  {fields.map((field, index) => (
                    <div
                      key={field.id}
                      className="mb-4 space-y-3 rounded-[12px] border p-4"
                    >
                      {index > 0 && (
                        <Button type="button" onClick={() => remove(index)}>
                          Remove
                        </Button>
                      )}
                      <div className="flex items-center justify-between space-x-2">
                        <CustomFormField
                          control={form.control}
                          name={`guests.${index}.name`}
                          label="Name"
                          fieldType={FormFieldTypes.INPUT}
                          inputType="text"
                          placeholder="Guest Name "
                        />
                        <Button
                          type="submit"
                          className="ml-auto flex justify-end self-end"
                        >
                          Add Guest
                        </Button>
                      </div>
                    </div>
                  ))}
                </form>
              </Form>
            </Card>
          )}
        </div>
        {/* <Button variant={"outline"} className="rounded-full">
          <Plus /> Add guest
        </Button> */}
      </div>
      <div className="col-span-4">
        <Card className="relative h-fit w-full animate-accordion-down rounded-[12px]  border-none p-0 shadow-none transition-transform">
          {/* <CardHeader
            className={cn(
              "flex w-full flex-row items-center justify-between  pb-4 shadow-none outline-none"
            )}
          >
            <div>
              <h2 className="font-lora text-lg font-medium text-gray-500">
                {bookings.length} {bookings.length > 1 ? "services" : "service"}{" "}
                selected
              </h2>
              <p className="space-x-1">
                <span className="font-lora text-xl font-bold text-primary">
                  ${totalPrice.totalGroupPrice}
                </span>
              </p>
            </div>
          </CardHeader> */}
          <CardContent className=" py-6 transition-transform">
            <div className="flex flex-col items-start justify-between gap-4">
              <div className="w-full space-y-3">
                {guests.map((guest, i) => (
                  <div
                    key={guest.id}
                    className={cn(
                      "space-y-2 border-b pb-3",
                      guests.length - 1 === i && "!border-none !pb-0"
                    )}
                  >
                    <h3 className="text-lg font-bold">{guest.name}</h3>
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
                        .map((service) => (
                          <div
                            key={service.bookingId}
                            className="flex items-center justify-between"
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
                                    (dur) => dur.value === service.totalDuration
                                  )?.label
                                }
                              </p>
                            </div>
                            <div>
                              <span className="font-cormorant text-2xl font-bold text-primary">
                                {toCurrency(service.totalPrice)}
                              </span>
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>
                ))}
              </div>
              <div className="w-full space-y-2">
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
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button
              onClick={() => updateState({ step: step + 3 })}
              className="h-[48px] w-full"
            >
              Continue
            </Button>
          </CardFooter>
        </Card>
      </div>
    </section>
  );
};
