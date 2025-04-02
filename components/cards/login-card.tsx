import React from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import OnboardingForm from "../forms/onboarding-form";

export default function OnboardCard() {
  return (
    <Card className="flex w-full flex-col items-center rounded-none bg-white p-3 md:w-[470px] md:rounded-lg md:p-6">
      <CardHeader className="text-center">
        <CardTitle className="text-xl">Welcome Aboard!</CardTitle>
        <CardDescription>
          Let&apos;s get to know you better. Please complete your profile
          details.
        </CardDescription>
      </CardHeader>
      <CardContent className="w-full p-0">
        <div className="grid gap-4">
          <OnboardingForm />
        </div>
      </CardContent>
    </Card>
  );
}
