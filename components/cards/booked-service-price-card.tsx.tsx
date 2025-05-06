// @flow
import { motion } from "framer-motion";
import { Clock } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import * as React from "react";

import { durations } from "@/config/constants";
import { useIsMobile } from "@/hooks/use-mobile";
import { Booking, Service } from "@/types";

type Props = {
  bookedService: Booking;
  services: Service[];
};
export const BookedServicePriceCard = (props: Props) => {
  const isMobile = useIsMobile();
  const clipPathValue = `path('M208.547 3.69231C224.543 3.75389 239.874 10.1006 251.232 21.3634C262.591 32.6263 269.068 47.9026 269.265 63.8974C269.335 81.6567 276.374 98.6786 288.868 111.3C301.361 123.922 318.311 131.134 336.068 131.385H336.752C352.634 131.767 367.74 138.328 378.861 149.672C389.982 161.017 396.241 176.251 396.308 192.137V277.607C396.253 293.681 389.835 309.079 378.456 320.433C367.077 331.786 351.664 338.17 335.59 338.188H64.4103C48.3124 338.17 32.8791 331.767 21.4962 320.384C10.1133 309.001 3.71041 293.568 3.69231 277.47V64.4103C3.71041 48.3124 10.1133 32.8791 21.4962 21.4962C32.8791 10.1133 48.3124 3.71041 64.4103 3.69231H208.547Z')`;
  // Animation variants
  const cardVariants = {
    initial: { opacity: 0, y: 20 },
    animate: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
    hover: {
      y: -8,
      transition: { duration: 0.3, ease: "easeOut" },
    },
  };

  const imageVariants = {
    initial: { scale: 1 },
    hover: {
      scale: 1.05,
      transition: { duration: 0.7, ease: "easeOut" },
    },
  };

  const priceCircleVariants = {
    initial: { scale: 0, rotate: -10 },
    animate: {
      scale: 1,
      rotate: 0,
      transition: {
        delay: 0.3,
        duration: 0.5,
        type: "spring",
        stiffness: 200,
      },
    },
  };

  const textVariants = {
    initial: { opacity: 0, x: -10 },
    animate: {
      opacity: 1,
      x: 0,
      transition: { delay: 0.2, duration: 0.4 },
    },
  };

  const arrowVariants = {
    initial: { x: 0 },
    hover: {
      x: 5,
      transition: {
        repeat: Infinity,
        repeatType: "reverse" as const,
        duration: 0.6,
      },
    },
  };
  // Generate status colors
  const getStatusColor = (status: string) => {
    switch (status) {
      case "PENDING":
        return "bg-yellow-100 text-yellow-800";
      case "CONFIRMED":
        return "bg-green-100 text-green-800";
      case "CANCELLED":
        return "bg-red-100 text-red-800";
      case "COMPLETED":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const formatDateTime = (datetime: Date): string => {
    const date = datetime;

    // Format date: April 18, 2025
    const dateOptions: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    const formattedDate = date.toLocaleDateString("en-US", dateOptions);

    // Format time: 9:00 AM
    const timeOptions: Intl.DateTimeFormatOptions = {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    };
    const formattedTime = date.toLocaleTimeString("en-US", timeOptions);

    return `${formattedDate} - ${formattedTime}`;
  };

  // Generate booking title
  const generateBookingTitle = (booking: Booking): string => {
    if (!booking.services || booking.services.length === 0) {
      return "Untitled Booking";
    }

    // Use the main service (first non-addon service) as the primary title component
    const mainService =
      booking.services.find((service) => !service.is_addon) ||
      booking.services[0];

    if (booking.services.length === 1) {
      return mainService.name;
    }

    // For multiple services, show main service + count of additional services
    return `${mainService.name} + ${booking.services.length - 1} service${booking.services.length > 2 ? "s" : ""}`;
  };

  // Generate booking ID (first 8 characters of UUID)
  const generateBookingID = (uuid: string): string => {
    return `BK-${uuid.substring(0, 8).toUpperCase()}`;
  };

  return isMobile ? (
    <motion.div
      variants={cardVariants}
      initial="initial"
      animate="animate"
      whileHover="hover"
      className="grid grid-cols-12 gap-4 rounded-[12px] bg-white p-3 shadow-sm transition-shadow duration-300 hover:shadow-md dark:bg-dark-300"
    >
      <div className="relative col-span-4 h-[100px] overflow-hidden rounded-[12px]">
        <motion.div variants={imageVariants} className="size-full">
          <Image
            src={
              props.services.find(
                (ser) => ser.id === props.bookedService.services?.[0]?.id,
              )?.featured_image ||
              "https://res.cloudinary.com/davidleo/image/upload/v1739726284/landtana/IMG-20250114-WA0041_tra4t4.jpg"
            }
            alt="Box Braid"
            fill
            className="relative z-10 size-full object-cover object-center"
          />
        </motion.div>
      </div>
      <div className="relative col-span-8 flex h-full flex-col justify-between py-2">
        <div className="flex flex-col justify-between gap-1">
          <motion.h3
            variants={textVariants}
            className="font-cormorant max-w-[130px] text-lg font-semibold !leading-5 text-gray-800 dark:text-light-800"
          >
            <Link href={`/dashboard/bookings/${props.bookedService.id}`}>
              {generateBookingTitle(props.bookedService)}
            </Link>
          </motion.h3>
          <p className="text-gray-600 dark:text-light-700">
            {props.bookedService.datetime
              ? formatDateTime(new Date(props.bookedService.datetime))
              : "No date available"}
          </p>
          <p className="mt-1 text-sm text-gray-500 dark:text-light-400">
            ID: {generateBookingID(props.bookedService.id)}
          </p>
          <motion.span
            variants={textVariants}
            className="flex items-center gap-1"
          >
            <Clock className="size-4 text-gray-500" />
            <span className="font-lora text-sm font-bold text-gray-500">
              {
                durations.find(
                  (d) =>
                    d.value ===
                    props.bookedService.services?.reduce(
                      (total, service) => total + service.duration,
                      0,
                    ),
                )?.label
              }
            </span>
          </motion.span>
        </div>
        <motion.div whileHover="hover">
          <Link
            href={`/dashboard/bookings/${props.bookedService.id}`}
            className="flex items-center gap-1 text-base font-semibold text-secondary hover:underline dark:text-primaryP"
          >
            View Details
            <motion.span variants={arrowVariants} className="ml-1">
              &rarr;
            </motion.span>
          </Link>
        </motion.div>
        <motion.div
          className="absolute right-0 top-0 -mr-3 -mt-6 flex size-[65px] flex-col items-center justify-center rounded-full border-4 border-primary bg-[#E7FFE3] shadow-md"
          variants={priceCircleVariants}
        >
          <span className="text-xs dark:text-light-400">From</span>
          <h2 className="-mt-1 text-sm font-bold dark:text-black">
            {props.bookedService.services
              ? `$${props.bookedService.services.reduce((total, service) => total + parseFloat(service.base_price), 0).toFixed(2)}`
              : "0"}{" "}
          </h2>
        </motion.div>
      </div>
    </motion.div>
  ) : (
    <motion.div
      className="relative flex w-[400px] flex-col gap-1"
      variants={cardVariants}
      initial="initial"
      animate="animate"
      whileHover="hover"
    >
      <div className="relative h-[350px]">
        <motion.div
          className="absolute inset-0 m-1 size-full bg-primary"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          style={{
            clipPath: clipPathValue,
          }}
        />
        <motion.div variants={imageVariants} className="relative size-full">
          <Image
            src={
              props.services.find(
                (ser) => ser.id === props.bookedService.services?.[0]?.id,
              )?.featured_image ||
              "https://res.cloudinary.com/davidleo/image/upload/v1739726284/landtana/IMG-20250114-WA0041_tra4t4.jpg"
            }
            alt="Box Braid"
            fill
            className="relative inset-[-2px] z-10 size-full object-cover object-center"
            style={{
              clipPath: `path('M208.547 3.69231C224.543 3.75389 239.874 10.1006 251.232 21.3634C262.591 32.6263 269.068 47.9026 269.265 63.8974C269.335 81.6567 276.374 98.6786 288.868 111.3C301.361 123.922 318.311 131.134 336.068 131.385H336.752C352.634 131.767 367.74 138.328 378.861 149.672C389.982 161.017 396.241 176.251 396.308 192.137V277.607C396.253 293.681 389.835 309.079 378.456 320.433C367.077 331.786 351.664 338.17 335.59 338.188H64.4103C48.3124 338.17 32.8791 331.767 21.4962 320.384C10.1133 309.001 3.71041 293.568 3.69231 277.47V64.4103C3.71041 48.3124 10.1133 32.8791 21.4962 21.4962C32.8791 10.1133 48.3124 3.71041 64.4103 3.69231H208.547Z')`,
            }}
          />
        </motion.div>
      </div>
      <motion.div
        className="absolute right-0 top-0 mr-2 mt-3 flex size-[100px] flex-col items-center justify-center rounded-full border-4 border-primary bg-[#E7FFE3] shadow-lg"
        variants={priceCircleVariants}
      >
        <span className="text-xs dark:text-light-400">From</span>
        <h2 className="text-2xl font-bold dark:text-black">
          {props.bookedService.services
            ? `$${props.bookedService.services.reduce((total, service) => total + parseFloat(service.base_price), 0).toFixed(2)}`
            : "0"}
        </h2>
        <motion.span
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6, duration: 0.3 }}
          className="absolute -bottom-1 -right-1 flex size-6 items-center justify-center rounded-full bg-accent text-xs font-bold text-white"
        >
          🔥
        </motion.span>
      </motion.div>
      <div className="z-10 flex flex-col gap-1">
        <div className="flex items-center gap-2">
          {props.bookedService.is_group && (
            <span className="bg-green-100 text-xs text-green-600">
              Group Service
            </span>
          )}
          <span
            className={`w-fit rounded-full px-3 py-1 text-xs font-medium ${getStatusColor(props.bookedService.status)}`}
          >
            {props.bookedService.status}
          </span>
        </div>
        <motion.h3
          variants={textVariants}
          className="cursor-pointer text-[24px] font-bold text-[#0C090A] dark:text-light-800"
        >
          <Link href={`/dashboard/bookings/${props.bookedService.id}`}>
            {generateBookingTitle(props.bookedService)}
          </Link>
        </motion.h3>
        <div className="flex flex-row-reverse items-center justify-between">
          <p className="flex flex-col">
            <span className="text-base font-normal text-[#757374] dark:text-light-500">
              Date and Time
            </span>
            <span className="text-[18px] font-medium text-[#3D3D3D] dark:text-light-600">
              {props.bookedService.datetime
                ? formatDateTime(new Date(props.bookedService.datetime))
                : "No date available"}
            </span>
          </p>
          <p className="flex flex-col">
            <span className="text-base font-normal text-[#757374] dark:text-light-500">
              Booking ID
            </span>
            <span className="text-[18px] font-medium text-[#3D3D3D] dark:text-light-600">
              {generateBookingID(props.bookedService.id)}
            </span>
          </p>
        </div>

        <motion.div whileHover="hover" className="mt-1">
          <Link
            href={`/dashboard/bookings/${props.bookedService.id}`}
            className="group flex items-center gap-1 text-base font-semibold text-secondary hover:underline dark:text-primaryP"
          >
            <span>View Details</span>
            <motion.span
              variants={arrowVariants}
              className="ml-1 transition-transform duration-300"
            >
              &rarr;
            </motion.span>
          </Link>
        </motion.div>
      </div>

      <motion.div
        className="absolute right-2 top-2 z-20 mr-2 mt-[30%] -translate-y-1/2"
        initial={{ opacity: 0, rotate: -20 }}
        animate={{ opacity: 1, rotate: 0 }}
        transition={{ delay: 0.5, duration: 0.5 }}
      >
        <Image
          src="/assets/icons/star-two.svg"
          width={20}
          height={20}
          alt="star"
        />
      </motion.div>
      {/* <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="absolute bottom-16 left-0 h-0.5 w-full origin-left bg-gradient-to-r from-primary/50 to-transparent"
      /> */}
    </motion.div>
  );
};
