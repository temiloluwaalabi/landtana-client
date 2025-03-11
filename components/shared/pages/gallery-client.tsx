"use client";
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { motion, AnimatePresence, useAnimation } from "framer-motion";
import {
  Instagram,
  X,
  ChevronLeft,
  ChevronRight,
  Heart,
  Share2,
  MessageCircle,
  Scissors,
} from "lucide-react";
import Image from "next/image";
import React, { useState, useEffect, useCallback, ReactNode } from "react";
import { useInView } from "react-intersection-observer";

import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Extend the Window interface to include galleryData
declare global {
  interface Window {
    galleryData: any;
  }
}

// Sample gallery data (replace with your actual data)
const galleryData = {
  boxBraids: [
    {
      id: 1,
      src: "/images/gallery/box-braids-1.jpg",
      alt: "Box Braids Style 1",
      caption: "Classic Medium Box Braids",
    },
    {
      id: 2,
      src: "/images/gallery/box-braids-2.jpg",
      alt: "Box Braids Style 2",
      caption: "Ombré Box Braids with Beads",
    },
    {
      id: 3,
      src: "/images/gallery/box-braids-3.jpg",
      alt: "Box Braids Style 3",
      caption: "Jumbo Box Braids",
    },
    {
      id: 4,
      src: "/images/gallery/box-braids-4.jpg",
      alt: "Box Braids Style 4",
      caption: "Bohemian Box Braids",
    },
    {
      id: 5,
      src: "/images/gallery/box-braids-5.jpg",
      alt: "Box Braids Style 5",
      caption: "Knotless Box Braids",
    },
    {
      id: 6,
      src: "/images/gallery/box-braids-6.jpg",
      alt: "Box Braids Style 6",
      caption: "Colored Box Braids",
    },
  ],
  cornrows: [
    {
      id: 7,
      src: "/images/gallery/cornrows-1.jpg",
      alt: "Cornrows Style 1",
      caption: "Straight Back Cornrows",
    },
    {
      id: 8,
      src: "/images/gallery/cornrows-2.jpg",
      alt: "Cornrows Style 2",
      caption: "Feed-in Cornrows",
    },
    {
      id: 9,
      src: "/images/gallery/cornrows-3.jpg",
      alt: "Cornrows Style 3",
      caption: "Cornrows with Designs",
    },
    {
      id: 10,
      src: "/images/gallery/cornrows-4.jpg",
      alt: "Cornrows Style 4",
      caption: "Zig-Zag Cornrows",
    },
    {
      id: 11,
      src: "/images/gallery/cornrows-5.jpg",
      alt: "Cornrows Style 5",
      caption: "Cornrows with Extensions",
    },
  ],
  twists: [
    {
      id: 12,
      src: "/images/gallery/twists-1.jpg",
      alt: "Twists Style 1",
      caption: "Senegalese Twists",
    },
    {
      id: 13,
      src: "/images/gallery/twists-2.jpg",
      alt: "Twists Style 2",
      caption: "Passion Twists",
    },
    {
      id: 14,
      src: "/images/gallery/twists-3.jpg",
      alt: "Twists Style 3",
      caption: "Marley Twists",
    },
    {
      id: 15,
      src: "/images/gallery/twists-4.jpg",
      alt: "Twists Style 4",
      caption: "Havana Twists",
    },
    {
      id: 16,
      src: "/images/gallery/twists-5.jpg",
      alt: "Twists Style 5",
      caption: "Spring Twists",
    },
  ],
  locsAndOthers: [
    {
      id: 17,
      src: "/images/gallery/locs-1.jpg",
      alt: "Locs Style 1",
      caption: "Faux Locs",
    },
    {
      id: 18,
      src: "/images/gallery/locs-2.jpg",
      alt: "Locs Style 2",
      caption: "Goddess Locs",
    },
    {
      id: 19,
      src: "/images/gallery/locs-3.jpg",
      alt: "Locs Style 3",
      caption: "Butterfly Locs",
    },
    {
      id: 20,
      src: "/images/gallery/others-1.jpg",
      alt: "Other Style 1",
      caption: "Knotless Braid Updo",
    },
    {
      id: 21,
      src: "/images/gallery/others-2.jpg",
      alt: "Other Style 2",
      caption: "Crochet Braids",
    },
    {
      id: 22,
      src: "/images/gallery/others-3.jpg",
      alt: "Other Style 3",
      caption: "Fulani Braids",
    },
  ],
};

// Instagram Feed Data (Sample - replace with actual data)
const instagramData = [
  {
    id: 101,
    src: "/images/instagram/insta-1.jpg",
    link: "https://www.instagram.com/p/sample1/",
    caption: "Fresh knotless braids for the weekend! #lantanacrownbraids",
  },
  {
    id: 102,
    src: "/images/instagram/insta-2.jpg",
    link: "https://www.instagram.com/p/sample2/",
    caption: "Goddess locs are trending this season! 😍 #protectivestyles",
  },
  {
    id: 103,
    src: "/images/instagram/insta-3.jpg",
    link: "https://www.instagram.com/p/sample3/",
    caption:
      "Client satisfaction is our priority. Swipe to see the before! #transformationtuesday",
  },
  {
    id: 104,
    src: "/images/instagram/insta-4.jpg",
    link: "https://www.instagram.com/p/sample4/",
    caption: "When the braids are fresh and so is your outfit 💅 #boxbraids",
  },
  {
    id: 105,
    src: "/images/instagram/insta-5.jpg",
    link: "https://www.instagram.com/p/sample5/",
    caption:
      "These cornrows with beads are giving everything they need to give! #hairinspo",
  },
  {
    id: 106,
    src: "/images/instagram/insta-6.jpg",
    link: "https://www.instagram.com/p/sample6/",
    caption:
      "Passion twists for a passionate client! Book your appointment now. #lantanacrownbraids",
  },
];
// Custom color theme for pink and purple salon
const theme = {
  primary: "hsl(325, 95%, 66%)", // Pink
  primaryDark: "hsl(325, 95%, 56%)", // Darker pink
  secondary: "hsl(280, 85%, 65%)", // Purple
  secondaryDark: "hsl(280, 85%, 55%)", // Darker purple
  light: "hsl(325, 100%, 97%)", // Light pink
  bgGradient:
    "linear-gradient(135deg, hsl(325, 100%, 97%) 0%, hsl(280, 100%, 97%) 100%)",
  textDark: "hsl(280, 30%, 20%)", // Dark purple text
  accentGold: "hsl(45, 95%, 65%)", // Gold accent
};
const FadeInSection = ({
  children,
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) => {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  return (
    <motion.div
      ref={ref}
      animate={controls}
      initial="hidden"
      variants={{
        hidden: { opacity: 0, y: 30 },
        visible: {
          opacity: 1,
          y: 0,
          transition: {
            duration: 0.6,
            ease: "easeOut",
            delay,
          },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

const GalleryPage = () => {
  const [activeTab, setActiveTab] = useState("all");
  const [openImage, setOpenImage] = useState<{
    id: number;
    src: string;
    alt: string;
    caption: string;
    likes: number;
  } | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [allImages, setAllImages] = useState<
    { id: number; src: string; alt: string; caption: string; likes: number }[]
  >([]);
  const [mockGalleryData, setMockGalleryData] = useState<
    | {
        boxBraids: {
          id: number;
          src: string;
          alt: string;
          caption: string;
          likes: number;
        }[];
        cornrows: {
          id: number;
          src: string;
          alt: string;
          caption: string;
          likes: number;
        }[];
        twists: {
          id: number;
          src: string;
          alt: string;
          caption: string;
          likes: number;
        }[];
        locsAndOthers: {
          id: number;
          src: string;
          alt: string;
          caption: string;
          likes: number;
        }[];
      }
    | undefined
  >(undefined);
  const [loading, setLoading] = useState(true);
  const [instagramFeed, setInstagramFeed] = useState<
    { id: number; src: string; caption: string; likes: number; link: string }[]
  >([]);

  // Animation controls
  const titleControls = useAnimation();
  const [titleRef, titleInView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  useEffect(() => {
    if (titleInView) {
      titleControls.start("visible");
    }
  }, [titleControls, titleInView]);

  // Placeholder for the mock data that would be in your actual component
  useEffect(() => {
    // Simulate loading gallery data
    setTimeout(() => {
      // Mock gallery data
      const mockGalleryData = {
        boxBraids: Array.from({ length: 8 }, (_, i) => ({
          id: i + 1,
          src: `https://res.cloudinary.com/davidleo/image/upload/v1739726303/landtana/IMG-20250114-WA0024_beh14v.jpg`,
          alt: `Box Braids Style ${i + 1}`,
          caption: `Stunning Box Braids Style ${i + 1}`,
          likes: Math.floor(Math.random() * 100) + 20,
        })),
        cornrows: Array.from({ length: 8 }, (_, i) => ({
          id: i + 101,
          src: `https://res.cloudinary.com/davidleo/image/upload/v1739726295/landtana/IMG-20250114-WA0043_iqtsvu.jpg`,
          alt: `Cornrow Style ${i + 1}`,
          caption: `Elegant Cornrow Design ${i + 1}`,
          likes: Math.floor(Math.random() * 100) + 20,
        })),
        twists: Array.from({ length: 8 }, (_, i) => ({
          id: i + 201,
          src: `https://res.cloudinary.com/davidleo/image/upload/v1739726290/landtana/IMG-20250114-WA0027_hptzh5.jpg`,
          alt: `Twist Style ${i + 1}`,
          caption: `Beautiful Twist Style ${i + 1}`,
          likes: Math.floor(Math.random() * 100) + 20,
        })),
        locsAndOthers: Array.from({ length: 8 }, (_, i) => ({
          id: i + 301,
          src: `https://res.cloudinary.com/davidleo/image/upload/v1739726280/landtana/IMG-20250114-WA0025_irkyja.jpg`,
          alt: `Locs Style ${i + 1}`,
          caption: `Gorgeous Locs & Special Style ${i + 1}`,
          likes: Math.floor(Math.random() * 100) + 20,
        })),
      };

      // Mock Instagram data
      const mockInstagramData = Array.from({ length: 6 }, (_, i) => ({
        id: i + 1,
        src: `https://res.cloudinary.com/davidleo/image/upload/v1739726280/landtana/IMG-20250114-WA0025_irkyja.jpg`,
        caption: `Latest hairstyle inspired by seasonal trends! Book your appointment today. #SalonLife #HairGoals`,
        likes: Math.floor(Math.random() * 500) + 100,
        link: "https://www.instagram.com/landtanacrownbraids",
      }));

      // Combine all gallery images for "All" view
      const combined = [
        ...mockGalleryData.boxBraids,
        ...mockGalleryData.cornrows,
        ...mockGalleryData.twists,
        ...mockGalleryData.locsAndOthers,
      ].sort((a, b) => a.id - b.id);

      setAllImages(combined);
      setInstagramFeed(mockInstagramData);
      setMockGalleryData(mockGalleryData);

      // Reference to mockGalleryData for other functions
      window.galleryData = mockGalleryData;

      setLoading(false);
    }, 1000);
  }, []);

  // Get current category images based on active tab
  const getCurrentImages = useCallback(() => {
    if (!window.galleryData) return [];

    switch (activeTab) {
      case "boxBraids":
        return window.galleryData.boxBraids;
      case "cornrows":
        return window.galleryData.cornrows;
      case "twists":
        return window.galleryData.twists;
      case "locsAndOthers":
        return window.galleryData.locsAndOthers;
      default:
        return allImages;
    }
  }, [activeTab, allImages]);

  // Handle image click to open lightbox
  const handleImageClick = (
    image: {
      id: number;
      src: string;
      alt: string;
      caption: string;
      likes: number;
    },
    index: number
  ) => {
    setOpenImage(image);
    setCurrentIndex(index);
  };

  // Navigate to previous image in lightbox
  const handlePrevious = useCallback(() => {
    const images = getCurrentImages();
    if (!images.length) return;

    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
    setOpenImage(
      images[currentIndex === 0 ? images.length - 1 : currentIndex - 1]
    );
  }, [currentIndex, getCurrentImages]);

  // Navigate to next image in lightbox
  const handleNext = useCallback(() => {
    const images = getCurrentImages();
    if (!images.length) return;

    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    setOpenImage(
      images[currentIndex === images.length - 1 ? 0 : currentIndex + 1]
    );
  }, [currentIndex, getCurrentImages]);

  // Close lightbox
  const handleClose = () => {
    setOpenImage(null);
  };

  // Handle key navigation in lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!openImage) return;

      if (e.key === "ArrowLeft") {
        handlePrevious();
      } else if (e.key === "ArrowRight") {
        handleNext();
      } else if (e.key === "Escape") {
        handleClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [openImage, currentIndex, handlePrevious, handleNext]);

  return (
    <div
      className="relative min-h-screen overflow-hidden pb-20"
      style={{ background: theme.bgGradient }}
    >
      {/* Decorative elements */}
      <motion.div
        className="absolute -right-24 -top-24 size-48 rounded-full opacity-30"
        style={{ background: theme.primary }}
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.3, 0.2, 0.3],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          repeatType: "reverse",
        }}
      />

      <motion.div
        className="absolute -bottom-24 -left-24 size-48 rounded-full opacity-30"
        style={{ background: theme.secondary }}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.2, 0.3],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          repeatType: "reverse",
        }}
      />

      <div className="container mx-auto max-w-7xl px-4 py-12 md:px-6">
        {/* Animated Hero Section */}
        <motion.div
          ref={titleRef}
          animate={titleControls}
          initial="hidden"
          variants={{
            hidden: { opacity: 0, y: -30 },
            visible: {
              opacity: 1,
              y: 0,
              transition: {
                staggerChildren: 0.1,
                delayChildren: 0.2,
                duration: 0.6,
              },
            },
          }}
          className="relative mb-16 text-center"
        >
          <motion.div
            variants={{
              hidden: { opacity: 0, scale: 0.8 },
              visible: { opacity: 1, scale: 1 },
            }}
            className="mb-6 inline-flex items-center justify-center rounded-full p-3"
            style={{
              background: `linear-gradient(135deg, ${theme.primary} 0%, ${theme.secondary} 100%)`,
            }}
          >
            <Scissors className="size-8 text-white" />
          </motion.div>

          <motion.h1
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1 },
            }}
            className="mb-4 bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-5xl font-extrabold text-transparent md:text-6xl"
          >
            Our Hair Gallery
          </motion.h1>

          <motion.p
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1 },
            }}
            className="mx-auto max-w-3xl text-center text-lg"
            style={{ color: theme.textDark }}
          >
            Explore our portfolio of stunning braiding styles created by our
            talented stylists. From classic box braids to intricate cornrows, we
            specialize in a variety of protective hairstyles tailored to suit
            your unique style.
          </motion.p>
        </motion.div>

        <FadeInSection>
          <Tabs
            defaultValue="all"
            value={activeTab}
            onValueChange={setActiveTab}
            className="mb-12 w-full"
          >
            <div className="mb-8 flex justify-center">
              <TabsList
                className="grid h-fit grid-cols-2 gap-1 rounded-xl p-1.5 md:grid-cols-5"
                style={{
                  background: `rgba(255, 255, 255, 0.6)`,
                  backdropFilter: "blur(10px)",
                }}
              >
                {[
                  "all",
                  "boxBraids",
                  "cornrows",
                  "twists",
                  "locsAndOthers",
                ].map((tab) => (
                  <motion.div
                    key={tab}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <TabsTrigger
                      value={tab}
                      className="rounded-lg text-sm capitalize data-[state=active]:shadow-md sm:text-base"
                      style={{
                        color: theme.textDark,
                        // "--active-bg": "white",
                        // "--active-color": theme.primary,
                      }}
                    >
                      {tab === "all"
                        ? "All Styles"
                        : tab === "boxBraids"
                          ? "Box Braids"
                          : tab === "cornrows"
                            ? "Cornrows"
                            : tab === "twists"
                              ? "Twists"
                              : "Locs & Others"}
                    </TabsTrigger>
                  </motion.div>
                ))}
              </TabsList>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="mt-8"
              >
                {loading ? (
                  <div className="py-20 text-center">
                    <motion.div
                      className="inline-block size-8 rounded-full border-4 border-solid border-current border-r-transparent"
                      animate={{ rotate: 360 }}
                      transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                      style={{
                        borderColor: theme.primary,
                        borderRightColor: "transparent",
                      }}
                    />
                    <p className="mt-4" style={{ color: theme.textDark }}>
                      Loading gallery...
                    </p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                    {getCurrentImages().map(
                      (
                        image: {
                          id: number;
                          src: string;
                          alt: string;
                          caption: string;
                          likes: number;
                        },
                        index: number
                      ) => (
                        <motion.div
                          key={image.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{
                            duration: 0.5,
                            delay: index * 0.05,
                          }}
                          whileHover={{
                            y: -5,
                            boxShadow: "0 15px 30px rgba(0, 0, 0, 0.1)",
                          }}
                          className="group relative cursor-pointer overflow-hidden rounded-xl bg-white shadow-md transition-all"
                          onClick={() => handleImageClick(image, index)}
                        >
                          <div className="relative aspect-square overflow-hidden">
                            <Image
                              src={image.src}
                              alt={image.alt}
                              layout="fill"
                              objectFit="cover"
                              className="transition-transform duration-700 will-change-transform group-hover:scale-110"
                            />

                            <motion.div
                              className="absolute inset-0 flex items-end bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                              initial={{ opacity: 0 }}
                              whileHover={{ opacity: 1 }}
                            >
                              <div className="w-full p-4">
                                <p className="font-medium text-white">
                                  {image.caption}
                                </p>

                                <div className="mt-2 flex items-center text-white/90">
                                  <span className="mr-1 flex items-center">
                                    <Heart size={16} className="mr-1" />
                                    {image.likes}
                                  </span>
                                  <span className="mx-2">•</span>
                                  <span className="text-sm">Tap to view</span>
                                </div>
                              </div>
                            </motion.div>
                          </div>

                          <motion.div
                            className="absolute right-3 top-3 flex size-8 items-center justify-center rounded-full bg-white/30 backdrop-blur-md"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            style={{ color: theme.primary }}
                            onClick={(e) => {
                              e.stopPropagation();
                              // Add like functionality here
                            }}
                          >
                            <Heart size={16} />
                          </motion.div>
                        </motion.div>
                      )
                    )}
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </Tabs>
        </FadeInSection>

        {/* Instagram Feed Section */}
        <FadeInSection className="mt-24">
          <div className="mb-8 flex items-center justify-center gap-2">
            <motion.div
              whileHover={{
                rotate: [0, -10, 10, -10, 10, 0],
                transition: { duration: 0.5 },
              }}
            >
              <Instagram size={28} style={{ color: theme.primary }} />
            </motion.div>
            <h2 className="bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-center text-3xl font-bold text-transparent">
              Follow Us on Instagram
            </h2>
          </div>

          <p
            className="mx-auto mb-10 max-w-2xl text-center"
            style={{ color: theme.textDark }}
          >
            Stay updated with our latest styles, promotions, and hair care tips
            by following us on Instagram{" "}
            <a
              href="https://www.instagram.com/landtanacrownbraids"
              className="font-medium underline decoration-pink-500 decoration-wavy transition-colors hover:text-pink-600"
              target="_blank"
              rel="noopener noreferrer"
            >
              @landtanacrownbraids
            </a>
          </p>

          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
            {instagramFeed.map((post, index) => (
              <motion.a
                key={post.id}
                href={post.link}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative aspect-square overflow-hidden rounded-lg"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  duration: 0.4,
                  delay: index * 0.1,
                }}
                whileHover={{ scale: 1.03 }}
              >
                <div className="relative size-full">
                  <Image
                    src={post.src}
                    alt="Instagram post"
                    layout="fill"
                    objectFit="cover"
                    className="transition-transform duration-700 will-change-transform group-hover:scale-110"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    <div className="absolute bottom-0 p-3 text-sm text-white">
                      <p className="line-clamp-2">{post.caption}</p>
                      <div className="mt-2 flex items-center gap-2 text-white/90">
                        <span className="flex items-center gap-1">
                          <Heart size={12} /> {post.likes}
                        </span>
                        <span className="flex items-center gap-1">
                          <MessageCircle size={12} />{" "}
                          {Math.floor(post.likes * 0.08)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="absolute -right-1 -top-1 rounded-full bg-gradient-to-br from-pink-500 to-purple-600 p-0.5 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <div className="flex size-8 items-center justify-center rounded-full bg-white">
                    <Instagram size={16} style={{ color: theme.primary }} />
                  </div>
                </div>
              </motion.a>
            ))}
          </div>

          <motion.div
            className="mt-10 text-center"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            <a
              href="https://www.instagram.com/landtanacrownbraids"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full px-8 py-3 font-medium text-white shadow-lg transition-all"
              style={{
                background: `linear-gradient(to right, ${theme.primary}, ${theme.secondary})`,
                boxShadow: `0 10px 20px -10px ${theme.primary}`,
              }}
            >
              <Instagram size={18} />
              View More on Instagram
            </a>
          </motion.div>
        </FadeInSection>

        {/* Call to action */}
        <FadeInSection className="mt-24">
          <motion.div
            className="overflow-hidden rounded-2xl shadow-xl"
            whileHover={{ y: -5 }}
          >
            <div className="relative px-6 py-16 text-center md:py-20">
              {/* Background with animated gradient */}
              <div className="absolute inset-0 -z-10 overflow-hidden">
                <motion.div
                  className="absolute inset-0"
                  style={{
                    background: `linear-gradient(120deg, ${theme.primary}33, ${theme.secondary}33)`,
                    backgroundSize: "200% 200%",
                  }}
                  animate={{
                    backgroundPosition: ["0% 0%", "100% 100%"],
                  }}
                  transition={{
                    duration: 10,
                    repeat: Infinity,
                    repeatType: "mirror",
                  }}
                />

                {/* Decorative circles */}
                <motion.div
                  className="absolute -bottom-16 -right-16 size-64 rounded-full opacity-30"
                  style={{ background: theme.secondary }}
                  animate={{
                    y: [0, -10, 0],
                    x: [0, 10, 0],
                    scale: [1, 1.1, 1],
                  }}
                  transition={{
                    duration: 8,
                    repeat: Infinity,
                    repeatType: "mirror",
                  }}
                />
                <motion.div
                  className="absolute -left-16 -top-16 size-64 rounded-full opacity-30"
                  style={{ background: theme.primary }}
                  animate={{
                    y: [0, 10, 0],
                    x: [0, -10, 0],
                    scale: [1, 1.1, 1],
                  }}
                  transition={{
                    duration: 8,
                    repeat: Infinity,
                    repeatType: "mirror",
                    delay: 1,
                  }}
                />
              </div>

              <motion.h2
                className="relative mb-4 text-2xl font-bold md:text-4xl"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                style={{ color: theme.textDark }}
              >
                Ready to Transform Your Look?
              </motion.h2>

              <motion.p
                className="relative mx-auto mb-10 max-w-2xl"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                style={{ color: theme.textDark }}
              >
                Let our expert stylists create a beautiful braided style
                that&apos;s perfect for you. Book your appointment today and
                join our growing family of satisfied clients.
              </motion.p>

              <motion.div
                className="relative flex flex-col justify-center gap-4 sm:flex-row"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <a
                    href="/book"
                    className="inline-flex items-center justify-center rounded-full px-8 py-3 font-medium text-white shadow-lg transition-all"
                    style={{
                      background: `linear-gradient(to right, ${theme.primary}, ${theme.secondary})`,
                      boxShadow: `0 10px 20px -10px ${theme.primary}`,
                    }}
                  >
                    Book Appointment
                  </a>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <a
                    href="/contact"
                    className="inline-flex items-center justify-center rounded-full border px-8 py-3 font-medium shadow-lg transition-all"
                    style={{
                      borderColor: theme.primary,
                      color: theme.textDark,
                      background: "rgba(255, 255, 255, 0.7)",
                      backdropFilter: "blur(10px)",
                    }}
                  >
                    Contact Us
                  </a>
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        </FadeInSection>
      </div>

      {/* Lightbox Dialog */}
      <Dialog open={!!openImage} onOpenChange={() => setOpenImage(null)}>
        <DialogContent className="max-h-screen max-w-6xl border-none bg-transparent p-0">
          <AnimatePresence>
            {openImage && (
              <motion.div
                className="relative overflow-hidden rounded-xl bg-black/95 shadow-2xl"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              >
                <motion.button
                  onClick={handleClose}
                  className="absolute right-4 top-4 z-10 rounded-full bg-black/50 p-2 text-white transition-colors hover:bg-black/80"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <X size={20} />
                </motion.button>

                <div className="relative flex h-screen max-h-[80vh] items-center justify-center p-4">
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                    className="relative max-h-full max-w-full"
                  >
                    <Image
                      src={openImage.src}
                      alt={openImage.alt}
                      width={800}
                      height={600}
                      className="max-h-[70vh] w-auto rounded-lg object-contain"
                    />
                  </motion.div>

                  <motion.button
                    onClick={handlePrevious}
                    className="absolute left-4 rounded-full bg-black/50 p-3 text-white transition-colors hover:bg-black/80"
                    whileHover={{ scale: 1.1, x: -5 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <ChevronLeft size={24} />
                  </motion.button>

                  <motion.button
                    onClick={handleNext}
                    className="absolute right-4 rounded-full bg-black/50 p-3 text-white transition-colors hover:bg-black/80"
                    whileHover={{ scale: 1.1, x: 5 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <ChevronRight size={24} />
                  </motion.button>
                </div>

                <div className="bg-black p-6 text-white">
                  <p className="text-xl font-medium">{openImage.caption}</p>
                  <div className="mt-4 flex items-center justify-between">
                    <div className="flex items-center gap-6">
                      <div className="flex items-center gap-2">
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <Heart size={20} style={{ color: theme.primary }} />
                        </motion.button>
                        <span>{openImage.likes || 0} likes</span>
                      </div>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <Share2 size={20} />
                      </motion.button>
                    </div>
                    <a
                      href="/book"
                      className="inline-flex items-center justify-center rounded-full px-6 py-2 font-medium text-white shadow-md transition-all"
                      style={{
                        background: `linear-gradient(to right, ${theme.primary}, ${theme.secondary})`,
                      }}
                    >
                      Book This Style
                    </a>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default GalleryPage;
