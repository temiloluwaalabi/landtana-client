// @flow
import Image from "next/image";
import Link from "next/link";
import * as React from "react";

import MaxWidthContainer from "./max-width-container";
import { Button } from "../ui/button";
type Props = {
  heroVariant: "GREEN" | "BLUE";
};

const BlueVariant = () => {
  return (
    <MaxWidthContainer className="relative flex h-[400px] w-full flex-col items-center justify-center bg-accent md:h-[500px] lg:h-[600px]  xl:h-[743px]">
      <div className="absolute left-0 top-0 size-full bg-[url(https://res.cloudinary.com/davidleo/image/upload/v1739726739/landtana/IMG-20250114-WA0043-removebg-preview_lk0qup.png)] bg-contain bg-[right_90%] bg-no-repeat"></div>
      <div className="absolute left-0 top-0 size-full bg-[url(https://res.cloudinary.com/davidleo/image/upload/v1739729649/landtana/Shape_rf7uak.png)] bg-contain bg-[left_90%] bg-no-repeat" />
      <div className="absolute right-0 top-0 size-[700px] bg-[url(https://res.cloudinary.com/davidleo/image/upload/v1739729649/landtana/Vector_3_so9eqz.png)] bg-contain bg-[right_0%] bg-no-repeat" />
      <div className="absolute bottom-0 right-0 size-[600px] bg-[url(https://res.cloudinary.com/davidleo/image/upload/v1739729649/landtana/Vector_ypxpyp.png)] bg-contain bg-[0%_0%] bg-no-repeat" />
      <div className="absolute left-0 top-0 z-10 size-full bg-accent/90" />
      <div className=" relative z-50 flex flex-col items-center justify-center gap-[33px]">
        <div className="flex h-[37px] w-fit items-center gap-4 rounded-[20px] bg-white px-4">
          <Image
            src={"/assets/icons/star.svg"}
            alt="star"
            width={16}
            height={16}
            className="object-fit"
          />
          <h4 className="text-base font-medium text-[#1a1a1a] lg:text-xl ">
            Services tailored to your unique preferences
          </h4>
        </div>
        <div>
          <h1 className="text-center font-cormorant text-[40px] font-bold leading-[40px] text-white md:text-[50px] md:leading-[60px] lg:text-[70px] lg:leading-[90px] xl:text-[100px] 2xl:text-[130px] 2xl:leading-[106px]">
            Transform your look with our expert braiding services at Landtana
            Crown Braids
          </h1>
        </div>
        <div className="space-x-6">
          <Button className="bg-white font-lora text-base font-semibold text-secondary">
            Explore Our Services
          </Button>
          <Button className="bg-secondary text-base font-semibold text-white">
            <Link className="" href={"/book-service"}>
              Book Today
            </Link>
          </Button>
        </div>
      </div>
    </MaxWidthContainer>
  );
};
const GreenVariant = () => {
  return (
    <MaxWidthContainer className="relative flex h-[55vh] items-center bg-primary md:h-[60vh] lg:h-[85vh] 2xl:h-[90vh]">
      <div className="absolute  bottom-0 right-0 z-40 size-[450px] bg-[url(https://res.cloudinary.com/davidleo/image/upload/v1739730717/landtana/Untitled_design_8_imepng.png)] bg-contain bg-[right_90%] bg-no-repeat md:size-[550px] lg:size-[600px] xl:size-[700px] 2xl:size-[800px]" />
      <div className="absolute bottom-0 left-0 size-[450px] bg-[url(https://res.cloudinary.com/davidleo/image/upload/v1739729649/landtana/Shape_rf7uak.png)] bg-contain bg-[left_90%] bg-no-repeat sm:size-[500px] md:size-full" />
      <div className="absolute right-0 top-0 size-[400px] bg-[url(https://res.cloudinary.com/davidleo/image/upload/v1739729649/landtana/Vector_3_so9eqz.png)] bg-contain bg-[right_0%] bg-no-repeat md:size-[450px] lg:size-[500px] xl:size-[700px]" />
      <div className="absolute bottom-0 right-0 size-[250px] bg-[url(https://res.cloudinary.com/davidleo/image/upload/v1739729649/landtana/Vector_ypxpyp.png)] bg-contain bg-[0%_0%] bg-no-repeat md:size-[400px] lg:size-[350px] xl:size-[600px]" />
      {/* <div className="absolute top-0 z-10 left-0 bg-primary/90 w-full h-full" /> */}

      <div className="grid h-full grid-cols-12">
        <div className=" relative z-50 col-span-12 flex flex-col items-start justify-center gap-[33px] md:col-span-8">
          <div className="flex h-[37px] w-fit items-center gap-4 rounded-[20px] bg-white px-4">
            <Image
              src={"/assets/icons/star.svg"}
              alt="star"
              width={16}
              height={16}
              className="object-fit"
            />
            <h4 className="text-base font-medium text-[#1a1a1a] ">
              Services tailored to your unique preferences
            </h4>
          </div>
          <div>
            <h1 className="text-left font-cormorant text-[35px] font-bold leading-[35px] text-white md:text-[50px] md:leading-[55px] lg:text-[60px] lg:leading-[60px]  xl:text-[90px] xl:leading-[80px]">
              Transform your look with our expert braiding services at Landtana
              Crown Braids
            </h1>
          </div>
          <div className="space-x-6">
            <Button className="bg-white font-lora text-base font-semibold text-secondary hover:bg-accent">
              Explore Our Services
            </Button>
            <Button className="bg-secondary text-base font-semibold text-white hover:bg-white hover:text-primary">
              <Link className="" href={"/book-service"}>
                Book Today
              </Link>
            </Button>
          </div>
        </div>
        <div></div>
      </div>
      {/* SVG Wave at Bottom */}
      {/* 
      <svg
        className="absolute bottom-0 z-50 left-0 w-full h-[120px]"
        viewBox="0 0 1440 320"
        preserveAspectRatio="none"
      >
        <path
          fill="#ffffff"
          d="M0,0 C320,300 640,0 960,160 C1280,320 1440,160 1440,160 L1440,320 L0,320 Z"
        />
      </svg> */}
    </MaxWidthContainer>
  );
};

export const HeroSection = (props: Props) => {
  return props.heroVariant === "BLUE" ? <BlueVariant /> : <GreenVariant />;
};
