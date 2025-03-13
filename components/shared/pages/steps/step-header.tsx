import { motion } from "framer-motion";
import * as React from "react";
import { useInView } from "react-intersection-observer";

import { useBookingStore } from "@/lib/use-booking-store";

// Define an interface for step details with an optional type
interface StepDetail {
  step: number;
  title: string;
  description: string;
  hide?: boolean;
  type?: string[]; // Array of types this step applies to
}

interface StepHeaderProps {
  currentStep: number;
  onGoBack: () => void; // Callback for the Go Back button
}

export const StepHeader = ({ currentStep, onGoBack }: StepHeaderProps) => {
  const { ref: headerRef, inView: headerInView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });
  const { type } = useBookingStore();
  const steps: StepDetail[] = React.useMemo(() => {
    if (type === "individual") {
      return [
        {
          step: 1,
          title: "Brading Services",
          description: "Start by selecting the type of service you need.",
        },
        {
          step: 2,
          title: "Select Service",
          description:
            "Choose from our list of available services. We have services available to all and delivered by our experienced specialists",
          type: ["individual", "group"], // Specify types for this step
        },
        {
          step: 4,
          title: "Customize Your Experience",
          description:
            " Enhance your salon experience with our premium add-on services",
          type: ["individual", "group"], // Applies to both types
        },
        {
          step: 5,
          title: "Select Date & Time",
          description: "Pick a convenient date and time for your appointment.",
          type: ["individual", "group"],
        },
        {
          step: 6,
          title: "Confirmation",
          description: "Review and confirm your booking details.",
          type: ["individual", "group"],
        },
      ];
    }

    return [
      {
        step: 1,
        title: "Brading Services",
        description: "Start by selecting the type of service you need.",
      },
      {
        step: 2,
        title: "Add guests and services",
        hide: true,
        description:
          "Book a group appointment for up to 4 guests. Select the services you need for each guest.",
        type: ["group"], // Only for group type
      },
      {
        step: 3,
        title: "Select Service",
        description:
          "Choose from our list of available services. We have services available to all and delivered by our experienced specialists",
        type: ["individual", "group"], // Specify types for this step
      },

      {
        step: 4,
        title: "Customize Your Experience",
        description:
          " Enhance your salon experience with our premium add-on services",
        type: ["individual", "group"], // Applies to both types
      },
      {
        step: 5,
        title: "Select Date & Time",
        description: "Pick a convenient date and time for your appointment.",
        type: ["individual", "group"],
      },
      {
        step: 6,
        title: "Confirmation",
        description: "Review and confirm your booking details.",
        type: ["individual", "group"],
      },
    ];
  }, [type]);
  // Find the current step details
  const currentStepDetails = steps.find(
    (step) =>
      step.step === currentStep &&
      (!step.type || (type && step.type.includes(type)))
  );

  if (!currentStepDetails) {
    return null; // Handle case where step is not found
  }

  return (
    <motion.div
      className="mb-8 space-y-2"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      {/* Go Back Button (Top-Left Corner) */}
      {currentStep > 1 && ( // Only show the button if it's not the first step
        <button
          onClick={onGoBack}
          className="mb-2 flex items-center text-sm text-gray-600 hover:text-gray-900"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="mr-2 size-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
          Go Back
        </button>
      )}
      {!currentStepDetails.hide && (
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: headerInView ? 1 : 0, y: headerInView ? 0 : 20 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mb-4 space-y-2"
        >
          <h2 className="bg-gradient-to-r from-primary to-secondary bg-clip-text font-cormorant text-3xl font-bold text-transparent lg:text-5xl">
            {currentStepDetails.title}
          </h2>
          <p className="max-w-md font-lora text-sm font-normal text-gray-600 lg:text-base">
            {currentStepDetails.description}
          </p>
        </motion.div>
      )}
      {/* <div className=" space-y-2">
        <h2 className="font-cormorant text-5xl font-bold">
      
        </h2>
        <p className="max-w-md font-lora text-base font-normal">
         
        </p>
      </div> */}
    </motion.div>
  );
};
