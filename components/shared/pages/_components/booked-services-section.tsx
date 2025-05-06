"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { useInView } from "react-intersection-observer";

import { BookedServicePriceCard } from "@/components/cards/booked-service-price-card.tsx";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Booking, Service } from "@/types";

import PageTitleHeader from "../../page-title-header";

type Services = {
  filteredServices: Booking[];
  services: Service[];
};

const BookedServicesSection = ({ filteredServices, services }: Services) => {
  // console.log("ste", categories);
  const [selectedTab, setSelectedTab] = useState("all");
  const [visibleServices, setVisibleServices] = useState(6);

  console.log("selectedTab", selectedTab);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, ease: "easeOut" },
    },
    exit: {
      opacity: 0,
      y: -10,
      transition: { duration: 0.3 },
    },
  };

  const buttonVariants = {
    initial: { scale: 1 },
    hover: {
      scale: 1.05,
      boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.1)",
      transition: { duration: 0.3, yoyo: Infinity },
    },
    tap: { scale: 0.95 },
  };

  // Intersection observer setup
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  // Handle tab change
  const handleTabChange = (value: string) => {
    setSelectedTab(value);
    setVisibleServices(6); // Reset visible services when changing tabs
  };

  // Load more services
  const loadMore = () => {
    setVisibleServices((prev) => prev + 6);
  };

  // Filter services based on selected tab
  const getFilteredServices = () => {
    if (selectedTab === "all") return filteredServices;
    return filteredServices.filter((service) => service.status === selectedTab);
  };

  const displayedServices = getFilteredServices().slice(0, visibleServices);
  const hasMoreServices = getFilteredServices().length > visibleServices;

  return (
    <section className="">
      <PageTitleHeader
        page="My Bookings"
        className="border-b px-[15px] py-[14px] lg:px-[15px] 2xl:px-[20px]"
        pageDesc="Track and manage client information and activities"
      />
      <motion.div
        ref={ref}
        className="2xl:px-[20px relative flex flex-col justify-center space-y-7 px-[15px] py-[14px] lg:space-y-12 lg:px-[15px]"
        variants={containerVariants}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
      >
        <Tabs defaultValue="all" onValueChange={handleTabChange}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <TabsList className="custom-scrollbar mb-2 flex size-full h-auto items-start justify-start gap-3 overflow-hidden overflow-x-scroll bg-transparent p-0 lg:mb-4">
              <TabsTrigger
                className="rounded-[60px] border border-gray-200 bg-white/80 px-6 py-2 text-sm font-medium shadow-sm backdrop-blur-sm transition-all duration-300 data-[state=active]:border-primary data-[state=active]:bg-primary data-[state=active]:text-white dark:text-dark-400 dark:data-[state=active]:text-white lg:text-base"
                value={"all"}
              >
                All
              </TabsTrigger>
              <TabsTrigger
                className="rounded-[60px] border border-gray-200 bg-white/80 px-6 py-2 text-sm font-medium shadow-sm backdrop-blur-sm transition-all duration-300 data-[state=active]:border-primary data-[state=active]:bg-primary data-[state=active]:text-white dark:text-dark-400 dark:data-[state=active]:text-white lg:text-base"
                value="PENDING"
              >
                Pending
              </TabsTrigger>
              <TabsTrigger
                className="rounded-[60px] border border-gray-200 bg-white/80 px-6 py-2 text-sm font-medium shadow-sm backdrop-blur-sm transition-all duration-300 data-[state=active]:border-primary data-[state=active]:bg-primary data-[state=active]:text-white dark:text-dark-400 dark:data-[state=active]:text-white lg:text-base"
                value="COMPLETED"
              >
                Completed
              </TabsTrigger>
            </TabsList>
          </motion.div>

          <AnimatePresence mode="wait">
            <TabsContent
              key={selectedTab}
              value={selectedTab}
              className="flex w-full flex-col items-center gap-10 py-6"
            >
              <motion.div
                className="grid w-full gap-6 md:grid-cols-2 xl:grid-cols-3"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                {displayedServices.map((service, index) => (
                  <motion.div
                    key={service.id}
                    variants={cardVariants}
                    custom={index}
                    whileHover={{
                      y: -8,
                      transition: { duration: 0.3 },
                    }}
                  >
                    <BookedServicePriceCard
                      bookedService={service}
                      services={services}
                    />
                  </motion.div>
                ))}
              </motion.div>

              {hasMoreServices && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6, duration: 0.5 }}
                >
                  <motion.div
                    variants={buttonVariants}
                    initial="initial"
                    whileHover="hover"
                    whileTap="tap"
                  >
                    <Button
                      onClick={loadMore}
                      className="mt-4 flex items-center gap-2 rounded-md border border-secondary bg-white/80 px-8 py-6 text-base font-medium text-secondary shadow-sm backdrop-blur-sm transition-all duration-300 hover:bg-secondary hover:text-white lg:mt-8"
                    >
                      View More Services
                      <motion.svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="ml-1"
                        animate={{ x: [0, 5, 0] }}
                        transition={{
                          repeat: Infinity,
                          duration: 1.5,
                          ease: "easeInOut",
                        }}
                      >
                        <line x1="5" y1="12" x2="19" y2="12" />
                        <polyline points="12 5 19 12 12 19" />
                      </motion.svg>
                    </Button>
                  </motion.div>
                </motion.div>
              )}
            </TabsContent>
          </AnimatePresence>
        </Tabs>
      </motion.div>
    </section>
  );
};

export default BookedServicesSection;
