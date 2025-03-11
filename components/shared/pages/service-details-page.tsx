"use client";
import { Star, StarHalf } from "lucide-react";
import Image from "next/image";
import React, { useEffect, useState } from "react";

import { ServicePriceCard } from "@/components/cards/service-price-card";
import EnhancedServicesCarousel from "@/components/carousel/service-carousel";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { QuillPreview } from "@/components/ui/quill-preview";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { durations } from "@/config/constants";
import { toCurrency } from "@/lib/utils";
import { Service, StyleOption } from "@/types";

import MaxWidthContainer from "../max-width-container";
import PageTitleHeader from "../page-title-header";

type Props = {
  service: Service;
  services: Service[];
};
export const ServiceDetailsPage = ({ service, services }: Props) => {
  const [step, setStep] = useState(1);
  const [selectedStyleOption, setSelectedStyleOption] = useState<string>("");
  const [additionalServiceType, setAdditionalServiceType] =
    useState<string>(""); // 'pre-service' or 'post-service'
  const [selectedVariations, setSelectedVariations] = useState<StyleOption[]>(
    []
  );

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

  console.log(additionalServiceType);

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
        <div className="grid grid-cols-2 gap-10 !pt-[10px]">
          <div className="">
            <EnhancedServicesCarousel service={service} />
          </div>
          <div className="flex flex-col justify-center space-y-3">
            <div>
              <h2 className="font-cormorant text-4xl font-bold">
                {service.name}
              </h2>
              <span className="flex items-center gap-1">
                <span className="text-sm">From</span>
                <span className="text-2xl font-bold text-primary ">
                  {toCurrency(service.base_price)}
                </span>
              </span>
            </div>
            <QuillPreview
              className={`dark:text-light-200/80 dark:[&_p]:text-light-400 dark:[&_span]:!text-light-400 // 
            👈 Show only the first 
            <p> // 👈 
            Hide all other <p> elements 
            -mt-2  [&_.ql-editor]:flex [&_.ql-editor]:flex-col [&_.ql-editor]:gap-2 [&_.ql-editor]:px-0 [&_.ql-editor]:text-base [&_h2]:hidden [&_h4]:text-base
            [&_li]:text-base   [&_p:first-of-type]:line-clamp-2 [&_p:not(:first-of-type)]:hidden [&_p]:text-base [&_p]:font-normal [&_p]:leading-[25px] [&_p]:tracking-wide [&_p]:!text-black
            [&_p_br]:hidden 
            [&_span]:!bg-transparent [&_span]:!text-black 
            [&_ul]:space-y-3`}
              value={service.description}
            />
            <div className="space-y-4">
              {/* STEP 1: Variations */}
              {step === 1 && service.variations?.length > 0 && (
                <div>
                  <h6 className="font-medium">Variations</h6>
                  <p className="text-sm">Choose a variation to get started</p>
                  <div className="space-y-2">
                    {service.variations.map((variation) => (
                      <div
                        key={variation.id}
                        className="flex items-center gap-2"
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
                              (dur) => dur.value === variation.duration
                            )?.label
                          }
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              {step === 2 && service.style_options?.length > 0 && (
                <div className="space-y-2">
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
                    >
                      {service.style_options.map((option) => (
                        <div
                          key={option.id}
                          className="flex items-center gap-2"
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
                                (dur) => dur.value === option.duration
                              )?.label
                            }
                          </Label>
                        </div>
                      ))}
                    </RadioGroup>
                  </div>
                </div>
              )}
              {step === 3 && (
                <div className="space-y-2">
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
                </div>
              )}

              {step === 4 && (
                <div>
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
                </div>
              )}
              {(step === 1 || step === 2) && (
                <div className="mt-4 flex items-center gap-4">
                  <Button
                    onClick={handleContinue}
                    className="h-[45px] w-full bg-secondary"
                  >
                    Continue
                  </Button>
                  <Button
                    onClick={handleSkip}
                    variant="outline"
                    className="mt-2 h-[45px] w-full"
                  >
                    Skip
                  </Button>
                </div>
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
            </div>
            {/* <div className="mt-4 flex items-center gap-4">
              <Button className="h-[45px] w-full bg-secondary">Book Now</Button>
              <Button className="h-[45px] w-full border border-secondary bg-transparent text-secondary hover:border-primary hover:text-white">
                Save for later
              </Button>
            </div> */}
          </div>
        </div>
      </MaxWidthContainer>
      <MaxWidthContainer>
        <div className="flex flex-col gap-2">
          <h2 className="font-lora text-lg font-medium">About this service</h2>
          <QuillPreview
            className={`dark:text-light-200/80 dark:[&_p]:text-light-400 dark:[&_span]:!text-light-400 -mt-2 [&_.ql-editor]:flex [&_.ql-editor]:flex-col [&_.ql-editor]:gap-2 [&_.ql-editor]:px-0 [&_.ql-editor]:text-base [&_h2]:hidden [&_h4]:text-base [&_li]:text-base  [&_p]:text-base [&_p]:font-normal [&_p]:leading-[25px] [&_p]:tracking-wide [&_p]:!text-black [&_p_br]:hidden [&_span]:!bg-transparent [&_span]:!text-black [&_ul]:space-y-3`}
            value={service.description}
          />
        </div>
      </MaxWidthContainer>
      <MaxWidthContainer>
        <div className="grid h-[450px] grid-cols-12 gap-4">
          <div className="relative col-span-5">
            <Image
              alt="first_gallery"
              fill
              src={
                service.featured_image ||
                "https://res.cloudinary.com/davidleo/image/upload/v1739726284/landtana/IMG-20250114-WA0041_tra4t4.jpg"
              }
              className="rounded-[12px] object-cover"
            />
          </div>
          <div className="col-span-3  flex flex-col gap-4">
            <div className="relative h-3/5">
              <Image
                alt="first_gallery"
                fill
                src={
                  service.images[0] ||
                  "https://res.cloudinary.com/davidleo/image/upload/v1739726284/landtana/IMG-20250114-WA0041_tra4t4.jpg"
                }
                className="rounded-[12px] object-cover"
              />
            </div>
            <div className="relative h-2/5">
              <Image
                alt="first_gallery"
                fill
                src={
                  service.images[1] ||
                  "https://res.cloudinary.com/davidleo/image/upload/v1739726284/landtana/IMG-20250114-WA0041_tra4t4.jpg"
                }
                className="rounded-[12px] object-cover"
              />
            </div>
          </div>
          <div className="col-span-4  flex flex-col gap-4">
            <div className="relative h-2/5">
              <Image
                alt="first_gallery"
                fill
                src={
                  service.images[2] ||
                  "https://res.cloudinary.com/davidleo/image/upload/v1739726284/landtana/IMG-20250114-WA0041_tra4t4.jpg"
                }
                className="rounded-[12px] object-cover"
              />
            </div>
            <div className="relative h-3/5">
              <Image
                alt="first_gallery"
                fill
                src={
                  service.images[3] ||
                  "https://res.cloudinary.com/davidleo/image/upload/v1739726284/landtana/IMG-20250114-WA0041_tra4t4.jpg"
                }
                className="rounded-[12px] object-cover"
              />
            </div>
          </div>
        </div>
      </MaxWidthContainer>
      <MaxWidthContainer>
        <div className="flex flex-col gap-4">
          <h2 className="font-lora text-2xl font-bold">Reviews</h2>
          <div className="grid grid-cols-2">
            <div className="flex items-center gap-4">
              <div className="flex h-full w-fit flex-col items-center justify-center gap-2 rounded-[4px] bg-white p-[15px]">
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
                <div className="flex items-center gap-1">
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
          <div className="mt-6 grid grid-cols-2 gap-6">
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
                  <p className="text-base">
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
        </div>
      </MaxWidthContainer>
      <MaxWidthContainer className="!py-[40px]">
        <div className="relative flex flex-col justify-center space-y-10 p-0">
          <div className="flex w-full flex-col items-start justify-start space-y-4 p-0">
            <h2 className="p-0 text-left font-cormorant text-4xl font-bold text-accent">
              Explore Our Brading Services
            </h2>
          </div>
          <Tabs defaultValue="all">
            <TabsList className="h-auto flex-wrap gap-3 bg-transparent p-0">
              <TabsTrigger
                className="rounded-[60px] text-sm data-[state=active]:bg-primary   data-[state=active]:text-white lg:text-base"
                value="all"
              >
                All
              </TabsTrigger>
              <TabsTrigger
                className="rounded-[60px] text-sm data-[state=active]:bg-primary   data-[state=active]:text-white lg:text-base"
                value="box-braid"
              >
                Box Braids
              </TabsTrigger>
              <TabsTrigger
                className="rounded-[60px] text-sm data-[state=active]:bg-primary   data-[state=active]:text-white lg:text-base"
                value="twists"
              >
                Twists
              </TabsTrigger>
              <TabsTrigger
                className="rounded-[60px] text-sm data-[state=active]:bg-primary   data-[state=active]:text-white lg:text-base"
                value="crochet"
              >
                Crochet
              </TabsTrigger>
              <TabsTrigger
                className="rounded-[60px] text-sm data-[state=active]:bg-primary   data-[state=active]:text-white lg:text-base"
                value="cornrows"
              >
                Cornrows
              </TabsTrigger>
              <TabsTrigger
                className="rounded-[60px] text-sm data-[state=active]:bg-primary   data-[state=active]:text-white lg:text-base"
                value="weavons"
              >
                Wig/Weavons
              </TabsTrigger>
              <TabsTrigger
                className="rounded-[60px] text-sm data-[state=active]:bg-primary   data-[state=active]:text-white lg:text-base"
                value="others"
              >
                Others
              </TabsTrigger>
            </TabsList>
            <TabsContent
              value="all"
              className="flex w-full flex-col items-center gap-10 py-6"
            >
              <div className="grid w-full gap-5 md:grid-cols-2 xl:grid-cols-3">
                {services.slice(0, 6).map((service) => (
                  <ServicePriceCard key={service.id} service={service} />
                ))}
              </div>
              <Button className="mt-5 rounded-md border border-secondary bg-transparent text-secondary">
                View More Services{" "}
              </Button>
            </TabsContent>
          </Tabs>
        </div>
      </MaxWidthContainer>
    </>
  );
};
