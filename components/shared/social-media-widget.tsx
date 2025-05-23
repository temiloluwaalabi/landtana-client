/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { motion, AnimatePresence } from "framer-motion";
import {
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Youtube,
  ChevronUp,
  ChevronDown,
  Share2,
} from "lucide-react";
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
  const [isExpanded, setIsExpanded] = useState(false);

  // You can customize these social media links
  const socialLinks = [
    {
      name: "Facebook",
      icon: Facebook,
      color: "bg-blue-600",
      hoverColor: "bg-blue-700",
      href: "https://www.facebook.com/share/1E7hwFDthG/?mibextid=wwXIfr",
    },
    {
      name: "Twitter",
      icon: Twitter,
      color: "bg-sky-500",
      hoverColor: "bg-sky-600",
      href: "https://www.facebook.com/share/1E7hwFDthG/?mibextid=wwXIfr",
    },
    {
      name: "Instagram",
      icon: Instagram,
      color: "bg-pink-600",
      hoverColor: "bg-pink-700",
      href: "https://www.instagram.com/landtanacrownbraids?igsh=eDU1am45MzY4M3Bm&utm_source=qr",
    },
    {
      name: "TikTok",
      icon: TikTokIcon,
      color: "bg-black",
      hoverColor: "bg-gray-800",
      href: "https://www.tiktok.com/@landtanacrownbraids?_t=ZP-8sY8U3gpEyt&_r=1",
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
      href: "https://youtube.com/@landtanacrownbraids?si=4icQcgwRzjJEmf54",
    },
  ];

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  // Container animation
  const containerVariants = {
    hidden: { opacity: 0, x: 100 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  // Item animation for social links
  const itemVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: (i: number) => ({
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.3,
        delay: i * 0.05,
      },
    }),
  };

  return (
    <motion.div
      className="fixed right-0 top-1/2 z-50 flex -translate-y-1/2 flex-col gap-2"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <TooltipProvider>
        {/* Main toggle button */}
        <Tooltip>
          <TooltipTrigger asChild>
            <motion.button
              onClick={toggleExpanded}
              className="flex items-center justify-center rounded-l-md bg-purple-600 p-3 text-white shadow-md hover:bg-purple-700"
              whileHover={{ x: -5 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="flex items-center gap-2">
                <Share2 size={20} />
                {isExpanded ? (
                  <ChevronDown size={16} />
                ) : (
                  <ChevronUp size={16} />
                )}
              </div>
            </motion.button>
          </TooltipTrigger>
          <TooltipContent side="left">
            <p>{isExpanded ? "Hide Social Links" : "Show Social Links"}</p>
          </TooltipContent>
        </Tooltip>

        {/* Social media icons that appear when expanded */}
        <AnimatePresence>
          {isExpanded && (
            <>
              {socialLinks.map((social, index) => (
                <motion.div
                  key={social.name}
                  custom={index}
                  variants={itemVariants}
                  initial="hidden"
                  animate="visible"
                  exit={{
                    opacity: 0,
                    x: 50,
                    transition: {
                      duration: 0.2,
                      delay: 0.05 * (socialLinks.length - index - 1),
                    },
                  }}
                >
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <motion.a
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`${social.color} flex items-center justify-center rounded-l-md p-3 text-white shadow-md`}
                        whileHover={{
                          x: -8,
                          backgroundColor: social.hoverColor,
                          transition: { duration: 0.2 },
                        }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <social.icon size={20} />
                      </motion.a>
                    </TooltipTrigger>
                    <TooltipContent side="left">
                      <p>{social.name}</p>
                    </TooltipContent>
                  </Tooltip>
                </motion.div>
              ))}
            </>
          )}
        </AnimatePresence>
      </TooltipProvider>
    </motion.div>
  );
};

export default SocialMediaWidget;
