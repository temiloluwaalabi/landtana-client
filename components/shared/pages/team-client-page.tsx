"use client";
import { motion, useInView } from "framer-motion";
import { Instagram, Facebook } from "lucide-react";
import Image from "next/image";
import React, { useRef } from "react";

interface TeamMember {
  name: string;
  title: string;
  bio: string;
  image: string;
  specialties: string[];
  social?: {
    instagram?: string;
    facebook?: string;
  };
}
// Add these animation variants
const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0 },
};

const imageHoverVariants = {
  hover: { scale: 1.05 },
  tap: { scale: 0.95 },
};

const socialIconVariants = {
  rest: { scale: 1 },
  hover: { scale: 1.2 },
  tap: { scale: 0.9 },
};
export default function TeamPageClient() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  // You would replace this with your actual team data
  const teamMembers: TeamMember[] = [
    {
      name: "ANITA ABAWAH",
      title: "Master Braider & Salon Owner",
      bio: "With over 7 years of experience in the hair braiding industry, Anita Abawah founded Landtana Crown Braids with a vision to create a space where the art of braiding is celebrated. Specializing in intricate protective styles, she has developed a reputation for creating beautiful, long-lasting braids that honor both tradition and contemporary trends. Holder of BSC in ECONOMICS",
      image:
        "https://res.cloudinary.com/davidleo/image/upload/v1739748138/landtana/DALL_E_2025-02-17_00.20.25_-_A_high-end_hair_salon_specializing_in_hair_treatments_showing_a_stylist_applying_a_nourishing_hair_mask_to_a_client_s_hair._The_salon_features_a_rela_rn2n6i.webp",
      specialties: ["Box Braids", "Goddess Braids", "Cornrow Designs"],
      social: {
        instagram: "https://instagram.com/janedoe",
        facebook: "https://facebook.com/janedoe",
      },
    },
  ];

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto px-4 py-20"
    >
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          ref={ref}
          className="mb-16 text-center"
        >
          <h1 className="mb-6 bg-gradient-to-r from-pink-400 to-purple-600 bg-clip-text text-5xl font-bold tracking-tight text-transparent">
            Artisans of Elegance
          </h1>
          <p className="mx-auto max-w-2xl text-xl leading-relaxed text-gray-600">
            Our master braiders blend tradition with trendsetting techniques to
            crown you with perfection.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-2 xl:gap-16">
          {teamMembers.map((member, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              className="group relative overflow-hidden rounded-2xl bg-white shadow-2xl shadow-pink-100/50 transition-shadow duration-300 hover:shadow-pink-200/30"
            >
              <div className="flex h-full flex-col md:flex-row">
                <motion.div
                  className="relative h-64 md:h-auto md:w-1/2"
                  whileHover="hover"
                  whileTap="tap"
                  variants={imageHoverVariants}
                >
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 50vw"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                </motion.div>

                <div className="flex flex-col justify-center bg-white p-8 md:w-1/2">
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                  >
                    <h2 className="mb-2 text-2xl font-bold text-gray-900">
                      {member.name}
                    </h2>
                    <p className="mb-4 font-medium text-pink-600">
                      {member.title}
                    </p>
                    <p className="mb-6 text-sm leading-relaxed text-gray-600">
                      {member.bio}
                    </p>

                    <div className="mb-6">
                      <h3 className="mb-3 text-sm font-semibold uppercase text-gray-500">
                        Master Of
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {member.specialties.map((specialty, i) => (
                          <motion.span
                            key={i}
                            whileHover={{ scale: 1.05 }}
                            className="rounded-full bg-pink-50 px-3 py-1 text-sm text-pink-700"
                          >
                            {specialty}
                          </motion.span>
                        ))}
                      </div>
                    </div>

                    {member.social && (
                      <motion.div className="mt-auto flex gap-3">
                        {member.social.instagram && (
                          <motion.a
                            variants={socialIconVariants}
                            initial="rest"
                            whileHover="hover"
                            whileTap="tap"
                            href={member.social.instagram}
                            className="text-pink-500 hover:text-pink-600"
                          >
                            <Instagram size={24} />
                          </motion.a>
                        )}
                        {member.social.facebook && (
                          <motion.a
                            variants={socialIconVariants}
                            initial="rest"
                            whileHover="hover"
                            whileTap="tap"
                            href={member.social.facebook}
                            className="text-blue-600 hover:text-blue-700"
                          >
                            <Facebook size={24} />
                          </motion.a>
                        )}
                      </motion.div>
                    )}
                  </motion.div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="mt-24 rounded-3xl bg-gradient-to-br from-pink-50 to-purple-50 p-12 text-center shadow-xl"
        >
          <h2 className="mb-6 text-3xl font-bold text-gray-900">
            Craft Your Career With Us
          </h2>
          <p className="mx-auto mb-8 max-w-2xl text-gray-600">
            We&apos;re seeking passionate stylists to join our tapestry of
            talent. Let&apos;s create beauty together.
          </p>
          <motion.a
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            href="mailto:careers@landtanacrownbraids.com"
            className="inline-flex items-center rounded-full bg-gradient-to-r from-pink-500 to-purple-600 px-8 py-4 font-semibold text-white shadow-lg transition-all hover:shadow-xl"
          >
            Apply Now
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="ml-2 size-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </motion.a>
        </motion.div>
      </div>
    </motion.main>
  );
}
