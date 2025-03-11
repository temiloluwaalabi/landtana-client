"use client";
import { motion, useAnimation } from "framer-motion";
import Image from "next/image";
import React, { useEffect } from "react";
import { useInView } from "react-intersection-observer";

import { Button } from "@/components/ui/button";
import { fadeInUp, staggerChildren } from "@/lib/variants";

import { EnhancedCTA, InstagramFeed } from "./home-page-client";
import MaxWidthContainer from "../max-width-container";

export default function AboutUsClient() {
  // Animated section hooks
  const [heroRef, heroInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  const [storyRef, storyInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  const [philosophyRef, philosophyInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  const [commitmentRef, commitmentInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  const [spaceRef, spaceInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  // const [ctaRef, ctaInView] = useInView({ triggerOnce: true, threshold: 0.1 });

  // Animation controls
  const heroControls = useAnimation();
  const storyControls = useAnimation();
  const philosophyControls = useAnimation();
  const commitmentControls = useAnimation();
  const spaceControls = useAnimation();
  const ctaControls = useAnimation();

  // Trigger animations when sections come into view
  useEffect(() => {
    if (heroInView) heroControls.start("visible");
    if (storyInView) storyControls.start("visible");
    if (philosophyInView) philosophyControls.start("visible");
    if (commitmentInView) commitmentControls.start("visible");
    if (spaceInView) spaceControls.start("visible");
    // if (ctaInView) ctaControls.start("visible");
  }, [
    heroInView,
    storyInView,
    philosophyInView,
    commitmentInView,
    spaceInView,
    heroControls,
    storyControls,
    philosophyControls,
    commitmentControls,
    spaceControls,
    ctaControls,
  ]);

  const commitmentItems = [
    {
      title: "Excellence",
      description: "In every braid we create",
      icon: "✨",
      color: "bg-orange-50 border-orange-200",
      iconBg: "bg-orange-100",
    },
    {
      title: "Education",
      description: "About proper hair care and maintenance",
      icon: "📚",
      color: "bg-blue-50 border-blue-200",
      iconBg: "bg-blue-100",
    },
    {
      title: "Innovation",
      description: "In braiding techniques and styles",
      icon: "💡",
      color: "bg-purple-50 border-purple-200",
      iconBg: "bg-purple-100",
    },
    {
      title: "Inclusivity",
      description: "For clients of all backgrounds and hair types",
      icon: "🤝",
      color: "bg-green-50 border-green-200",
      iconBg: "bg-green-100",
    },
    {
      title: "Sustainability",
      description: "Through eco-friendly products and practices",
      icon: "🌿",
      color: "bg-teal-50 border-teal-200",
      iconBg: "bg-teal-100",
    },
  ];

  return (
    <div className="relative overflow-hidden">
      {/* Hero Section with Parallax Effect */}
      <motion.div
        ref={heroRef}
        animate={heroControls}
        initial="hidden"
        variants={{
          hidden: {},
          visible: {},
        }}
        className="relative flex h-screen items-center justify-center overflow-hidden"
      >
        {/* Background Image with Parallax */}
        <motion.div
          className="absolute inset-0 z-0"
          initial={{ scale: 1.2 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5 }}
        >
          <Image
            src="https://res.cloudinary.com/davidleo/image/upload/v1741645591/landtana/modern-beauty-salon-interior_q7xdvr.jpg"
            alt="Landtana Crown Braids"
            fill
            className="object-cover brightness-75"
            priority
          />
        </motion.div>

        {/* Overlay Gradient */}
        <div className="absolute inset-0 z-10 bg-gradient-to-b from-black/30 via-black/40 to-black/70"></div>

        {/* Hero Content */}
        <motion.div
          className="relative z-20 max-w-4xl px-4 text-center text-white"
          variants={fadeInUp}
        >
          <motion.h1
            className="mb-6 text-5xl font-bold md:text-7xl"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            <span className="block">Your Crown</span>
            <span className="mt-2 block">Our Expertise</span>
          </motion.h1>

          <motion.p
            className="mb-8 text-xl font-light md:text-2xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            San Antonio&apos;s premier destination for exquisite crown braids
            and protective styles
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.8 }}
          >
            <Button
              size="lg"
              className="rounded-full bg-orange-500 px-8 py-6 text-lg text-white hover:bg-orange-600"
            >
              Book Your Transformation
            </Button>
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-10 left-1/2 z-20 -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
        >
          <div className="flex h-14 w-8 justify-center rounded-full border-2 border-white/70">
            <motion.div
              className="mt-2 h-3 w-1.5 rounded-full bg-white/70"
              animate={{ y: [0, 16, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
            />
          </div>
        </motion.div>
      </motion.div>

      {/* Our Story Section */}
      <motion.div
        ref={storyRef}
        animate={storyControls}
        initial="hidden"
        variants={fadeInUp}
        className="mx-auto max-w-7xl px-4 py-24 md:px-8"
      >
        <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-2">
          <motion.div
            variants={fadeInUp}
            className="relative overflow-hidden rounded-2xl"
          >
            <Image
              src="https://res.cloudinary.com/davidleo/image/upload/v1741645591/landtana/modern-beauty-salon-interior_q7xdvr.jpg"
              alt="Landtana Crown Braids Salon"
              width={600}
              height={800}
              className="h-auto w-full rounded-2xl object-cover shadow-xl"
            />
            <div className="absolute right-0 top-0 size-32 -translate-y-1/2 translate-x-1/2 rounded-full bg-orange-400 opacity-30 blur-3xl"></div>
            <div className="absolute bottom-0 left-0 size-40 -translate-x-1/2 translate-y-1/2 rounded-full bg-purple-400 opacity-30 blur-3xl"></div>
          </motion.div>

          <motion.div
            variants={fadeInUp}
            className="flex flex-col justify-center"
          >
            <motion.span
              variants={fadeInUp}
              className="mb-2 font-medium text-orange-500"
            >
              Our Journey
            </motion.span>
            <motion.h2 variants={fadeInUp} className="mb-6 text-4xl font-bold">
              The Landtana Story
            </motion.h2>
            <motion.p
              variants={fadeInUp}
              className="mb-6 text-lg text-gray-700"
            >
              Welcome to Landtana Crown Braids, San Antonio&apos;s premier
              destination for professional braiding services. Founded with a
              passion for celebrating natural hair and creating stunning braided
              styles, our salon has become a trusted name in the community.
            </motion.p>
            <motion.p variants={fadeInUp} className="text-lg text-gray-700">
              Our journey began with a simple vision: to provide exceptional
              braiding services in a welcoming environment where clients feel
              valued and understood. Today, that vision continues to guide
              everything we do.
            </motion.p>
          </motion.div>
        </div>
      </motion.div>

      <motion.div
        ref={philosophyRef}
        className="relative overflow-hidden bg-black py-24 text-white"
      >
        <div className="absolute inset-0 opacity-10">
          <Image
            src="/texture.png"
            alt="texture"
            fill
            className="object-cover"
          />
        </div>

        <div className="relative mx-auto max-w-5xl px-4">
          <motion.div
            className="flex flex-col items-center gap-12 lg:flex-row"
            initial="hidden"
            animate={philosophyInView ? "visible" : ""}
            variants={staggerChildren}
          >
            <motion.div className="relative flex-1" variants={fadeInUp}>
              <div className="absolute -left-20 -top-20 size-72 rounded-full bg-purple-500/20 blur-3xl"></div>
              <motion.div
                className="relative overflow-hidden rounded-2xl border border-white/10"
                whileHover={{ scale: 1.02 }}
              >
                <Image
                  src="https://res.cloudinary.com/davidleo/image/upload/v1741645591/landtana/beautiful-woman-getting-her-hair-done-beauty-salon_lsrus3.jpg"
                  alt="Stylist working"
                  width={600}
                  height={400}
                  className="h-auto w-full"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
              </motion.div>
            </motion.div>

            <motion.div className="flex-1" variants={fadeInUp}>
              <motion.h2
                className="mb-6 text-4xl font-bold"
                initial={{ x: 50 }}
                animate={{ x: 0 }}
              >
                Crafting Beauty
                <br />
                <span className="text-purple-400">With Purpose</span>
              </motion.h2>

              <motion.div
                className="space-y-6 text-lg font-light"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                <p>
                  At Landtana, we view each braid as a love letter to
                  traditional African hair artistry, reinterpreted through a
                  modern lens.
                </p>

                <div className="relative border-l-4 border-purple-400 pl-8">
                  <div className="absolute left-0 top-0 h-full w-1 bg-gradient-to-b from-purple-400 to-pink-400"></div>
                  <p className="italic">
                    &quot;Our hands don&apos;t just style hair - they weave
                    stories of cultural pride and individual expression&quot;
                  </p>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>

      {/* Our Commitment Section */}
      <motion.div
        ref={commitmentRef}
        animate={commitmentControls}
        initial="hidden"
        variants={staggerChildren}
        className="mx-auto max-w-7xl px-4 py-24"
      >
        <motion.div variants={fadeInUp} className="mb-16 text-center">
          <h2 className="mb-4 text-4xl font-bold">Our Commitment</h2>
          <p className="mx-auto max-w-3xl text-xl text-gray-600">
            We&apos;re committed to excellence in everything we do, from the
            moment you walk in until your final look.
          </p>
        </motion.div>

        <motion.div
          variants={staggerChildren}
          className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3"
        >
          {commitmentItems.map((item, index) => (
            <motion.div
              key={index}
              variants={fadeInUp}
              // whileHover={{ y: -10, transition: { duration: 0.3 } }}
              className={`overflow-hidden rounded-xl border ${item.color} p-1`}
            >
              <div className="h-full rounded-lg bg-white p-6">
                <div
                  className={`size-16 ${item.iconBg} mb-4 flex items-center justify-center rounded-full text-3xl`}
                >
                  {item.icon}
                </div>
                <h3 className="mb-2 text-xl font-semibold">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      {/* Our Space Section with Gallery */}
      <motion.div
        ref={spaceRef}
        initial="hidden"
        animate={spaceControls}
        variants={fadeInUp}
        className="relative bg-white py-24"
      >
        <div className="mx-auto max-w-7xl px-4">
          <motion.div
            className="mb-16 text-center"
            initial={{ opacity: 0 }}
            animate={spaceInView ? { opacity: 1 } : {}}
          >
            <h2 className="mb-4 text-5xl font-bold">Our Sanctuary</h2>
            <p className="mx-auto max-w-2xl text-xl text-gray-600">
              Where modern luxury meets warm, inviting comfort
            </p>
          </motion.div>

          <motion.div
            className="mb-12 grid grid-cols-1 gap-6 md:grid-cols-12"
            variants={staggerChildren}
          >
            <motion.div
              className="group relative h-96 overflow-hidden rounded-3xl md:col-span-8"
              whileHover="hover"
            >
              <Image
                src="https://res.cloudinary.com/davidleo/image/upload/v1741645591/landtana/modern-beauty-salon-interior_q7xdvr.jpg"
                alt="Main salon area"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
            </motion.div>

            <motion.div className="grid gap-6 md:col-span-4">
              <div className="group relative h-44 overflow-hidden rounded-2xl">
                <Image
                  src="https://res.cloudinary.com/davidleo/image/upload/v1739726304/landtana/IMG-20250114-WA0029_ppafw9.jpg"
                  alt="Salon detail"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div className="group relative h-44 overflow-hidden rounded-2xl">
                <Image
                  src="https://res.cloudinary.com/davidleo/image/upload/v1739726298/landtana/IMG-20250114-WA0031_sl9rvo.jpg"
                  alt="Salon detail"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            className="grid gap-8 md:grid-cols-3"
            initial="hidden"
            animate={spaceInView ? "visible" : ""}
            variants={staggerChildren}
          >
            {[
              "Eco-Friendly Products",
              "Ergonomic Seating",
              "Refreshment Bar",
            ].map((feature, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className="rounded-xl border border-purple-100 bg-gradient-to-br from-white to-purple-50 p-6"
              >
                <div className="mb-4 flex size-12 items-center justify-center rounded-lg bg-purple-100">
                  <span className="text-2xl">✨</span>
                </div>
                <h3 className="mb-2 text-lg font-semibold">{feature}</h3>
                <p className="text-sm text-gray-600">test</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.div>

      <MaxWidthContainer>
        <InstagramFeed />
      </MaxWidthContainer>
      <MaxWidthContainer className="!bg-white">
        <EnhancedCTA />
      </MaxWidthContainer>
    </div>
  );
}
