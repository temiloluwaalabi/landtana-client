"use client";
import { ArrowRight, Star } from "lucide-react";
import Image from "next/image";
import * as React from "react";

import { ProfessionalCard } from "@/components/cards/professional-card";
import { ServicePriceCard } from "@/components/cards/service-price-card";
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
import { demoservices, faqData, servicesCategories } from "@/config/constants";

import { data } from "../card-demo";
import { HeroSection } from "../hero";
import MaxWidthContainer from "../max-width-container";
export const HomePageClient = () => {
  const cards = data.map((card) => (
    <Card key={card.src} className="h-fit w-[540px] rounded-[40px]">
      <CardHeader className="flex flex-row items-center gap-2">
        <Image
          src="https://res.cloudinary.com/davidleo/image/upload/v1739748138/landtana/a4ae835795f7033b83f7ebf019ce8bd0_r8h7d7.png"
          alt="Box Braid"
          width={40}
          height={40}
          className="size-[40px] rounded-full border border-primary object-cover"
        />
        <div className="flex flex-col items-start gap-1">
          <h4>Temi Alabi</h4>
          <h2>Exceptional Service & Atmosphere</h2>
        </div>
      </CardHeader>
      <CardContent>
        <p className="font-lora text-base font-normal">
          &quot;I had an amazing experience at Landtana! From the moment I
          walked in, the staff made me feel welcome and comfortable. The salon
          has a relaxing atmosphere, and my stylist truly listened to what I
          wanted. I walked out feeling more confident than ever with my new
          hairstyle. Highly recommend!&quot;
        </p>
      </CardContent>
      <CardFooter className="flex items-center justify-between">
        <div className="flex">
          <Star fill="#FF2C56" stroke="#FF2C56" className="border-secondary" />
          <Star fill="#FF2C56" stroke="#FF2C56" className="border-secondary" />
          <Star fill="#FF2C56" stroke="#FF2C56" className="border-secondary" />
          <Star fill="#FF2C56" stroke="#FF2C56" className="border-secondary" />
          <Star fill="#fff" stroke="#FF2C56" />
        </div>
        21st October, 2024
      </CardFooter>
    </Card>
  ));
  return (
    <>
      {/* HERO SECTION */} <HeroSection heroVariant="GREEN" />
      {/* WHAT WE DO SECTION */}
      <MaxWidthContainer className="!py-[80px]">
        <div className="relative flex flex-col gap-14  md:flex-row ">
          <div className="flex w-full flex-col justify-center gap-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <div className="h-px w-[40px] bg-[#777777]" />
                <span className="text-xs text-[#777777]">WHAT WE DO</span>
              </div>
              <h2 className="max-w-[322px] font-cormorant text-5xl font-bold text-[#1E0203]">
                All things Braid at your service
              </h2>
              <p className="max-w-[404px] text-base font-normal text-[#4E4E4E]">
                Our objective is to provide grooming services to our patrons ina
                tranquil and classy environment
              </p>
              <Button
                className="p-0 text-base text-secondary underline"
                variant={"link"}
              >
                Book Today <ArrowRight />
              </Button>
            </div>
            <div className="flex gap-6">
              <div className="w-fit space-y-[30px]">
                <div className="relative size-[200px] md:size-[250px]">
                  <Image
                    src="https://res.cloudinary.com/davidleo/image/upload/v1739726284/landtana/IMG-20250114-WA0041_tra4t4.jpg"
                    fill
                    className="w-full rounded-[20px] object-cover"
                    alt="oil "
                  />
                </div>
                <div className="relative size-[200px] md:size-[250px]">
                  <Image
                    src="https://res.cloudinary.com/davidleo/image/upload/v1739726303/landtana/IMG-20250114-WA0024_beh14v.jpg"
                    fill
                    className="w-full rounded-[20px] object-cover"
                    alt="oil "
                  />
                </div>
              </div>
              <div className=" w-fit space-y-[30px]">
                <div className="h-[30px] w-full" />
                <div className="relative size-[200px] md:size-[250px]">
                  <Image
                    src="https://res.cloudinary.com/davidleo/image/upload/v1739726280/landtana/IMG-20250114-WA0025_irkyja.jpg"
                    fill
                    className="w-full rounded-[20px] object-cover"
                    alt="oil "
                  />
                </div>
                <div className="relative size-[200px] md:size-[250px]">
                  <Image
                    src="https://res.cloudinary.com/davidleo/image/upload/v1739726300/landtana/IMG-20250114-WA0019_xixtjo.jpg"
                    fill
                    className="w-full rounded-[20px] object-cover"
                    alt="oil "
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="w-full ">
            <div className="relative h-[500px] w-full md:h-[700px] lg:h-[900px]">
              <Image
                src="https://res.cloudinary.com/davidleo/image/upload/v1739726293/landtana/IMG-20250114-WA0044_jd79oj.jpg"
                fill
                className="w-full rounded-[20px] object-cover"
                alt="oil "
              />
            </div>
          </div>
        </div>
      </MaxWidthContainer>
      <MaxWidthContainer className="!py-[40px]">
        <div className="relative flex flex-col justify-center space-y-10">
          <div className="flex flex-col items-center justify-center">
            <h2 className="text-center font-cormorant text-6xl font-bold text-accent">
              Our Expertise
            </h2>
            <p className="text-center text-2xl font-normal text-[#2F201A]">
              We always provide the best service for you
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
            {servicesCategories.map((service) => (
              <div
                key={service.href}
                className="relative  flex h-[300px] w-full items-center justify-center rounded-[20px] 2xl:h-[400px]"
              >
                <Image
                  src={service.imageUrl}
                  fill
                  className="rounded-[20px] object-cover"
                  alt={service.label}
                />
                <div className="absolute bottom-0 mb-6 flex h-[150px] w-[70%] items-center justify-center rounded-[6px] bg-white/85">
                  <h4 className="max-w-[130px] text-center text-2xl font-semibold text-black">
                    {service.label}
                  </h4>
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
              <div className="grid w-full gap-6 md:grid-cols-2 xl:grid-cols-3">
                {demoservices.slice(0, 6).map((service) => (
                  <ServicePriceCard key={service.category} service={service} />
                ))}
              </div>
              <Button className="mt-5 rounded-md border border-secondary bg-transparent text-secondary">
                View More Services{" "}
              </Button>
            </TabsContent>
          </Tabs>
        </div>
      </MaxWidthContainer>
      <MaxWidthContainer className="!py-[40px]">
        <div className="relative flex flex-col justify-center space-y-10 p-0">
          <div className="flex w-full flex-col items-start justify-start space-y-4 p-0">
            <h2 className="p-0 text-left font-cormorant text-4xl font-bold text-accent">
              Meet Our Professionals
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
              <div className="grid w-full gap-6 md:grid-cols-2 lg:grid-cols-3">
                {demoservices.slice(0, 6).map((service) => (
                  <ProfessionalCard key={service.category} />
                ))}
              </div>
              <Button className="mt-5 rounded-md border border-secondary bg-transparent text-secondary">
                View More Stylists{" "}
              </Button>
            </TabsContent>
          </Tabs>
        </div>
      </MaxWidthContainer>
      <MaxWidthContainer className="bg-primary !py-[40px]">
        <div className="space-y-8">
          <h2 className="p-0 text-left font-cormorant text-4xl font-bold text-white">
            The Reviews
          </h2>
          <Carousel items={cards} />

          {/* <AppleCardsCarouselDemo /> */}
        </div>
      </MaxWidthContainer>
      <MaxWidthContainer className="bg-[#F5F6F7] !py-[40px]">
        <div className="">
          <div className="space-y-4">
            <div className="flex flex-col items-center justify-center gap-2">
              <h2 className="text-center font-cormorant text-6xl font-bold text-accent">
                Relax we’re always here for you!{" "}
              </h2>
              <p className="text-center text-2xl font-normal text-[#2F201A]">
                We always provide the best service for you
              </p>
            </div>
            <Tabs defaultValue={faqData[0].category} className="pt-4">
              <TabsList className=" h-auto w-full flex-wrap gap-3 bg-white p-2">
                {faqData.map((data) => (
                  <TabsTrigger
                    key={data.category}
                    className="rounded-[60px] text-sm data-[state=active]:bg-primary   data-[state=active]:text-white lg:text-base"
                    value={data.category}
                  >
                    {data.category}
                  </TabsTrigger>
                ))}
              </TabsList>

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
              ))}
            </Tabs>
          </div>
          <div></div>

          {/* <AppleCardsCarouselDemo /> */}
        </div>
      </MaxWidthContainer>
    </>
  );
};
