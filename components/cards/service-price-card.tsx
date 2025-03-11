// @flow
import { motion } from "framer-motion";
import { Clock } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import * as React from "react";

import { durations } from "@/config/constants";
import { useIsMobile } from "@/hooks/use-mobile";
import { toCurrency } from "@/lib/utils";
import { Service } from "@/types";

type Props = {
  service: Service;
};
export const ServicePriceCard = (props: Props) => {
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
  return isMobile ? (
    <motion.div
      variants={cardVariants}
      initial="initial"
      animate="animate"
      whileHover="hover"
      className="grid grid-cols-12 gap-4 rounded-[12px] bg-white p-3 shadow-sm transition-shadow duration-300 hover:shadow-md"
    >
      <div className="relative col-span-4 h-[100px] overflow-hidden rounded-[12px]">
        <motion.div variants={imageVariants} className="size-full">
          <Image
            src={
              props.service.featured_image ||
              "https://res.cloudinary.com/davidleo/image/upload/v1739726284/landtana/IMG-20250114-WA0041_tra4t4.jpg"
            }
            alt="Box Braid"
            fill
            className="relative inset-[-2px] z-10 size-full object-cover object-center"
          />
        </motion.div>
      </div>
      <div className="relative col-span-8 flex h-full flex-col justify-between py-2">
        <div className="flex flex-col justify-between gap-1">
          <motion.h3
            variants={textVariants}
            className="max-w-[130px] font-cormorant text-lg font-semibold !leading-5 text-gray-800"
          >
            {props.service.name}
          </motion.h3>
          <motion.span
            variants={textVariants}
            className="flex items-center gap-1"
          >
            <Clock className="size-4 text-gray-500" />
            <span className="font-lora text-sm font-bold text-gray-500">
              {durations.find((d) => d.value === props.service.duration)?.label}
            </span>
          </motion.span>
        </div>
        <motion.div whileHover="hover">
          <Link
            href="#"
            className="flex items-center gap-1 text-base font-semibold text-secondary hover:underline"
          >
            Book Today
            <motion.span variants={arrowVariants} className="ml-1">
              &rarr;
            </motion.span>
          </Link>
        </motion.div>
        <motion.div
          className="absolute right-0 top-0 -mr-6 -mt-6 flex size-[65px] flex-col items-center justify-center rounded-full border-4 border-primary bg-[#E7FFE3] shadow-md"
          variants={priceCircleVariants}
        >
          <span className="text-xs">From</span>
          <h2 className="-mt-1 text-base font-bold">
            {toCurrency(props.service.base_price, true)}
          </h2>
        </motion.div>
        {/* <div className="absolute right-0 top-0 mr-1 mt-2 flex items-center gap-1">
          <span className="text-xs">From</span>
          <h2 className="text-xl font-bold ">
            {toCurrency(props.service.base_price, true)}
          </h2>
        </div> */}
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
              props.service.featured_image ||
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
        <span className="text-xs">From</span>
        <h2 className="text-2xl font-bold">
          {toCurrency(props.service.base_price, true)}
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
        <motion.h3
          variants={textVariants}
          className="cursor-pointer font-cormorant text-2xl font-semibold text-gray-800"
        >
          <Link href={`/services/${props.service.id}`}>
            {props.service.name}
          </Link>
        </motion.h3>
        <motion.span
          variants={textVariants}
          className="flex items-center gap-1"
        >
          <Clock className="size-4 text-gray-500" />
          <span className="font-lora text-base font-bold text-gray-500">
            {durations.find((d) => d.value === props.service.duration)?.label}
          </span>
        </motion.span>
        <motion.div whileHover="hover" className="mt-1">
          <Link
            href={`services/${props.service.id}`}
            className="group flex items-center gap-1 text-base font-semibold text-secondary hover:underline"
          >
            <span>Book Today</span>
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
