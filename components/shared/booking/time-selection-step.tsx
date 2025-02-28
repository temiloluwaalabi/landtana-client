/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";

import { format, parse } from "date-fns";
import { ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { sampleAvailabilityData } from "@/config/constants";
import { Booking, Service, useBookingStore } from "@/lib/use-booking-store";
import { cn } from "@/lib/utils";
import { AvailabilityResponse, TimeSlot } from "@/types";

import { addonList } from "../pages/steps/booking-step-three";
import { servicesList } from "../pages/steps/booking-step-two";

export const calculateTotalDuration = (
  bookings: Booking[],
  serviceList: Service[],
  addonList: Service[],
): number => {
  let totalDuration = 0;

  bookings.forEach((booking) => {
    const mainService = serviceList.find((s) => s.id === booking.serviceId);
    if (mainService) {
      totalDuration += 60;
    }

    if (booking.addons) {
      booking.addons.forEach((addonId) => {
        const addonService = addonList.find((s) => s.id === addonId);
        if (addonService) {
          totalDuration += 12;
        }
      });
    }
  });

  return totalDuration;
};
export const calculateTotalPrice = (
  bookings: Booking[],
  serviceList: Service[],
  addonList: Service[],
): number => {
  let totalPrice = 0;

  bookings.forEach((booking) => {
    const mainService = serviceList.find((s) => s.id === booking.serviceId);
    if (mainService) {
      totalPrice += mainService.price;
    }

    if (booking.addons) {
      booking.addons.forEach((addonId) => {
        const addonService = addonList.find((s) => s.id === addonId);
        if (addonService) {
          totalPrice += addonService.price;
        }
      });
    }
  });

  return totalPrice;
};

interface SchedulerConfig {
  slotDuration: number; // in minutes
  minStartInterval: number; // minimum minutes between slot starts (20 or 25)
  maxSlotsPerHour: number; // maximum slots that can start in an hour
  maxSlotsPerPeriod: number; // maximum slots to return per period when "anytime" is selected
  maxSlotsPerDay: number; // maximum total slots per day
  buffer: number;
}

interface TimeSelectionStepProps {
  onNext: () => void;
  onBack: () => void;
}

export default function TimeSelectionStep({
  onNext,
  onBack,
}: TimeSelectionStepProps) {
  const [availabilityData, setAvailabilityData] =
    useState<AvailabilityResponse>();
  const [loading, setLoading] = useState(true);
  const { bookings, date, time, updateState } = useBookingStore();
  //   const { updateBookingStep } = useSyncUrlState();
  const [showStylistSelector, setShowStylistSelector] = useState(false);
  const [selectedStylist, setSelectedStylist] = useState<string | null>(null);

  const selectedDate = date;

  const convertTo24Hour = (timeStr: string): string => {
    const [time, modifier] = timeStr.split(" ");
    let [hours, minutes] = time.split(":");

    if (hours === "12") {
      hours = modifier === "AM" ? "00" : "12";
    } else if (modifier === "PM") {
      hours = String(parseInt(hours, 10) + 12);
    }

    return `${hours.padStart(2, "0")}:${minutes}`;
  };
  const parseTime = (timeStr: string): Date => {
    const cleanTimeStr = timeStr
      .replace(/\s+PM/, " PM")
      .replace(/\s+AM/, " AM");
    const [time, modifier] = cleanTimeStr.split(" ");
    const [hours, minutes] = time.split(":");
    let hour = parseInt(hours, 10);

    if (modifier) {
      if (modifier === "PM" && hour < 12) hour += 12;
      if (modifier === "AM" && hour === 12) hour = 0;
    }

    const date = new Date();
    date.setHours(hour, parseInt(minutes, 10), 0, 0);
    return date;
  };

  const formatTime = (date: Date): string => {
    let hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12;
    hours = hours || 12;
    return `${hours}:${minutes.toString().padStart(2, "0")} ${ampm}`;
  };

  // const convertTo12Hour = (timeStr: string): string => {
  //   const [hours, minutes] = timeStr.split(":");
  //   const hour = parseInt(hours, 10);
  //   const ampm = hour >= 12 ? "PM" : "AM";
  //   const hour12 = hour % 12 || 12;
  //   return `${hour12}:${minutes} ${ampm}`;
  // };

  const totalDuration = bookings
    ? calculateTotalDuration(bookings, servicesList, addonList)
    : 0;
  // Site settings (opening time, closing time, break time)
  const openingTime = "09:00";
  const closingTime = "17:00";
  const breakTime = { start: "12:00", end: "13:00" };
  useEffect(() => {
    const getTimeSlots = async () => {
      setLoading(true);
      try {
        // In a real implementation, you would fetch from API
        // const data = await fetchTimeSlots(selectedService, selectedProfessional, selectedDate);

        // Using mock data for now
        setAvailabilityData(sampleAvailabilityData);
      } catch (error) {
        console.error("Failed to fetch time slots:", error);
      } finally {
        setLoading(false);
      }
    };

    if (selectedDate) {
      getTimeSlots();
    }
  }, [selectedDate]);

  const handleTimeSelect = (time: string, endTime: string) => {
    if (!selectedDate) return;
    // Update the booking with the selected time
    updateState({
      time: `${time}-${endTime}`,
    });

    // setTime(time);
    // updateBookingStep({ time });

    const dateString = format(selectedDate, "yyyy-MM-dd");
    const dateData = availabilityData?.dates[dateString];
    // If this date requires stylist selection, show that interface
    if (
      dateData?.message === "Choose other available staff" &&
      dateData?.stylists &&
      dateData.stylists.length > 0
    ) {
      setShowStylistSelector(true);
    } else {
      onNext();
    }
  };

  const handleStylistSelect = (stylistId: string) => {
    setSelectedStylist(stylistId);
    // Update the booking with the selected stylist
    // updateBooking(
    //   bookings.findIndex((b) => b.serviceId === serviceId),
    //   { stylist: stylistId }
    // );
    // updateBookingStep({ stylist: stylistId });
    onNext();
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return "";
    const date = parse(dateString, "yyyy-MM-dd", new Date());
    return format(date, "MMMM d, yyyy");
  };

  const isDateAvailabe = (
    bookedSlots: TimeSlot[] | undefined,
    totalDuration: number,
    selectedDate: Date,
    openingTime: string,
    closingTime: string,
    breakTime?: { start: string; end: string },
  ) => {
    if (!bookedSlots) return true;

    const openingTimestamp = new Date(
      `${format(selectedDate, "yyyy-MM-dd")}T${openingTime}`,
    ).getTime();
    const closingTimestamp = new Date(
      `${format(selectedDate, "yyyy-MM-dd")}T${closingTime}`,
    ).getTime();

    // Convert break time to timestamps (if provided)
    const breakStart = breakTime
      ? new Date(
          `${format(selectedDate, "yyyy-MM-dd")}T${breakTime.start}`,
        ).getTime()
      : null;
    const breakEnd = breakTime
      ? new Date(
          `${format(selectedDate, "yyyy-MM-dd")}T${breakTime.end}`,
        ).getTime()
      : null;

    // Convert booked slots to a list of time ranges
    const bookedRanges = bookedSlots.map((slot) => ({
      start: new Date(
        `${format(selectedDate, "yyyy-MM-dd")}T${slot.startTime}`,
      ).getTime(),
      end: new Date(
        `${format(selectedDate, "yyyy-MM-dd")}T${slot.endTime}`,
      ).getTime(),
    }));

    // Generate all possible slots
    let currentTime = openingTimestamp;

    while (currentTime + totalDuration * 60 * 1000 <= closingTimestamp) {
      //   const slotStart = currentTime;
      // const slotEnd = currentTime + totalDuration * 60 * 1000;

      const slotStart = new Date(currentTime);
      const slotEnd = new Date(currentTime + totalDuration * 60 * 1000);

      //  // Check if the slot overlaps with any booked slots
      //  const isBooked = bookedRanges.some(
      //   (range) =>
      //     (slotStart >= range.start && slotStart < range.end) ||
      //     (slotEnd > range.start && slotEnd <= range.end)
      // );
      // Check if the slot overlaps with any booked slots
      const isBooked = bookedRanges.some(
        (range) =>
          (slotStart.getTime() >= range.start &&
            slotStart.getTime() < range.end) ||
          (slotEnd.getTime() > range.start && slotEnd.getTime() <= range.end),
      );
      // Check if the slot overlaps with the break time
      const isDuringBreak =
        breakStart &&
        breakEnd &&
        ((slotStart.getTime() >= breakStart &&
          slotStart.getTime() < breakEnd) ||
          (slotEnd.getTime() > breakStart && slotEnd.getTime() <= breakEnd));

      if (!isBooked && !isDuringBreak) {
        return true; // At least one available slot
      }
      // Move to the next slot (e.g., every 15 minutes)
      currentTime += 15 * 60 * 1000;
    }

    return false;
  };

  const generateAvailableSlots = (
    bookedSlots: TimeSlot[] | undefined,
    totalDuration: number,
    selectedDate: Date,
    openingTime: string,
    closingTime: string,
    breakTime?: { start: string; end: string },
    period?: "morning" | "afternoon" | "anytime", // Period of the day
    config: SchedulerConfig = {
      slotDuration: totalDuration,
      minStartInterval: 20,
      maxSlotsPerHour: 2,
      maxSlotsPerPeriod: 6,
      maxSlotsPerDay: 10,
      buffer: 5,
    },
  ) => {
    const availableSlots: { startTime: string; endTime: string }[] = [];

    // const dateStr = format(selectedDate, "yyyy-MM-dd");
    const startDate = parseTime(openingTime);
    const endDate = parseTime(closingTime);
    const startBreakTime = parseTime(breakTime?.start || "12:00");
    const endBreakTime = parseTime(breakTime?.end || "13:00");
    const totalMinutes =
      (endDate.getTime() - startDate.getTime()) / (1000 * 60);

    const bookedSlotsByHour = Array.from(
      { length: endDate.getHours() - startDate.getHours() + 1 },
      (_, i) => startDate.getHours() + i,
    ).reduce(
      (acc, hour) => {
        acc[hour] = 0; // Initialize all hours to 0
        return acc;
      },
      {} as Record<number, number>,
    );

    const normalizedBookedSlots =
      bookedSlots &&
      bookedSlots.map((slot) => {
        const startDate = parseTime(slot.startTime);
        const hour = startDate.getHours();
        bookedSlotsByHour[hour] = (bookedSlotsByHour[hour] || 0) + 1;
        return {
          start: startDate,
          end: parseTime(slot.endTime),
        };
      });

    // Track available slots per hour, considering already booked slots
    // Initialize availableSlotsPerHour with all hours from opening to closing time, set to 0
    const availableSlotsPerHour = Array.from(
      { length: endDate.getHours() - startDate.getHours() + 1 },
      (_, i) => startDate.getHours() + i,
    ).reduce(
      (acc, hour) => {
        acc[hour] = 0; // Initialize all hours to 0
        return acc;
      },
      {} as Record<number, number>,
    );

    let totalSlotsGenerated = 0;

    const isTimeSlotAvailable = (start: Date, end: Date): boolean => {
      return !normalizedBookedSlots?.some(
        (booked) =>
          (start >= booked.start && start < booked.end) ||
          (end > booked.start && end <= booked.end) ||
          (start <= booked.start && end >= booked.end),
      );
    };

    // Check if a slot can be added to the current hour
    // const canAddSlotToHour = (
    //   hour: number,
    //   bookedInHour: number,
    //   availableInHour: number
    // ): boolean => {
    //   return bookedInHour + availableInHour < config.maxSlotsPerHour;
    // };
    // Add break time check
    const isDuringBreak = (start: Date, end: Date): boolean => {
      if (!startBreakTime || !endBreakTime) return false;
      return (
        (start.getTime() >= startBreakTime.getTime() &&
          start.getTime() < endBreakTime.getTime()) ||
        (end.getTime() > startBreakTime.getTime() &&
          end.getTime() <= endBreakTime.getTime()) ||
        (start.getTime() <= startBreakTime.getTime() &&
          end.getTime() >= endBreakTime.getTime())
      );
    };
    for (
      let minute = 0;
      minute < totalMinutes;
      minute += config.minStartInterval
    ) {
      if (totalSlotsGenerated >= config.maxSlotsPerDay) break;
      const slotStart = new Date(startDate.getTime() + minute * 60 * 1000);
      const slotEnd = new Date(
        slotStart.getTime() + config.slotDuration * 60 * 1000,
      );

      if (slotEnd > endDate) break;

      const hour = slotStart.getHours();

      // const bookedInHour = bookedSlotsByHour[hour] || 0;
      availableSlotsPerHour[hour] = availableSlotsPerHour[hour] || 0;
      // const availableInHour = availableSlotsPerHour[hour] || 0;

      // bookedSlotsByHour[hour] = (bookedSlotsByHour[hour] || 0) + 1;

      if (isDuringBreak(slotStart, slotEnd)) continue;
      // if (!canAddSlotToHour(hour, bookedInHour, availableInHour)) continue;

      // Validate the slot
      if (isTimeSlotAvailable(slotStart, slotEnd)) {
        const displayEndTime = new Date(
          slotEnd.getTime() + config.buffer * 60 * 1000,
        );

        availableSlots.push({
          startTime: formatTime(slotStart),
          endTime: formatTime(displayEndTime),
        });

        availableSlotsPerHour[hour]++;
        totalSlotsGenerated++;
      }
    }

    // Filter slots based on the selected period

    const filterByPeriod = (slots: TimeSlot[]): TimeSlot[] => {
      const getSlotHour = (slot: TimeSlot) => {
        const [hours] = convertTo24Hour(slot.startTime).split(":");
        return parseInt(hours, 10);
      };

      switch (period) {
        case "morning":
          return slots.filter((slot) => getSlotHour(slot) < 12);
        case "afternoon":
          return slots.filter((slot) => getSlotHour(slot) >= 12);

        case "anytime": {
          const morningSlots = slots.filter((slot) => getSlotHour(slot) < 12);
          const afternoonSlots = slots.filter(
            (slot) => getSlotHour(slot) >= 12,
          );
          return [
            ...morningSlots.slice(0, config.maxSlotsPerPeriod),
            ...afternoonSlots.slice(0, config.maxSlotsPerPeriod),
          ];
        }

        default:
          return slots;
      }
    };
    return filterByPeriod(availableSlots);
  };

  const renderTimeSlots = () => {
    if (!selectedDate) return null;

    const dateString = format(selectedDate, "yyyy-MM-dd");
    const dateData = availabilityData?.dates[dateString];

    // if (!dateData) {
    //   return <p>No availability data for this date.</p>;
    // }

    // Calculate if the date is available
    const isAvailable = isDateAvailabe(
      dateData?.bookedSlot,
      totalDuration,
      selectedDate,
      openingTime,
      closingTime,
      breakTime,
    );
    if (!isAvailable) {
      return (
        <div className="rounded-md bg-gray-100 p-4 text-center">
          <p>No available time slots</p>
        </div>
      );
    }

    const availableSlots = generateAvailableSlots(
      dateData?.bookedSlot || [],
      totalDuration,
      selectedDate,
      openingTime,
      closingTime,
      breakTime,
      "anytime",
      {
        slotDuration: totalDuration,
        minStartInterval: 20,
        maxSlotsPerHour: 3,
        maxSlotsPerDay: 30,
        maxSlotsPerPeriod: 12,
        buffer: 5,
      },
    );

    if (availableSlots.length === 0) {
      return <p>No available time slots for this date.</p>;
    }
    return (
      <div className="flex w-full flex-col gap-2 ">
        {availableSlots.map((slot: any, index: number) => (
          <Button
            key={index}
            // variant={selectedTime === slot.startTime ? "default" : "outline"}
            className={cn(
              `w-full justify-center bg-transparent border border-[#D9D9D9] h-[42px]
               text-primary hover:text-white hover:bg-secondary hover:border-secondary`,
              time === `${slot.startTime}-${slot.endTime}` &&
                "bg-[#FED8DE] text-secondary border-secondary",
            )}
            onClick={() => handleTimeSelect(slot.startTime, slot.endTime)}
          >
            {slot.startTime} - {slot.endTime}
          </Button>
        ))}
      </div>
    );
  };

  const renderStylistSelector = () => {
    if (!selectedDate) return null;

    const dateString = format(selectedDate, "yyyy-MM-dd");
    if (!availabilityData?.dates[dateString]?.stylists) {
      return null;
    }

    const stylists = availabilityData.dates[dateString].stylists;

    return (
      <div className="mt-6">
        <h3 className="mb-3 text-lg font-medium">Select a stylist:</h3>
        <div className="space-y-3">
          {stylists &&
            stylists.map((stylist: any) => (
              <Card
                key={stylist.id}
                className={`cursor-pointer transition-all hover:border-blue-300 ${
                  selectedStylist === stylist.id
                    ? "border-blue-500 bg-blue-50"
                    : ""
                }`}
                onClick={() => handleStylistSelect(stylist.id)}
              >
                <CardContent className="flex items-center justify-between p-4">
                  <div className="flex items-center space-x-4">
                    <div className="flex size-10 items-center justify-center rounded-full bg-red-200 font-medium text-red-800">
                      {stylist.avatar}
                    </div>
                    <div>
                      <p className="font-medium">{stylist.name}</p>
                      <p className="text-sm text-gray-500">
                        {stylist.availableSlots.length}{" "}
                        {stylist.availableSlots.length === 1 ? "slot" : "slots"}{" "}
                        available
                      </p>
                    </div>
                  </div>
                  <ChevronRight className="size-5 text-gray-400" />
                </CardContent>
              </Card>
            ))}
        </div>
      </div>
    );
  };

  // Render the daily availability view (as shown in Image 4)
  // const renderDailyAvailability = () => {
  //   if (!availabilityData) return null;

  //   // This is for the vertical date listing with time slots
  //   // Find the next 5-7 days with availability
  //   const days = availabilityData
  //     ? Object.entries(availabilityData.dates)
  //         .filter(([_, data]: [string, any]) => {
  //           try {
  //             const date = parse(_, "yyyy-MM-dd", new Date());
  //             return isValid(date);
  //           } catch {
  //             return false;
  //           }
  //         })
  //         .sort(([a], [b]) => {
  //           const dateA = parse(a, "yyyy-MM-dd", new Date());
  //           const dateB = parse(b, "yyyy-MM-dd", new Date());
  //           return dateA.getTime() - dateB.getTime();
  //         })
  //         .slice(0, 7)
  //     : [];

  //   return (
  //     <div className="mt-6 space-y-4 border-t pt-6">
  //       {days.map(([dateStr, dateData]: [string, any]) => {
  //         const date = parse(dateStr, "yyyy-MM-dd", new Date());
  //         const dayNumber = format(date, "d");
  //         const dayName = format(date, "EEE");

  //         return (
  //           <div key={dateStr} className="border-b pb-4">
  //             <div className="mb-4 flex items-center justify-between">
  //               <div className="flex flex-col">
  //                 <span className="text-2xl font-bold">{dayNumber}</span>
  //                 <span className="text-gray-500">{dayName}</span>
  //               </div>

  //               {!dateData.available ? (
  //                 <div className="ml-4 flex-1">
  //                   <p className="text-gray-500">
  //                     {dateData.message || "Sorry, no availability."}
  //                   </p>
  //                   {dateData.message === "Choose other available staff" && (
  //                     <Button
  //                       variant="ghost"
  //                       size="sm"
  //                       className="text-blue-600"
  //                       onClick={() => {
  //                         //   setDate(dateStr);
  //                        updateState({
  //                         date
  //                        })
  //                         setShowStylistSelector(true);
  //                       }}
  //                     >
  //                       Choose other available staff{" "}
  //                       <ChevronRight className="ml-1 size-4" />
  //                     </Button>
  //                   )}
  //                 </div>
  //               ) : (
  //                 <div className="ml-4 flex flex-1 flex-wrap gap-2">
  //                   {dateData.slots &&
  //                     dateData.slots
  //                       .slice(0, 7)
  //                       .map((slot: any, idx: number) => (
  //                         <Button
  //                           key={idx}
  //                           size="sm"
  //                           variant="outline"
  //                           className="text-xs"
  //                           disabled={!slot.available}
  //                           onClick={() => {
  //                             //   setDate(dateStr);
  //                            updateState({
  //                             date
  //                            })
  //                             handleTimeSelect(slot.startTime, slot.endTime);
  //                           }}
  //                         >
  //                           {slot.startTime}
  //                         </Button>
  //                       ))}
  //                 </div>
  //               )}
  //             </div>
  //           </div>
  //         );
  //       })}
  //     </div>
  //   );
  // };

  if (loading) {
    return (
      <div className="py-10 text-center">Loading available time slots...</div>
    );
  }

  return (
    <div className="z-20 w-full space-y-6">
      <h2 className="text-xl font-bold">
        {showStylistSelector
          ? "Select a Stylist"
          : `Select a Time - ${selectedDate ? formatDate(format(selectedDate, "yyyy-MM-dd")) : ""}`}
      </h2>

      {/* <h2>{totalDuration}</h2> */}
      {!showStylistSelector && (
        <>
          {renderTimeSlots()}
          {/* {renderDailyAvailability()} */}
        </>
      )}

      {showStylistSelector && renderStylistSelector()}

      <div className="mt-8 flex justify-between">
        <Button
          variant="outline"
          onClick={() => {
            if (showStylistSelector) {
              setShowStylistSelector(false);
            } else {
              onBack();
            }
          }}
        >
          Back
        </Button>
      </div>
    </div>
  );
}
