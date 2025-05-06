/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { motion } from "framer-motion";
import { Facebook, Twitter, Instagram, Linkedin, Youtube } from "lucide-react";
import { useState } from "react";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

// Custom TikTok icon since it's not included in lucide-react
interface TikTokIconProps {
  size?: number;
  [key: string]: any; // Allow additional props
}

const TikTokIcon = (props: TikTokIconProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={props.size || 24}
    height={props.size || 24}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
  </svg>
);

const SocialMediaWidget = () => {
  // You can customize these social media links
  const socialLinks = [
    {
      name: "Facebook",
      icon: Facebook,
      color: "bg-blue-600",
      hoverColor: "bg-blue-700",
      href: "https://facebook.com",
    },
    {
      name: "Twitter",
      icon: Twitter,
      color: "bg-sky-500",
      hoverColor: "bg-sky-600",
      href: "https://twitter.com",
    },
    {
      name: "Instagram",
      icon: Instagram,
      color: "bg-pink-600",
      hoverColor: "bg-pink-700",
      href: "https://instagram.com",
    },
    {
      name: "TikTok",
      icon: TikTokIcon,
      color: "bg-black",
      hoverColor: "bg-gray-800",
      href: "https://tiktok.com",
    },

    {
      name: "LinkedIn",
      icon: Linkedin,
      color: "bg-blue-700",
      hoverColor: "bg-blue-800",
      href: "https://linkedin.com",
    },
    {
      name: "YouTube",
      icon: Youtube,
      color: "bg-red-600",
      hoverColor: "bg-red-700",
      href: "https://youtube.com",
    },
  ];

  const [hoveredIcon, setHoveredIcon] = useState<number | null>(null);

  // Container animation
  const containerVariants = {
    hidden: { opacity: 0, x: 100 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.5,
        when: "beforeChildren",
        staggerChildren: 0.1,
      },
    },
  };

  // Item animation
  const itemVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.3 },
    },
  };

  // Pulse animation for icons
  const pulseVariants = {
    pulse: {
      scale: [1, 1.1, 1],
      transition: {
        duration: 0.6,
        repeat: Infinity,
        repeatDelay: 3,
      },
    },
  };

  return (
    <motion.div
      className="fixed right-0 top-1/2 z-50 flex -translate-y-1/2 flex-col gap-2"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <TooltipProvider>
        {socialLinks.map((social, index) => (
          <Tooltip key={index}>
            <TooltipTrigger asChild>
              <motion.a
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`${social.color} flex items-center justify-center rounded-l-md p-3 text-white shadow-md`}
                onMouseEnter={() => setHoveredIcon(index)}
                onMouseLeave={() => setHoveredIcon(null)}
                variants={itemVariants}
                whileHover={{
                  x: -8,
                  backgroundColor: social.hoverColor,
                  transition: { duration: 0.2 },
                }}
                animate={hoveredIcon === index ? "pulse" : ""}
              >
                <motion.div variants={pulseVariants} whileTap={{ scale: 0.9 }}>
                  <social.icon size={20} />
                </motion.div>
              </motion.a>
            </TooltipTrigger>
            <TooltipContent side="left">
              <p>{social.name}</p>
            </TooltipContent>
          </Tooltip>
        ))}
      </TooltipProvider>
    </motion.div>
  );
};

export default SocialMediaWidget;
