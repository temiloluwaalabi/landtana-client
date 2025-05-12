"use client";
import { motion } from "framer-motion";
import { Star, StarHalf } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";
import { useInView } from "react-intersection-observer";

import EnhancedServicesCarousel from "@/components/carousel/service-carousel";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { QuillPreview } from "@/components/ui/quill-preview";
import useSession from "@/hooks/use-session";
import { useBookingStore } from "@/lib/use-booking-store";
import { toCurrency } from "@/lib/utils";
import { Category, Service } from "@/types";

import MaxWidthContainer from "../max-width-container";
import PageTitleHeader from "../page-title-header";
import ServicesSection from "./_components/home-service-section";

type Props = {
  service: Service;
  services: Service[];
  subCat: Category[];
};
export const ServiceDetailsPage = ({ service, services, subCat }: Props) => {
  const { session } = useSession();
  const router = useRouter();
  const [reviewsRef, reviewsInView] = useInView({
    triggerOnce: false,
    threshold: 0.1,
  });
  const [galleryRef, galleryInView] = useInView({
    triggerOnce: false,
    threshold: 0.1,
  });
  const [descRef, desInView] = useInView({
    triggerOnce: false,
    threshold: 0.1,
  });

  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.8 } },
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  const staggerChildren = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const childVariant = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <>
      <MaxWidthContainer className="!pt-[40px]">
        <PageTitleHeader
          page={service.name}
          showCrumbs
          // lastItem={service.name.toLowerCase()}
        />
        <div className="grid grid-cols-1 gap-10 !pt-[10px] lg:grid-cols-2">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            className=""
          >
            <EnhancedServicesCarousel service={service} />
          </motion.div>
          {/* Service Details Section */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            className="flex flex-col justify-center space-y-4 lg:space-y-3"
          >
            {" "}
            <div>
              <motion.h2
                variants={fadeInUp}
                className="font-cormorant text-3xl font-bold text-purple-900 lg:text-4xl"
              >
                {service.name}
              </motion.h2>
              <motion.span
                variants={fadeInUp}
                className="flex items-center gap-1"
              >
                <span className="text-sm text-gray-600">From</span>
                <span className="text-xl font-bold text-primary lg:text-2xl">
                  {toCurrency(service.base_price)}
                </span>
              </motion.span>
            </div>
            <motion.div variants={fadeInUp}>
              <QuillPreview
                className="prose prose-sm -mt-2 max-w-none dark:text-light-200/80 [&_.ql-editor]:flex [&_.ql-editor]:flex-col [&_.ql-editor]:gap-2 [&_.ql-editor]:px-0 [&_.ql-editor]:text-base [&_h2]:hidden [&_h4]:text-base [&_li]:text-base [&_p:first-of-type]:line-clamp-2 [&_p:not(:first-of-type)]:hidden [&_p]:text-base [&_p]:font-normal [&_p]:leading-[25px] [&_p]:tracking-wide [&_p]:!text-black dark:[&_p]:text-light-400 [&_p_br]:hidden [&_span]:!bg-transparent [&_span]:!text-black dark:[&_span]:!text-light-400 [&_ul]:space-y-3"
                value={service.description}
              />
            </motion.div>
            <motion.div variants={staggerChildren} className="-mt-2">
              <Button
                onClick={() => {
                  useBookingStore.getState().updateState({
                    type: "individual",
                    step: 1,
                    currentGuestId: session.id,
                    primaryGuestId: session.id,
                    bookings: [
                      {
                        serviceId: service.id,
                        stylist: "ANITA ABAWAH",
                      },
                    ],
                  });
                  router.push("/book-service");
                }}
              >
                Book Service
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </MaxWidthContainer>
      <MaxWidthContainer>
        <motion.div
          ref={descRef}
          initial="hidden"
          animate={desInView ? "visible" : "hidden"}
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeInUp}
          className="flex flex-col gap-4"
        >
          {" "}
          <h2 className="font-lora text-lg font-medium">About this service</h2>
          <QuillPreview
            className={`-mt-2 dark:text-light-200/80 [&_.ql-editor]:flex [&_.ql-editor]:flex-col [&_.ql-editor]:gap-2 [&_.ql-editor]:px-0 [&_.ql-editor]:text-base [&_h2]:hidden [&_h4]:text-base [&_li]:text-base [&_p]:text-base [&_p]:font-normal  [&_p]:leading-[25px] [&_p]:tracking-wide [&_p]:!text-black dark:[&_p]:text-light-400 [&_p_br]:hidden [&_span]:!bg-transparent [&_span]:!text-black dark:[&_span]:!text-light-400 [&_ul]:space-y-3`}
            value={service.description}
          />
        </motion.div>
      </MaxWidthContainer>
      <MaxWidthContainer>
        <motion.div
          ref={galleryRef}
          initial="hidden"
          animate={galleryInView ? "visible" : "hidden"}
          variants={staggerChildren}
          className="grid h-auto grid-cols-6 gap-3 md:h-[450px] md:grid-cols-12 md:gap-4"
        >
          {" "}
          <motion.div
            variants={childVariant}
            className="relative col-span-6 h-64 md:col-span-5 md:h-auto"
          >
            {" "}
            <Image
              alt="first_gallery"
              fill
              src={
                service.featured_image ||
                "https://res.cloudinary.com/davidleo/image/upload/v1739726284/landtana/IMG-20250114-WA0041_tra4t4.jpg"
              }
              className="rounded-[12px] object-cover shadow-lg transition-transform duration-500 hover:scale-[1.02]"
            />
          </motion.div>
          <div className="col-span-3 flex flex-col gap-3 md:col-span-3 md:gap-4">
            <motion.div
              variants={childVariant}
              className="relative h-32 md:h-3/5"
            >
              <Image
                alt="Gallery image"
                fill
                src={
                  service.images[0] ||
                  "https://res.cloudinary.com/davidleo/image/upload/v1739726284/landtana/IMG-20250114-WA0041_tra4t4.jpg"
                }
                className="rounded-[12px] object-cover shadow-lg transition-transform duration-500 hover:scale-[1.02]"
              />
            </motion.div>
            <motion.div
              variants={childVariant}
              className="relative h-32 md:h-2/5"
            >
              <Image
                alt="Gallery image"
                fill
                src={
                  service.images[1] ||
                  "https://res.cloudinary.com/davidleo/image/upload/v1739726284/landtana/IMG-20250114-WA0041_tra4t4.jpg"
                }
                className="rounded-[12px] object-cover shadow-lg transition-transform duration-500 hover:scale-[1.02]"
              />
            </motion.div>
          </div>
          <div className="col-span-3 flex flex-col gap-3 md:col-span-4 md:gap-4">
            <motion.div
              variants={childVariant}
              className="relative h-32 md:h-2/5"
            >
              <Image
                alt="Gallery image"
                fill
                src={
                  service.images[2] ||
                  "https://res.cloudinary.com/davidleo/image/upload/v1739726284/landtana/IMG-20250114-WA0041_tra4t4.jpg"
                }
                className="rounded-[12px] object-cover shadow-lg transition-transform duration-500 hover:scale-[1.02]"
              />
            </motion.div>
            <motion.div
              variants={childVariant}
              className="relative h-32 md:h-3/5"
            >
              <Image
                alt="Gallery image"
                fill
                src={
                  service.images[3] ||
                  "https://res.cloudinary.com/davidleo/image/upload/v1739726284/landtana/IMG-20250114-WA0041_tra4t4.jpg"
                }
                className="rounded-[12px] object-cover shadow-lg transition-transform duration-500 hover:scale-[1.02]"
              />
            </motion.div>
          </div>
        </motion.div>
      </MaxWidthContainer>
      <MaxWidthContainer>
        <motion.div
          ref={reviewsRef}
          initial="hidden"
          animate={reviewsInView ? "visible" : "hidden"}
          variants={staggerChildren}
          className="flex flex-col gap-6"
        >
          {" "}
          <motion.h2
            variants={childVariant}
            className="font-lora text-2xl font-bold text-purple-900 lg:text-3xl"
          >
            Reviews
          </motion.h2>
          <div className="grid grid-cols-1 lg:grid-cols-2">
            <div className="flex flex-col items-start gap-4 lg:flex-row lg:items-center">
              <div className="flex size-full flex-col items-center justify-center gap-2 rounded-[4px] bg-white p-[15px]">
                <h4>4.5/5</h4>
                <span className="flex items-center gap-1">
                  <Star color="#FACC15" fill="#FACC15" />
                  <Star color="#FACC15" fill="#FACC15" />
                  <Star color="#FACC15" fill="#FACC15" />
                  <Star color="#FACC15" fill="#FACC15" />{" "}
                  <StarHalf color="#FACC15" fill="#FACC15" />
                </span>
                <span>100 ratings </span>
              </div>
              <div className=" w-full space-y-2">
                <div className="flex w-full items-center gap-1">
                  <span className="flex items-center gap-1">
                    {" "}
                    5 <Star fill="#000" className="size-4" />{" "}
                    <span className="text-[#AFAFAF] ">(20)</span>
                  </span>
                  <Progress value={100} />
                </div>
                <div className="flex items-center gap-1">
                  <span className="flex items-center gap-1">
                    {" "}
                    4 <Star fill="#000" className="size-4" />{" "}
                    <span className="text-[#AFAFAF] ">(20)</span>
                  </span>
                  <Progress value={80} />
                </div>
                <div className="flex items-center gap-1">
                  <span className="flex items-center gap-1">
                    {" "}
                    3 <Star fill="#000" className="size-4" />{" "}
                    <span className="text-[#AFAFAF] ">(20)</span>
                  </span>
                  <Progress value={60} />
                </div>
                <div className="flex items-center gap-1">
                  <span className="flex items-center gap-1">
                    {" "}
                    2 <Star fill="#000" className="size-4" />{" "}
                    <span className="text-[#AFAFAF] ">(20)</span>
                  </span>
                  <Progress value={40} />
                </div>
                <div className="flex items-center gap-1">
                  <span className="flex items-center gap-1">
                    {" "}
                    1 <Star fill="#000" className="size-4" />{" "}
                    <span className="text-[#AFAFAF] ">(20)</span>
                  </span>
                  <Progress value={20} />
                </div>
              </div>
            </div>
            <div></div>
          </div>
          <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
              <div
                key={item}
                className="relative space-y-3 rounded-[4px] bg-white p-3"
              >
                <div className="absolute right-0 top-0 mr-2 mt-3 flex size-[60px] flex-col items-center justify-center rounded-full border-4 border-primary bg-[#E7FFE3]">
                  <h2 className="text-2xl font-bold ">4.5</h2>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Avatar>
                      <AvatarFallback className="bg-gray-100">
                        CN
                      </AvatarFallback>
                    </Avatar>
                    <div className="">
                      <h6 className="text-base font-semibold text-primary">
                        Sola W
                      </h6>
                      <p className="text-sm">Texas, San Antonio</p>
                    </div>
                  </div>
                </div>
                <div>
                  <p className="text-sm lg:text-base">
                    I absolutely love my box braids! They are super neat,
                    lightweight, and don’t pull on my scalp. The stylist took
                    her time to part my hair evenly, and the result is flawless.
                    It’s been weeks, and they still look fresh! Highly recommend
                    this style for a protective, stylish look.
                  </p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </MaxWidthContainer>
      <ServicesSection filteredServices={services} categories={subCat} />
    </>
  );
};
