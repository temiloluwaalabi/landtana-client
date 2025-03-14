import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { useInView } from "react-intersection-observer";

import { ServicePriceCard } from "@/components/cards/service-price-card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Category, Service } from "@/types";

import MaxWidthContainer from "../../max-width-container";

type Services = {
  filteredServices: Service[];
  categories: Category[];
};

const ServicesSection = ({ filteredServices, categories }: Services) => {
  console.log("ste", categories);
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

  const titleVariants = {
    hidden: { opacity: 0, x: -30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.5, ease: "easeOut" },
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
    return filteredServices.filter(
      (service) => service.category_id === selectedTab
    );
  };

  const displayedServices = getFilteredServices().slice(0, visibleServices);
  const hasMoreServices = getFilteredServices().length > visibleServices;

  return (
    <MaxWidthContainer className="py-16">
      <motion.div
        ref={ref}
        className="relative flex flex-col justify-center space-y-12"
        variants={containerVariants}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
      >
        <motion.div
          className="flex w-full  flex-col items-start justify-start space-y-4"
          variants={titleVariants}
        >
          <h2 className="relative bg-gradient-to-r from-secondary to-pink-400 bg-clip-text font-cormorant text-3xl font-bold text-accent md:text-4xl lg:text-6xl">
            Explore Our Braiding Services
            <motion.span
              className="absolute -bottom-3 left-0 h-1 rounded-full bg-gradient-to-r from-primary to-accent"
              initial={{ width: 0 }}
              animate={{ width: "120px" }}
              transition={{ delay: 0.5, duration: 0.8 }}
            />
          </h2>
          <p className="max-w-2xl text-left text-base font-light text-[#2F201A] lg:text-2xl">
            Discover our premium braiding styles and services tailored to
            enhance your natural beauty
          </p>
        </motion.div>

        <Tabs defaultValue="all" onValueChange={handleTabChange}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <TabsList className="mb-4 h-auto flex-wrap items-start justify-start gap-3 bg-transparent p-0">
              <TabsTrigger
                className="rounded-[60px] border border-gray-200 bg-white/80 px-6 py-2 text-sm font-medium shadow-sm backdrop-blur-sm transition-all duration-300 data-[state=active]:border-primary data-[state=active]:bg-primary data-[state=active]:text-white lg:text-base"
                value={"all"}
              >
                All
              </TabsTrigger>
              {categories
                // .filter((caat) => (caat.services?.length ?? 0) > 0)
                .map((tab, index) => (
                  <motion.div
                    key={tab.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 * index, duration: 0.4 }}
                    whileHover={{ y: -3, transition: { duration: 0.2 } }}
                  >
                    <TabsTrigger
                      className="rounded-[60px] border border-gray-200 bg-white/80 px-6 py-2 text-sm font-medium shadow-sm backdrop-blur-sm transition-all duration-300 data-[state=active]:border-primary data-[state=active]:bg-primary data-[state=active]:text-white lg:text-base"
                      value={tab.id}
                    >
                      {tab.name}
                    </TabsTrigger>
                  </motion.div>
                ))}
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
                    <ServicePriceCard service={service} />
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
                      className="mt-8 flex items-center gap-2 rounded-md border border-secondary bg-white/80 px-8 py-6 text-base font-medium text-secondary shadow-sm backdrop-blur-sm transition-all duration-300 hover:bg-secondary hover:text-white"
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
    </MaxWidthContainer>
  );
};

export default ServicesSection;
