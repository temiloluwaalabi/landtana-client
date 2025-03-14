// @flow
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import * as React from "react";

import { fadeInUp, staggerChildren } from "@/lib/variants";

import MaxWidthContainer from "./max-width-container";
import { Button } from "../ui/button";
import { buttonHover } from "./pages/home-page-client";
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
    <MaxWidthContainer className="relative flex h-[60vh] items-start overflow-hidden bg-primary md:h-[75vh] lg:h-[90vh] lg:items-center lg:pt-14">
      {/* Animated background elements */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="absolute bottom-0 right-0 z-40 mr-[-120px] hidden size-[350px] bg-[url(https://res.cloudinary.com/davidleo/image/upload/v1740754941/landtana/IMG-20250114-WA0043-removebg-preview_lk0qup_aapr2q.png)] bg-contain  bg-[right_100%] bg-no-repeat md:flex md:size-[550px] lg:size-[600px] xl:size-[700px] 2xl:size-[800px]"
      />

      <motion.div
        initial={{ opacity: 0, x: -100 }}
        animate={{ opacity: 0.8, x: 0 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="absolute bottom-0 left-0 size-[350px] bg-[url(https://res.cloudinary.com/davidleo/image/upload/v1739729649/landtana/Shape_rf7uak.png)] bg-contain bg-[left_90%] bg-no-repeat sm:size-[500px] md:size-full"
      />

      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 0.8, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="absolute right-0 top-0 size-[350px] bg-[url(https://res.cloudinary.com/davidleo/image/upload/v1739729649/landtana/Vector_3_so9eqz.png)] bg-contain bg-[right_0%] bg-no-repeat md:size-[450px] lg:size-[500px] xl:size-[700px]"
      />

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 0.8, y: 0 }}
        transition={{ duration: 1.3, ease: "easeOut" }}
        className="absolute bottom-0 right-0 hidden size-[200px] bg-[url(https://res.cloudinary.com/davidleo/image/upload/v1739729649/landtana/Vector_ypxpyp.png)] bg-contain bg-[0%_0%] bg-no-repeat md:flex md:size-[400px] lg:size-[350px] xl:size-[600px]"
      />

      {/* Floating particles effect */}
      {/* <div className="absolute inset-0 z-10">
        {[...Array(10)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-white/20"
            initial={{
              x: Math.random() * 100 - 50 + "%",
              y: Math.random() * 100 + "%",
              opacity: Math.random() * 0.5 + 0.1,
              scale: Math.random() * 0.5 + 0.5,
            }}
            animate={{
              y: [null, "-20%"],
              opacity: [null, 0],
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              ease: "linear",
            }}
            style={{
              width: `${Math.random() * 20 + 5}px`,
              height: `${Math.random() * 20 + 5}px`,
            }}
          />
        ))}
      </div> */}

      <div className="grid h-full grid-cols-12">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerChildren}
          className="relative z-20 col-span-12 flex flex-col items-start justify-center gap-[33px] md:col-span-8"
        >
          <motion.div
            variants={fadeInUp}
            className="flex h-[37px] w-fit items-center gap-4 rounded-[20px] bg-white px-4"
          >
            <Image
              src={"/assets/icons/star.svg"}
              alt="star"
              width={16}
              height={16}
              className="object-fit"
            />
            <h4 className="text-xs font-medium text-[#1a1a1a] sm:text-sm md:text-base">
              Services tailored to your unique preferences
            </h4>
          </motion.div>

          <motion.div variants={fadeInUp}>
            <h1 className="text-left font-cormorant text-[30px] font-bold leading-[35px] text-white md:text-[50px] md:leading-[55px] lg:text-[60px] lg:leading-[60px] xl:text-[90px] xl:leading-[80px]">
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.6 }}
              >
                Transform
              </motion.span>{" "}
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.6 }}
              >
                your look
              </motion.span>{" "}
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7, duration: 0.6 }}
                className="bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent"
              >
                with our expert braiding services
              </motion.span>{" "}
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.9, duration: 0.6 }}
              >
                at Landtana Crown Braids
              </motion.span>
            </h1>
          </motion.div>

          <motion.div variants={fadeInUp} className="space-x-4">
            <motion.div
              whileHover="hover"
              whileTap={{ scale: 0.95 }}
              variants={buttonHover}
              initial="rest"
              className="inline-block"
            >
              <Button className="bg-white font-lora text-base font-semibold text-secondary hover:bg-accent hover:text-white">
                Explore Our Services
              </Button>
            </motion.div>

            <motion.div
              whileHover="hover"
              whileTap={{ scale: 0.95 }}
              variants={buttonHover}
              initial="rest"
              className="inline-block"
            >
              <Button className="bg-secondary text-base font-semibold text-white hover:bg-white hover:text-primary">
                <Link className="" href={"/book-service"}>
                  Book Today
                </Link>
              </Button>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </MaxWidthContainer>
  );
};

export const HeroSection = (props: Props) => {
  return props.heroVariant === "BLUE" ? <BlueVariant /> : <GreenVariant />;
};
