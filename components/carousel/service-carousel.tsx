"use client";
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
// import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";
import React, { useState } from "react";

import { useEnhancedCarousel } from "@/hooks/use-shad-smbla";
import { Service } from "@/types";

import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";
import { Dialog, DialogContent } from "../ui/dialog";
// Example service images

type Props = {
  service: Service;
};
export default function EnhancedServicesCarousel(props: Props) {
  const [api, setApi] = React.useState<CarouselApi | null>(null);
  const [dialogApi, setDialogApi] = React.useState<CarouselApi | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [current, setCurrent] = React.useState(0);

  const [dialogIndex, setDialogIndex] = useState(0);
  // Main carousel with custom hooks

  React.useEffect(() => {
    if (!api) {
      return;
    }
    // setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap());

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  const handleThumbnailClick = (index: number) => {
    if (api) {
      api.scrollTo(index);
    }
  };

  const { emblaRef: mainCarouselRef } = useEnhancedCarousel();

  const { emblaRef: dialogCarouselRef } = useEnhancedCarousel({
    align: "center",
  });

  // Open dialog with the clicked image
  const openSlideshow = (index: number) => {
    setDialogIndex(index);
    setIsDialogOpen(true);

    // Initialize dialog carousel to the clicked image
    setTimeout(() => {
      dialogApi?.scrollTo(index);
    }, 100);
  };

  return (
    <div className="relative size-full ">
      <Carousel
        ref={mainCarouselRef}
        setApi={setApi}
        className="w-full"
        orientation="horizontal"
      >
        <CarouselContent className="-ml-4">
          {props.service.images?.map((image, index) => (
            <CarouselItem
              key={props.service.id}
              className="basis-full cursor-pointer pl-4  transition-all duration-300 ease-in-out md:basis-3/4"
              onClick={() => openSlideshow(index)}
            >
              <div className="group relative h-[500px]  overflow-hidden rounded-[12px] border-[7px] border-primary">
                <Image
                  src={image}
                  alt={props.service.name}
                  fill
                  quality={100}
                  className=" w-full object-cover object-top transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <span className="text-lg font-semibold text-white">
                    {props.service.name}
                  </span>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        {/* Custom Navigation Arrows */}{" "}
        <CarouselPrevious className="absolute left-4 top-1/2 z-10 -translate-y-1/2" />
        <CarouselNext className="absolute right-4 top-1/2 z-10 -translate-y-1/2" />
        {/* Navigation Dots */}
        {/* Navigation Dots */}
        {/* Navigation Dots */}
        <div className="absolute bottom-4 left-1/2 z-10 flex -translate-x-1/2 gap-2">
          {props.service.images?.map((_, index) => (
            <button
              key={index}
              className={`size-3 rounded-full transition-all duration-300 ${
                index === current ? "w-6 bg-white" : "bg-white/50"
              }`}
              onClick={() => handleThumbnailClick(index)}
            />
          ))}
        </div>
        {/* Navigation Dots */}
      </Carousel>
      {/* Slideshow Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-4xl rounded-[12px] border-none bg-black p-0">
          <Carousel
            ref={dialogCarouselRef}
            setApi={setDialogApi}
            className="w-full"
            orientation="horizontal"
          >
            <CarouselContent>
              {props.service.images?.map((image) => (
                <CarouselItem key={props.service.id} className="basis-full">
                  <div className="relative flex h-96 max-h-full items-center justify-center rounded-[12px] p-2 lg:h-[32rem] xl:h-[40rem]">
                    <Image
                      src={image}
                      alt={props.service.name}
                      fill
                      className="max-h-full max-w-full rounded-[12px] object-cover object-top"
                    />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-4" />
            <CarouselNext className="right-4" />

            {/* Slideshow title */}
            {/* <div className="absolute inset-x-0 bottom-8 text-center text-white">
              <h3 className="text-xl font-semibold">
                {serviceImages[dialogIndex]?.title}
              </h3>
            </div> */}
          </Carousel>
        </DialogContent>
      </Dialog>
    </div>
  );
}
