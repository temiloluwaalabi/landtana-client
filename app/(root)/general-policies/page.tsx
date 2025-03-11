import { Metadata } from "next";
import React from "react";

import PoliciesPage from "@/components/shared/pages/policies-page";
export const metadata: Metadata = {
  title: "General Policies | Landtana Crown Braids",
  description:
    "Learn about Landtana Crown Braids, San Antonio's premier braiding salon specializing in protective styles and natural hair care.",
};
export default function GeneralPolicies() {
  return <PoliciesPage />;
}
