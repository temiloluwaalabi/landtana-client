import { Metadata } from "next";
import React from "react";

import AboutUsClient from "@/components/shared/pages/about-page-client";
export const metadata: Metadata = {
  title: "About Us | Landtana Crown Braids",
  description:
    "Learn about Landtana Crown Braids, San Antonio's premier braiding salon specializing in protective styles and natural hair care.",
};
export default function AboutUsPage() {
  return (
    <div>
      <AboutUsClient />
    </div>
  );
}
