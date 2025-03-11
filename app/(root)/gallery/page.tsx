import { Metadata } from "next";
import React from "react";

import GalleryPage from "@/components/shared/pages/gallery-client";
export const metadata: Metadata = {
  title: "Gallery | Landtana Crown Braids",
  description:
    "Learn about Landtana Crown Braids, San Antonio's premier braiding salon specializing in protective styles and natural hair care.",
};
export default function GalleryH() {
  return <GalleryPage />;
}
