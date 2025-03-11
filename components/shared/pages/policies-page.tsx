/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import { motion, AnimatePresence } from "framer-motion";
import React, { ReactNode, useState } from "react";
import { useInView } from "react-intersection-observer";

import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
interface PolicyItemProps {
  title: string;
  children: ReactNode;
}

const PoliciesPage = () => {
  // const [printMode, setPrintMode] = useState(false);
  const [activeTab, setActiveTab] = useState("general");

  // const handlePrint = () => {
  //   setPrintMode(true);
  //   setTimeout(() => {
  //     window.print();
  //     setPrintMode(false);
  //   }, 100);
  // };

  const [heroRef, heroInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [introRef, introInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <div className={`min-h-screen bg-gradient-to-b from-rose-50 to-white `}>
      {/* Hero Section */}
      <motion.div
        ref={heroRef}
        initial={{ opacity: 0 }}
        animate={heroInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.8 }}
        className="relative overflow-hidden bg-pink-50 py-16"
      >
        <div className="absolute -bottom-24 -left-24 size-64 rounded-full bg-rose-200 opacity-40" />
        <div className="absolute -right-24 -top-24 size-64 rounded-full bg-amber-200 opacity-30" />
        <div className="absolute left-1/3 top-1/4 size-32 rounded-full bg-violet-200 opacity-20" />

        <div className="container mx-auto px-4">
          <div className="relative z-10 flex flex-col items-center">
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={heroInView ? { y: 0, opacity: 1 } : {}}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="mb-2 inline-block rounded-full bg-rose-100 px-4 py-1 text-sm font-medium text-rose-800"
            >
              Guidelines for an Exceptional Experience
            </motion.div>

            <motion.h1
              initial={{ y: 20, opacity: 0 }}
              animate={heroInView ? { y: 0, opacity: 1 } : {}}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="mb-4 text-center text-4xl font-bold tracking-tight text-gray-900 md:text-5xl lg:text-6xl"
            >
              Salon <span className="text-rose-600">Policies</span>
            </motion.h1>

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={heroInView ? { y: 0, opacity: 1 } : {}}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="flex items-center space-x-2"
            >
              <div className="h-1 w-12 bg-amber-400"></div>
              <div className="h-1 w-4 bg-rose-400"></div>
              <div className="h-1 w-8 bg-violet-400"></div>
            </motion.div>
          </div>
        </div>
      </motion.div>

      <div className="container mx-auto max-w-5xl px-4 py-12 md:px-6">
        <div className="mb-8 flex items-center justify-between">
          <motion.div
            ref={introRef}
            initial={{ x: -20, opacity: 0 }}
            animate={introInView ? { x: 0, opacity: 1 } : {}}
            transition={{ duration: 0.6 }}
            className="grow"
          >
            <p className="text-lg text-gray-700">
              At{" "}
              <span className="font-semibold text-rose-600">
                Lantana Crown Braids
              </span>
              , we strive to provide exceptional service in a professional
              environment. Our policies are designed to ensure a pleasant
              experience for all clients. Please familiarize yourself with our
              policies below.
            </p>
          </motion.div>

          {/* <motion.div
            initial={{ x: 20, opacity: 0 }}
            animate={introInView ? { x: 0, opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Button
              onClick={handlePrint}
              className="group bg-rose-600 text-white hover:bg-rose-700 print:hidden"
              variant="default"
            >
              <motion.svg
                className="mr-2 size-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                whileHover={{ scale: 1.1 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"
                />
              </motion.svg>
              Print Policies
            </Button>
          </motion.div> */}
        </div>

        <div className="print:block">
          <Tabs
            defaultValue="general"
            className="w-full print:hidden"
            value={activeTab}
            onValueChange={setActiveTab}
          >
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <TabsList className="mb-8 grid grid-cols-2 gap-1 rounded-xl bg-rose-100/50 p-1 md:grid-cols-4">
                {["general", "appointments", "pricing", "children"].map(
                  (tab, index) => (
                    <TabsTrigger
                      key={tab}
                      value={tab}
                      className={`
                      rounded-lg font-medium capitalize
                      ${activeTab === tab ? "bg-white text-rose-700 shadow-sm" : "text-gray-600 hover:text-rose-600"}
                    `}
                    >
                      {tab === "general"
                        ? "General Policies"
                        : tab === "appointments"
                          ? "Appointments"
                          : tab === "pricing"
                            ? "Pricing & Payment"
                            : "Children & Guests"}
                    </TabsTrigger>
                  ),
                )}
              </TabsList>
            </motion.div>

            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                <TabsContent value="general" className="mt-6">
                  <PolicySection title="General Salon Policies">
                    <PolicyItem title="Salon Etiquette">
                      <p>
                        We strive to maintain a relaxing and professional
                        environment at all times. We ask that you:
                      </p>
                      <ul className="mt-2 list-disc space-y-1 pl-6">
                        <li>Keep conversation to a respectful volume</li>
                        <li>Refrain from using profanity</li>
                        <li>Be respectful to staff and other clients</li>
                        <li>Keep cell phone use to a minimum</li>
                      </ul>
                    </PolicyItem>

                    <PolicyItem title="Arrival">
                      <p>
                        Please arrive with clean, detangled hair. If your hair
                        requires washing or extensive detangling, additional
                        fees may apply. We recommend washing your hair 1-2 days
                        before your appointment for optimal results.
                      </p>
                    </PolicyItem>

                    <PolicyItem title="Health & Safety">
                      <p>
                        For the safety of our staff and clients, we ask that you
                        reschedule your appointment if you are experiencing any
                        illness or contagious skin conditions. Our stylists
                        reserve the right to refuse service to anyone with
                        visible scalp conditions that may be contagious or could
                        be aggravated by our services.
                      </p>
                    </PolicyItem>

                    <PolicyItem title="Personal Belongings">
                      <p>
                        While we take every precaution to ensure the safety of
                        your personal belongings, Lantana Crown Braids is not
                        responsible for lost, damaged, or stolen items. Please
                        keep valuable items with you at all times.
                      </p>
                    </PolicyItem>
                  </PolicySection>
                </TabsContent>

                <TabsContent value="appointments" className="mt-6">
                  <PolicySection title="Appointment Policies">
                    <PolicyItem title="Booking Appointments">
                      <p>
                        Appointments can be made via our website, phone, or in
                        person. We recommend booking at least 2-3 weeks in
                        advance for optimal availability, especially for weekend
                        appointments.
                      </p>
                    </PolicyItem>

                    <PolicyItem title="Deposits">
                      <p>
                        A 25% non-refundable deposit is required to secure all
                        appointments. This deposit will be applied toward your
                        service total. Deposits can be made via credit card,
                        CashApp, or other approved payment methods.
                      </p>
                    </PolicyItem>

                    <PolicyItem title="Arrival Time">
                      <p>
                        Please arrive 10-15 minutes before your scheduled
                        appointment. This allows time for consultation and
                        preparation. If you are a new client, please arrive 15
                        minutes early to complete necessary paperwork.
                      </p>
                    </PolicyItem>

                    <PolicyItem title="Late Arrivals">
                      <p>
                        If you are more than 15 minutes late, your appointment
                        may need to be rescheduled and your deposit will be
                        forfeited. If we can still accommodate you, your service
                        may need to be modified to fit the remaining time.
                      </p>
                    </PolicyItem>

                    <PolicyItem title="Cancellations & Rescheduling">
                      <p>
                        We require a minimum of 24 hours notice for all
                        cancellations or rescheduling. Failure to provide
                        adequate notice will result in forfeiture of your
                        deposit. Emergencies will be handled on a case-by-case
                        basis.
                      </p>
                    </PolicyItem>

                    <PolicyItem title="No-Shows">
                      <p>
                        Clients who miss their appointment without any notice
                        (&quot;no-shows&quot;) will forfeit their deposit and
                        may be required to pay in full before booking future
                        appointments.
                      </p>
                    </PolicyItem>
                  </PolicySection>
                </TabsContent>

                <TabsContent value="pricing" className="mt-6">
                  <PolicySection title="Pricing & Payment Policies">
                    <PolicyItem title="Service Pricing">
                      <p>
                        Our prices are based on the stylist&apos;s experience
                        level, time required, and complexity of the service. All
                        prices are subject to change. Current pricing can be
                        found on our website or by contacting our salon.
                      </p>
                    </PolicyItem>

                    <PolicyItem title="Additional Fees">
                      <p>Several factors may incur additional fees:</p>
                      <ul className="mt-2 list-disc space-y-1 pl-6">
                        <li>Hair length or thickness beyond what was quoted</li>
                        <li>Extensive detangling or washing</li>
                        <li>Style changes during your appointment</li>
                        <li>Extra hair packs needed for installation</li>
                        <li>Extensions removal (if not originally booked)</li>
                      </ul>
                    </PolicyItem>

                    <PolicyItem title="Payment Methods">
                      <p>
                        We accept cash, all major credit cards, Apple Pay,
                        Google Pay, and CashApp. Full payment is due at the
                        completion of your service.
                      </p>
                    </PolicyItem>

                    <PolicyItem title="Gratuity">
                      <p>
                        Gratuity is not included in the service price and is
                        left to the client&apos;s discretion. Industry standard
                        is 15-20% for services you&apos;re satisfied with.
                      </p>
                    </PolicyItem>
                  </PolicySection>
                </TabsContent>

                <TabsContent value="children" className="mt-6">
                  <PolicySection title="Children & Guest Policies">
                    <PolicyItem title="Children's Services">
                      <p>
                        We welcome children for braiding services. Children
                        under 12 must be accompanied by an adult for the
                        duration of their service. Please note that
                        children&apos;s appointments may take as long as adult
                        appointments depending on the style and complexity.
                      </p>
                    </PolicyItem>

                    <PolicyItem title="Child Behavior">
                      <p>
                        For safety reasons, children must be able to sit still
                        for extended periods. If a child is unable to remain
                        seated or is disruptive, we may need to reschedule the
                        appointment. Parents are responsible for supervising
                        their children at all times while in the salon.
                      </p>
                    </PolicyItem>

                    <PolicyItem title="Accompanying Guests">
                      <p>
                        Due to space limitations, we ask that clients limit
                        accompanying guests to one person when possible. For
                        children&apos;s appointments, one parent or guardian may
                        remain in the salon area.
                      </p>
                    </PolicyItem>

                    <PolicyItem title="Waiting Area">
                      <p>
                        Our waiting area is reserved for clients with scheduled
                        appointments and one accompanying guest. We ask that
                        additional guests wait outside or return at the
                        completion of the service.
                      </p>
                    </PolicyItem>
                  </PolicySection>
                </TabsContent>
              </motion.div>
            </AnimatePresence>
          </Tabs>

          {/* Print version - will only show when printing */}
          <div className="hidden print:block">
            <PolicySection title="General Salon Policies">
              <PolicyItem title="Children's Services">
                <p>
                  We welcome children for braiding services. Children under 12
                  must be accompanied by an adult for the duration of their
                  service. Please note that children&apos;s appointments may
                  take as long as adult appointments depending on the style and
                  complexity.
                </p>
              </PolicyItem>
            </PolicySection>
            {/* Other print sections... */}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.6 }}
          className="mt-16"
        >
          <div className="mx-auto max-w-3xl rounded-2xl bg-gradient-to-r from-rose-50 to-amber-50 p-8 shadow-sm">
            <div className="text-center">
              <p className="mb-4 text-gray-700">
                By booking an appointment with Lantana Crown Braids, you
                acknowledge that you have read and agree to these policies.
              </p>
              <p className="mb-6 text-gray-700">
                If you have any questions about our policies, please contact us.
              </p>
              <div className="flex flex-col justify-center gap-4 sm:flex-row">
                <motion.a
                  href="/contact"
                  className="inline-flex items-center justify-center rounded-md bg-rose-600 px-6 py-3 font-medium text-white transition-colors hover:bg-rose-700"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Contact Us
                </motion.a>
                <motion.a
                  href="/book"
                  className="inline-flex items-center justify-center rounded-md border border-rose-600 bg-white px-6 py-3 font-medium text-rose-600 transition-colors hover:bg-rose-50"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Book Appointment
                </motion.a>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

// Policy Section Component with animations
const PolicySection = ({ title, children }: PolicyItemProps) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5 }}
      className="mb-12"
    >
      <motion.h2
        initial={{ opacity: 0, x: -10 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="mb-6 flex items-center text-2xl font-bold text-gray-900"
      >
        <div className="mr-3 h-8 w-1 rounded-full bg-rose-600"></div>
        {title}
      </motion.h2>
      <div className="space-y-8">{children}</div>
    </motion.div>
  );
};

// Enhanced Policy Item Component with animations
const PolicyItem = ({ title, children }: PolicyItemProps) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        whileHover={{
          y: -2,
          boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.08)",
        }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        <Card className="overflow-hidden border-none shadow-md">
          <CardContent className="p-0">
            <div className="p-6">
              <h3 className="mb-3 text-xl font-semibold text-gray-900">
                {title}
              </h3>
              <div className="text-gray-700">{children}</div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
};

export default PoliciesPage;
