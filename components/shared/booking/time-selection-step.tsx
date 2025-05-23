/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";

import { format, parse } from "date-fns";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { useBookingStore } from "@/lib/use-booking-store";
import { calculateBookingDetails, cn } from "@/lib/utils";
import { Booking, Service } from "@/types";

// interface SchedulerConfig {
//   slotDuration: number; // in minutes
//   minStartInterval: number; // minimum minutes between slot starts (20 or 25)
//   maxCapacityPerSlot: number; // maximum concurrent bookings allowed per time slot
//   maxDailyCapacity: number; // maximum total capacity for the day (in service hours)
//   buffer: number; // buffer time between appointments in minutes
// }

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
  // const [availabilityData, setAvailabilityData] =
  //   useState<AvailabilityResponse>();

  const [salonCapacity, setSalonCapacity] = useState<SalonCapacity>({
    totalDailyHours: 13, // Default to 8 hours per day
    maxBookingsPerHour: 2, // Default to 2 concurrent bookings per hour
    bookedHours: 0,
  });
  const [workingHours, setWorkingHours] = useState<WorkingHours>({
    openingTime: "08:00",
    closingTime: "20:00",
    breakTime: { start: "12:00", end: "13:00" },
    isBookingEnabled: true,
  });

  const [loading, setLoading] = useState(true);
  const { bookings, date, time, updateState } = useBookingStore();

  const selectedDate = date;

  // const convertTo24Hour = (timeStr: string): string => {
  //   const [time, modifier] = timeStr.split(" ");
  //   let [hours, minutes] = time.split(":");

  //   if (hours === "12") {
  //     hours = modifier === "AM" ? "00" : "12";
  //   } else if (modifier === "PM") {
  //     hours = String(parseInt(hours, 10) + 12);
  //   }

  //   return `${hours.padStart(2, "0")}:${minutes}`;
  // };
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
        // setAvailabilityData(sampleAvailabilityData);

        const mockCapacity: SalonCapacity = {
          totalDailyHours: 13,
          maxBookingsPerHour: 2,
          bookedHours: 2,
        };

        setSalonCapacity(mockCapacity);

        // Mock data for now
        const mockWorkingHours: WorkingHours = {
          openingTime: "08:00",
          closingTime: "20:00",
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

  const handleTimeSelect = (time: string) => {
    if (!selectedDate) return;
    // Update the booking with the selected time
    updateState({
      time: `${time}`,
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
    totalDailyHours: number,
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

  const generateAvailableStartTimes = (
    bookings: Booking[] | undefined,
    serviceMinDuration: number, // Minimum expected duration of service in minutes
    selectedDate: Date,
    workingHours: WorkingHours,
    salonCapacity: SalonCapacity,
    intervalMinutes: number = 30, // Time between slots (30 min by default)
  ) => {
    if (!isBookingEnabled(workingHours)) {
      return [];
    }

    if (
      !hasSalonCapacity(
        serviceMinDuration,
        salonCapacity.bookedHours,
        salonCapacity.totalDailyHours,
      )
    ) {
      return [];
    }
    const availableStartTimes: string[] = [];
    const { openingTime, closingTime, breakTime } = workingHours;

    const startDate = parseTime(openingTime);
    const endDate = parseTime(closingTime);
    const startBreakTime = breakTime ? parseTime(breakTime.start) : null;
    const endBreakTime = breakTime ? parseTime(breakTime.end) : null;

    // Calculate total minutes in the working day
    const totalMinutes =
      (endDate.getTime() - startDate.getTime()) / (1000 * 60);

    // Process existing bookings to determine salon occupancy per time slot
    const occupancyByTime: Record<string, number> = {};
    // Initialize occupancy count for each possible time slot (every 15 min for precision)
    for (let minute = 0; minute < totalMinutes; minute += 15) {
      const slotTime = new Date(startDate.getTime() + minute * 60 * 1000);
      const timeKey = formatTime(slotTime);
      occupancyByTime[timeKey] = 0;
    }

    // Count occupancy for each time slot based on existing bookings
    if (bookings && bookings.length > 0) {
      bookings.forEach((booking) => {
        const bookingDate = booking.datetime
          ? new Date(booking.datetime)
          : new Date();
        const bookingStartTime = formatTime(bookingDate);

        // Calculate total duration for this booking
        const totalDuration = (booking.services ?? []).reduce(
          (sum, service) => sum + service.duration,
          0,
        );

        const bookingStartDate = parseTime(bookingStartTime);
        const bookingEndDate = new Date(
          bookingStartDate.getTime() + totalDuration * 60 * 1000,
        );

        // Increment occupancy for each 15-min slot this booking occupies
        for (
          let time = bookingStartDate.getTime();
          time < bookingEndDate.getTime();
          time += 15 * 60 * 1000
        ) {
          const timeSlot = formatTime(new Date(time));
          if (occupancyByTime[timeSlot] !== undefined) {
            occupancyByTime[timeSlot]++;
          }
        }
      });
    }

    // Generate all possible start times at specified intervals
    for (let minute = 0; minute < totalMinutes; minute += intervalMinutes) {
      const slotStart = new Date(startDate.getTime() + minute * 60 * 1000);

      // Skip if start time falls during break
      if (
        startBreakTime &&
        endBreakTime &&
        slotStart >= startBreakTime &&
        slotStart < endBreakTime
      ) {
        continue;
      }

      // Check if starting a service of minimum duration at this time would exceed capacity
      let hasCapacity = true;
      const slotStartTime = slotStart.getTime();

      const potentialEndTime = new Date(
        slotStartTime + serviceMinDuration * 60 * 1000,
      );

      // Skip if service would extend beyond closing time
      if (potentialEndTime > endDate) {
        continue;
      }

      // Check capacity for each 15-min interval this service would occupy
      for (
        let time = slotStartTime;
        time < potentialEndTime.getTime();
        time += 15 * 60 * 1000
      ) {
        const timeSlot = formatTime(new Date(time));

        // Check if adding another booking would exceed max bookings per hour
        if (
          occupancyByTime[timeSlot] !== undefined &&
          occupancyByTime[timeSlot] >= salonCapacity.maxBookingsPerHour
        ) {
          hasCapacity = false;
          break;
        }
      }

      if (hasCapacity) {
        availableStartTimes.push(formatTime(slotStart));
      }
    }

    return availableStartTimes;
  };

  // Generate available time slots based on bookings and capacity
  // const generateAvailableSlots = (
  //   bookedSlots: TimeSlot[] | undefined,
  //   totalDuration: number,
  //   selectedDate: Date,
  //   workingHours: WorkingHours,
  //   salonCapacity: SalonCapacity,
  //   period?: "morning" | "afternoon" | "anytime",
  //   config: SchedulerConfig = {
  //     slotDuration: totalDuration,
  //     minStartInterval: 20,
  //     maxCapacityPerSlot: salonCapacity.maxBookingsPerHour,
  //     maxDailyCapacity: Math.floor(salonCapacity.totalDailyHours * 60), // Convert hours to minutes
  //     buffer: 5,
  //   },
  // ) => {
  //   if (!isBookingEnabled(workingHours)) {
  //     return []; // Admin has disabled bookings for this day
  //   }

  //   if (
  //     !hasSalonCapacity(
  //       totalDuration,
  //       salonCapacity.bookedHours,
  //       salonCapacity.totalDailyHours,
  //     )
  //   ) {
  //     return []; // Not enough capacity left for the day
  //   }

  //   const availableSlots: { startTime: string; endTime: string }[] = [];

  //   const { openingTime, closingTime, breakTime } = workingHours;

  //   const startDate = parseTime(openingTime);
  //   const endDate = parseTime(closingTime);
  //   const startBreakTime = parseTime(breakTime?.start || "12:00");
  //   const endBreakTime = parseTime(breakTime?.end || "13:00");

  //   const totalMinutes =
  //     (endDate.getTime() - startDate.getTime()) / (1000 * 60);

  //   // Create a map to track bookings for each time slot
  //   const bookingsByTime: Record<number, number> = {};

  //   // Initialize booking count for each time slot
  //   for (let minute = 0; minute < totalMinutes; minute += 15) {
  //     const timeSlot = startDate.getTime() + minute * 60 * 1000;
  //     bookingsByTime[timeSlot] = 0;
  //   }

  //   // Count existing bookings for each time slot
  //   if (bookedSlots && bookedSlots.length > 0) {
  //     bookedSlots.forEach((slot) => {
  //       const start = parseTime(slot.startTime).getTime();
  //       const end = parseTime(slot.endTime).getTime();

  //       // Mark all 15-minute intervals within this booking as occupied
  //       for (let time = start; time < end; time += 15 * 60 * 1000) {
  //         if (bookingsByTime[time] !== undefined) {
  //           bookingsByTime[time] += 1;
  //         }
  //       }
  //     });
  //   }

  //   // Track daily capacity usage (in minutes)
  //   let dailyCapacityUsed = salonCapacity.bookedHours * 60; // Convert hours to minutes

  //   // Generate slots
  //   for (
  //     let minute = 0;
  //     minute < totalMinutes;
  //     minute += config.minStartInterval
  //   ) {
  //     // Check if we've reached max daily capacity
  //     if (dailyCapacityUsed + totalDuration >= config.maxDailyCapacity) {
  //       break;
  //     }

  //     const slotStart = new Date(startDate.getTime() + minute * 60 * 1000);
  //     const slotEnd = new Date(
  //       slotStart.getTime() + config.slotDuration * 60 * 1000,
  //     );
  //     const displayEndTime = new Date(
  //       slotEnd.getTime() + config.buffer * 60 * 1000,
  //     );

  //     // Skip if slot extends beyond closing time
  //     if (slotEnd > endDate) continue;

  //     // MODIFIED BREAK TIME HANDLING:
  //     // Only prevent slots from starting during break time
  //     // Long services can overlap the break time if they start before the break
  //     if (
  //       startBreakTime &&
  //       endBreakTime &&
  //       slotStart >= startBreakTime &&
  //       slotStart < endBreakTime
  //     ) {
  //       continue; // Skip if service would start during break time
  //     }

  //     // Skip if service would overlap with break time
  //     if (
  //       startBreakTime &&
  //       endBreakTime &&
  //       slotStart < startBreakTime &&
  //       slotEnd > startBreakTime
  //     ) {
  //       continue;
  //     }

  //     let overlapsWithExistingBooking = false;
  //     if (bookedSlots && bookedSlots.length > 0) {
  //       for (const booking of bookedSlots) {
  //         const bookingStart = parseTime(booking.startTime);
  //         const bookingEnd = parseTime(booking.endTime);

  //         // Check if the new slot overlaps with the booking
  //         if (slotStart < bookingEnd && slotEnd > bookingStart) {
  //           overlapsWithExistingBooking = true;
  //           break;
  //         }
  //       }
  //     }

  //     // Skip if this slot overlaps with existing bookings
  //     if (overlapsWithExistingBooking) {
  //       continue;
  //     }
  //     // Check if this slot has enough capacity (check all 15-min intervals)
  //     let hasCapacity = true;
  //     const slotStartTime = slotStart.getTime();
  //     const slotEndTime = slotEnd.getTime();

  //     for (
  //       let time = slotStartTime;
  //       time < slotEndTime;
  //       time += 15 * 60 * 1000
  //     ) {
  //       if (bookingsByTime[time] >= config.maxCapacityPerSlot) {
  //         hasCapacity = false;
  //         break;
  //       }
  //     }

  //     if (hasCapacity) {
  //       availableSlots.push({
  //         startTime: formatTime(slotStart),
  //         endTime: formatTime(displayEndTime),
  //       });

  //       // Update capacity used
  //       dailyCapacityUsed += totalDuration;
  //     }
  //   }

  //   // Filter slots based on period (morning/afternoon)
  //   const filterByPeriod = (slots: TimeSlot[]): TimeSlot[] => {
  //     if (!period || period === "anytime") {
  //       return slots; // Return all slots if no period specified or "anytime"
  //     }
  //     return slots.filter((slot) => {
  //       const [hours] = convertTo24Hour(slot.startTime).split(":");
  //       const hour = parseInt(hours, 10);

  //       if (period === "morning") {
  //         return hour < 12;
  //       } else if (period === "afternoon") {
  //         return hour >= 12;
  //       }
  //       return true;
  //     });
  //   };

  //   return filterByPeriod(availableSlots);
  // };

  // Render time slots component
  const renderTimeSlots = () => {
    if (!selectedDate) return null;

    // const dateString = format(selectedDate, "yyyy-MM-dd");

    // const dateBookings = availabilityData?.dates.filter(booking =>
    //   format(new Date(booking.booking_datetime), "yyyy-MM-dd") === dateString
    // );

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

    // Get min duration from selected services
    const serviceMinDuration = totalBooking.totalGroupDuration;

    // Generate available start times
    const availableStartTimes = generateAvailableStartTimes(
      [],
      serviceMinDuration,
      selectedDate,
      workingHours,
      salonCapacity,
      60, // 30-minute intervals
    );

    if (availableStartTimes.length === 0) {
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
      <div className="flex w-full flex-wrap gap-2">
        {availableStartTimes.map((startTime, index) => (
          <Button
            key={index}
            className={cn(
              `w-fit justify-center bg-transparent border border-[#D9D9D9] h-[42px]
             text-primary hover:text-white hover:bg-secondary hover:border-secondary`,
              time === startTime &&
                "bg-[#FED8DE] text-secondary border-secondary",
            )}
            onClick={() => handleTimeSelect(startTime)}
          >
            {startTime}
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
