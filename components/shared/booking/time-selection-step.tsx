/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";

import { format, parse } from "date-fns";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { sampleAvailabilityData } from "@/config/constants";
import { useBookingStore } from "@/lib/use-booking-store";
import { calculateBookingDetails, cn } from "@/lib/utils";
import { AvailabilityResponse, Service, TimeSlot } from "@/types";

interface SchedulerConfig {
  slotDuration: number; // in minutes
  minStartInterval: number; // minimum minutes between slot starts (20 or 25)
  maxCapacityPerSlot: number; // maximum concurrent bookings allowed per time slot
  maxDailyCapacity: number; // maximum total capacity for the day (in service hours)
  buffer: number; // buffer time between appointments in minutes
}

interface SalonCapacity {
  totalDailyHours: number; // Total hours salon can operate in a day
  maxBookingsPerHour: number; // Maximum number of concurrent bookings per hour
  bookedHours: number; // Already booked hours for the day
}

interface WorkingHours {
  openingTime: string;
  closingTime: string;
  breakTime?: { start: string; end: string };
  isBookingEnabled: boolean; // Flag to determine if booking is enabled for a specific day
}

interface TimeSelectionStepProps {
  onNext: () => void;
  onBack: () => void;
  services: Service[];
}

export default function TimeSelectionStep({
  onNext,
  onBack,
  services,
}: TimeSelectionStepProps) {
  const [availabilityData, setAvailabilityData] =
    useState<AvailabilityResponse>();

  const [salonCapacity, setSalonCapacity] = useState<SalonCapacity>({
    totalDailyHours: 6, // Default to 8 hours per day
    maxBookingsPerHour: 2, // Default to 2 concurrent bookings per hour
    bookedHours: 0,
  });
  const [workingHours, setWorkingHours] = useState<WorkingHours>({
    openingTime: "09:00",
    closingTime: "17:00",
    breakTime: { start: "12:00", end: "13:00" },
    isBookingEnabled: true,
  });

  console.log("workingHours", workingHours);
  console.log("Saloon Capacity", salonCapacity);
  const [loading, setLoading] = useState(true);
  const { bookings, date, time, updateState } = useBookingStore();

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

  const totalBooking = calculateBookingDetails(bookings, services, services);

  // Helper function to transform backend booking data
  // const transformBookingData = (bookings: any[]): TimeSlot[] => {
  //   if (!bookings || bookings.length === 0) return [];

  //   return bookings.map(booking => {
  //     // Extract the booking date and convert to local time format
  //     const bookingDate = new Date(booking.booking_datetime);
  //     const startTime = formatTime(bookingDate);

  //     // Calculate end time based on service durations
  //     const totalDuration = booking.services.reduce((total: number, service: Service) =>
  //       total + (service.duration || 0), 0);

  //     const endDate = new Date(bookingDate.getTime() + totalDuration * 60 * 1000);
  //     const endTime = formatTime(endDate);

  //     return {
  //       startTime,
  //       endTime,
  //       id: booking.id
  //     };
  //   });
  // };

  useEffect(() => {
    const getTimeSlots = async () => {
      setLoading(true);
      try {
        // In a real implementation, you would fetch from API
        // const data = await fetchTimeSlots(selectedService, selectedProfessional, selectedDate);

        // Using mock data for now
        setAvailabilityData(sampleAvailabilityData);

        const mockCapacity: SalonCapacity = {
          totalDailyHours: 7,
          maxBookingsPerHour: 3,
          bookedHours: 2.5,
        };

        setSalonCapacity(mockCapacity);

        // Mock data for now
        const mockWorkingHours: WorkingHours = {
          openingTime: "9:00",
          closingTime: "17:00",
          breakTime: { start: "12:00", end: "13:00" },
          isBookingEnabled: true, // Admin can toggle this to disable bookings
        };
        setWorkingHours(mockWorkingHours);
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

    // const dateString = format(selectedDate, "yyyy-MM-dd");
    // const dateData = availabilityData?.dates[dateString];
    // If this date requires stylist selection, show that interface
    onNext();
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return "";
    const date = parse(dateString, "yyyy-MM-dd", new Date());
    return format(date, "MMMM d, yyyy");
  };

  // Check if the salon has enough capacity for the day
  const hasSalonCapacity = (
    totalServiceDuration: number,
    bookedHours: number,
    totalDailyHours: number
  ): boolean => {
    // Convert service duration from minutes to hours
    const serviceDurationHours = totalServiceDuration / 60;

    // Check if adding this booking would exceed the salon's daily capacity
    return bookedHours + serviceDurationHours <= totalDailyHours;
  };

  // Check if booking is enabled for the selected date
  const isBookingEnabled = (workingHours: WorkingHours): boolean => {
    return workingHours.isBookingEnabled;
  };

  const isDateAvailabe = (
    bookedSlots: TimeSlot[] | undefined,
    totalDuration: number,
    selectedDate: Date,
    workingHours: WorkingHours,
    salonCapacity: SalonCapacity
  ) => {
    if (!isBookingEnabled(workingHours)) {
      return false;
    }

    if (
      !hasSalonCapacity(
        totalDuration,
        salonCapacity.bookedHours,
        salonCapacity.totalDailyHours
      )
    ) {
      return false;
    }

    if (!bookedSlots) return true;

    const openingTime = workingHours.openingTime;
    const closingTime = workingHours.closingTime;
    const breakTime = workingHours.breakTime;

    const openingTimestamp = new Date(
      `${format(selectedDate, "yyyy-MM-dd")}T${openingTime}`
    ).getTime();
    const closingTimestamp = new Date(
      `${format(selectedDate, "yyyy-MM-dd")}T${closingTime}`
    ).getTime();

    // Convert break time to timestamps (if provided)
    const breakStart = breakTime
      ? new Date(
          `${format(selectedDate, "yyyy-MM-dd")}T${breakTime.start}`
        ).getTime()
      : null;
    const breakEnd = breakTime
      ? new Date(
          `${format(selectedDate, "yyyy-MM-dd")}T${breakTime.end}`
        ).getTime()
      : null;

    // Convert booked slots to a list of time ranges
    const bookedRanges = bookedSlots.map((slot) => ({
      start: new Date(
        `${format(selectedDate, "yyyy-MM-dd")}T${slot.startTime}`
      ).getTime(),
      end: new Date(
        `${format(selectedDate, "yyyy-MM-dd")}T${slot.endTime}`
      ).getTime(),
    }));

    // Generate all possible slots
    let currentTime = openingTimestamp;

    while (currentTime + totalDuration * 60 * 1000 <= closingTimestamp) {
      const slotStart = new Date(currentTime);
      const slotEnd = new Date(currentTime + totalDuration * 60 * 1000);

      // Count concurrent bookings for this time slot
      const concurrentBookings = bookedRanges.filter(
        (range) =>
          (slotStart.getTime() >= range.start &&
            slotStart.getTime() < range.end) ||
          (slotEnd.getTime() > range.start && slotEnd.getTime() <= range.end) ||
          (slotStart.getTime() <= range.start && slotEnd.getTime() >= range.end)
      ).length;

      let overlapsWithExistingBooking = false;
      if (bookedSlots && bookedSlots.length > 0) {
        for (const booking of bookedSlots) {
          const bookingStart = parseTime(booking.startTime);
          const bookingEnd = parseTime(booking.endTime);

          // Check if the new slot overlaps with the booking
          if (
            (slotStart < bookingEnd && slotEnd > bookingStart) ||
            slotStart.getTime() === bookingStart.getTime()
          ) {
            overlapsWithExistingBooking = true;
            break;
          }
        }
      }

      // Skip if this slot overlaps with existing bookings
      if (overlapsWithExistingBooking) {
        continue;
      }

      // Check if the slot has available capacity
      const hasCapacity = concurrentBookings < salonCapacity.maxBookingsPerHour;

      // Check if the slot overlaps with the break time
      const isDuringBreak =
        breakStart &&
        breakEnd &&
        ((slotStart.getTime() >= breakStart &&
          slotStart.getTime() < breakEnd) ||
          (slotEnd.getTime() > breakStart && slotEnd.getTime() <= breakEnd));

      if (hasCapacity && !isDuringBreak) {
        return true; // At least one available slot
      }
      // Move to the next slot (e.g., every 15 minutes)
      currentTime += 15 * 60 * 1000;
    }

    return false;
  };

  // Generate available time slots based on bookings and capacity
  const generateAvailableSlots = (
    bookedSlots: TimeSlot[] | undefined,
    totalDuration: number,
    selectedDate: Date,
    workingHours: WorkingHours,
    salonCapacity: SalonCapacity,
    period?: "morning" | "afternoon" | "anytime",
    config: SchedulerConfig = {
      slotDuration: totalDuration,
      minStartInterval: 20,
      maxCapacityPerSlot: salonCapacity.maxBookingsPerHour,
      maxDailyCapacity: Math.floor(salonCapacity.totalDailyHours * 60), // Convert hours to minutes
      buffer: 5,
    }
  ) => {
    if (!isBookingEnabled(workingHours)) {
      return []; // Admin has disabled bookings for this day
    }

    if (
      !hasSalonCapacity(
        totalDuration,
        salonCapacity.bookedHours,
        salonCapacity.totalDailyHours
      )
    ) {
      return []; // Not enough capacity left for the day
    }

    const availableSlots: { startTime: string; endTime: string }[] = [];

    const { openingTime, closingTime, breakTime } = workingHours;

    const startDate = parseTime(openingTime);
    const endDate = parseTime(closingTime);
    const startBreakTime = parseTime(breakTime?.start || "12:00");
    const endBreakTime = parseTime(breakTime?.end || "13:00");

    const totalMinutes =
      (endDate.getTime() - startDate.getTime()) / (1000 * 60);

    // Create a map to track bookings for each time slot
    const bookingsByTime: Record<number, number> = {};

    // Initialize booking count for each time slot
    for (let minute = 0; minute < totalMinutes; minute += 15) {
      const timeSlot = startDate.getTime() + minute * 60 * 1000;
      bookingsByTime[timeSlot] = 0;
    }

    // Count existing bookings for each time slot
    if (bookedSlots && bookedSlots.length > 0) {
      bookedSlots.forEach((slot) => {
        const start = parseTime(slot.startTime).getTime();
        const end = parseTime(slot.endTime).getTime();

        // Mark all 15-minute intervals within this booking as occupied
        for (let time = start; time < end; time += 15 * 60 * 1000) {
          if (bookingsByTime[time] !== undefined) {
            bookingsByTime[time] += 1;
          }
        }
      });
    }

    // Track daily capacity usage (in minutes)
    let dailyCapacityUsed = salonCapacity.bookedHours * 60; // Convert hours to minutes

    // Generate slots
    for (
      let minute = 0;
      minute < totalMinutes;
      minute += config.minStartInterval
    ) {
      // Check if we've reached max daily capacity
      if (dailyCapacityUsed + totalDuration >= config.maxDailyCapacity) {
        break;
      }

      const slotStart = new Date(startDate.getTime() + minute * 60 * 1000);
      const slotEnd = new Date(
        slotStart.getTime() + config.slotDuration * 60 * 1000
      );
      const displayEndTime = new Date(
        slotEnd.getTime() + config.buffer * 60 * 1000
      );

      // Skip if slot extends beyond closing time
      if (slotEnd > endDate) continue;

      // MODIFIED BREAK TIME HANDLING:
      // Only prevent slots from starting during break time
      // Long services can overlap the break time if they start before the break
      if (
        startBreakTime &&
        endBreakTime &&
        slotStart >= startBreakTime &&
        slotStart < endBreakTime
      ) {
        continue; // Skip if service would start during break time
      }

      // Skip if service would overlap with break time
      if (
        startBreakTime &&
        endBreakTime &&
        slotStart < startBreakTime &&
        slotEnd > startBreakTime
      ) {
        continue;
      }

      let overlapsWithExistingBooking = false;
      if (bookedSlots && bookedSlots.length > 0) {
        for (const booking of bookedSlots) {
          const bookingStart = parseTime(booking.startTime);
          const bookingEnd = parseTime(booking.endTime);

          // Check if the new slot overlaps with the booking
          if (slotStart < bookingEnd && slotEnd > bookingStart) {
            overlapsWithExistingBooking = true;
            break;
          }
        }
      }

      // Skip if this slot overlaps with existing bookings
      if (overlapsWithExistingBooking) {
        continue;
      }
      // Check if this slot has enough capacity (check all 15-min intervals)
      let hasCapacity = true;
      const slotStartTime = slotStart.getTime();
      const slotEndTime = slotEnd.getTime();

      for (
        let time = slotStartTime;
        time < slotEndTime;
        time += 15 * 60 * 1000
      ) {
        if (bookingsByTime[time] >= config.maxCapacityPerSlot) {
          hasCapacity = false;
          break;
        }
      }

      if (hasCapacity) {
        availableSlots.push({
          startTime: formatTime(slotStart),
          endTime: formatTime(displayEndTime),
        });

        // Update capacity used
        dailyCapacityUsed += totalDuration;
      }
    }

    // Filter slots based on period (morning/afternoon)
    const filterByPeriod = (slots: TimeSlot[]): TimeSlot[] => {
      if (!period || period === "anytime") {
        return slots; // Return all slots if no period specified or "anytime"
      }
      return slots.filter((slot) => {
        const [hours] = convertTo24Hour(slot.startTime).split(":");
        const hour = parseInt(hours, 10);

        if (period === "morning") {
          return hour < 12;
        } else if (period === "afternoon") {
          return hour >= 12;
        }
        return true;
      });
    };

    return filterByPeriod(availableSlots);
  };

  const renderTimeSlots = () => {
    if (!selectedDate) return null;

    const dateString = format(selectedDate, "yyyy-MM-dd");
    const dateData = availabilityData?.dates[dateString];

    console.log(dateData);
    // Check if booking is disabled for this day
    if (!isBookingEnabled(workingHours)) {
      return (
        <div className="rounded-md bg-gray-100 p-4 text-center">
          <p>Bookings are not available for this date</p>
          <p className="mt-2 text-sm text-gray-500">
            Please select another date
          </p>
        </div>
      );
    }
    // Check if the salon has enough capacity for the day
    if (
      !hasSalonCapacity(
        totalBooking.totalGroupDuration,
        salonCapacity.bookedHours,
        salonCapacity.totalDailyHours
      )
    ) {
      return (
        <div className="rounded-md bg-gray-100 p-4 text-center">
          <p>We&apos;re fully booked for this date</p>
          <p className="mt-2 text-sm text-gray-500">
            Please select another date
          </p>
        </div>
      );
    }

    // Calculate if the date has available slots
    const isAvailable = isDateAvailabe(
      dateData?.bookedSlot,
      totalBooking.totalGroupDuration,
      selectedDate,
      workingHours,
      salonCapacity
    );

    if (!isAvailable) {
      return (
        <div className="rounded-md bg-gray-100 p-4 text-center">
          <p>No available time slots for this date</p>
          <p className="mt-2 text-sm text-gray-500">
            Please select another date
          </p>
        </div>
      );
    }
    const availableSlots = generateAvailableSlots(
      dateData?.bookedSlot || [],
      totalBooking.totalGroupDuration,
      selectedDate,
      workingHours,
      salonCapacity,
      "anytime",
      {
        slotDuration: totalBooking.totalGroupDuration,
        minStartInterval: 20,
        maxCapacityPerSlot: salonCapacity.maxBookingsPerHour,
        maxDailyCapacity: salonCapacity.totalDailyHours * 60, // Convert hours to minutes
        buffer: 5,
      }
    );

    console.log(
      "Existing bookings:",
      dateData?.bookedSlot || [{ startTime: "10:00", endTime: "14:35" }]
    );
    console.log("Service duration:", totalBooking.totalGroupDuration);
    console.log("Working hours:", workingHours);
    console.log("Salon capacity:", salonCapacity);
    console.log("Generated slots:", availableSlots);
    if (availableSlots.length === 0) {
      return (
        <div className="rounded-md bg-gray-100 p-4 text-center">
          <p>No available time slots for this date</p>
          <p className="mt-2 text-sm text-gray-500">
            Please select another date
          </p>
        </div>
      );
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
                "bg-[#FED8DE] text-secondary border-secondary"
            )}
            onClick={() => handleTimeSelect(slot.startTime, slot.endTime)}
          >
            {slot.startTime} - {slot.endTime}
          </Button>
        ))}
      </div>
    );
  };

  if (loading) {
    return (
      <div className="py-10 text-center">Loading available time slots...</div>
    );
  }

  return (
    <div className="z-20 w-full space-y-6">
      <h2 className="text-xl font-bold">
        {`Select a Time - ${selectedDate ? formatDate(format(selectedDate, "yyyy-MM-dd")) : ""}`}
      </h2>

      <>
        {renderTimeSlots()}
        {/* {renderDailyAvailability()} */}
      </>

      <div className="mt-8 flex justify-between">
        <Button
          variant="outline"
          onClick={() => {
            onBack();
          }}
        >
          Back
        </Button>
      </div>
    </div>
  );
}
