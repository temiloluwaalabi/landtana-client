/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { motion, useAnimation, AnimatePresence } from "framer-motion";
import { ArrowRight, ChevronRight, Instagram, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import * as React from "react";
import { useInView } from "react-intersection-observer";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Carousel } from "@/components/ui/apple-cards-carousel";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { faqData } from "@/config/constants";
import {
  containerVariants,
  fadeInUp,
  itemVariants,
  staggerChildren,
  titleVariants,
} from "@/lib/variants";
import { Category, Service } from "@/types";

import { data } from "../card-demo";
import { HeroSection } from "../hero";
import MaxWidthContainer from "../max-width-container";
import ExpertiseSection from "./_components/home-expertise-section";
import ServicesSection from "./_components/home-service-section";
import ProfessionalSection from "./_components/professionals-section";

type Props = {
  services: Service[];
  categories: Category[];
  subCat: Category[];
};
export const imageHover = {
  rest: { scale: 1, transition: { duration: 0.3, ease: "easeInOut" } },
  hover: { scale: 1.05, transition: { duration: 0.3, ease: "easeInOut" } },
};

export const buttonHover = {
  rest: { scale: 1 },
  hover: { scale: 1.05, transition: { duration: 0.2 } },
};
const buttonVariants = {
  initial: { scale: 1 },
  hover: {
    scale: 1.05,
    boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.1)",
    transition: { duration: 0.3, yoyo: Infinity },
  },
  tap: { scale: 0.95 },
};
// Instagram Feed Component
export const InstagramFeed = () => {
  const controls = useAnimation();
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });

  React.useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  // Mock Instagram posts
  const instaPosts = [
    "https://res.cloudinary.com/davidleo/image/upload/v1739726284/landtana/IMG-20250114-WA0041_tra4t4.jpg",
    "https://res.cloudinary.com/davidleo/image/upload/v1739726303/landtana/IMG-20250114-WA0024_beh14v.jpg",
    "https://res.cloudinary.com/davidleo/image/upload/v1739726280/landtana/IMG-20250114-WA0025_irkyja.jpg",
    "https://res.cloudinary.com/davidleo/image/upload/v1739726300/landtana/IMG-20250114-WA0019_xixtjo.jpg",
    "https://res.cloudinary.com/davidleo/image/upload/v1739726293/landtana/IMG-20250114-WA0044_jd79oj.jpg",
    "https://res.cloudinary.com/davidleo/image/upload/v1739748138/landtana/a4ae835795f7033b83f7ebf019ce8bd0_r8h7d7.png",
  ];

  return (
    <motion.div
      ref={ref}
      variants={staggerChildren}
      initial="hidden"
      animate={controls}
      className="space-y-8"
    >
      <div className="flex items-center justify-between">
        <motion.div variants={fadeInUp} className="space-y-2">
          <div className="flex items-center gap-2">
            <div className="h-px w-[40px] bg-[#777777]" />
            <span className="text-xs text-[#777777]">FOLLOW US</span>
          </div>
          <h2 className="font-cormorant text-4xl font-bold text-accent">
            @landtanacrown
          </h2>
        </motion.div>
        <motion.a
          variants={fadeInUp}
          whileHover="hover"
          whileTap={{ scale: 0.95 }}
          initial="rest"
          href="https://instagram.com"
          target="_blank"
          className="flex items-center gap-2 text-secondary"
        >
          <Instagram size={20} />
          <span>Follow us on Instagram</span>
          <ChevronRight size={16} />
        </motion.a>
      </div>

      <motion.div
        variants={staggerChildren}
        className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6"
      >
        {instaPosts.map((post, index) => (
          <motion.div
            key={index}
            variants={fadeInUp}
            whileHover="hover"
            initial="rest"
            className="relative aspect-square overflow-hidden rounded-lg"
          >
            <motion.div variants={imageHover} className="size-full">
              <Image
                src={post}
                fill
                className="object-cover"
                alt={`Instagram post ${index + 1}`}
              />
              <div className="absolute inset-0 flex items-center justify-center bg-primary/0 opacity-0 transition-all duration-300 hover:bg-primary/20 hover:opacity-100">
                <Instagram color="white" size={24} />
              </div>
            </motion.div>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
};

// Enhanced CTA Component
export const EnhancedCTA = () => {
  const controls = useAnimation();
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });

  React.useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={fadeInUp}
      className="relative overflow-hidden rounded-[30px] bg-gradient-to-r from-primary to-accent py-16"
    >
      {/* Background elements */}
      <div className="absolute -right-20 -top-20 size-64 rounded-full bg-secondary/10 blur-3xl" />
      <div className="absolute -bottom-20 -left-20 size-64 rounded-full bg-white/10 blur-3xl" />

      <div className="relative z-10 flex flex-col items-center px-4 text-center">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="mb-4 rounded-full bg-white/20 p-4"
        >
          <div className="rounded-full bg-white p-2">
            <Star fill="#FF2C56" stroke="#FF2C56" size={24} />
          </div>
        </motion.div>

        <motion.h2
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="font-cormorant text-4xl font-bold text-white md:text-5xl lg:text-6xl"
        >
          Ready for a Transformation?
        </motion.h2>

        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="mb-8 mt-4 max-w-xl text-lg text-white/90"
        >
          Book your appointment today and experience our award-winning braiding
          services. First-time clients receive a special 15% discount.
        </motion.p>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="flex flex-col space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0"
        >
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              size="lg"
              className="bg-white font-medium text-primary hover:bg-white/90"
            >
              <Link href="/consultation">Book Consultation</Link>
            </Button>
          </motion.div>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              variant="outline"
              size="lg"
              className="border-white bg-transparent text-white hover:bg-white/10"
            >
              <Link href="/services">View Services</Link>
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export const HomePageClient = (props: Props) => {
  const [activeTab, setActiveTab] = React.useState("general");
  // Animation controls
  const controls = useAnimation();
  const faqControls = useAnimation();
  const reviewControl = useAnimation();

  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });
  const [faqRef, faqInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  const [reviewRef, reviewInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  React.useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
    if (faqInView) faqControls.start("visible");
    if (reviewInView) reviewControl.start("visible");
  }, [controls, faqControls, faqInView, inView, reviewControl, reviewInView]);

  const filteredServices = props.services.sort(
    (a, b) =>
      new Date(a.created_at).getTime() - new Date(b.created_at).getTime(),
  );
  const filteredCategories = props.categories.sort(
    (a, b) =>
      new Date(a.created_at).getTime() - new Date(b.created_at).getTime(),
  );
  const cards = data.map((card) => (
    <motion.div
      key={card.src}
      whileHover={{ y: -5 }}
      className="h-fit w-[400px] rounded-[40px] sm:w-[540px]"
    >
      <Card className="h-full overflow-hidden border-none bg-white/10 shadow-lg backdrop-blur-sm transition-all duration-300 hover:shadow-xl">
        <CardHeader className="flex flex-row items-center gap-2">
          <div className="overflow-hidden rounded-full">
            <motion.div whileHover={{ scale: 1.1 }} className="size-full">
              <Image
                src="https://res.cloudinary.com/davidleo/image/upload/v1739748138/landtana/a4ae835795f7033b83f7ebf019ce8bd0_r8h7d7.png"
                alt="Box Braid"
                width={40}
                height={40}
                className="size-[40px] rounded-full border border-primary object-cover"
              />
            </motion.div>
          </div>
          <div className="flex flex-col items-start gap-1">
            <h4 className="text-white/90">Temi Alabi</h4>
            <h2 className="text-xs text-white md:text-sm">
              Exceptional Service & Atmosphere
            </h2>
          </div>
        </CardHeader>
        <CardContent>
          <p className="font-lora text-sm font-normal text-white/80 md:text-base">
            &quot;I had an amazing experience at Landtana! From the moment I
            walked in, the staff made me feel welcome and comfortable. The salon
            has a relaxing atmosphere, and my stylist truly listened to what I
            wanted. I walked out feeling more confident than ever with my new
            hairstyle. Highly recommend!&quot;
          </p>
        </CardContent>
        <CardFooter className="flex flex-row items-center justify-between text-white/70">
          <div className="flex">
            <Star
              fill="#FF2C56"
              stroke="#FF2C56"
              className="border-secondary"
            />
            <Star
              fill="#FF2C56"
              stroke="#FF2C56"
              className="border-secondary"
            />
            <Star
              fill="#FF2C56"
              stroke="#FF2C56"
              className="border-secondary"
            />
            <Star
              fill="#FF2C56"
              stroke="#FF2C56"
              className="border-secondary"
            />
            <Star fill="#fff" stroke="#FF2C56" />
          </div>
          21st October, 2024
        </CardFooter>
      </Card>
    </motion.div>
  ));
  return (
    <>
      {/* HERO SECTION */} <HeroSection heroVariant="GREEN" />
      {/* WHAT WE DO SECTION */}
      <MaxWidthContainer className="!py-[80px]">
        <motion.div
          initial="hidden"
          animate={controls}
          variants={staggerChildren}
          ref={ref}
          className="relative flex flex-col gap-14  md:flex-row "
        >
          <motion.div
            className="flex w-full flex-col justify-center gap-6"
            variants={fadeInUp}
          >
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: "40px" }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="h-px w-[40px] bg-[#777777]"
                />
                <span className="text-xs text-[#777777]">WHAT WE DO</span>
              </div>
              <motion.h2
                variants={fadeInUp}
                className="max-w-[322px] font-cormorant text-5xl font-bold text-[#1E0203]"
              >
                All things Braid at your service
              </motion.h2>
              <motion.p
                variants={fadeInUp}
                className="max-w-[404px] text-base font-normal text-[#4E4E4E]"
              >
                Our objective is to provide grooming services to our patrons in
                a tranquil and classy environment
              </motion.p>
              <motion.div
                variants={fadeInUp}
                whileHover={{ x: 5 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <Button
                  className="p-0 text-base text-secondary underline"
                  variant={"link"}
                >
                  Book Today{" "}
                  <ArrowRight className="ml-1 transition-transform duration-300 group-hover:translate-x-1" />
                </Button>
              </motion.div>
            </div>
            <motion.div variants={staggerChildren} className="flex gap-6 ">
              <div className="w-fit space-y-[30px]">
                <motion.div
                  variants={fadeInUp}
                  whileHover="hover"
                  initial="rest"
                  className="relative size-[150px] sm:size-[200px] md:size-[250px]"
                >
                  <motion.div className="size-full" variants={imageHover}>
                    <Image
                      src="https://res.cloudinary.com/davidleo/image/upload/v1739726284/landtana/IMG-20250114-WA0041_tra4t4.jpg"
                      fill
                      className="w-full rounded-[20px] object-cover transition-transform duration-500"
                      alt="oil "
                    />
                  </motion.div>
                </motion.div>
                <motion.div
                  whileHover="hover"
                  initial="rest"
                  className="relative size-[150px] sm:size-[200px] md:size-[250px]"
                >
                  <motion.div className="size-full" variants={imageHover}>
                    <Image
                      src="https://res.cloudinary.com/davidleo/image/upload/v1739726303/landtana/IMG-20250114-WA0024_beh14v.jpg"
                      fill
                      className="w-full rounded-[20px] object-cover transition-transform duration-500"
                      alt="oil "
                    />
                  </motion.div>
                </motion.div>
              </div>
              <div className=" w-fit space-y-[30px]">
                <div className="h-[30px] w-full" />
                <motion.div
                  whileHover="hover"
                  initial="rest"
                  className="relative size-[150px] sm:size-[200px] md:size-[250px]"
                >
                  <motion.div className="size-full" variants={imageHover}>
                    <Image
                      src="https://res.cloudinary.com/davidleo/image/upload/v1739726280/landtana/IMG-20250114-WA0025_irkyja.jpg"
                      fill
                      className="w-full rounded-[20px] object-cover transition-transform duration-500"
                      alt="oil "
                    />
                  </motion.div>
                </motion.div>
                <motion.div
                  whileHover="hover"
                  initial="rest"
                  className="relative size-[150px] sm:size-[200px] md:size-[250px]"
                >
                  <motion.div className="size-full" variants={imageHover}>
                    <Image
                      src="https://res.cloudinary.com/davidleo/image/upload/v1739726300/landtana/IMG-20250114-WA0019_xixtjo.jpg"
                      fill
                      className="w-full rounded-[20px] object-cover transition-transform duration-500"
                      alt="oil "
                    />
                  </motion.div>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
          <motion.div
            variants={fadeInUp}
            whileHover="hover"
            initial="rest"
            className="w-full "
          >
            <motion.div
              variants={imageHover}
              className="relative h-[450px] w-full md:h-[700px] lg:h-[900px]"
            >
              <Image
                src="https://res.cloudinary.com/davidleo/image/upload/v1739726293/landtana/IMG-20250114-WA0044_jd79oj.jpg"
                fill
                className="w-full rounded-[20px] object-cover transition-transform duration-700"
                alt="oil "
              />
            </motion.div>
          </motion.div>
        </motion.div>
      </MaxWidthContainer>
      <ExpertiseSection
        services={filteredServices}
        filteredCategories={filteredCategories}
      />
      <ServicesSection
        filteredServices={filteredServices}
        categories={props.subCat}
      />
      <MaxWidthContainer className="!bg-[#F5F6F7]">
        <EnhancedCTA />
      </MaxWidthContainer>
      <ProfessionalSection filteredServices={filteredServices} />
      <MaxWidthContainer className="bg-primary !py-[40px]">
        <motion.div
          ref={reviewRef}
          initial="hidden"
          animate={reviewControl}
          variants={fadeInUp}
          className="relative overflow-hidden py-8"
        >
          <motion.h2
            variants={fadeInUp}
            className="mb-5 font-cormorant text-4xl font-bold text-white"
          >
            The Reviews
          </motion.h2>
          <Carousel items={cards} />

          {/* <AppleCardsCarouselDemo /> */}
        </motion.div>
      </MaxWidthContainer>
      <MaxWidthContainer className="bg-[#F5F6F7] !py-[40px]">
        <motion.div
          className=""
          ref={faqRef}
          variants={containerVariants}
          initial="hidden"
          animate={faqControls}
        >
          <div className="space-y-4">
            <motion.div
              variants={titleVariants}
              className="flex flex-col items-center justify-center gap-2"
            >
              <h2 className="text-center font-cormorant text-3xl font-bold text-accent lg:text-4xl xl:text-6xl">
                Relax we’re always here for you!{" "}
              </h2>
              <motion.div
                className="h-1 w-20 rounded-full bg-gradient-to-r from-accent to-pink-400"
                initial={{ width: 0 }}
                animate={{ width: "80px" }}
                transition={{ delay: 0.5, duration: 0.8 }}
              />
              <p className="text-center text-base font-normal text-[#2F201A] lg:text-2xl">
                We always provide the best service for you
              </p>
            </motion.div>
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
                className="w-full pt-4"
                onValueChange={setActiveTab}
              >
                <motion.div
                  className="flex justify-center"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                >
                  <TabsList className="custom-scrollbar flex size-full h-auto items-start justify-start gap-3 overflow-hidden overflow-x-scroll bg-white p-2">
                    {faqData.map((data) => (
                      <motion.div
                        key={data.category}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <TabsTrigger
                          className="rounded-[60px] text-sm data-[state=active]:bg-primary   data-[state=active]:text-white lg:text-base"
                          value={data.category.toLowerCase()}
                        >
                          {data.category}
                        </TabsTrigger>
                      </motion.div>
                    ))}
                  </TabsList>
                </motion.div>

                <AnimatePresence mode="wait">
                  {faqData.map((data, i) => (
                    <TabsContent
                      key={`${i}dpd${data.category}`}
                      value={data.category.toLowerCase()}
                      className=""
                    >
                      <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                      >
                        <Accordion type="single" collapsible className="w-full">
                          {data.questions.map((faq, index) => (
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
                          ))}
                        </Accordion>
                      </motion.div>
                    </TabsContent>
                  ))}

                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6, duration: 0.5 }}
                    className="flex items-center justify-center"
                  >
                    <motion.div
                      variants={buttonVariants}
                      initial="initial"
                      whileHover="hover"
                      whileTap="tap"
                    >
                      <Button className="relative flex items-center gap-2 rounded-md border border-secondary bg-white/80 px-8 py-6 text-base font-medium text-secondary shadow-sm backdrop-blur-sm transition-all duration-300 hover:bg-secondary hover:text-white">
                        <Link
                          href={"/faq"}
                          className="absolute left-0 top-0 z-10 size-full"
                        />
                        View More FAQs
                        <motion.svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="ml-1"
                          animate={{ x: [0, 5, 0] }}
                          transition={{
                            repeat: Infinity,
                            duration: 1.5,
                            ease: "easeInOut",
                          }}
                        >
                          <line x1="5" y1="12" x2="19" y2="12" />
                          <polyline points="12 5 19 12 12 19" />
                        </motion.svg>
                      </Button>
                    </motion.div>
                  </motion.div>
                </AnimatePresence>

                {/* 
              {faqData.map((data, i) => (
                <TabsContent
                  key={`${i}dpd${data.category}`}
                  value={data.category}
                  className="w-full py-2"
                >
                  <Accordion
                    type="single"
                    collapsible
                    className="w-full space-y-4"
                  >
                    {data.questions.map((faq) => (
                      <AccordionItem
                        value={faq.question}
                        key={faq.question}
                        className="accord-main rounded-[12px] border-none bg-white px-6 py-4 data-[state=open]:bg-primary data-[state=open]:text-white"
                      >
                        <AccordionTrigger className=" border-none text-lg font-medium">
                          {faq.question}
                        </AccordionTrigger>
                        <AccordionContent>{faq.answer}</AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </TabsContent>
              ))} */}
              </Tabs>
            </motion.div>
          </div>
          <div></div>

          {/* <AppleCardsCarouselDemo /> */}
        </motion.div>
      </MaxWidthContainer>
      <MaxWidthContainer>
        <InstagramFeed />
      </MaxWidthContainer>
    </>
  );
};
