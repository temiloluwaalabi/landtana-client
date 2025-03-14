"use client";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Facebook,
  Instagram,
  Youtube,
  MapPin,
  Clock,
  PhoneCall,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { useInView } from "react-intersection-observer";

import { Button } from "@/components/ui/button";

import MaxWidthContainer from "../shared/max-width-container";

export const MainFooter = () => {
  // Create refs for animations
  const [footerRef, footerInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [hoursRef] = useInView({
    triggerOnce: true,
    threshold: 0.2,
    delay: 200,
  });

  const [menuRef] = useInView({
    triggerOnce: true,
    threshold: 0.2,
    delay: 300,
  });

  const [contactRef] = useInView({
    triggerOnce: true,
    threshold: 0.2,
    delay: 400,
  });

  const staggerChildren = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const fadeInUp = {
    hidden: { y: 20, opacity: 0 },
    show: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10,
      },
    },
  };

  const hourRowVariant = {
    hidden: { x: -20, opacity: 0 },
    show: { x: 0, opacity: 1 },
  };

  return (
    <footer
      ref={footerRef}
      className="overflow-hidden bg-gradient-to-br from-primary to-accent py-6 text-white"
    >
      <MaxWidthContainer>
        <motion.div
          initial="hidden"
          animate={footerInView ? "show" : "hidden"}
          variants={staggerChildren}
          className="relative grid grid-cols-1 gap-6 md:grid-cols-12 xl:gap-12"
        >
          {/* Decorative Elements */}
          <motion.div
            className="absolute -right-10 -top-10 size-40 rounded-full bg-pink-500/10 blur-3xl"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              repeatType: "reverse",
            }}
          />
          <motion.div
            className="absolute -bottom-20 -left-20 size-60 rounded-full bg-purple-500/10 blur-3xl"
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.2, 0.4, 0.2],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              repeatType: "reverse",
            }}
          />

          {/* Hours Section */}
          <motion.div
            ref={hoursRef}
            variants={fadeInUp}
            className="relative col-span-1 md:col-span-4"
          >
            <motion.div
              className="h-full rounded-2xl border border-white/10 bg-white/5 p-6 shadow-lg backdrop-blur-sm"
              whileHover={{
                y: -5,
                boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)",
              }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <motion.h3
                variants={fadeInUp}
                className="mb-6 flex items-center text-xl font-semibold"
              >
                <Clock className="mr-2 size-5 text-pink-300" />
                <span className="bg-gradient-to-r from-pink-300 to-purple-300 bg-clip-text text-transparent">
                  SALON HOURS
                </span>
              </motion.h3>

              <motion.div variants={staggerChildren} className="space-y-3">
                {[
                  { day: "Sunday", hours: "Closed" },
                  { day: "Monday", hours: "8:00am - 6:00pm" },
                  { day: "Tuesday", hours: "8:00am - 8:00pm" },
                  { day: "Wednesday", hours: "8:00am - 8:00pm" },
                  { day: "Thursday", hours: "8:00am - 8:00pm" },
                  { day: "Friday", hours: "8:00am - 7:00pm" },
                  { day: "Saturday", hours: "8:00am - 5:00pm" },
                ].map((item) => (
                  <motion.div
                    key={item.day}
                    variants={hourRowVariant}
                    className={`flex items-center justify-between border-b border-white/10 py-2 ${
                      item.day === "Sunday" ? "opacity-70" : ""
                    }`}
                  >
                    <span className="font-medium">{item.day}</span>
                    <span
                      className={`font-lora ${item.day === "Sunday" ? "" : "text-pink-200"}`}
                    >
                      {item.hours}
                    </span>
                  </motion.div>
                ))}
              </motion.div>

              <motion.div
                variants={fadeInUp}
                className="mt-4 text-xs italic text-white/70"
              >
                <p>*Need earlier or later? Ask about our availability</p>
                <p>**Hours vary slightly according to appointments</p>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Menu Section */}
          <motion.div
            ref={menuRef}
            variants={fadeInUp}
            className="col-span-1 md:col-span-5"
          >
            <motion.div
              className="h-full rounded-2xl border border-white/10 bg-white/5 p-6 shadow-lg backdrop-blur-sm"
              whileHover={{
                y: -5,
                boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)",
              }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <motion.h3
                variants={fadeInUp}
                className="mb-6 bg-gradient-to-r from-pink-300 to-purple-300 bg-clip-text text-xl font-semibold text-transparent"
              >
                EXPLORE OUR SALON
              </motion.h3>

              <motion.div
                variants={staggerChildren}
                className="grid grid-cols-3 gap-6"
              >
                {/* About Column */}
                <div className="space-y-4">
                  <motion.h6
                    variants={fadeInUp}
                    className="relative text-base font-semibold"
                  >
                    <span className="bg-gradient-to-r from-pink-300 to-purple-300 bg-clip-text text-transparent">
                      About
                    </span>
                    <motion.span
                      className="mt-1 block h-0.5 bg-gradient-to-r from-pink-500 to-purple-500"
                      initial={{ width: 0 }}
                      animate={{ width: "100%" }}
                      transition={{ delay: 0.5, duration: 0.8 }}
                    />
                  </motion.h6>

                  <motion.div
                    variants={staggerChildren}
                    className="flex flex-col gap-3"
                  >
                    {[
                      "Our Staff",
                      "Our Salon",
                      "General Policies",
                      "Job Board",
                      "Gallery",
                      "Press",
                    ].map((item) => (
                      <motion.div key={item} variants={fadeInUp}>
                        <Link
                          href={`/${item.toLowerCase().replace(/\s+/g, "-")}`}
                          className="group flex items-center text-sm transition-colors duration-300 hover:text-pink-300"
                        >
                          <motion.span
                            initial={{ width: 0 }}
                            className="mr-2 h-0.5 w-0 bg-pink-400 transition-all duration-300 group-hover:w-2"
                          />
                          {item}
                        </Link>
                      </motion.div>
                    ))}
                  </motion.div>
                </div>

                {/* Services Column */}
                <div className="space-y-4">
                  <motion.h6
                    variants={fadeInUp}
                    className="relative text-base font-semibold"
                  >
                    <span className="bg-gradient-to-r from-pink-300 to-purple-300 bg-clip-text text-transparent">
                      Services
                    </span>
                    <motion.span
                      className="mt-1 block h-0.5 bg-gradient-to-r from-pink-500 to-purple-500"
                      initial={{ width: 0 }}
                      animate={{ width: "100%" }}
                      transition={{ delay: 0.7, duration: 0.8 }}
                    />
                  </motion.h6>

                  <motion.div
                    variants={staggerChildren}
                    className="flex flex-col gap-3"
                  >
                    {[
                      "Hair Cuts",
                      "Hair Coloring",
                      "Braiding",
                      "Extensions",
                      "Treatments",
                      "Styling",
                    ].map((item) => (
                      <motion.div key={item} variants={fadeInUp}>
                        <Link
                          href={`/services/${item.toLowerCase().replace(/\s+/g, "-")}`}
                          className="group flex items-center text-sm transition-colors duration-300 hover:text-pink-300"
                        >
                          <motion.span
                            initial={{ width: 0 }}
                            className="mr-2 h-0.5 w-0 bg-pink-400 transition-all duration-300 group-hover:w-2"
                          />
                          {item}
                        </Link>
                      </motion.div>
                    ))}
                  </motion.div>
                </div>

                {/* Others Column */}
                <div className="space-y-4">
                  <motion.h6
                    variants={fadeInUp}
                    className="relative text-base font-semibold"
                  >
                    <span className="bg-gradient-to-r from-pink-300 to-purple-300 bg-clip-text text-transparent">
                      Resources
                    </span>
                    <motion.span
                      className="mt-1 block h-0.5 bg-gradient-to-r from-pink-500 to-purple-500"
                      initial={{ width: 0 }}
                      animate={{ width: "100%" }}
                      transition={{ delay: 0.9, duration: 0.8 }}
                    />
                  </motion.h6>

                  <motion.div
                    variants={staggerChildren}
                    className="flex flex-col gap-3"
                  >
                    {[
                      "Blog",
                      "FAQs",
                      "Privacy Policy",
                      "Terms",
                      "Contact Us",
                    ].map((item) => (
                      <motion.div key={item} variants={fadeInUp}>
                        <Link
                          href={`/${item.toLowerCase().replace(/\s+/g, "-")}`}
                          className="group flex items-center text-sm transition-colors duration-300 hover:text-pink-300"
                        >
                          <motion.span
                            initial={{ width: 0 }}
                            className="mr-2 h-0.5 w-0 bg-pink-400 transition-all duration-300 group-hover:w-2"
                          />
                          {item}
                        </Link>
                      </motion.div>
                    ))}
                  </motion.div>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Contact Section */}
          <motion.div
            ref={contactRef}
            variants={fadeInUp}
            className="col-span-1 md:col-span-3"
          >
            <motion.div
              className="h-full rounded-2xl border border-white/10 bg-white/5 p-6 shadow-lg backdrop-blur-sm"
              whileHover={{
                y: -5,
                boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)",
              }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              {/* Booking Section */}
              <motion.div variants={fadeInUp} className="mb-8">
                <h3 className="mb-4 flex items-center text-xl font-semibold">
                  <span className="bg-gradient-to-r from-pink-300 to-purple-300 bg-clip-text text-transparent">
                    BOOKING 24/7
                  </span>
                </h3>

                <motion.div
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <Button className="w-full rounded-full bg-gradient-to-r from-pink-500 to-purple-500 py-6 text-sm font-medium text-white shadow-lg shadow-purple-500/20 hover:from-pink-600 hover:to-purple-600">
                    Book Your Appointment
                    <motion.div
                      animate={{ x: [0, 5, 0] }}
                      transition={{ repeat: Infinity, duration: 1.5 }}
                    >
                      <ArrowRight className="ml-2 size-4" />
                    </motion.div>
                  </Button>
                </motion.div>
              </motion.div>

              {/* Location Section */}
              <motion.div variants={fadeInUp} className="space-y-4">
                <h3 className="mb-2 flex items-center text-xl font-semibold">
                  <MapPin className="mr-2 size-5 text-pink-300" />
                  <span className="bg-gradient-to-r from-pink-300 to-purple-300 bg-clip-text text-transparent">
                    FIND US
                  </span>
                </h3>

                <div className="space-y-3">
                  <motion.p variants={fadeInUp} className="flex flex-col">
                    <span className="mb-1 text-sm font-bold uppercase tracking-wider">
                      Landtana Crown Braids
                    </span>
                    <Link
                      target="_blank"
                      href="https://www.google.com/maps?daddr=6923+W+Loop+1604+N+suite+214,+San+Antonio,+TX+78254"
                      className="text-sm text-pink-200 transition-colors hover:text-white"
                    >
                      6923 W Loop 1604 N suite 214,
                      <br />
                      San Antonio, TX 78254
                    </Link>
                    <a
                      href="tel:8303506003"
                      className="mt-1 flex items-center text-sm transition-colors hover:text-pink-200"
                    >
                      <PhoneCall className="mr-1 size-3" />
                      (830) 350-6003
                    </a>
                  </motion.p>

                  <motion.p variants={fadeInUp}>
                    <Link
                      target="_blank"
                      href="https://www.google.com/maps?daddr=6923+W+Loop+1604+N+suite+214,+San+Antonio,+TX+78254"
                      className="inline-flex items-center rounded-full bg-white/10 px-3 py-1 text-sm font-medium transition-colors hover:bg-white/20"
                    >
                      Get Directions
                      <ArrowRight className="ml-1 size-3" />
                    </Link>
                  </motion.p>
                </div>

                {/* Social Icons */}
                <motion.div
                  variants={staggerChildren}
                  className="mt-4 flex items-center gap-3"
                >
                  {[
                    {
                      icon: <Facebook className="size-4" />,
                      url: "https://www.facebook.com/share/1E7hwFDthG/?mibextid=wwXIfr",
                    },
                    {
                      icon: <Instagram className="size-4" />,
                      url: "https://www.instagram.com/landtanacrownbraids",
                    },
                    {
                      icon: <Youtube className="size-4" />,
                      url: "https://youtube.com/@landtanacrownbraids?si=4icQcgwRzjJEmf54",
                    },
                    {
                      icon: <Instagram className="size-4" />,
                      url: "https://www.instagram.com/landtanacrownbraids",
                    },
                  ].map((social, index) => (
                    <motion.div
                      key={index}
                      variants={fadeInUp}
                      whileHover={{ y: -3, scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Link
                        href={social.url}
                        className="flex size-10 items-center justify-center rounded-full bg-white/10 backdrop-blur-sm transition-all duration-300 hover:bg-gradient-to-br hover:from-pink-500 hover:to-purple-500"
                        aria-label={`Social media link ${index + 1}`}
                      >
                        {social.icon}
                      </Link>
                    </motion.div>
                  ))}
                </motion.div>
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Footer Bottom */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={footerInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="mt-12 flex flex-col items-center justify-between border-t border-white/10  pt-10 sm:flex-row"
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300, damping: 10 }}
            className="w-full"
          >
            <p className="text-center text-sm sm:text-left">
              <span className="block sm:inline">
                ©2025 Landtana Crown Braids
              </span>
              <span className="mx-2 hidden sm:inline">•</span>
              <span className="block text-xs text-pink-300 sm:inline">
                Elevating Beauty, One Braid at a Time
              </span>
            </p>
          </motion.div>

          <motion.div
            whileHover={{ rotate: [0, -5, 5, -5, 0] }}
            transition={{ duration: 0.5 }}
            className="my-4 flex w-full items-center justify-center  sm:my-0"
          >
            <Image
              width={64}
              height={64}
              src="https://res.cloudinary.com/davidleo/image/upload/v1739262236/landtana/landtana_white_logo_fk4adm.png"
              alt="Landtana Crown Braids Logo"
              className="size-12 object-contain sm:size-16"
            />
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300, damping: 10 }}
            className="w-full"
          >
            <Link
              className="flex justify-end text-center text-sm text-white/70 transition-colors hover:text-white sm:text-right lg:text-right"
              href="https://davidleotech.com"
            >
              Designed By{" "}
              <span className="font-medium text-pink-300">DavidLeoTech</span>
            </Link>
          </motion.div>
        </motion.div>
      </MaxWidthContainer>
    </footer>
  );
};
