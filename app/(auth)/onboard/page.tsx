import React from "react";

import OnboardCard from "@/components/cards/onboarding-card";

export default function Onboarding() {
  return (
    <div className="flex h-screen flex-col items-center justify-end gap-6 bg-[#FFECE5] md:justify-center">
      <OnboardCard />
    </div>
  );
}
