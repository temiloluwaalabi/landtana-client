"use client";
import { motion } from "framer-motion";
import {
  ChevronRight,
  ClockIcon,
  Filter,
  Plus,
  Search,
  UserCog,
} from "lucide-react";
import React, { useState } from "react";
import { useInView } from "react-intersection-observer";

import { ServiceCardDialog } from "@/components/dialogs/service-card-dialog";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
// import { useIsMobile } from "@/hooks/use-mobile";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { durations } from "@/config/constants";
import { useBookingStore } from "@/lib/use-booking-store";
import { cn } from "@/lib/utils";
import { Category, Service } from "@/types";

type Props = {
  services: Service[];
  categories: Category[];
};
// Staggered animation container for service cards
export const StaggerContainer: React.FC<{
  children: React.ReactNode;
  className?: string;
}> = ({ children, className }) => {
  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold: 0.1,
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.1,
      },
    },
  };

  return (
    <motion.div
      ref={ref}
      variants={containerVariants}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      className={
        className || "grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3"
      }
    >
      {children}
    </motion.div>
  );
};
const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      damping: 12,
      stiffness: 100,
    },
  },
};
// Enhanced service card with hover animations
// const EnhancedServiceCard = ({
//   renderTrigger,
// }: {
//   renderTrigger: (hovered: boolean) => React.ReactNode;
// }) => {
//   const [hovered, setHovered] = useState(false);

//   const cardVariants = {
//     hidden: { opacity: 0, y: 20 },
//     visible: {
//       opacity: 1,
//       y: 0,
//       transition: {
//         type: "spring",
//         damping: 12,
//         stiffness: 100,
//       },
//     },
//   };

//   return (
//     <motion.div
//       variants={cardVariants}
//       className="flex !w-full items-center justify-stretch bg-red-900"
//       onHoverStart={() => setHovered(true)}
//       onHoverEnd={() => setHovered(false)}
//       whileHover={{
//         scale: 1.02,
//         boxShadow:
//           "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)",
//         borderRadius: "12px",
//       }}
//       whileTap={{ scale: 0.98 }}
//     >
//       <div className="w-full bg-green-900">{renderTrigger(hovered)}</div>
//     </motion.div>
//   );
// };

// Popular tag component
const PopularTag = () => (
  <motion.div
    initial={{ scale: 0.8, opacity: 0 }}
    animate={{ scale: 1, opacity: 1 }}
    whileHover={{ scale: 1.1 }}
    className="absolute -right-1 -top-1 z-10 rounded-full bg-primary px-2 py-1 text-[10px] font-medium text-white shadow-md"
  >
    Popular
  </motion.div>
);

// Animation for category selection
const categoryVariants = {
  normal: { scale: 1, backgroundColor: "hsl(147 91% 83%)" },
  selected: { scale: 1.05, backgroundColor: "hsl(147 91% 13%)" },
};
export const BookingStepTwo = (props: Props) => {
  const [selectedCategory, setSelectedCategory] = useState<string>(
    "b15bd255-537b-4738-bb98-74938098599d"
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);

  const { bookings, currentGuestId, primaryGuestId, guests, type } =
    useBookingStore();

  const isPopular = (service: Service) => Number(service.base_price) > 100;

  // Filter services based on search query and selected category
  const filteredServices = props.services
    .filter(
      (service) => !selectedCategory || service.category_id === selectedCategory
    )
    .filter(
      (service) =>
        !searchQuery ||
        service.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

  const renderServiceCard = (service: Service) => {
    // const isSelected = selectedServices.includes(service.id);
    const isBooked =
      type === "group"
        ? bookings.some(
            (booking) =>
              booking.serviceId === service.id &&
              booking.guestId === currentGuestId
          )
        : bookings.some((booking) => booking.serviceId === service.id);
    return (
      <ServiceCardDialog
        service={service}
        key={service.id}
        trigger={
          <motion.div
            variants={cardVariants}
            whileHover={{
              scale: 1.02,
              boxShadow:
                "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)",
              borderRadius: "12px",
            }}
            whileTap={{ scale: 0.98 }}
            key={service.id}
            className={cn(
              "flex h-auto !w-full relative transition-all items-center overflow-hidden justify-between rounded-[8px] border  hover:bg-white cursor-pointer border-[#D9D9D9] px-6 py-6",
              isBooked && "border-primary bg-white"
            )}
          >
            {/* Subtle background pattern */}
            {isBooked && (
              <motion.div
                className="absolute inset-0 opacity-10"
                style={{
                  backgroundImage:
                    'url("data:image/svg+xml,%3Csvg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="%23FF595F" fill-opacity="0.3" fill-rule="evenodd"%3E%3Ccircle cx="3" cy="3" r="1.5"/%3E%3Ccircle cx="13" cy="13" r="1.5"/%3E%3C/g%3E%3C/svg%3E")',
                }}
              />
            )}

            {/* Popular tag */}
            {isPopular(service) && <PopularTag />}

            {/* Service information */}

            <div className="flex flex-col items-start space-y-4">
              <div className="flex flex-col items-start">
                <h6 className="text-ellipsis whitespace-nowrap font-cormorant text-lg font-semibold text-black 2xl:text-xl">
                  {service.name}
                </h6>
                <div className="flex items-center space-x-2 text-sm text-gray-500">
                  <ClockIcon className="size-4" />
                  <span>
                    {
                      durations.find((dur) => dur.value === service.duration)
                        ?.label
                    }
                  </span>
                </div>
              </div>
              <p className="space-x-1">
                <span className="text-sm text-gray-400">From</span>
                <span className="text-base font-bold text-primary">
                  ${service.base_price}
                </span>
              </p>
            </div>
            {/* Selection UI */}
            {isBooked ? (
              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                <Checkbox
                  className="!size-10 rounded-md !border-none shadow-none data-[state=checked]:bg-red-50 data-[state=checked]:text-primary"
                  checked={isBooked}
                  checkClassName="size-6"
                />
              </motion.div>
            ) : (
              <motion.div
                initial={{ scale: 1 }}
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
              >
                <Button
                  size={"icon"}
                  className="!size-10 border border-gray-200 !bg-white text-primary shadow-none hover:bg-gray-50"
                >
                  <Plus className="size-5" />
                </Button>
              </motion.div>
            )}
            {/* Hover effect */}
            <motion.div
              className="absolute inset-0 rounded-xl bg-gradient-to-r from-transparent to-primary/5"
              initial={{ opacity: 0 }}
              // animate={{ opacity: hovered ? 1 : 0 }}
              transition={{ duration: 0.3 }}
            />
          </motion.div>
        }
      />
    );
  };

  // Custom category tabs with nicer animations
  const renderCategoryButton = (category: Category) => {
    const isSelected = selectedCategory === category.id;
    const count = props.services.filter(
      (service) => service.category_id === category.id
    ).length;

    return (
      <motion.button
        key={category.id}
        onClick={() => setSelectedCategory(category.id)}
        className={cn(
          "flex h-12 w-full items-center justify-between rounded-xl px-3 py-2",
          "border border-transparent transition-all !bg-transparent",
          isSelected
            ? "!bg-primary text-white"
            : "bg-primary/10 text-primary hover:bg-primary/20"
        )}
        initial="normal"
        animate={isSelected ? "selected" : "normal"}
        variants={categoryVariants}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <span className="text-base font-medium">{category.name}</span>
        <motion.div
          className={cn(
            "flex size-6 items-center justify-center rounded-full",
            isSelected ? "bg-white text-primary" : "bg-primary/10 text-primary"
          )}
          whileHover={{ scale: 1.1 }}
        >
          {count}
        </motion.div>
      </motion.button>
    );
  };
  return (
    <div className="relative flex h-full flex-col gap-6">
      {type === "group" && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex w-fit items-center gap-3 rounded-xl border border-gray-200 bg-white px-3 py-1 shadow-sm"
        >
          <Avatar className="border-2 border-primary/20">
            <AvatarFallback className="bg-primary/10 text-primary">
              <UserCog className="size-5" />
            </AvatarFallback>
          </Avatar>
          <div>
            <h3 className="text-base font-bold text-gray-800">
              {currentGuestId === primaryGuestId
                ? "Me"
                : guests.find((guest) => guest.id === currentGuestId)?.name}
            </h3>
            <p className="text-xs text-gray-500">Selecting services</p>
          </div>
          <motion.div
            className="ml-2"
            animate={{
              x: [0, 3, 0],
            }}
            transition={{
              repeat: Infinity,
              repeatType: "mirror",
              duration: 1.5,
            }}
          >
            <ChevronRight className="size-4 text-primary" />
          </motion.div>
        </motion.div>
      )}
      <div className="flex gap-10 lg:grid lg:grid-cols-12">
        <motion.aside
          className="hidden h-fit flex-col space-y-3 rounded-md p-0 lg:col-span-3 lg:flex"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{
            type: "spring",
            stiffness: 100,
            damping: 15,
            delay: 0.2,
          }}
        >
          {props.categories.map(renderCategoryButton)}
        </motion.aside>
        <motion.div
          className="relative col-span-12 flex w-full flex-col lg:col-span-9"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            type: "spring",
            stiffness: 100,
            damping: 15,
            delay: 0.3,
          }}
        >
          {" "}
          {/* Search and filter bar */}
          <motion.div
            className="mb-6 flex items-center justify-between gap-4 rounded-xl border border-gray-200 bg-white p-2 shadow-sm"
            initial={{ y: -10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <div className="relative">
              <Input
                placeholder="Search services..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setIsSearching(true)}
                onBlur={() => setIsSearching(false)}
                className="rounded-lg border-none border-gray-200 pl-10 shadow-none outline-none focus-visible:ring-primary"
              />
              <motion.div
                className="absolute left-3 top-0 mt-[10px] -translate-y-1/2 text-gray-400"
                animate={{
                  scale: isSearching ? 1.1 : 1,
                  color: isSearching ? "#FF595F" : "#9CA3AF",
                }}
              >
                <Search className="size-4" />
              </motion.div>
            </div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                variant="outline"
                size="sm"
                className="gap-2 text-gray-500"
              >
                <Filter className="size-4" />
                Filters
              </Button>
            </motion.div>
            {/* <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button variant="ghost" size="sm" className="gap-2 text-primary">
                <Heart className="size-4" />
                Favorites
              </Button>
            </motion.div> */}
          </motion.div>
          {/* Service categories tabs */}
          <div className="space-y-4">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <Tabs className="" defaultValue="knotless-braids">
                <TabsList className="custom-scrollbar flex size-full justify-start gap-2 overflow-hidden overflow-x-scroll bg-transparent p-0 pb-2">
                  {[
                    "knotless-braids",
                    "locs",
                    "twist",
                    "box-braids",
                    "other-braids",
                    "corn-rows",
                    "other-services",
                  ].map((category, index) => (
                    <motion.div
                      key={category}
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 + index * 0.1 }}
                      whileHover={{ y: -2 }}
                      whileTap={{ y: 0 }}
                    >
                      <TabsTrigger
                        value={category}
                        className="border border-gray-200 bg-white px-4 py-2 data-[state=active]:border-primary/50 data-[state=active]:bg-primary data-[state=active]:text-white"
                      >
                        {category
                          .split("-")
                          .map(
                            (word) =>
                              word.charAt(0).toUpperCase() + word.slice(1)
                          )
                          .join(" ")}
                      </TabsTrigger>
                    </motion.div>
                  ))}
                </TabsList>
              </Tabs>
            </motion.div>

            {/* Service cards grid */}
            {filteredServices.length > 0 ? (
              <StaggerContainer>
                {filteredServices.map(renderServiceCard)}
              </StaggerContainer>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex flex-col items-center justify-center py-12 text-center"
              >
                <motion.div
                  animate={{
                    y: [0, -10, 0],
                    opacity: [0.7, 1, 0.7],
                  }}
                  transition={{
                    repeat: Infinity,
                    duration: 2,
                  }}
                  className="text-gray-300"
                >
                  <Search className="mb-4 size-16" />
                </motion.div>
                <h3 className="mb-2 text-xl font-semibold text-gray-700">
                  No services found
                </h3>
                <p className="text-gray-500">
                  Try adjusting your search or filter criteria
                </p>
              </motion.div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
};
