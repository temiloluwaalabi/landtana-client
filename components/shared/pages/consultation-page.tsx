/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
// app/consultation/page.tsx
"use client";

import { format } from "date-fns";
import { motion, AnimatePresence } from "framer-motion";
import {
  Calendar as CalendarIcon,
  ChevronRight,
  ChevronLeft,
  Scissors,
  Clock,
  Calendar as CalendarOutline,
  User,
  Mail,
  Phone,
  MessageSquare,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState, useEffect, useRef } from "react";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

import MaxWidthContainer from "../max-width-container";

// Define questions structure for a more conversational approach
const questions = [
  // Service Selection
  {
    id: "service",
    question: "What type of braiding service are you interested in?",
    icon: <Scissors className="size-8 text-primary" />,
  },
  {
    id: "customService",
    question: "Tell me more about the custom style you're looking for",
    icon: <Scissors className="size-8 text-primary" />,
    condition: (data: any) => data.service === "Custom Style",
  },

  // Hair Assessment
  {
    id: "hairLength",
    question: "How would you describe your hair length?",
    icon: <Scissors className="size-8 text-primary" />,
  },
  {
    id: "hairTexture",
    question: "What is your hair texture?",
    icon: <Scissors className="size-8 text-primary" />,
  },
  {
    id: "scalpSensitivity",
    question: "Do you have any scalp sensitivity?",
    icon: <Scissors className="size-8 text-primary" />,
  },
  {
    id: "previousExperience",
    question: "Tell me about your previous experience with braided styles",
    icon: <MessageSquare className="size-8 text-primary" />,
  },
  {
    id: "concerns",
    question: "What hair concerns do you currently have?",
    icon: <MessageSquare className="size-8 text-primary" />,
  },

  // Goals
  {
    id: "goals",
    question: "What are you hoping to achieve with your braided style?",
    icon: <CheckCircle2 className="size-8 text-primary" />,
  },
  {
    id: "otherGoals",
    question: "Tell me more about your other hair goals",
    icon: <MessageSquare className="size-8 text-primary" />,
    condition: (data: any) => data.goals.includes("Other"),
  },

  // Scheduling
  {
    id: "date",
    question: "When would you like to schedule your consultation?",
    icon: <CalendarOutline className="size-8 text-primary" />,
  },
  {
    id: "time",
    question: "What time works best for you?",
    icon: <Clock className="size-8 text-primary" />,
  },
  {
    id: "name",
    question: "What's your name?",
    icon: <User className="size-8 text-primary" />,
  },
  {
    id: "phone",
    question: "What's the best phone number to reach you?",
    icon: <Phone className="size-8 text-primary" />,
  },
  {
    id: "email",
    question: "What's your email address?",
    icon: <Mail className="size-8 text-primary" />,
  },

  // Additional Info
  {
    id: "references",
    question: "Do you have any reference photos or inspiration?",
    icon: <MessageSquare className="size-8 text-primary" />,
  },
  {
    id: "specialRequests",
    question: "Any special requests or accommodations needed?",
    icon: <MessageSquare className="size-8 text-primary" />,
  },
  {
    id: "questions",
    question: "Any questions for your stylist?",
    icon: <MessageSquare className="size-8 text-primary" />,
  },
];

export default function ConsultationPage() {
  const router = useRouter();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const questionRef = useRef<HTMLDivElement>(null);

  const [activeQuestionHeight, setActiveQuestionHeight] = useState<
    number | "auto"
  >("auto");

  const [direction, setDirection] = useState(0); // Animation direction: -1 for backward, 1 for forward
  const [consultationData, setConsultationData] = useState({
    service: "",
    hairLength: "",
    hairTexture: "",
    scalpSensitivity: "",
    previousExperience: "",
    concerns: [] as string[],
    goals: [] as string[],
    date: undefined as Date | undefined,
    time: "",
    name: "",
    phone: "",
    email: "",
    references: "",
    specialRequests: "",
    questions: "",
  });

  useEffect(() => {
    if (questionRef.current) {
      setActiveQuestionHeight(questionRef.current.offsetHeight);
    }
  }, [currentQuestionIndex]);

  // Get only the applicable questions based on conditions
  const getApplicableQuestions = React.useCallback(() => {
    return questions.filter(
      (q) => !q.condition || q.condition(consultationData),
    );
  }, [consultationData]);

  // Current question
  const currentQuestion = getApplicableQuestions()[currentQuestionIndex];

  // Calculate progress percentage
  const progressPercentage =
    ((currentQuestionIndex + 1) / getApplicableQuestions().length) * 100;

  const nextQuestion = () => {
    if (currentQuestionIndex < getApplicableQuestions().length - 1) {
      setDirection(1);
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      handleSubmit();
    }
  };

  const prevQuestion = () => {
    if (currentQuestionIndex > 0) {
      setDirection(-1);
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  useEffect(() => {
    // Recalculate applicable questions when data changes (for conditional questions)
    const applicableQuestions = getApplicableQuestions();
    if (currentQuestionIndex >= applicableQuestions.length) {
      setCurrentQuestionIndex(applicableQuestions.length - 1);
    }
  }, [consultationData, currentQuestionIndex, getApplicableQuestions]);

  const handleChange = (field: string, value: any) => {
    setConsultationData({
      ...consultationData,
      [field]: value,
    });
    // setTimeout(() => {
    //   nextQuestion();
    // }, 200);
  };

  const handleCheckboxChange = (
    field: string,
    value: string,
    checked: boolean,
  ) => {
    if (checked) {
      setConsultationData({
        ...consultationData,
        [field]: [
          ...(consultationData[
            field as keyof typeof consultationData
          ] as string[]),
          value,
        ],
      });
    } else {
      setConsultationData({
        ...consultationData,
        [field]: (
          consultationData[field as keyof typeof consultationData] as string[]
        ).filter((item) => item !== value),
      });
    }
  };

  const handleSubmit = () => {
    // In a real app, you would submit the form data to your API
    // Redirect to confirmation page
    router.push("/consultation/confirmation");
  };

  // Available time slots
  const timeSlots = [
    "9:00 AM",
    "9:30 AM",
    "10:00 AM",
    "10:30 AM",
    "11:00 AM",
    "11:30 AM",
    "12:00 PM",
    "12:30 PM",
    "1:00 PM",
    "1:30 PM",
    "2:00 PM",
    "2:30 PM",
    "3:00 PM",
    "3:30 PM",
    "4:00 PM",
    "4:30 PM",
  ];

  // Animation variants
  const variants = {
    enter: (direction: number) => {
      return {
        x: direction > 0 ? 300 : -300, // Reduced from 1000 to 300
        opacity: 0,
      };
    },
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => {
      return {
        zIndex: 0,
        x: direction < 0 ? 300 : -300, // Reduced from 1000 to 300
        opacity: 0,
      };
    },
  };

  // Conditionally render the input for the current question
  const renderQuestionInput = () => {
    const id = currentQuestion?.id;

    switch (id) {
      case "service":
        return (
          <div className="mt-6 space-y-6">
            <div className="grid grid-cols-1 gap-4">
              {[
                "Box Braids",
                "Cornrows",
                "Senegalese Twists",
                "Ghana Braids",
                "Havana Twists",
                "Goddess Braids",
                "Faux Locs",
                "Crochet Braids",
                "Custom Style",
              ].map((service) => (
                <Button
                  key={service}
                  type="button"
                  variant={
                    consultationData.service === service ? "default" : "outline"
                  }
                  className={`w-full justify-start py-6 text-lg ${consultationData.service === service ? "border-2 border-primary shadow-md" : ""}`}
                  onClick={() => handleChange("service", service)}
                >
                  {service}
                </Button>
              ))}
            </div>
          </div>
        );

      case "customService":
        return (
          <div className="mt-6 space-y-4">
            <Textarea
              id="customService"
              placeholder="Describe the style you're looking for..."
              className="min-h-[150px] text-lg"
              value={consultationData.specialRequests}
              onChange={(e) => handleChange("specialRequests", e.target.value)}
            />
          </div>
        );

      case "hairLength":
        return (
          <div className="mt-6 space-y-6">
            <div className="grid grid-cols-1 gap-4">
              {[
                "Short (above shoulders)",
                "Medium (shoulder length)",
                "Long (below shoulders)",
                "Extra long (mid-back or longer)",
              ].map((length) => (
                <Button
                  key={length}
                  type="button"
                  variant={
                    consultationData.hairLength === length
                      ? "default"
                      : "outline"
                  }
                  className={`w-full justify-start py-6 text-lg ${consultationData.hairLength === length ? "border-2 border-primary shadow-md" : ""}`}
                  onClick={() => handleChange("hairLength", length)}
                >
                  {length}
                </Button>
              ))}
            </div>
          </div>
        );

      case "hairTexture":
        return (
          <div className="mt-6 space-y-6">
            <div className="grid grid-cols-1 gap-4">
              {["Fine", "Medium", "Coarse"].map((texture) => (
                <Button
                  key={texture}
                  type="button"
                  variant={
                    consultationData.hairTexture === texture
                      ? "default"
                      : "outline"
                  }
                  className={`w-full justify-start py-6 text-lg ${consultationData.hairTexture === texture ? "border-2 border-primary shadow-md" : ""}`}
                  onClick={() => handleChange("hairTexture", texture)}
                >
                  {texture}
                </Button>
              ))}
            </div>
          </div>
        );

      case "scalpSensitivity":
        return (
          <div className="mt-6 space-y-6">
            <div className="grid grid-cols-1 gap-4">
              {["None", "Mild", "Significant"].map((sensitivity) => (
                <Button
                  key={sensitivity}
                  type="button"
                  variant={
                    consultationData.scalpSensitivity === sensitivity
                      ? "default"
                      : "outline"
                  }
                  className={`w-full justify-start py-6 text-lg ${consultationData.scalpSensitivity === sensitivity ? "border-2 border-primary shadow-md" : ""}`}
                  onClick={() => handleChange("scalpSensitivity", sensitivity)}
                >
                  {sensitivity}
                </Button>
              ))}
            </div>
          </div>
        );

      case "previousExperience":
        return (
          <div className="mt-6 space-y-4">
            <Textarea
              id="previousExperience"
              placeholder="Tell us about your previous experience with braided styles..."
              className="min-h-[150px] text-lg"
              value={consultationData.previousExperience}
              onChange={(e) =>
                handleChange("previousExperience", e.target.value)
              }
            />
          </div>
        );

      case "concerns":
        return (
          <div className="mt-6 space-y-4">
            <p className="mb-4 text-gray-600">Select all that apply</p>
            <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
              {[
                "Breakage",
                "Thinning",
                "Dryness",
                "Damage",
                "Split ends",
                "Slow growth",
                "Scalp issues",
                "Product buildup",
              ].map((concern) => (
                <div
                  key={concern}
                  className={`cursor-pointer rounded-lg border p-4 transition-all hover:border-primary ${
                    consultationData.concerns.includes(concern)
                      ? "border-primary bg-primary/10"
                      : "bg-white"
                  }`}
                  onClick={() =>
                    handleCheckboxChange(
                      "concerns",
                      concern,
                      !consultationData.concerns.includes(concern),
                    )
                  }
                >
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id={`concern-${concern}`}
                      checked={consultationData.concerns.includes(concern)}
                      onCheckedChange={(checked) =>
                        handleCheckboxChange(
                          "concerns",
                          concern,
                          checked as boolean,
                        )
                      }
                      className="size-5"
                    />
                    <Label
                      htmlFor={`concern-${concern}`}
                      className="cursor-pointer text-lg font-medium"
                    >
                      {concern}
                    </Label>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case "goals":
        return (
          <div className="mt-6 space-y-4">
            <p className="mb-4 text-gray-600">Select all that apply</p>
            <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
              {[
                "Protective styling",
                "Special event look",
                "Low maintenance option",
                "Growth promotion",
                "Style change",
                "Volume",
                "Length",
                "Other",
              ].map((goal) => (
                <div
                  key={goal}
                  className={`cursor-pointer rounded-lg border p-4 transition-all hover:border-primary ${
                    consultationData.goals.includes(goal)
                      ? "border-primary bg-primary/10"
                      : "bg-white"
                  }`}
                  onClick={() =>
                    handleCheckboxChange(
                      "goals",
                      goal,
                      !consultationData.goals.includes(goal),
                    )
                  }
                >
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id={`goal-${goal}`}
                      checked={consultationData.goals.includes(goal)}
                      onCheckedChange={(checked) =>
                        handleCheckboxChange("goals", goal, checked as boolean)
                      }
                      className="size-5"
                    />
                    <Label
                      htmlFor={`goal-${goal}`}
                      className="cursor-pointer text-lg font-medium"
                    >
                      {goal}
                    </Label>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case "otherGoals":
        return (
          <div className="mt-6 space-y-4">
            <Textarea
              id="otherGoals"
              placeholder="Tell us about your other hair goals..."
              className="min-h-[150px] text-lg"
              value={consultationData.specialRequests || ""}
              onChange={(e) => handleChange("specialRequests", e.target.value)}
            />
          </div>
        );

      case "date":
        return (
          <div className="mt-6 space-y-6">
            <div className="flex justify-center">
              <div className="rounded-lg bg-white p-2 shadow-lg">
                <Calendar
                  mode="single"
                  selected={consultationData.date}
                  onSelect={(date) => handleChange("date", date)}
                  initialFocus
                  disabled={
                    (date) =>
                      date < new Date(new Date().setHours(0, 0, 0, 0)) ||
                      date.getDay() === 0 || // Disable Sundays
                      date.getDay() === 6 // Disable Saturdays
                  }
                  className="rounded-md border"
                />
              </div>
            </div>
            {consultationData.date && (
              <p className="mt-4 text-center text-lg font-medium">
                You selected:{" "}
                {format(consultationData.date, "EEEE, MMMM do, yyyy")}
              </p>
            )}
          </div>
        );

      case "time":
        return (
          <div className="mt-6 space-y-6">
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
              {timeSlots.map((slot) => (
                <Button
                  key={slot}
                  type="button"
                  variant={
                    consultationData.time === slot ? "default" : "outline"
                  }
                  className={`py-6 ${consultationData.time === slot ? "border-2 border-primary shadow-md" : ""}`}
                  onClick={() => handleChange("time", slot)}
                >
                  {slot}
                </Button>
              ))}
            </div>
          </div>
        );

      case "name":
        return (
          <div className="mt-6 space-y-4">
            <Input
              id="name"
              placeholder="Your full name"
              className="py-6 text-lg"
              value={consultationData.name}
              onChange={(e) => handleChange("name", e.target.value)}
            />
          </div>
        );

      case "phone":
        return (
          <div className="mt-6 space-y-4">
            <Input
              id="phone"
              type="tel"
              placeholder="(123) 456-7890"
              className="py-6 text-lg"
              value={consultationData.phone}
              onChange={(e) => handleChange("phone", e.target.value)}
            />
          </div>
        );

      case "email":
        return (
          <div className="mt-6 space-y-4">
            <Input
              id="email"
              type="email"
              placeholder="your.email@example.com"
              className="py-6 text-lg"
              value={consultationData.email}
              onChange={(e) => handleChange("email", e.target.value)}
            />
          </div>
        );

      case "references":
        return (
          <div className="mt-6 space-y-4">
            <p className="mb-2 text-gray-600">
              Please describe any reference photos or styles that inspire you.
              You can bring photos to your consultation.
            </p>
            <Textarea
              id="references"
              placeholder="Describe your inspiration or reference photos..."
              className="min-h-[150px] text-lg"
              value={consultationData.references}
              onChange={(e) => handleChange("references", e.target.value)}
            />
          </div>
        );

      case "specialRequests":
        return (
          <div className="mt-6 space-y-4">
            <Textarea
              id="specialRequests"
              placeholder="Any special requests or accommodations you need..."
              className="min-h-[150px] text-lg"
              value={consultationData.specialRequests}
              onChange={(e) => handleChange("specialRequests", e.target.value)}
            />
          </div>
        );

      case "questions":
        return (
          <div className="mt-6 space-y-4">
            <Textarea
              id="questions"
              placeholder="Any questions you have for your stylist..."
              className="min-h-[150px] text-lg"
              value={consultationData.questions}
              onChange={(e) => handleChange("questions", e.target.value)}
            />
            <div className="mt-4 rounded-lg bg-primary/10 p-4">
              <p className="text-sm text-gray-700">
                Almost done! After this, you&apos;ll be able to review and
                confirm your consultation booking.
              </p>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  // Check if we can proceed to the next question
  const canProceed = () => {
    const id = currentQuestion?.id;

    switch (id) {
      case "service":
        return !!consultationData.service;
      case "customService":
        return !!consultationData.specialRequests;
      case "hairLength":
        return !!consultationData.hairLength;
      case "hairTexture":
        return !!consultationData.hairTexture;
      case "scalpSensitivity":
        return !!consultationData.scalpSensitivity;
      case "previousExperience":
        return true; // Optional
      case "concerns":
        return true; // Optional but at least select one
      case "goals":
        return consultationData.goals.length > 0;
      case "otherGoals":
        return !!consultationData.specialRequests;
      case "date":
        return !!consultationData.date;
      case "time":
        return !!consultationData.time;
      case "name":
        return !!consultationData.name;
      case "phone":
        return !!consultationData.phone;
      case "email":
        return !!consultationData.email;
      case "references":
        return true; // Optional
      case "specialRequests":
        return true; // Optional
      case "questions":
        return true; // Optional
      default:
        return true;
    }
  };

  return (
    <MaxWidthContainer className=" px-4 py-12">
      <div className="">
        <div className="mb-8 text-center">
          <h1 className="mb-4 text-4xl font-bold tracking-tight">
            Book a Hair Consultation
          </h1>
          <p className="mx-auto max-w-2xl text-xl text-gray-700">
            Ready to transform your look? Let&apos;s get to know your hair
            needs.
          </p>
        </div>

        <div className="relative mb-8 h-2 overflow-hidden rounded-full bg-gray-200">
          <div
            className="absolute left-0 top-0 h-full rounded-full bg-primary transition-all duration-500 ease-in-out"
            style={{ width: `${progressPercentage}%` }}
          ></div>
        </div>

        <div className="mx-auto">
          <Card className="border shadow-lg">
            <CardContent
              className="overflow-hidden p-0 transition-all "
              style={{
                height: activeQuestionHeight, // You'll need to track this
              }}
            >
              {/* <AnimatePresence initial={false} custom={direction}>
              </AnimatePresence> */}
              <motion.div
                ref={questionRef}
                key={currentQuestionIndex}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: "spring", stiffness: 400, damping: 30 },
                  opacity: { duration: 0.2 },
                }}
                className="p-6"
              >
                <div className="mb-6 flex flex-col items-center">
                  <div className="mb-3">{currentQuestion?.icon}</div>
                  <h2 className="text-center text-2xl font-semibold">
                    {currentQuestion?.question}
                  </h2>
                </div>

                {renderQuestionInput()}
              </motion.div>
            </CardContent>

            <CardFooter className="flex justify-between border-t p-6">
              <Button
                type="button"
                variant="outline"
                onClick={prevQuestion}
                disabled={currentQuestionIndex === 0}
                className="text-base"
              >
                <ChevronLeft className="mr-2 size-4" />
                Back
              </Button>

              {currentQuestionIndex < getApplicableQuestions().length - 1 ? (
                <Button
                  type="button"
                  onClick={nextQuestion}
                  disabled={!canProceed()}
                  className="text-base"
                >
                  Next
                  <ChevronRight className="ml-2 size-4" />
                </Button>
              ) : (
                <Button
                  type="button"
                  onClick={handleSubmit}
                  disabled={!canProceed()}
                  className="text-base"
                >
                  Book Consultation - $25
                  <ArrowRight className="ml-2 size-4" />
                </Button>
              )}
            </CardFooter>
          </Card>

          {currentQuestionIndex === getApplicableQuestions().length - 1 && (
            <div className="mt-6 text-center text-sm text-gray-500">
              <p>
                Consultation fee of $25 will be applied toward your service when
                you book your braiding appointment.
              </p>
              <p className="mt-2">
                Your 30-minute consultation includes a professional hair and
                scalp assessment, discussion of your style goals, product
                recommendations, and scheduling of your braiding appointment.
              </p>
            </div>
          )}
        </div>
      </div>
    </MaxWidthContainer>
  );
}
