/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { format, isValid, isBefore, isToday, isSameDay } from "date-fns";
// import { AlertCircle } from "lucide-react";
import React, { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { sampleAvailabilityData } from "@/config/constants";
import { useBookingStore } from "@/lib/use-booking-store";
import { AvailabilityResponse, Service } from "@/types";

import TimeSelectionStep from "./time-selection-step";

interface DateSelectionStepProps {
  onNext: () => void;
  onBack: () => void;
  services: Service[];
}

export default function DateSelectionStep({
  onNext,
  services,
  onBack,
}: DateSelectionStepProps) {
  const [showTimeSelector, setShowTimeSelector] = useState(false);
  const [availabilityData, setAvailabilityData] =
    useState<AvailabilityResponse>();
  const [loading, setLoading] = useState(true);
  const { date, updateState } = useBookingStore();

  const selectedDate = date;

  const CustomHeadRow = () => {
    const weekdays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

    return (
      <div className="custom-head-row flex">
        {weekdays.map((weekday, index) => (
          <div
            key={index}
            className="m-3 w-9 rounded-md text-[0.8rem] font-normal text-muted-foreground"
          >
            {weekday}
          </div>
        ))}
      </div>
    );
  };

  useEffect(() => {
    const getAvailability = async () => {
      setLoading(true);
      try {
        setAvailabilityData(sampleAvailabilityData);
      } catch (error) {
        console.error("Failed to fetch availability:", error);
      } finally {
        setLoading(false);
      }
    };

    getAvailability();
  }, []);

  console.log(availabilityData);

  const handleDateSelect = async (date: Date | undefined) => {
    console.log("DATE SELECT CALLED");
    if (!date || !isValid(date)) return;

    const dateStr = format(date, "yyy-MM-dd");
    const dateAvailability = availabilityData?.dates[dateStr];

    if (!dateAvailability || dateAvailability.available) {
      updateState({
        date: null,
      });

      // Set the new selected date
      updateState({
        date,
      });

      onNext();
    }
  };

  const disabledDates = (date: Date) => {
    // Disable dates before today, but not today
    if (isBefore(date, new Date()) && !isSameDay(date, new Date())) {
      return true;
    }

    const dateStr = format(date, "yyyy-MM-dd");
    const dateAvailability = availabilityData?.dates[dateStr];

    // Disable dates that are fully booked
    if (dateAvailability && !dateAvailability.available) {
      return true;
    }

    return false;
  };

  const dayRenderer = (day: Date, { activeModifiers, ...props }: any) => {
    const dateStr = format(day, "yyyy-MM-dd");
    const dateAvailability = availabilityData?.dates[dateStr];

    const dayNumber = day.getDate();
    const isDisabled =
      (isBefore(day, new Date()) && !isSameDay(day, new Date())) || // Disable dates before today, but not today
      (dateAvailability && !dateAvailability.available); // Use activeModifiers.disabled
    const isFullyAvailable = !dateAvailability; // Date not in availabilityData
    const isPartiallyAvailable = dateAvailability?.available; // Date in availabilityData and available
    const isSelected = activeModifiers.selected;
    const handleClick = () => {
      if (isDisabled) return; // Do nothing if the date is disabled

      if (isFullyAvailable || isPartiallyAvailable) {
        updateState({
          date: day,
        });

        setShowTimeSelector(true);
        onNext();
      }
    };

    return (
      <Button
        variant={"ghost"}
        size={"icon"}
        // disabled={isDisabled || isFullyBooked}
        onClick={handleClick}
        className={`
          ${isDisabled ? "text-red-400 line-through" : ""}
          ${isToday(day) && !isSelected && "bg-gray-100 text-primary opacity-100"}
      `}
      >
        {dayNumber}
      </Button>
    );
  };

  const findNextAvailableDate = (
    availabilityData: AvailabilityResponse,
    selectedDate: Date
  ): string | null => {
    const dates = Object.keys(availabilityData.dates).sort();

    // Find the index of the selected date
    const selectedDateStr = format(selectedDate, "yyyy-MM-dd");
    const selectedIndex = dates.findIndex((date) => date === selectedDateStr);

    // Iterate through dates after the selected date
    for (let i = selectedIndex + 1; i < dates.length; i++) {
      const dateStr = dates[i];
      const dateAvailability = availabilityData.dates[dateStr];

      // Check if the date is available and has at least one available slot
      if (
        dateAvailability.available &&
        !dateAvailability.fullyBooked &&
        dateAvailability.bookedSlot?.some((slot) => slot.available)
      ) {
        return dateStr;
      }
    }

    // If no available date is found, return null
    return null;
  };
  if (loading) {
    return <div className="py-10 text-center">Loading availability...</div>;
  }
  return (
    <div className="flex items-center justify-center space-y-6">
      {showTimeSelector ? (
        <TimeSelectionStep
          services={services}
          onNext={() => console.log("DATE SELECTED")}
          onBack={() => setShowTimeSelector(false)}
        />
      ) : (
        <div className="flex w-fit flex-col items-center">
          <Calendar
            showOutsideDays={false}
            weekStartsOn={1}
            mode="single"
            selected={selectedDate || undefined} // Directly pass the selectedDate (it should be a Date object)
            onSelect={(date) => handleDateSelect(date)}
            disabled={(date) => disabledDates(date)}
            className=" rounded-md border-none "
            components={{
              HeadRow: CustomHeadRow,
              DayContent: ({ date, activeModifiers, ...props }) =>
                dayRenderer(date, { activeModifiers, ...props }),
            }}
          />

          {selectedDate &&
            availabilityData?.dates[format(selectedDate, "yyyy-MM-dd")] &&
            availabilityData?.dates[format(selectedDate, "yyyy-MM-dd")]
              .available && (
              <div className=" my-6 flex  w-full flex-col items-center justify-center rounded-lg border p-4">
                <div
                  className={`
          flex size-10 cursor-pointer items-center justify-center rounded-full 
          bg-red-300 text-red-900 line-through
        `}
                >
                  {selectedDate.getDate()}
                </div>
                <p className="mt-2 text-sm text-red-500">
                  Fully booked on this date
                </p>
                <Button
                  variant="outline"
                  size="sm"
                  className="mt-2"
                  onClick={() => {
                    const nextAvailableDateStr = findNextAvailableDate(
                      availabilityData,
                      selectedDate
                    );
                    if (nextAvailableDateStr) {
                      const nextAvailableDate = new Date(nextAvailableDateStr);
                      updateState({
                        date: nextAvailableDate,
                      });
                      onNext();
                    }
                  }}
                >
                  Go to next available date
                </Button>
              </div>
            )}

          {/* {selectedDate &&
          availabilityData?.dates[format(selectedDate, "yyyy-MM-dd")] &&
          availabilityData?.dates[format(selectedDate, "yyyy-MM-dd")]
            .fullyBooked && (
            <div className="mt-4 flex items-start space-x-2 rounded-md bg-red-50 p-4">
              <AlertCircle className="mt-0.5 size-5 shrink-0 text-red-500" />
              <div>
                <p className="font-medium">
                  {availabilityData.dates[format(selectedDate, "yyyy-MM-dd")]
                    .message || "Fully booked on this date"}
                </p>
             
                <Button
                  variant="outline"
                  size="sm"
                  className="mt-2"
                  onClick={() => {
                    if (!selectedDate || !availabilityData) return;

                    // Find the next available date
                    const nextAvailableDateStr = findNextAvailableDate(
                      availabilityData,
                      selectedDate
                    );

                    if (nextAvailableDateStr) {
                      const nextAvailableDate = new Date(nextAvailableDateStr);
                      updateBooking(
                        bookings.findIndex((b) => b.serviceId === serviceId),
                        { date: nextAvailableDate }
                      );
                      onNext();
                    } else {
                      console.log("No available dates found.");
                      // Optionally, show a message to the user
                    }
                  }}
                >
                  Go to next available date
                </Button>
              </div>
            </div>
          )} */}
        </div>
      )}
    </div>
  );
}
