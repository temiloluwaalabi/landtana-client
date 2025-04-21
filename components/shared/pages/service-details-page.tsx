"use client";
import { motion } from "framer-motion";
import { Star, StarHalf } from "lucide-react";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";

import EnhancedServicesCarousel from "@/components/carousel/service-carousel";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { QuillPreview } from "@/components/ui/quill-preview";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { durations } from "@/config/constants";
import { toCurrency } from "@/lib/utils";
import { Category, Service, StyleOption } from "@/types";

import MaxWidthContainer from "../max-width-container";
import PageTitleHeader from "../page-title-header";
import ServicesSection from "./_components/home-service-section";

type Props = {
  service: Service;
  services: Service[];
  subCat: Category[];
};
export const ServiceDetailsPage = ({ service, services, subCat }: Props) => {
  const [step, setStep] = useState(1);
  const [selectedStyleOption, setSelectedStyleOption] = useState<string>("");
  const [additionalServiceType, setAdditionalServiceType] =
    useState<string>(""); // 'pre-service' or 'post-service'
  const [selectedVariations, setSelectedVariations] = useState<StyleOption[]>(
    [],
  );
  console.log(additionalServiceType);
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
  // useEffect to handle initial step setup
  useEffect(() => {
    if (!service.variations?.length && service.style_options?.length > 0) {
      setStep(2); // Start at style options if no variations but style options exist
    } else if (!service.variations?.length && !service.style_options?.length) {
      setStep(3); // Start at additional services if no variations and no style options
    } else {
      setStep(1); // Default to variations step
    }
  }, [service.variations, service.style_options]);

  // console.log(additionalServiceType);

  const handleSelectStyleOption = (option: string) => {
    setSelectedStyleOption(option);
  };

  // const handleSelectAdditionalServiceType = (type: string) => {
  //   setAdditionalServiceType(type);
  //   setStep(4)
  // };

  const handleVariationChange = (variation: StyleOption) => {
    if (selectedVariations.includes(variation)) {
      setSelectedVariations(selectedVariations.filter((v) => v !== variation));
    } else {
      setSelectedVariations([...selectedVariations, variation]);
    }
  };
  const handleContinue = () => {
    if (step === 1) {
      if (service.variations?.length > 0 && !service.style_options?.length) {
        setStep(3); // Skip to additional services if no style options
      } else {
        setStep(2); // Move to style options
      }
    } else if (step === 2) {
      setStep(3); // Move to additional services
    } else {
      setStep(4); // Move to booking
    }
  };
  const handleSkip = () => {
    setStep(4); // Skip to booking
  };

  const handleAdditionalServiceType = (type: string) => {
    setAdditionalServiceType(type);
    setStep(4); // Move to booking
  };
  return (
    <>
      <MaxWidthContainer className="!pt-[40px]">
        <PageTitleHeader
          page={service.name}
          showCrumbs
          lastItem={service.name.toLowerCase()}
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
                className="prose prose-sm dark:text-light-200/80 dark:[&_p]:text-light-400 dark:[&_span]:!text-light-400 -mt-2 max-w-none [&_.ql-editor]:flex [&_.ql-editor]:flex-col [&_.ql-editor]:gap-2 [&_.ql-editor]:px-0 [&_.ql-editor]:text-base [&_h2]:hidden [&_h4]:text-base [&_li]:text-base [&_p:first-of-type]:line-clamp-2 [&_p:not(:first-of-type)]:hidden [&_p]:text-base [&_p]:font-normal [&_p]:leading-[25px] [&_p]:tracking-wide [&_p]:!text-black [&_p_br]:hidden [&_span]:!bg-transparent [&_span]:!text-black [&_ul]:space-y-3"
                value={service.description}
              />
            </motion.div>
            <motion.div variants={staggerChildren} className="-mt-2">
              {" "}
              {/* STEP 1: Variations */}
              {step === 1 && service.variations?.length > 0 && (
                <motion.div
                  variants={childVariant}
                  className="rounded-xl border border-purple-100 bg-white/80 p-4 shadow-sm backdrop-blur-sm"
                >
                  {" "}
                  <h6 className="font-medium">Variations</h6>
                  <p className="text-sm">Choose a variation to get started</p>
                  <div className="space-y-2">
                    {service.variations.map((variation) => (
                      <motion.div
                        key={variation.id}
                        variants={childVariant}
                        className="flex items-center gap-2 rounded-lg p-2 transition-colors hover:bg-purple-50"
                      >
                        <Checkbox
                          checked={selectedVariations.includes(variation)}
                          onChange={() => handleVariationChange(variation)}
                          className="size-8"
                        />
                        <Label>
                          {variation.name} - {toCurrency(variation.price, true)}{" "}
                          -{" "}
                          {
                            durations.find(
                              (dur) => dur.value === variation.duration,
                            )?.label
                          }
                        </Label>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}
              {step === 2 && service.style_options?.length > 0 && (
                <motion.div
                  variants={childVariant}
                  className="space-y-2 rounded-xl"
                >
                  {" "}
                  <div>
                    <h6 className="font-medium">Style Options</h6>
                    <p className="text-sm">
                      Choose a style option to get started
                    </p>
                  </div>
                  <div className="space-y-2">
                    <RadioGroup
                      onValueChange={(value) => handleSelectStyleOption(value)}
                      defaultValue={selectedStyleOption}
                      value={selectedStyleOption}
                      className="cursor-pointer"
                    >
                      {service.style_options.map((option) => (
                        <motion.div
                          key={option.id}
                          variants={childVariant}
                          onClick={() => handleSelectStyleOption(option.id)}
                          className="flex cursor-pointer items-center gap-2 rounded-lg border p-2 transition-colors hover:bg-purple-50"
                        >
                          <RadioGroupItem
                            value={option.id}
                            // checked={option === selectedStyleOption}
                            // onChange={() => handleSelectStyleOption(option)}
                            className="size-6"
                          />
                          <Label>
                            {option.name} - {toCurrency(option.price, true)} -{" "}
                            {
                              durations.find(
                                (dur) => dur.value === option.duration,
                              )?.label
                            }
                          </Label>
                        </motion.div>
                      ))}
                    </RadioGroup>
                  </div>
                </motion.div>
              )}
              {step === 3 && (
                <motion.div
                  variants={childVariant}
                  className="space-y-3 rounded-xl border border-purple-100 bg-white/80 p-4 shadow-sm backdrop-blur-sm"
                >
                  {" "}
                  <div>
                    <h6 className="font-medium">Additional Services</h6>
                    <p className="text-sm">
                      Do you need any additional services?
                    </p>
                  </div>
                  <div className="space-y-2">
                    <Button
                      onClick={() => handleAdditionalServiceType("pre-service")}
                      className="w-full"
                    >
                      Pre-Service
                    </Button>
                    <Button
                      onClick={() =>
                        handleAdditionalServiceType("post-service")
                      }
                      className="w-full"
                    >
                      Post-Service
                    </Button>
                    <Button
                      onClick={handleSkip}
                      variant="outline"
                      className="w-full"
                    >
                      Skip
                    </Button>
                  </div>
                </motion.div>
              )}
              {step === 4 && (
                <motion.div
                  variants={childVariant}
                  className="rounded-xl border border-purple-100 bg-white/80 p-4 shadow-sm backdrop-blur-sm"
                >
                  {" "}
                  <div>
                    <h6 className="font-medium">Booking</h6>
                    <p className="text-sm">
                      Proceed to book your selected services:
                    </p>
                  </div>
                  <div className="mt-4 flex items-center gap-4">
                    <Button className="h-[45px] w-full bg-secondary">
                      Book Now
                    </Button>
                    <Button className="h-[45px] w-full border border-secondary bg-transparent text-secondary hover:border-primary hover:text-white">
                      Save for later
                    </Button>
                  </div>
                </motion.div>
              )}
              {(step === 1 || step === 2) && (
                <motion.div
                  variants={childVariant}
                  className="mt-3 grid grid-cols-1 gap-3 md:grid-cols-2"
                >
                  <Button
                    onClick={handleContinue}
                    className="h-[45px] w-full bg-secondary shadow-md hover:bg-secondary/90"
                  >
                    Continue
                  </Button>
                  <Button
                    onClick={handleSkip}
                    variant="outline"
                    className="h-[45px] w-full"
                  >
                    Skip
                  </Button>
                </motion.div>
              )}
              {/* <div>
                <h6 className="font-medium">Additional Services</h6>
                <p className="text-sm">
                  Indicate the additional services you need by clicking the
                  checkbox
                </p>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Checkbox className="size-8" />
                  <Label>Addon 1 - $20</Label>
                </div>
                <div className="flex items-center gap-2">
                  <Checkbox className="size-8" />
                  <Label>Addon 2- $20</Label>
                </div>
                <div className="flex items-center gap-2">
                  <Checkbox className="size-8" />
                  <Label>Addon 3 - $20</Label>
                </div>
                <div className="flex items-center gap-2">
                  <Checkbox className="size-8" />
                  <Label>Addon 4 - $20</Label>
                </div>
                <div className="flex items-center gap-2">
                  <Checkbox className="size-8" />
                  <Label>Addon 5 - $20</Label>
                </div>
              </div> */}
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
            className={`dark:text-light-200/80 dark:[&_p]:text-light-400 dark:[&_span]:!text-light-400 -mt-2 [&_.ql-editor]:flex [&_.ql-editor]:flex-col [&_.ql-editor]:gap-2 [&_.ql-editor]:px-0 [&_.ql-editor]:text-base [&_h2]:hidden [&_h4]:text-base [&_li]:text-base  [&_p]:text-base [&_p]:font-normal [&_p]:leading-[25px] [&_p]:tracking-wide [&_p]:!text-black [&_p_br]:hidden [&_span]:!bg-transparent [&_span]:!text-black [&_ul]:space-y-3`}
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
