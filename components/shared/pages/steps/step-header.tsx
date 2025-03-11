import * as React from "react";

import { useBookingStore } from "@/lib/use-booking-store";

// Define an interface for step details with an optional type
interface StepDetail {
  step: number;
  title: string;
  description: string;
  type?: string[]; // Array of types this step applies to
}

interface StepHeaderProps {
  currentStep: number;
  onGoBack: () => void; // Callback for the Go Back button
}

export const StepHeader = ({ currentStep, onGoBack }: StepHeaderProps) => {
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
          title: "Select Addons",
          description: "Enhance your service with additional add-ons.",
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
        title: "Select Addons",
        description: "Enhance your service with additional add-ons.",
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
      (!step.type || (type && step.type.includes(type))),
  );

  if (!currentStepDetails) {
    return null; // Handle case where step is not found
  }

  return (
    <div className="mb-6 space-y-4">
      {/* Go Back Button (Top-Left Corner) */}
      {currentStep > 1 && ( // Only show the button if it's not the first step
        <button
          onClick={onGoBack}
          className="mb-4 flex items-center text-sm text-gray-600 hover:text-gray-900"
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
      <div className=" space-y-2">
        <h2 className="font-cormorant text-5xl font-bold">
          {currentStepDetails.title}
        </h2>
        <p className="max-w-md font-lora text-base font-normal">
          {currentStepDetails.description}
        </p>
      </div>
    </div>
  );
};
