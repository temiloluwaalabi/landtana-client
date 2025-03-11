import { Metadata } from "next";
import React from "react";

import ContactClientPage from "@/components/shared/pages/contact-client-page";
export const metadata: Metadata = {
  title: "Contact Us | Landtana Crown Braids",
  description:
    "Get in touch with Landtana Crown Braids in San Antonio, TX for all your braiding needs.",
};
export default function ContactPage() {
  return <ContactClientPage />;
}
