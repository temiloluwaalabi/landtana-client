"use client";
import { ClockIcon, Plus, UserCog } from "lucide-react";
import React, { useState } from "react";

import { ServiceCardDialog } from "@/components/dialogs/service-card-dialog";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
// import { useIsMobile } from "@/hooks/use-mobile";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { durations } from "@/config/constants";
import { useBookingStore } from "@/lib/use-booking-store";
import { cn } from "@/lib/utils";
import { Category, Service } from "@/types";

type Props = {
  services: Service[];
  categories: Category[];
};

export const BookingStepTwo = (props: Props) => {
  const [selectedCategory, setSelectedCategory] = useState<string>(
    "b15bd255-537b-4738-bb98-74938098599d"
  );
  const { bookings, currentGuestId, primaryGuestId, guests, type } =
    useBookingStore();

  console.log("currentUser", currentGuestId);
  console.log("primaryUser", primaryGuestId);

  const renderServiceCard = (service: Service) => {
    // const isSelected = selectedServices.includes(service.id);
    const isBooked =
      type === "group"
        ? bookings.some(
            (booking) =>
              booking.serviceId === service.id &&
              booking.guestId === currentGuestId
          )
        : bookings.some((booking) => booking.serviceId === service.id);
    return (
      <ServiceCardDialog
        service={service}
        key={service.id}
        trigger={
          <div
            key={service.id}
            className={cn(
              "flex h-[130px] transition-all items-center justify-between rounded-[8px] border hover:bg-white cursor-pointer border-[#D9D9D9] p-6",
              isBooked && "border-secondary bg-white"
            )}
          >
            <div className="flex flex-col items-start space-y-4">
              <div className="flex flex-col items-start">
                <h6 className="font-cormorant text-xl font-semibold text-black">
                  {service.name}
                </h6>
                <div className="flex items-center space-x-2 text-sm text-gray-500">
                  <ClockIcon className="size-4" />
                  <span>
                    {
                      durations.find((dur) => dur.value === service.duration)
                        ?.label
                    }
                  </span>
                </div>
              </div>
              <p className="space-x-1">
                <span className="text-sm text-gray-400">From</span>
                <span className="text-base font-bold text-primary">
                  ${service.base_price}
                </span>
              </p>
            </div>
            {isBooked ? (
              <Checkbox
                className="!size-10 rounded-[8px] !border-none shadow-none data-[state=checked]:bg-[#FFEBEE] data-[state=checked]:text-secondary"
                checked={isBooked}
                // onCheckedChange={() => handleToggleService(service)}
                checkClassName="size-[32px]"
              />
            ) : (
              <Button
                // onClick={() => handleToggleService(service)}
                size={"icon"}
                className="!bg-white text-secondary shadow-none"
              >
                <Plus />
              </Button>
            )}
          </div>
        }
      />
    );
  };

  return (
    <div className="flex h-full flex-col gap-6 ">
      {type === "group" && (
        <div className="flex w-fit items-center gap-2 rounded-md border bg-white px-3 py-1">
          <Avatar>
            <AvatarFallback className="bg-gray-100">
              <UserCog className="size-5" />
            </AvatarFallback>
          </Avatar>
          <div>
            <h3 className="text-base font-bold uppercase">
              {currentGuestId === primaryGuestId
                ? "Me"
                : guests.find((guest) => guest.id === currentGuestId)?.name}
            </h3>{" "}
          </div>
        </div>
      )}
      <div className="grid grid-cols-12 gap-10">
        <aside className="hidden h-fit flex-col space-y-3 rounded-md p-0 lg:col-span-3 lg:flex">
          {props.categories.map((category) => (
            <Button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={cn(
                "flex h-[40px] w-full items-center bg-primary/10 text-primary hover:text-white  justify-between rounded-[16px] px-[16px] py-[8px]",
                selectedCategory === category.id && "bg-primary text-white"
              )}
            >
              <span className="text-base font-normal">{category.name}</span>{" "}
              <div className="flex size-6 items-center justify-center rounded-full bg-[#e2f5e8] text-primary">
                {
                  props.services.filter(
                    (service) => service.category_id === category.id
                  ).length
                }
              </div>
            </Button>
          ))}
        </aside>
        <div className="col-span-12 lg:col-span-9">
          <div className="space-y-4">
            <Tabs className="w-full" defaultValue="knotless-braids">
              <TabsList className="size-full flex-wrap justify-start gap-2 bg-transparent p-0">
                <TabsTrigger
                  value="knotless-braids"
                  className="data-[state=active]:bg-primary data-[state=active]:text-white"
                >
                  Knotless Braids
                </TabsTrigger>
                <TabsTrigger value="locs">Locs</TabsTrigger>
                <TabsTrigger value="twist">Twist</TabsTrigger>
                <TabsTrigger value="box-braids">Box Braids</TabsTrigger>

                <TabsTrigger value="other-braids">Other Braids</TabsTrigger>
                <TabsTrigger value="corn-rows">Corn rows</TabsTrigger>
                <TabsTrigger value="other-services">Other Services</TabsTrigger>
              </TabsList>
            </Tabs>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
              {props.services
                .filter(
                  (service) =>
                    !selectedCategory ||
                    service.category_id === selectedCategory
                )
                .map(renderServiceCard)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
