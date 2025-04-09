"use client";
import { motion, useAnimation } from "framer-motion";
import {
  MapPin,
  Clock,
  Phone,
  Mail,
  Send,
  Instagram,
  Youtube,
  Facebook,
  ChevronRight,
  Scissors,
  Calendar,
  MessageSquare,
} from "lucide-react";
import React, { useEffect } from "react";
import { useInView } from "react-intersection-observer";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

import MaxWidthContainer from "../max-width-container";

export default function ContactClientPage() {
  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const fadeInRight = {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.7, ease: "easeOut" },
    },
  };

  const fadeInLeft = {
    hidden: { opacity: 0, x: 50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.7, ease: "easeOut" },
    },
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
  };

  // Animation setup with intersection observer
  const [heroRef, heroInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  const [infoRef, infoInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  const [formRef, formInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  const [mapRef, mapInView] = useInView({ triggerOnce: true, threshold: 0.1 });

  const heroControls = useAnimation();
  const infoControls = useAnimation();
  const formControls = useAnimation();
  const mapControls = useAnimation();

  // Trigger animations when sections come into view
  useEffect(() => {
    if (heroInView) heroControls.start("visible");
    if (infoInView) infoControls.start("visible");
    if (formInView) formControls.start("visible");
    if (mapInView) mapControls.start("visible");
  }, [
    heroInView,
    infoInView,
    formInView,
    mapInView,
    heroControls,
    infoControls,
    formControls,
    mapControls,
  ]);

  const businessHours = [
    { day: "Monday", hours: "8:00 AM - 6:00 PM" },
    { day: "Tuesday", hours: "8:00 AM - 8:00 PM" },
    { day: "Wednesday", hours: "8:00 AM - 8:00 PM" },
    { day: "Thursday", hours: "8:00 AM - 8:00 PM" },
    { day: "Friday", hours: "8:00 AM - 7:00 PM" },
    { day: "Saturday", hours: "8:00 AM - 5:00 PM" },
    { day: "Sunday", hours: "CLOSED" },
  ];

  return (
    <main className="relative overflow-hidden bg-gradient-to-b from-white to-gray-50">
      {/* Background Elements */}
      <div className="fixed inset-0 -z-10 opacity-25">
        <div className="absolute -top-24 left-1/3 size-32 rounded-full bg-pink-400 opacity-30 blur-3xl"></div>
        <div className="absolute right-1/4 top-1/3 size-64 rounded-full bg-purple-400 opacity-20 blur-3xl"></div>
        <div className="absolute bottom-1/4 left-1/4 size-48 rounded-full bg-teal-400 opacity-25 blur-3xl"></div>
      </div>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-r from-[#1a1b4b] to-[#123a2b] py-24">
        <div className="absolute inset-0 opacity-10">
          <svg
            className="size-full"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
          >
            <path
              fill="none"
              stroke="white"
              strokeWidth="0.2"
              d="M0,0 Q50,100 100,0 V100 H0 Z"
            />
            <path
              fill="none"
              stroke="white"
              strokeWidth="0.2"
              d="M0,100 Q50,0 100,100 V0 H0 Z"
            />
          </svg>
        </div>
        <div className="container relative z-10 mx-auto px-6">
          <motion.div
            ref={heroRef}
            initial="hidden"
            animate={heroControls}
            variants={staggerContainer}
            className="mx-auto max-w-3xl text-center"
          >
            <motion.div
              className="mb-6 inline-block rounded-full bg-white/10 p-3"
              variants={fadeIn}
              whileHover={{ rotate: 360, transition: { duration: 1 } }}
            >
              <Scissors className="size-8 text-pink-300" />
            </motion.div>

            <motion.h1
              variants={fadeIn}
              className="mb-6 bg-gradient-to-r from-pink-300 to-teal-300 bg-clip-text text-5xl font-extrabold leading-tight tracking-tight text-transparent sm:text-6xl"
            >
              Let&apos;s Connect
            </motion.h1>

            <motion.p
              variants={fadeIn}
              className="mx-auto mb-8 max-w-2xl text-lg text-gray-300"
            >
              We&apos;re here to help you look and feel your best. Reach out to
              schedule an appointment, ask questions, or share your feedback
              with our team.
            </motion.p>

            <motion.div
              variants={fadeIn}
              className="flex flex-wrap justify-center gap-4"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button className="group relative overflow-hidden rounded-full bg-white px-8 py-6 text-lg font-medium text-[#1a1b4b] shadow-lg transition-all hover:shadow-pink-300/30">
                <span className="relative z-10 flex items-center gap-2">
                  <Calendar className="size-5" />
                  Book Appointment
                </span>
                <span className="absolute inset-0 -z-0 scale-x-0 bg-gradient-to-r from-pink-400 to-pink-300 opacity-80 transition-transform duration-300 group-hover:scale-x-100"></span>
              </Button>

              <Button
                variant="outline"
                className="group relative overflow-hidden rounded-full border-white px-8 py-6 text-lg font-medium text-teal-400 transition-all hover:border-transparent"
              >
                <span className="relative z-10 flex items-center gap-2">
                  <Phone className="size-5" />
                  Call Now
                </span>
                <span className="absolute inset-0 -z-0 scale-x-0 bg-gradient-to-r from-teal-400 to-teal-300 opacity-80 transition-transform duration-300 group-hover:scale-x-100"></span>
              </Button>
            </motion.div>
          </motion.div>
        </div>

        {/* Wave Separator */}
        {/* <div className="absolute bottom-0 left-0 w-full">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1440 320"
            fill="#ffffff"
          >
            <path d="M0,224L48,213.3C96,203,192,181,288,181.3C384,181,480,203,576,197.3C672,192,768,160,864,160C960,160,1056,192,1152,208C1248,224,1344,224,1392,224L1440,224L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
          </svg>
        </div> */}
      </section>

      {/* Main Content */}
      <MaxWidthContainer className="px-6 py-16 lg:py-24">
        <div>
          {/* Info Cards Section */}
          <motion.div
            ref={infoRef}
            initial="hidden"
            animate={infoControls}
            variants={staggerContainer}
            className="mb-20"
          >
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
              {/* Location Card */}
              <motion.div
                variants={fadeInRight}
                whileHover={{ y: -10, transition: { duration: 0.3 } }}
              >
                <Card className="group relative z-10 h-full overflow-hidden rounded-xl border-none bg-white/80 shadow-xl backdrop-blur-sm transition-all duration-500 hover:bg-white hover:shadow-2xl">
                  {/* Card glow effect */}
                  <div className="absolute inset-x-0 -bottom-32 top-0 -z-10 translate-y-0 scale-95 transform-gpu rounded-xl bg-gradient-to-br from-pink-200 to-transparent opacity-0 blur-xl transition-all duration-500 group-hover:translate-y-12 group-hover:scale-100 group-hover:opacity-30"></div>

                  <CardHeader className="pb-2">
                    <div className="flex items-center gap-4">
                      <div className="rounded-lg bg-gradient-to-br from-pink-500 to-pink-400 p-3 text-white">
                        <MapPin className="size-6" />
                      </div>
                      <CardTitle className="text-2xl font-bold">
                        Our Studio
                      </CardTitle>
                    </div>
                  </CardHeader>

                  <CardContent className="pb-4">
                    <p className="mb-3 text-lg text-gray-700">
                      Visit our modern salon in a convenient location with
                      complimentary parking.
                    </p>
                    <p className="text-gray-800">
                      <strong>Landtana Crown Braids</strong>
                      <br />
                      6923 W Loop 1604 N, Suite 214
                      <br />
                      San Antonio, TX 78254
                    </p>
                  </CardContent>

                  <CardFooter className="pt-0">
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="w-full"
                    >
                      <Button
                        asChild
                        className="group relative w-full overflow-hidden rounded-lg border-none bg-gradient-to-r from-pink-500 to-pink-400 text-white shadow-md transition-all hover:shadow-lg"
                      >
                        <a
                          href="https://maps.google.com/?q=6923+W+Loop+1604+N+Suite+214+San+Antonio+TX+78254"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-center gap-2 py-6"
                        >
                          <span>Get Directions</span>
                          <motion.span
                            animate={{ x: [0, 5, 0] }}
                            transition={{
                              repeat: Infinity,
                              duration: 1.5,
                              repeatDelay: 0.5,
                            }}
                          >
                            <ChevronRight className="size-5" />
                          </motion.span>
                        </a>
                      </Button>
                    </motion.div>
                  </CardFooter>
                </Card>
              </motion.div>

              {/* Hours Card */}
              <motion.div
                variants={fadeIn}
                whileHover={{ y: -10, transition: { duration: 0.3 } }}
              >
                <Card className="group relative z-10 h-full overflow-hidden rounded-xl border-none bg-white/80 shadow-xl backdrop-blur-sm transition-all duration-500 hover:bg-white hover:shadow-2xl">
                  {/* Card glow effect */}
                  <div className="absolute inset-x-0 -bottom-32 top-0 -z-10 translate-y-0 scale-95 transform-gpu rounded-xl bg-gradient-to-br from-purple-200 to-transparent opacity-0 blur-xl transition-all duration-500 group-hover:translate-y-12 group-hover:scale-100 group-hover:opacity-30"></div>

                  <CardHeader className="pb-2">
                    <div className="flex items-center gap-4">
                      <div className="rounded-lg bg-gradient-to-br from-purple-500 to-purple-400 p-3 text-white">
                        <Clock className="size-6" />
                      </div>
                      <CardTitle className="text-2xl font-bold">
                        Business Hours
                      </CardTitle>
                    </div>
                  </CardHeader>

                  <CardContent>
                    <div className="space-y-2">
                      {businessHours.map((item, i) => (
                        <motion.div
                          key={i}
                          className="flex justify-between border-b border-gray-100 pb-2 last:border-0"
                          whileHover={{ x: 5 }}
                          transition={{
                            type: "spring",
                            stiffness: 300,
                            damping: 17,
                          }}
                        >
                          <span className="font-medium text-gray-800">
                            {item.day}
                          </span>
                          <span className="text-gray-600">{item.hours}</span>
                        </motion.div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Contact Card */}
              <motion.div
                variants={fadeInLeft}
                whileHover={{ y: -10, transition: { duration: 0.3 } }}
              >
                <Card className="group relative z-10 h-full overflow-hidden rounded-xl border-none bg-white/80 shadow-xl backdrop-blur-sm transition-all duration-500 hover:bg-white hover:shadow-2xl">
                  {/* Card glow effect */}
                  <div className="absolute inset-x-0 -bottom-32 top-0 -z-10 translate-y-0 scale-95 transform-gpu rounded-xl bg-gradient-to-br from-teal-200 to-transparent opacity-0 blur-xl transition-all duration-500 group-hover:translate-y-12 group-hover:scale-100 group-hover:opacity-30"></div>

                  <CardHeader className="pb-2">
                    <div className="flex items-center gap-4">
                      <div className="rounded-lg bg-gradient-to-br from-teal-500 to-teal-400 p-3 text-white">
                        <MessageSquare className="size-6" />
                      </div>
                      <CardTitle className="text-2xl font-bold">
                        Get In Touch
                      </CardTitle>
                    </div>
                  </CardHeader>

                  <CardContent className="pb-4">
                    <div className="mb-4 space-y-3">
                      <motion.div
                        className="flex items-center gap-3"
                        whileHover={{ x: 5 }}
                        transition={{
                          type: "spring",
                          stiffness: 300,
                          damping: 17,
                        }}
                      >
                        <Phone className="size-5 text-teal-500" />
                        <a
                          href="tel:8303506003"
                          className="text-lg font-medium text-gray-800 transition-colors hover:text-teal-500"
                        >
                          (830) 350-6003
                        </a>
                      </motion.div>
                      <motion.div
                        className="flex items-center gap-3"
                        whileHover={{ x: 5 }}
                        transition={{
                          type: "spring",
                          stiffness: 300,
                          damping: 17,
                        }}
                      >
                        <Mail className="size-5 text-teal-500" />
                        <a
                          href="mailto:info@landtanacrownbraids.com"
                          className="text-lg font-medium text-gray-800 transition-colors hover:text-teal-500"
                        >
                          info@landtanacrownbraids.com
                        </a>
                      </motion.div>
                    </div>

                    <p className="mb-3 text-gray-600">
                      Follow us on social media for the latest styles and
                      promotions
                    </p>

                    <div className="flex gap-3">
                      <motion.a
                        href="https://www.instagram.com/landtanacrownbraids"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex size-12 items-center justify-center rounded-full bg-gradient-to-br from-pink-500 to-pink-400 text-white shadow-md transition-all hover:shadow-pink-300/30"
                        whileHover={{ y: -5, scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <Instagram className="size-6" />
                      </motion.a>
                      <motion.a
                        href="https://youtube.com/@landtanacrownbraids"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex size-12 items-center justify-center rounded-full bg-gradient-to-br from-red-500 to-red-400 text-white shadow-md transition-all hover:shadow-red-300/30"
                        whileHover={{ y: -5, scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <Youtube className="size-6" />
                      </motion.a>
                      <motion.a
                        href="https://www.facebook.com/share/1E7hwFDthG/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex size-12 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-blue-400 text-white shadow-md transition-all hover:shadow-blue-300/30"
                        whileHover={{ y: -5, scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <Facebook className="size-6" />
                      </motion.a>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </motion.div>

          {/* Contact Form and Map Section */}
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
            {/* Contact Form */}
            <motion.div
              ref={formRef}
              initial="hidden"
              animate={formControls}
              variants={fadeInRight}
            >
              <Card className="relative overflow-hidden rounded-2xl border-none bg-white shadow-2xl">
                {/* Decorative elements */}
                <div className="absolute -left-10 -top-10 size-40 rounded-full bg-pink-300 opacity-10 blur-3xl"></div>
                <div className="absolute -bottom-10 -right-10 size-40 rounded-full bg-teal-300 opacity-10 blur-3xl"></div>

                <CardHeader className="pb-4">
                  <CardTitle className="text-3xl font-bold text-gray-800">
                    Send Us a Message
                  </CardTitle>
                  <p className="text-gray-600">
                    Have questions or want to book an appointment? Fill out the
                    form, and we&apos;ll respond quickly.
                  </p>
                </CardHeader>

                <CardContent>
                  <motion.form
                    className="space-y-6"
                    variants={staggerContainer}
                  >
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                      <motion.div variants={fadeIn}>
                        <Label
                          htmlFor="name"
                          className="mb-2 block text-sm font-medium text-gray-700"
                        >
                          Your Name
                        </Label>
                        <Input
                          id="name"
                          placeholder="Jane Doe"
                          className="h-12 rounded-lg border-gray-200 bg-gray-50 text-base focus:border-pink-400 focus:ring-pink-400"
                        />
                      </motion.div>

                      <motion.div variants={fadeIn}>
                        <Label
                          htmlFor="email"
                          className="mb-2 block text-sm font-medium text-gray-700"
                        >
                          Email Address
                        </Label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="jane@example.com"
                          className="h-12 rounded-lg border-gray-200 bg-gray-50 text-base focus:border-pink-400 focus:ring-pink-400"
                        />
                      </motion.div>
                    </div>

                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                      <motion.div variants={fadeIn}>
                        <Label
                          htmlFor="phone"
                          className="mb-2 block text-sm font-medium text-gray-700"
                        >
                          Phone Number
                        </Label>
                        <Input
                          id="phone"
                          placeholder="(123) 456-7890"
                          className="h-12 rounded-lg border-gray-200 bg-gray-50 text-base focus:border-pink-400 focus:ring-pink-400"
                        />
                      </motion.div>

                      <motion.div variants={fadeIn}>
                        <Label
                          htmlFor="service"
                          className="mb-2 block text-sm font-medium text-gray-700"
                        >
                          Service Interest
                        </Label>
                        <Select>
                          <SelectTrigger
                            id="service"
                            className="h-12 rounded-lg border-gray-200 bg-gray-50 text-base focus:border-pink-400 focus:ring-pink-400"
                          >
                            <SelectValue placeholder="Select a service" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="braids">Crown Braids</SelectItem>
                            <SelectItem value="styling">Styling</SelectItem>
                            <SelectItem value="treatment">
                              Hair Treatment
                            </SelectItem>
                            <SelectItem value="other">
                              Other Services
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </motion.div>
                    </div>

                    <motion.div variants={fadeIn}>
                      <Label
                        htmlFor="message"
                        className="mb-2 block text-sm font-medium text-gray-700"
                      >
                        Your Message
                      </Label>
                      <Textarea
                        id="message"
                        placeholder="Tell us what you need..."
                        rows={5}
                        className="rounded-lg border-gray-200 bg-gray-50 text-base focus:border-pink-400 focus:ring-pink-400"
                      />
                    </motion.div>

                    <motion.div
                      variants={fadeIn}
                      className="pt-4"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Button
                        type="submit"
                        className="relative w-full overflow-hidden rounded-lg bg-gradient-to-r from-pink-500 to-purple-500 px-8 py-6 text-lg font-medium text-white transition-all hover:from-pink-600 hover:to-purple-600"
                      >
                        <span className="relative z-10 flex items-center justify-center gap-2">
                          Send Message
                          <Send className="size-5" />
                        </span>
                      </Button>
                    </motion.div>
                  </motion.form>
                </CardContent>
              </Card>
            </motion.div>

            {/* Map Section */}
            <motion.div
              ref={mapRef}
              initial="hidden"
              animate={mapControls}
              variants={fadeInLeft}
              className="flex flex-col gap-6"
            >
              <div className="relative overflow-hidden rounded-2xl shadow-2xl">
                <div className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-br from-transparent to-black/20"></div>
                <motion.div
                  initial={{ scale: 1.2 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 1.5, ease: "easeOut" }}
                  className="size-full"
                >
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3472.0237964509866!2d-98.68382182432155!3d29.530444744936096!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x865c667924e301eb%3A0xb8f9a9f73fd4d3f3!2s6923%20W%20Loop%201604%20N%20Suite%20214%2C%20San%20Antonio%2C%20TX%2078254!5e0!3m2!1sen!2sus!4v1710095842867!5m2!1sen!2sus"
                    width="100%"
                    height="450"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="size-full"
                  ></iframe>
                </motion.div>
              </div>

              <Card className="relative overflow-hidden rounded-2xl border-none bg-gradient-to-r from-[#1a1b4b] to-[#123a2b] p-1 shadow-2xl">
                <div className="rounded-xl bg-white/5 p-6 backdrop-blur-sm">
                  <h3 className="mb-4 text-2xl font-bold text-white">
                    Book Your Style
                  </h3>
                  <p className="mb-6 text-gray-300">
                    Ready to transform your look? Schedule your appointment
                    today and experience the artistry of Landtana Crown Braids.
                  </p>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button className="group relative w-full overflow-hidden rounded-lg bg-white px-8 py-6 text-lg font-medium text-[#1a1b4b] shadow-lg transition-all hover:shadow-pink-300/30">
                      <span className="relative z-10 flex items-center justify-center gap-2">
                        <Calendar className="size-5" />
                        Book Appointment
                      </span>
                      <span className="absolute inset-0 -z-0 scale-x-0 bg-gradient-to-r from-pink-400 to-pink-300 opacity-80 transition-transform duration-300 group-hover:scale-x-100"></span>
                    </Button>
                  </motion.div>
                </div>
              </Card>
            </motion.div>
          </div>
        </div>
      </MaxWidthContainer>
    </main>
  );
}
