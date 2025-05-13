/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import {
  format,
  isValid,
  isBefore,
  isToday,
  isSameDay,
  addDays,
  startOfDay,
} from "date-fns";
// import { AlertCircle } from "lucide-react";
import {
  AlertCircle,
  Calendar1Icon,
  CalendarIcon,
  Loader2,
  ViewIcon,
} from "lucide-react";
import React, { useCallback, useEffect, useState } from "react";

import { getDateBooking } from "@/app/actions/bookings.action";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { useIsMobile } from "@/hooks/use-mobile";
import { useBookingStore } from "@/lib/use-booking-store";
import { cn } from "@/lib/utils";
import { Service } from "@/types";

import TimeSelectionStep from "./time-selection-step";

interface DateSelectionStepProps {
  onNext: () => void;
  onBack: () => void;
  services: Service[];
}
export interface SlotAvailability {
  date: string;
  maxBookings: number;
  availableSlots: number;
  bookedSlots: number;
}
export default function DateSelectionStep({
  onNext,
  services,
  onBack,
}: DateSelectionStepProps) {
  const [view, setView] = useState<"month" | "day">("month");

  const [showTimeSelector, setShowTimeSelector] = useState(false);
  const [availabilityData, setAvailabilityData] = useState<
    Record<string, SlotAvailability>
  >({});
  const [calendarMonth, setCalendarMonth] = useState<Date>(new Date());
  const [loading, setLoading] = useState(true);
  const { date, updateState } = useBookingStore();
  const [visibleDates, setVisibleDates] = useState<Date[]>([]);
  const [visibleDatesCount, setVisibleDatesCount] = useState<number>(10);

  const isMobile = useIsMobile();

  const selectedDate = date;
  // Fetch availability data for the current month
  useEffect(() => {
    const fetchAvailabilityForMonth = async () => {
      setLoading(true);
      try {
        // Calculate start and end dates for the month
        const startOfMonth = new Date(
          calendarMonth.getFullYear(),
          calendarMonth.getMonth(),
          1,
        );
        const endOfMonth = new Date(
          calendarMonth.getFullYear(),
          calendarMonth.getMonth() + 1,
          0,
        );

        // Create a dictionary to store availability data
        const availabilityDict: Record<string, SlotAvailability> = {};

        // For each day in the month, fetch availability
        let currentDate = startOfMonth;
        while (currentDate <= endOfMonth) {
          const dateStr = format(currentDate, "yyyy-MM-dd");

          console.log("DATE STR", dateStr);
          // Fetch data from the API
          try {
            const response = await getDateBooking(dateStr);

            if (response) {
              availabilityDict[dateStr] = response.bookings || {
                date: dateStr,
                maxBookings: 0,
                availableSlots: 0,
                bookedSlots: 0,
              };
            }
          } catch (error) {
            console.error(
              `Failed to fetch availability for ${dateStr}:`,
              error,
            );
          }

          // Move to next day
          currentDate = addDays(currentDate, 1);
        }

        setAvailabilityData(availabilityDict);
      } catch (error) {
        console.error("Failed to fetch availability:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAvailabilityForMonth();
  }, [calendarMonth]);

  const generateVisibleDates = useCallback(() => {
    // Start from today or selected date
    // Start from the first day of the current month
    const startOfMonth = new Date(
      calendarMonth.getFullYear(),
      calendarMonth.getMonth(),
      1,
    );
    const endOfMonth = new Date(
      calendarMonth.getFullYear(),
      calendarMonth.getMonth() + 1,
      0,
    );

    const dates: Date[] = [];
    let currentDate = startOfDay(startOfMonth);

    // Get dates for the current month only
    while (currentDate <= endOfMonth) {
      const dateStr = format(currentDate, "yyyy-MM-dd");
      const dateAvailability = availabilityData[dateStr];

      // Include the date if it's not before today and has available slots
      if (
        (!isBefore(currentDate, startOfDay(new Date())) ||
          isSameDay(currentDate, new Date())) &&
        (!dateAvailability || dateAvailability.availableSlots > 0)
      ) {
        dates.push(currentDate);
      }

      currentDate = addDays(currentDate, 1);
    }

    setVisibleDates(dates);
    setVisibleDatesCount(Math.min(8, dates.length)); // Reset to showing first 8 dates
  }, [availabilityData, calendarMonth]);

  // Generate the next set of available dates when in day view
  useEffect(() => {
    if (view === "day") {
      generateVisibleDates();
    }
  }, [view, generateVisibleDates]);

  const handleDateSelect = async (date: Date | undefined) => {
    if (!date || !isValid(date)) return;

    const dateStr = format(date, "yyy-MM-dd");
    const dateAvailability = availabilityData[dateStr];

    if (!dateAvailability || dateAvailability.availableSlots > 0) {
      updateState({
        date,
      });
      if (view === "month") {
        if (isMobile) {
          setView("day");
        } else {
          setShowTimeSelector(true);
        }
      } else if (view === "day") {
        onNext();
      }
    }
  };
  const disabledDates = (date: Date) => {
    // Disable dates before today, but not today
    if (isBefore(date, new Date()) && !isSameDay(date, new Date())) {
      return true;
    }

    const dateStr = format(date, "yyyy-MM-dd");
    const dateAvailability = availabilityData[dateStr];

    // Disable dates that are fully booked
    if (dateAvailability && dateAvailability.availableSlots === 0) {
      return true;
    }

    return false;
  };

  const dayRenderer = (day: Date, { activeModifiers, ...props }: any) => {
    const dateStr = format(day, "yyyy-MM-dd");
    const dateAvailability = availabilityData[dateStr];

    const dayNumber = day.getDate();
    const isDisabled =
      (isBefore(day, new Date()) && !isSameDay(day, new Date())) || // Disable dates before today, but not today
      (dateAvailability && dateAvailability.availableSlots === 0); // No available slots

    const isSelected = activeModifiers.selected;
    const isPast = isBefore(day, new Date()) && !isSameDay(day, new Date());

    // Determine availability status
    const isFullyAvailable =
      dateAvailability &&
      dateAvailability.availableSlots === dateAvailability.maxBookings;
    const isPartiallyAvailable =
      dateAvailability &&
      dateAvailability.availableSlots > 0 &&
      dateAvailability.availableSlots < dateAvailability.maxBookings;
    const isFullyBooked =
      dateAvailability && dateAvailability.availableSlots === 0;

    const handleClick = () => {
      if (isDisabled) return; // Do nothing if the date is disabled

      if (dateAvailability && dateAvailability.availableSlots > 0) {
        updateState({
          date: day,
        });

        if (view === "month") {
          if (isMobile) {
            setView("day");
          } else {
            setShowTimeSelector(true);
          }
        } else if (view === "day") {
          onNext();
        }
      }
    };

    // Calculate styles based on availability
    let availabilityStyle = "";
    if (isSelected) {
      availabilityStyle = "bg-primary text-primary-foreground";
    } else if (isPast) {
      availabilityStyle = "text-muted-foreground line-through opacity-50";
    } else if (isFullyBooked) {
      availabilityStyle = "text-red-500 bg-red-50";
    } else if (isPartiallyAvailable) {
      availabilityStyle = "text-amber-700 bg-amber-50";
    } else if (isFullyAvailable) {
      availabilityStyle = "text-green-700 bg-green-50";
    }

    return (
      <div className="flex flex-col items-center">
        <Button
          variant={"ghost"}
          size={"sm"}
          disabled={isDisabled}
          onClick={handleClick}
          className={`rounded-md ${availabilityStyle} ${isToday(day) && !isSelected ? "ring-1 ring-primary" : ""}`}
        >
          {dayNumber}
        </Button>

        {/* Show available slots beneath the day number */}
        {dateAvailability && !isPast && !isSelected && (
          <div
            className={`mt-1 text-xs ${isFullyBooked ? "text-red-500" : isPartiallyAvailable ? "text-amber-600" : "text-green-600"}`}
          >
            {isFullyBooked
              ? "Full"
              : `${dateAvailability.availableSlots}/${dateAvailability.maxBookings}`}
          </div>
        )}
      </div>
    );
  };

  const findNextAvailableDate = (): Date | null => {
    // Start from tomorrow
    let searchDate = addDays(new Date(), 1);
    const endDate = addDays(new Date(), 60); // Look up to 60 days ahead

    while (searchDate <= endDate) {
      const dateStr = format(searchDate, "yyyy-MM-dd");
      const dateAvailability = availabilityData[dateStr];

      if (dateAvailability && dateAvailability.availableSlots > 0) {
        return searchDate;
      }

      searchDate = addDays(searchDate, 1);
    }

    return null;
  };

  const handleMonthChange = (month: Date) => {
    setCalendarMonth(month);
    if (view === "day") {
      setCalendarMonth(month);
    }
  };

  const handleViewMoreDates = () => {
    // Show more dates on mobile view
    setVisibleDatesCount((prev) => {
      const newCount = prev + 8; // Add 8 more dates to view
      return Math.min(newCount, visibleDates.length); // Don't exceed available dates
    });
  };
  const handleNextMonth = () => {
    const nextMonth = new Date(calendarMonth);
    nextMonth.setMonth(nextMonth.getMonth() + 1);
    setCalendarMonth(nextMonth);
  };

  useEffect(() => {
    if (isMobile) {
      setView("day");
    }
  }, [isMobile]);
  const handlePreviousMonth = () => {
    const prevMonth = new Date(calendarMonth);
    prevMonth.setMonth(prevMonth.getMonth() - 1);

    // Don't allow going before current month if it would show past dates
    const today = new Date();
    if (
      prevMonth.getFullYear() < today.getFullYear() ||
      (prevMonth.getFullYear() === today.getFullYear() &&
        prevMonth.getMonth() < today.getMonth())
    ) {
      return;
    }

    setCalendarMonth(prevMonth);
  };
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center space-y-4 py-10 text-center">
        <Loader2 className="size-8 animate-spin text-primary" />
        <p>Loading availability...</p>
      </div>
    );
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
        <div className="flex w-full flex-col items-center">
          <div className="mb-4 flex w-full items-center justify-between">
            <h2 className="text-xs font-semibold md:text-sm lg:text-xl">
              Select a Date
            </h2>
            {/* View toggle buttons */}
            <div className="flex items-center space-x-2">
              <Button
                variant={view === "month" ? "default" : "outline"}
                size="sm"
                onClick={() => setView("month")}
                className="flex items-center"
              >
                <Calendar1Icon className="mr-1 size-4" />
                <span className="hidden sm:inline">Month</span>
              </Button>
              <Button
                variant={view === "day" ? "default" : "outline"}
                size="sm"
                onClick={() => setView("day")}
                className="flex items-center"
              >
                <ViewIcon className="mr-1 size-4" />
                <span className="hidden sm:inline">Day</span>
              </Button>
            </div>
          </div>

          {view === "month" ? (
            <>
              <Calendar
                showOutsideDays={false}
                weekStartsOn={1}
                mode="single"
                month={calendarMonth}
                selected={selectedDate || undefined}
                onSelect={(date) => handleDateSelect(date)}
                onMonthChange={handleMonthChange}
                disabled={(date) => disabledDates(date)}
                className="rounded-md border"
                components={{
                  DayContent: ({ date, activeModifiers, ...props }) =>
                    dayRenderer(date, { activeModifiers, ...props }),
                }}
              />
            </>
          ) : (
            <div className="flex w-full flex-col space-y-4">
              {visibleDates.length > 0 ? (
                <div className="flex w-full flex-col space-y-4">
                  {/* Month navigation header */}
                  <div className="mb-2 flex items-center justify-between">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handlePreviousMonth}
                      disabled={
                        new Date().getMonth() === calendarMonth.getMonth() &&
                        new Date().getFullYear() === calendarMonth.getFullYear()
                      }
                      className="text-gray-500"
                    >
                      &lt; Previous
                    </Button>
                    <h3 className="text-sm font-medium">
                      {format(calendarMonth, "MMMM yyyy")}
                    </h3>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleNextMonth}
                      className="text-gray-500"
                      disabled={visibleDates.length - visibleDatesCount > 0}
                    >
                      Next &gt;
                    </Button>
                  </div>
                  {/* Day selection */}
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    {/* Only show the number of dates based on visibleDatesCount */}
                    {visibleDates
                      .slice(0, visibleDatesCount)
                      .map((day, index) => {
                        const dateStr = format(day, "yyyy-MM-dd");
                        const dayAvailability = availabilityData[dateStr];
                        const isDateSelected =
                          selectedDate && isSameDay(selectedDate, day);

                        return (
                          <div
                            key={dateStr}
                            className={cn(
                              "border rounded-lg overflow-hidden",
                              isDateSelected
                                ? "border-primary ring-1 ring-primary"
                                : "border-gray-200",
                            )}
                          >
                            <div
                              className={cn(
                                "p-4 cursor-pointer",
                                isDateSelected
                                  ? "bg-primary/10"
                                  : "hover:bg-gray-50",
                              )}
                              onClick={() => handleDateSelect(day)}
                            >
                              <div className="flex items-center justify-between">
                                <div className="flex items-center">
                                  <div className="mr-4 text-center">
                                    <div className="text-2xl font-bold">
                                      {format(day, "dd")}
                                    </div>
                                    <div className="text-sm text-gray-500">
                                      {format(day, "EEE")}
                                    </div>
                                  </div>
                                  <div>
                                    <div className="font-medium">
                                      {format(day, "MMMM d, yyyy")}
                                    </div>
                                    {dayAvailability && (
                                      <div
                                        className={cn(
                                          "text-sm",
                                          dayAvailability.availableSlots === 0
                                            ? "text-red-500"
                                            : dayAvailability.availableSlots < 3
                                              ? "text-amber-600"
                                              : "text-green-600",
                                        )}
                                      >
                                        {dayAvailability.availableSlots} slots
                                        available
                                      </div>
                                    )}
                                  </div>
                                </div>
                                <div>
                                  {isDateSelected && (
                                    <div className="size-4 rounded-full bg-primary"></div>
                                  )}
                                </div>
                              </div>

                              {/* Time slots - show only when date is selected */}
                              {isDateSelected && dayAvailability && (
                                <TimeSelectionStep
                                  services={services}
                                  onNext={() => console.log("DATE SELECTED")}
                                  onBack={() => setShowTimeSelector(false)}
                                />
                              )}
                            </div>
                          </div>
                        );
                      })}
                  </div>

                  {/* View more dates button */}
                  {visibleDatesCount < visibleDates.length && (
                    <div className="mt-6 flex justify-center">
                      <Button
                        variant="outline"
                        onClick={handleViewMoreDates}
                        className="w-full md:w-auto"
                      >
                        View{" "}
                        {Math.min(8, visibleDates.length - visibleDatesCount)}{" "}
                        more dates
                      </Button>
                    </div>
                  )}

                  {/* Navigation */}
                  <div className="mt-4 flex justify-between">
                    <Button variant="outline" onClick={onBack}>
                      Back
                    </Button>
                    <Button variant="outline" onClick={() => setView("month")}>
                      Show Calendar
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-8">
                  <p className="text-muted-foreground">
                    No available dates found.
                  </p>
                  <div className="mt-4 flex space-x-4">
                    <Button variant="outline" onClick={handleNextMonth}>
                      Try Next Month
                    </Button>
                    <Button variant="outline" onClick={() => setView("month")}>
                      Return to Calendar
                    </Button>
                  </div>
                </div>
              )}
            </div>
          )}

          {selectedDate && (
            <div className="mt-6 w-full">
              <div className="flex items-center justify-between rounded-lg border bg-gray-50 p-4">
                <div className="flex items-center">
                  <CalendarIcon className="mr-2 size-5 text-primary" />
                  <div>
                    <p className="font-medium">Selected Date</p>
                    <p className="text-sm text-muted-foreground">
                      {format(selectedDate, "EEEE, MMMM d, yyyy")}
                    </p>
                  </div>
                </div>
                {selectedDate &&
                  availabilityData[format(selectedDate, "yyyy-MM-dd")] && (
                    <div className="text-right">
                      <p className="text-sm font-medium">Availability</p>
                      <p
                        className={`text-sm ${
                          availabilityData[format(selectedDate, "yyyy-MM-dd")]
                            .availableSlots === 0
                            ? "text-red-500"
                            : availabilityData[
                                  format(selectedDate, "yyyy-MM-dd")
                                ].availableSlots < 3
                              ? "text-amber-600"
                              : "text-green-600"
                        }`}
                      >
                        {
                          availabilityData[format(selectedDate, "yyyy-MM-dd")]
                            .availableSlots
                        }{" "}
                        slots available
                      </p>
                    </div>
                  )}
              </div>
            </div>
          )}

          {selectedDate &&
            availabilityData[format(selectedDate, "yyyy-MM-dd")] &&
            availabilityData[format(selectedDate, "yyyy-MM-dd")]
              .availableSlots === 0 && (
              <div className="mt-4 flex w-full items-start space-x-2 rounded-md bg-red-50 p-4">
                <AlertCircle className="mt-0.5 size-5 shrink-0 text-red-500" />
                <div className="flex-1">
                  <p className="font-medium text-red-800">
                    No available slots on this date
                  </p>
                  <Button
                    variant="outline"
                    size="sm"
                    className="mt-2"
                    onClick={() => {
                      const nextAvailableDate = findNextAvailableDate();
                      if (nextAvailableDate) {
                        updateState({
                          date: nextAvailableDate,
                        });
                        onNext();
                      } else {
                        // Show a message if no available dates are found
                        alert("No available dates found in the next 60 days.");
                      }
                    }}
                  >
                    Go to next available date
                  </Button>
                </div>
              </div>
            )}
        </div>
      )}
    </div>
  );
}
