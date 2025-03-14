import { Metadata } from "next";
import Script from "next/script";
import React from "react";

import AboutUsClient from "@/components/shared/pages/about-page-client";
import { aboutPageJsonLd } from "@/lib/jsonld";
export const metadata: Metadata = {
  title: "About Us | Landtana Crown Braids",
  description:
    "Learn about Landtana Crown Braids, San Antonio's premier braiding salon specializing in protective styles and natural hair care.",
};
export default function AboutUsPage() {
  return (
    <>
      <Script
        id="business-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutPageJsonLd) }}
      />
      <AboutUsClient />
    </>
  );
}
