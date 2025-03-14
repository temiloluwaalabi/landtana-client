"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useInView } from "react-intersection-observer";

import {
  containerVariants,
  titleVariants,
  cardVariants,
  labelVariants,
} from "@/lib/variants";
import { Category, Service } from "@/types";

import MaxWidthContainer from "../../max-width-container";

type Categories = {
  filteredCategories: Category[];
  services: Service[];
};

const ExpertiseSection = ({ filteredCategories, services }: Categories) => {
  // Animation variants

  // Use intersection observer for scrolling effect
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <MaxWidthContainer className="!bg-[#F5F6F7] py-10 lg:py-20">
      <motion.div
        ref={ref}
        className="relative flex flex-col justify-center space-y-8 lg:space-y-12"
        variants={containerVariants}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
      >
        <motion.div
          className="flex flex-col items-center justify-center space-y-4"
          variants={titleVariants}
        >
          <h2 className="relative bg-gradient-to-r from-accent to-pink-400 bg-clip-text font-cormorant text-3xl font-bold text-accent md:text-4xl lg:text-6xl">
            Our Expertise
          </h2>
          <motion.div
            className="h-1 w-20 rounded-full bg-gradient-to-r from-accent to-pink-400"
            initial={{ width: 0 }}
            animate={{ width: "80px" }}
            transition={{ delay: 0.5, duration: 0.8 }}
          />
          <p className="max-w-2xl text-center text-base font-light text-[#2F201A] lg:text-2xl">
            We always provide the best service for you, with our highly skilled
            professionals
          </p>
        </motion.div>

        <motion.div
          className="grid gap-8 sm:grid-cols-2 md:grid-cols-3"
          variants={containerVariants}
        >
          {filteredCategories
            .filter((cat) => cat.parent_id === null)
            .filter((cat) =>
              services.some((service) => service.category_id === cat.id)
            )
            .map((service) => (
              <motion.div
                key={service.id}
                className="group relative flex h-[300px] w-full items-center justify-center overflow-hidden rounded-[20px] md:h-[350px]"
                variants={cardVariants}
                whileHover="hover"
              >
                <Link
                  href={`/services/category/${service.id}`}
                  className="absolute left-0 top-0 z-50 size-full"
                />
                <motion.div
                  className="absolute inset-0 bg-black/20 transition-all duration-500 hover:bg-black/10"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: 0.1 }}
                />
                <Image
                  src={
                    "https://res.cloudinary.com/davidleo/image/upload/v1739748137/landtana/92c01e2888429b399fe39527925d03db_oveh9w.png"
                  }
                  fill
                  className="rounded-[20px] object-cover transition-transform duration-700 group-hover:scale-110"
                  alt={service.name}
                />
                <motion.div
                  className="absolute inset-x-0 bottom-0 mx-auto mb-6 flex h-[120px] w-3/4 items-center justify-center rounded-[10px] border border-white/20 bg-white/90 shadow-lg backdrop-blur-sm"
                  variants={labelVariants}
                >
                  <div className="text-center">
                    <h4 className="font-cormorant text-2xl font-semibold text-black">
                      {service.name}
                    </h4>
                    <motion.span
                      className="mt-2 inline-block text-sm text-accent"
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      transition={{ delay: 0.3 }}
                    >
                      Discover More
                    </motion.span>
                  </div>
                </motion.div>
              </motion.div>
            ))}
        </motion.div>
      </motion.div>
    </MaxWidthContainer>
  );
};

export default ExpertiseSection;
