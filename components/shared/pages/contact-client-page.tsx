"use client";
import { motion, useAnimation } from "framer-motion";
import {
  MapPin,
  Clock,
  Phone,
  Mail,
  Instagram,
  Youtube,
  Facebook,
  Send,
  ChevronRight,
} from "lucide-react";
import React, { useEffect } from "react";
import { useInView } from "react-intersection-observer";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
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
import { fadeInUp, staggerChildren } from "@/lib/variants";

export default function ContactClientPage() {
  // Animation setup with intersection observer
  const [headerRef, headerInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  const [cardsRef, cardsInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  const [formRef, formInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  const [mapRef, mapInView] = useInView({ triggerOnce: true, threshold: 0.1 });

  const headerControls = useAnimation();
  const cardsControls = useAnimation();
  const formControls = useAnimation();
  const mapControls = useAnimation();

  // Trigger animations when sections come into view
  useEffect(() => {
    if (headerInView) headerControls.start("visible");
    if (cardsInView) cardsControls.start("visible");
    if (formInView) formControls.start("visible");
    if (mapInView) mapControls.start("visible");
  }, [
    headerInView,
    cardsInView,
    formInView,
    mapInView,
    headerControls,
    cardsControls,
    formControls,
    mapControls,
  ]);

  const businessHours = [
    { day: "Monday", hours: "9:00 AM - 8:00 PM" },
    { day: "Tuesday", hours: "9:00 AM - 8:00 PM" },
    { day: "Wednesday", hours: "9:00 AM - 8:00 PM" },
    { day: "Thursday", hours: "9:00 AM - 8:00 PM" },
    { day: "Friday", hours: "8:00 AM - 10:00 PM" },
    { day: "Saturday", hours: "8:00 AM - 10:00 PM" },
    { day: "Sunday", hours: "1:00 PM - 10:00 PM" },
  ];

  return (
    <main className="relative overflow-hidden">
      {/* Decorative backgrounds */}
      <div className="absolute left-0 top-0 size-full">
        <div className="absolute right-0 top-0 size-96 -translate-y-1/2 translate-x-1/2 rounded-full bg-[hsl(147,91%,13%)] opacity-5 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 size-80 -translate-x-1/2 translate-y-1/2 rounded-full bg-[hsl(347,100%,59%)] opacity-5 blur-3xl"></div>
        <div className="absolute left-1/2 top-1/2 size-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[hsl(238,94%,7%)] opacity-5 blur-3xl"></div>
      </div>

      <div className="container relative z-10 mx-auto px-4 py-20">
        <div className="mx-auto max-w-5xl">
          {/* Header Section */}
          <motion.div
            ref={headerRef}
            animate={headerControls}
            initial="hidden"
            variants={staggerChildren}
            className="relative mb-16"
          >
            <motion.div variants={fadeInUp} className="relative z-10">
              <motion.h1 className="mb-4 bg-gradient-to-r from-[hsl(147,91%,13%)] to-[hsl(238,94%,7%)] bg-clip-text text-center text-5xl font-bold tracking-tight text-transparent">
                Get In Touch
              </motion.h1>
              <motion.div className="mx-auto mb-6 h-1 w-24 bg-[hsl(347,100%,59%)]"></motion.div>
              <motion.p className="mx-auto max-w-3xl text-center text-xl leading-relaxed text-gray-700">
                We&apos;d love to hear from you! Whether you have questions
                about our services, want to provide feedback, or need to get in
                touch for any other reason, we&apos;re here to help.
              </motion.p>
            </motion.div>
          </motion.div>

          {/* Contact Cards Section */}
          <motion.div
            ref={cardsRef}
            animate={cardsControls}
            initial="hidden"
            variants={staggerChildren}
            className="mb-20"
          >
            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
              {/* Location Card */}
              <motion.div
                variants={fadeInUp}
                whileHover={{ y: -10, transition: { duration: 0.3 } }}
              >
                <Card className="h-full overflow-hidden border border-gray-200 shadow-lg transition-all duration-300 hover:shadow-xl">
                  <div className="absolute right-0 top-0 size-20 -translate-y-1/2 translate-x-1/2 rounded-full bg-[hsl(147,91%,13%)] opacity-10 blur-xl"></div>
                  <CardHeader className="flex flex-row items-center gap-4">
                    <motion.div
                      className="rounded-full bg-[hsla(147,91%,13%,0.1)] p-3"
                      whileHover={{
                        scale: 1.1,
                        backgroundColor: "hsla(147,91%,13%,0.2)",
                      }}
                      transition={{
                        type: "spring",
                        stiffness: 400,
                        damping: 10,
                      }}
                    >
                      <MapPin className="size-6 text-[hsl(147,91%,13%)]" />
                    </motion.div>
                    <CardTitle>Our Location</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700">
                      6923 W Loop 1604 N, Suite 214
                      <br />
                      San Antonio, TX 78254
                    </p>
                  </CardContent>
                  <CardFooter>
                    <Button
                      asChild
                      variant="outline"
                      className="group w-full border-[hsl(147,91%,13%)] text-[hsl(147,91%,13%)] hover:bg-[hsla(147,91%,13%,0.1)] hover:text-[hsl(147,91%,13%)]"
                    >
                      <a
                        href="https://maps.google.com/?q=6923+W+Loop+1604+N+Suite+214+San+Antonio+TX+78254"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2"
                      >
                        Get Directions
                        <motion.span
                          initial={{ x: 0 }}
                          animate={{ x: [0, 5, 0] }}
                          transition={{
                            repeat: Infinity,
                            duration: 1.5,
                            repeatDelay: 1,
                          }}
                        >
                          <ChevronRight className="size-4" />
                        </motion.span>
                      </a>
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>

              {/* Hours Card */}
              <motion.div
                variants={fadeInUp}
                whileHover={{ y: -10, transition: { duration: 0.3 } }}
              >
                <Card className="h-full overflow-hidden border border-gray-200 shadow-lg transition-all duration-300 hover:shadow-xl">
                  <div className="absolute right-0 top-0 size-20 -translate-y-1/2 translate-x-1/2 rounded-full bg-[hsl(238,94%,7%)] opacity-10 blur-xl"></div>
                  <CardHeader className="flex flex-row items-center gap-4">
                    <motion.div
                      className="rounded-full bg-[hsla(238,94%,7%,0.1)] p-3"
                      whileHover={{
                        scale: 1.1,
                        backgroundColor: "hsla(238,94%,7%,0.2)",
                      }}
                      transition={{
                        type: "spring",
                        stiffness: 400,
                        damping: 10,
                      }}
                    >
                      <Clock className="size-6 text-[hsl(238,94%,7%)]" />
                    </motion.div>
                    <CardTitle>Hours</CardTitle>
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
                            stiffness: 400,
                            damping: 17,
                          }}
                        >
                          <span className="font-medium">{item.day}</span>
                          <span className="text-gray-600">{item.hours}</span>
                        </motion.div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Contact Card */}
              <motion.div
                variants={fadeInUp}
                whileHover={{ y: -10, transition: { duration: 0.3 } }}
              >
                <Card className="h-full overflow-hidden border border-gray-200 shadow-lg transition-all duration-300 hover:shadow-xl">
                  <div className="absolute right-0 top-0 size-20 -translate-y-1/2 translate-x-1/2 rounded-full bg-[hsl(347,100%,59%)] opacity-10 blur-xl"></div>
                  <CardHeader className="flex flex-row items-center gap-4">
                    <motion.div
                      className="rounded-full bg-[hsla(347,100%,59%,0.1)] p-3"
                      whileHover={{
                        scale: 1.1,
                        backgroundColor: "hsla(347,100%,59%,0.2)",
                      }}
                      transition={{
                        type: "spring",
                        stiffness: 400,
                        damping: 10,
                      }}
                    >
                      <Phone className="size-6 text-[hsl(347,100%,59%)]" />
                    </motion.div>
                    <CardTitle>Get In Touch</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <motion.div
                      className="flex items-center gap-2"
                      whileHover={{ x: 5 }}
                      transition={{
                        type: "spring",
                        stiffness: 400,
                        damping: 17,
                      }}
                    >
                      <Phone className="size-4 text-gray-500" />
                      <a
                        href="tel:8303506003"
                        className="text-gray-700 transition-colors hover:text-[hsl(347,100%,59%)]"
                      >
                        (830) 350-6003
                      </a>
                    </motion.div>
                    <motion.div
                      className="flex items-center gap-2"
                      whileHover={{ x: 5 }}
                      transition={{
                        type: "spring",
                        stiffness: 400,
                        damping: 17,
                      }}
                    >
                      <Mail className="size-4 text-gray-500" />
                      <a
                        href="mailto:info@landtanacrownbraids.com"
                        className="text-gray-700 transition-colors hover:text-[hsl(347,100%,59%)]"
                      >
                        info@landtanacrownbraids.com
                      </a>
                    </motion.div>
                  </CardContent>
                  <CardFooter className="flex justify-center gap-4">
                    <motion.a
                      href="https://www.instagram.com/landtanacrownbraids"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-500 transition-colors hover:text-pink-600"
                      whileHover={{ scale: 1.2, rotate: 5 }}
                      transition={{
                        type: "spring",
                        stiffness: 400,
                        damping: 10,
                      }}
                    >
                      <Instagram className="size-5" />
                    </motion.a>
                    <motion.a
                      href="https://youtube.com/@landtanacrownbraids"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-500 transition-colors hover:text-red-600"
                      whileHover={{ scale: 1.2, rotate: -5 }}
                      transition={{
                        type: "spring",
                        stiffness: 400,
                        damping: 10,
                      }}
                    >
                      <Youtube className="size-5" />
                    </motion.a>
                    <motion.a
                      href="https://www.facebook.com/share/1E7hwFDthG/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-500 transition-colors hover:text-blue-600"
                      whileHover={{ scale: 1.2, rotate: 5 }}
                      transition={{
                        type: "spring",
                        stiffness: 400,
                        damping: 10,
                      }}
                    >
                      <Facebook className="size-5" />
                    </motion.a>
                  </CardFooter>
                </Card>
              </motion.div>
            </div>
          </motion.div>

          {/* Contact Form Section */}
          <motion.div
            ref={formRef}
            animate={formControls}
            initial="hidden"
            variants={fadeInUp}
            className="mb-20"
          >
            <Card className="relative overflow-hidden border border-gray-200 shadow-xl">
              {/* Decorative elements */}
              <div className="absolute left-0 top-0 size-40 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[hsl(147,91%,13%)] opacity-5 blur-3xl"></div>
              <div className="absolute bottom-0 right-0 size-40 translate-x-1/2 translate-y-1/2 rounded-full bg-[hsl(347,100%,59%)] opacity-5 blur-3xl"></div>

              <CardHeader>
                <CardTitle className="text-2xl text-[hsl(238,94%,7%)]">
                  Send Us a Message
                </CardTitle>
                <CardDescription>
                  Fill out the form below and we&apos;ll get back to you as soon
                  as possible.
                </CardDescription>
              </CardHeader>

              <CardContent>
                <motion.form className="space-y-6" variants={staggerChildren}>
                  <motion.div
                    className="grid grid-cols-1 gap-4 sm:grid-cols-2"
                    variants={staggerChildren}
                  >
                    <motion.div
                      className="space-y-2"
                      variants={fadeInUp}
                      whileHover={{ y: -5, transition: { duration: 0.2 } }}
                    >
                      <Label htmlFor="name">Name</Label>
                      <Input
                        id="name"
                        placeholder="Your name"
                        className="border-gray-300 focus:border-[hsl(147,91%,13%)] focus:ring-[hsl(147,91%,13%)]"
                      />
                    </motion.div>

                    <motion.div
                      className="space-y-2"
                      variants={fadeInUp}
                      whileHover={{ y: -5, transition: { duration: 0.2 } }}
                    >
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="Your email"
                        className="border-gray-300 focus:border-[hsl(147,91%,13%)] focus:ring-[hsl(147,91%,13%)]"
                      />
                    </motion.div>
                  </motion.div>

                  <motion.div
                    className="grid grid-cols-1 gap-4 sm:grid-cols-2"
                    variants={staggerChildren}
                  >
                    <motion.div
                      className="space-y-2"
                      variants={fadeInUp}
                      whileHover={{ y: -5, transition: { duration: 0.2 } }}
                    >
                      <Label htmlFor="phone">Phone</Label>
                      <Input
                        id="phone"
                        placeholder="Your phone number"
                        className="border-gray-300 focus:border-[hsl(147,91%,13%)] focus:ring-[hsl(147,91%,13%)]"
                      />
                    </motion.div>

                    <motion.div
                      className="space-y-2"
                      variants={fadeInUp}
                      whileHover={{ y: -5, transition: { duration: 0.2 } }}
                    >
                      <Label htmlFor="subject">Subject</Label>
                      <Select>
                        <SelectTrigger
                          id="subject"
                          className="border-gray-300 focus:border-[hsl(147,91%,13%)] focus:ring-[hsl(147,91%,13%)]"
                        >
                          <SelectValue placeholder="Select a subject" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="booking">
                            Booking Inquiry
                          </SelectItem>
                          <SelectItem value="service">
                            Service Question
                          </SelectItem>
                          <SelectItem value="feedback">Feedback</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </motion.div>
                  </motion.div>

                  <motion.div
                    className="space-y-2"
                    variants={fadeInUp}
                    whileHover={{ y: -5, transition: { duration: 0.2 } }}
                  >
                    <Label htmlFor="message">Message</Label>
                    <Textarea
                      id="message"
                      placeholder="How can we help you?"
                      rows={5}
                      className="border-gray-300 focus:border-[hsl(147,91%,13%)] focus:ring-[hsl(147,91%,13%)]"
                    />
                  </motion.div>

                  <motion.div
                    variants={fadeInUp}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button
                      type="submit"
                      className="w-full bg-gradient-to-r from-[hsl(147,91%,13%)] to-[hsl(238,94%,7%)] text-white hover:from-[hsl(147,91%,10%)] hover:to-[hsl(238,94%,5%)] sm:w-auto"
                    >
                      <div className="flex items-center gap-2">
                        <span>Send Message</span>
                        <Send className="size-4" />
                      </div>
                    </Button>
                  </motion.div>
                </motion.form>
              </CardContent>
            </Card>
          </motion.div>

          {/* Map Section */}
          <motion.div
            ref={mapRef}
            animate={mapControls}
            initial="hidden"
            variants={fadeInUp}
            className="relative overflow-hidden rounded-xl shadow-2xl"
          >
            <motion.div
              className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-r from-[hsla(147,91%,13%,0.1)] to-[hsla(238,94%,7%,0.1)]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            />

            <motion.div
              className="h-96 w-full"
              initial={{ scale: 1.1 }}
              animate={{ scale: 1 }}
              transition={{ duration: 1.5 }}
            >
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3472.0237964509866!2d-98.68382182432155!3d29.530444744936096!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x865c667924e301eb%3A0xb8f9a9f73fd4d3f3!2s6923%20W%20Loop%201604%20N%20Suite%20214%2C%20San%20Antonio%2C%20TX%2078254!5e0!3m2!1sen!2sus!4v1710095842867!5m2!1sen!2sus"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </main>
  );
}
