import { Metadata } from "next";
import React from "react";

import ConsultationClientPage from "@/components/shared/pages/consultation-page";
export const metadata: Metadata = {
  title: "Consultation | Landtana Crown Braids",
  description:
    "Learn about Landtana Crown Braids, San Antonio's premier braiding salon specializing in protective styles and natural hair care.",
};
export default function ConsultationPage() {
  return <ConsultationClientPage />;
}
