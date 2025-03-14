/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import { motion, AnimatePresence } from "framer-motion";
import { Scissors, Search, MessageCircle, ChevronRight } from "lucide-react";
import React, { useState, useEffect } from "react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// FAQ categories and questions
const faqData = {
  general: [
    {
      question: "What services does Lantana Crown Braids offer?",
      answer:
        "We offer a wide range of braiding services including box braids, cornrows, Senegalese twists, Ghana braids, Havana twists, goddess braids, faux locs, and crochet braids.",
    },
    {
      question: "How do I book an appointment?",
      answer:
        "You can book an appointment through our website booking system, by calling us at (830) 350-6003, or by visiting our salon in person.",
    },
    {
      question: "What are your business hours?",
      answer:
        "We're open Monday to Thursday from 9:00 AM to 8:00 PM, Friday and Saturday from 8:00 AM to 10:00 PM, and Sunday from 1:00 PM to 10:00 PM.",
    },
    {
      question: "Do you accept walk-ins?",
      answer:
        "While we welcome walk-ins, we recommend booking an appointment to ensure stylist availability and minimize wait times.",
    },
  ],
  pricing: [
    {
      question: "How much do your braiding services cost?",
      answer:
        "Prices vary depending on the style, length, and complexity. Box braids typically range from $150-$300, cornrows from $100-$200, and more elaborate styles may have additional costs. Please contact us for a specific quote.",
    },
    {
      question: "Do you offer any discounts?",
      answer:
        "Yes, we offer seasonal promotions, first-time client discounts, and referral bonuses. Follow us on social media to stay updated on our latest offers.",
    },
    {
      question: "What forms of payment do you accept?",
      answer:
        "We accept cash, all major credit cards, Apple Pay, Google Pay, and CashApp.",
    },
    {
      question: "Is a deposit required for booking?",
      answer:
        "Yes, a 25% deposit is required to secure your appointment. This amount is deducted from your final bill.",
    },
  ],
  appointments: [
    {
      question: "How early should I arrive for my appointment?",
      answer:
        "Please arrive 10-15 minutes before your scheduled appointment to complete any necessary paperwork and discuss your style preferences with your stylist.",
    },
    {
      question: "What happens if I'm late for my appointment?",
      answer:
        "If you're more than 15 minutes late, we may need to reschedule your appointment. Please call us if you're running late.",
    },
    {
      question: "How do I cancel or reschedule an appointment?",
      answer:
        "You can cancel or reschedule by calling us at least 24 hours in advance. Late cancellations may result in a cancellation fee.",
    },
    {
      question: "How long will my appointment take?",
      answer:
        "The duration varies based on the style. Box braids typically take 4-6 hours, while simpler styles like cornrows may take 2-3 hours. Your stylist will provide a time estimate during consultation.",
    },
  ],
  aftercare: [
    {
      question: "How should I maintain my braids?",
      answer:
        "To maintain your braids, we recommend wearing a satin bonnet at night, keeping your scalp moisturized, and avoiding excessive manipulation. We'll provide detailed aftercare instructions after your service.",
    },
    {
      question: "How long will my braids last?",
      answer:
        "Most braid styles can last 6-8 weeks with proper care, though individual results may vary based on hair growth and maintenance.",
    },
    {
      question: "Can I wash my braids?",
      answer:
        "Yes, you can wash your braids, but we recommend waiting at least a week after installation. Use a diluted shampoo and focus on the scalp, then thoroughly rinse and allow to dry completely.",
    },
    {
      question: "Do you offer touch-up services?",
      answer:
        "Yes, we offer touch-up services for braids that need refreshing at the edges or parts that have grown out. Contact us for pricing and scheduling.",
    },
  ],
};

const FAQPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("general");
  const [isLoaded, setIsLoaded] = useState(false);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
      },
    },
  };

  // Set loaded state after component mounts for animations
  useEffect(() => {
    setIsLoaded(true);
  }, []);

  // Filter FAQs based on search query
  const filteredFAQs =
    searchQuery.length > 0
      ? Object.keys(faqData).flatMap((category) =>
          faqData[category as keyof typeof faqData].filter(
            (faq) =>
              faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
              faq.answer.toLowerCase().includes(searchQuery.toLowerCase()),
          ),
        )
      : faqData[activeTab as keyof typeof faqData];

  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-pink-50 to-white">
      {/* Decorative elements */}
      <motion.div
        className="absolute -right-10 -top-10 size-40 rounded-full bg-pink-100 opacity-70"
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.7, 0.5, 0.7],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          repeatType: "reverse",
        }}
      />
      <motion.div
        className="absolute -bottom-10 -left-10 size-40 rounded-full bg-purple-100 opacity-70"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.7, 0.6, 0.7],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          repeatType: "reverse",
          delay: 1,
        }}
      />

      <div className="container mx-auto max-w-5xl px-4 py-12 md:px-6">
        {/* Hero Section */}
        <motion.div
          className="mb-16 text-center"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            className="mb-6 inline-flex items-center justify-center rounded-full bg-pink-100 p-3"
            whileHover={{ scale: 1.1, rotate: 180 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <Scissors className="size-8 text-pink-600" />
          </motion.div>

          <motion.h1
            className="mb-4 bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-5xl font-extrabold text-transparent md:text-6xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            Have Questions?
          </motion.h1>

          <motion.p
            className="mx-auto mb-8 max-w-2xl text-lg text-gray-600"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            Find everything you need to know about our premium salon services,
            booking process, and aftercare recommendations.
          </motion.p>
        </motion.div>

        {/* Search Bar with Animation */}
        <motion.div
          className="relative mb-12"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.7, type: "spring", stiffness: 100 }}
        >
          <div className="relative overflow-hidden rounded-2xl shadow-lg">
            <Input
              type="text"
              placeholder="Search for answers..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full border-none py-6 pl-14 pr-6 text-lg backdrop-blur-sm"
              style={{ background: "rgba(255, 255, 255, 0.8)" }}
            />
            <motion.div
              className="absolute left-4 top-0 mt-[10px] -translate-y-1/2 text-gray-400"
              animate={{
                rotate: searchQuery.length > 0 ? [0, -20, 20, -10, 10, 0] : 0,
              }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <Search className="size-6 text-pink-500" />
            </motion.div>
          </div>

          <motion.div
            className="absolute -bottom-3 left-1/2 h-6 w-24 -translate-x-1/2 rounded-full bg-gradient-to-r from-pink-300 to-purple-300 blur-xl"
            animate={{ opacity: [0.4, 0.7, 0.4], width: ["30%", "40%", "30%"] }}
            transition={{
              duration: 3,
              repeat: Infinity,
              repeatType: "reverse",
            }}
          />
        </motion.div>

        {/* FAQ Content */}
        <AnimatePresence mode="wait">
          {searchQuery.length > 0 ? (
            <motion.div
              key="search-results"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="mt-6"
            >
              <motion.h2
                className="mb-6 text-2xl font-semibold text-gray-800"
                variants={itemVariants}
              >
                Search Results
              </motion.h2>

              {filteredFAQs.length > 0 ? (
                <motion.div
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                >
                  <Accordion type="single" collapsible className="w-full">
                    {filteredFAQs.map((faq, index) => (
                      <motion.div
                        key={index}
                        variants={itemVariants}
                        custom={index}
                        className="mb-4"
                      >
                        <AccordionItem
                          value={`item-${index}`}
                          className="overflow-hidden rounded-xl border border-pink-100 bg-white shadow-sm"
                        >
                          <AccordionTrigger className="p-5 text-left font-medium text-gray-800 hover:bg-pink-50">
                            {faq.question}
                          </AccordionTrigger>
                          <AccordionContent className="bg-white px-5 py-4 text-gray-700">
                            <motion.div
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              transition={{ duration: 0.3 }}
                            >
                              {faq.answer}
                            </motion.div>
                          </AccordionContent>
                        </AccordionItem>
                      </motion.div>
                    ))}
                  </Accordion>
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                  className="rounded-2xl bg-white p-10 text-center shadow-md"
                >
                  <p className="my-8 text-gray-500">
                    No FAQs found matching your search. Try different keywords
                    or browse by category.
                  </p>
                </motion.div>
              )}
            </motion.div>
          ) : (
            <motion.div
              key="categories"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              <Tabs
                defaultValue="general"
                value={activeTab}
                onValueChange={setActiveTab}
                className="w-full"
              >
                <motion.div
                  className="mb-10 flex justify-center"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                >
                  <TabsList className="grid h-fit w-full grid-cols-3 gap-2 rounded-xl bg-pink-50 p-2 md:grid-cols-4">
                    {["general", "pricing", "appointments", "aftercare"].map(
                      (category, index) => (
                        <motion.div
                          key={category}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <TabsTrigger
                            value={category}
                            className="rounded-lg capitalize data-[state=active]:bg-white data-[state=active]:text-pink-600 data-[state=active]:shadow-md"
                          >
                            {category}
                          </TabsTrigger>
                        </motion.div>
                      ),
                    )}
                  </TabsList>
                </motion.div>

                <AnimatePresence mode="wait">
                  {Object.keys(faqData).map((category) => (
                    <TabsContent
                      key={category}
                      value={category}
                      className="mt-6"
                    >
                      {activeTab === category && (
                        <motion.div
                          variants={containerVariants}
                          initial="hidden"
                          animate="visible"
                        >
                          <Accordion
                            type="single"
                            collapsible
                            className="w-full"
                          >
                            {faqData[category as keyof typeof faqData].map(
                              (faq, index) => (
                                <motion.div
                                  key={index}
                                  variants={itemVariants}
                                  custom={index}
                                  className="mb-4"
                                >
                                  <AccordionItem
                                    value={`item-${index}`}
                                    className="overflow-hidden rounded-xl border border-pink-100 bg-white shadow-sm transition-all duration-300 hover:shadow-md"
                                  >
                                    <AccordionTrigger className="p-5 text-left font-medium text-gray-800 hover:bg-pink-50">
                                      {faq.question}
                                    </AccordionTrigger>
                                    <AccordionContent className="bg-white px-5 py-4 text-gray-700">
                                      <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ duration: 0.3 }}
                                      >
                                        {faq.answer}
                                      </motion.div>
                                    </AccordionContent>
                                  </AccordionItem>
                                </motion.div>
                              ),
                            )}
                          </Accordion>
                        </motion.div>
                      )}
                    </TabsContent>
                  ))}
                </AnimatePresence>
              </Tabs>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Contact CTA with Animation */}
        <motion.div
          className="mt-20 overflow-hidden rounded-3xl bg-gradient-to-r from-pink-500 to-purple-600 shadow-xl"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.7 }}
        >
          <div className="relative p-12 text-center text-white">
            {/* Abstract shapes */}
            <motion.div
              className="absolute -right-12 -top-12 size-32 rounded-full bg-white opacity-10"
              animate={{
                x: [0, 10, 0],
                y: [0, -10, 0],
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                repeatType: "reverse",
              }}
            />
            <motion.div
              className="absolute -bottom-16 -left-16 size-40 rounded-full bg-white opacity-10"
              animate={{
                x: [0, -10, 0],
                y: [0, 10, 0],
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                repeatType: "reverse",
                delay: 0.5,
              }}
            />

            <motion.h3
              className="mb-4 text-2xl font-bold md:text-3xl"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.0, duration: 0.5 }}
            >
              Still Have Questions?
            </motion.h3>

            <motion.p
              className="mb-8 text-lg opacity-90"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2, duration: 0.5 }}
            >
              Our stylists are ready to help you achieve the perfect look. Get
              in touch with us today!
            </motion.p>

            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <a
                href="/contact"
                className="inline-flex items-center gap-2 rounded-full bg-white px-8 py-4 font-semibold text-pink-600 shadow-lg transition-all hover:bg-pink-50"
              >
                <MessageCircle className="size-5" />
                Contact Our Stylists
                <ChevronRight className="size-5" />
              </a>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default FAQPage;
