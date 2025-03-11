import { Metadata } from "next";
import React from "react";

import FAQPage from "@/components/shared/pages/faq-client-page";
export const metadata: Metadata = {
  title: "FAQs | Landtana Crown Braids",
  description:
    "Learn about Landtana Crown Braids, San Antonio's premier braiding salon specializing in protective styles and natural hair care.",
};
export default function FaqsPage() {
  return <FAQPage />;
}
