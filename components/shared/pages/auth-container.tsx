"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import * as React from "react";
import { useInView } from "react-intersection-observer";

import MaxWidthContainer from "../max-width-container";

type AuthContProps = {
  firstTitle?: string;
  secondTitle?: string;
  desc?: string;
  form: React.ReactNode;
};
export const AuthContainer = (props: AuthContProps) => {
  // const [windowWidth, setWindowWidth] = React.useState<number | null>(null);

  // React.useEffect(() => {
  //   if (typeof window !== "undefined") {
  //     setWindowWidth(window.innerWidth);

  //     const handleResize = () => {
  //       setWindowWidth(window.innerWidth);
  //     };

  //     window.addEventListener("resize", handleResize);
  //     return () => window.removeEventListener("resize", handleResize);
  //   }
  // }, []);

  // Animation variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  const staggerImages = {
    hidden: { opacity: 0 },
    visible: (i: number) => ({
      opacity: 1,
      transition: { delay: i * 0.15, duration: 0.5 },
    }),
  };

  const scaleIn = {
    hidden: { scale: 0.9, opacity: 0 },
    visible: { scale: 1, opacity: 1, transition: { duration: 0.7 } },
  };

  // Intersection observer for form section
  const [formRef, formInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  // / Images with staggering delay
  const galleryImages = [
    {
      src: "https://res.cloudinary.com/davidleo/image/upload/v1739726300/landtana/IMG-20250114-WA0019_xixtjo.jpg",
      height: "250px",
      smHeight: "200px",
      customAnimation: 1,
    },
    {
      src: "https://res.cloudinary.com/davidleo/image/upload/v1739726284/landtana/IMG-20250114-WA0041_tra4t4.jpg",
      height: "240px",
      smHeight: "190px",
      customAnimation: 2,
    },
    {
      src: "https://res.cloudinary.com/davidleo/image/upload/v1739726307/landtana/IMG-20250114-WA0035_crydoz.jpg",
      height: "550px",
      smHeight: "400px",

      customAnimation: 3,
    },
    {
      src: "https://res.cloudinary.com/davidleo/image/upload/v1739726281/landtana/IMG-20250114-WA0022_lqkpls.jpg",
      height: "400px",
      smHeight: "300px",

      customAnimation: 4,
    },
    {
      src: "https://res.cloudinary.com/davidleo/image/upload/v1739726280/landtana/IMG-20250114-WA0025_irkyja.jpg",
      height: "240px",
      smHeight: "190px",

      customAnimation: 5,
    },
    {
      src: "https://res.cloudinary.com/davidleo/image/upload/v1739726303/landtana/IMG-20250114-WA0024_beh14v.jpg",
      height: "500px",
      smHeight: "350px",

      customAnimation: 6,
    },
  ];
  return (
    <MaxWidthContainer className="absolute left-0 top-0 -z-10 size-full overflow-hidden bg-gradient-to-br from-pink-50 to-white !p-0 md:h-screen">
      {/* Background decorative elements */}
      <motion.div
        className="pointer-events-none absolute left-0 top-0 size-full opacity-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.1 }}
        transition={{ duration: 1.5 }}
      >
        <div className="absolute right-40 top-20 size-64 rounded-full bg-pink-200 blur-3xl"></div>
        <div className="absolute bottom-40 left-60 size-96 rounded-full bg-purple-200 blur-3xl"></div>
      </motion.div>

      <div className="grid h-full items-center justify-center lg:grid-cols-12 lg:gap-6">
        {/* Gallery section */}
        <div className="relative hidden h-full lg:col-span-5 lg:grid lg:grid-cols-2 lg:gap-4">
          {/* First column */}
          <div className="space-y-6">
            {galleryImages.slice(0, 3).map((img, index) => {
              // const height =
              //   typeof windowWidth === "number"
              //     ? windowWidth > 1536
              //       ? img.height
              //       : img.smHeight
              //     : img.smHeight; // fallback during SSR

              return (
                <motion.div
                  key={index}
                  className={`relative w-full overflow-hidden ${
                    index < 3
                      ? "h-[250px] sm:h-[350px]"
                      : "h-[550px] sm:h-[650px]"
                  }`}
                  // custom={img.customAnimation}
                  initial="hidden"
                  animate="visible"
                  variants={staggerImages}
                >
                  <motion.div
                    className="absolute inset-0 "
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{
                      delay: img.customAnimation * 0.15 + 0.5,
                      duration: 0.8,
                    }}
                  />
                  <Image
                    alt="Salon hairstyle showcase"
                    fill
                    src={img.src}
                    className="rounded-full object-cover transition-all duration-700 hover:scale-105"
                  />
                </motion.div>
              );
            })}
          </div>

          {/* Second column */}
          <div className="space-y-6">
            {galleryImages.slice(3, 6).map((img, index) => {
              // const height =
              //   window.innerWidth > 1536 ? img.height : img.smHeight;

              return (
                <motion.div
                  key={index + 3}
                  className={`relative w-full overflow-hidden ${
                    index < 3
                      ? "h-[250px] sm:h-[350px]"
                      : "h-[550px] sm:h-[650px]"
                  }`}
                  initial="hidden"
                  animate="visible"
                  variants={staggerImages}
                >
                  <motion.div
                    className="absolute inset-0  "
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{
                      delay: img.customAnimation * 0.15 + 0.5,
                      duration: 0.8,
                    }}
                  />
                  <Image
                    alt="Salon hairstyle showcase"
                    fill
                    src={img.src}
                    className="rounded-full object-cover transition-all duration-700 hover:scale-105"
                  />
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Mobile scattered images (only visible on mobile) */}
        <div className="absolute left-0 top-0  h-full w-[20px] bg-gradient-to-br from-accent to-primary lg:hidden" />

        {/* Content section */}
        <motion.div
          ref={formRef}
          className="z-10 col-span-12 flex size-full flex-col justify-center space-y-4 px-8 pt-40 lg:col-span-7 lg:pl-16 lg:pr-8 lg:pt-0 "
          initial="hidden"
          animate={formInView ? "visible" : "hidden"}
          variants={fadeInUp}
        >
          <div className="flex h-full !w-full translate-y-[-10%] flex-col justify-center  py-6">
            <motion.div className="mb-4 " variants={scaleIn}>
              <h1 className=" font-cormorant text-lg font-bold text-primary md:text-2xl 2xl:text-4xl">
                {props.firstTitle && (
                  <span className="block">{props.firstTitle}</span>
                )}
                {props.secondTitle && (
                  <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-xl  text-transparent  md:text-3xl 2xl:text-5xl">
                    {props.secondTitle}
                  </span>
                )}
              </h1>
              {props.desc && (
                <motion.p
                  className="max-w-xl text-sm text-gray-600 2xl:text-base"
                  initial={{ opacity: 0, x: -20 }}
                  animate={
                    formInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }
                  }
                  transition={{ delay: 0.4, duration: 0.5 }}
                >
                  {props.desc}
                </motion.p>
              )}
            </motion.div>

            <motion.div
              className="w-full"
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { delay: 0.3, duration: 0.7 },
                },
              }}
            >
              {props.form}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </MaxWidthContainer>
  );
};
