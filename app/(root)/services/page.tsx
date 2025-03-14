import { Metadata } from "next";
import React from "react";

import {
  getAllCategories,
  getAllServices,
} from "@/app/actions/services.action";
import { ServicesArchiveClient } from "@/components/shared/pages/services-archive-client";
export const metadata: Metadata = {
  title: "Services | Landtana Crown Braids",
  description:
    "Learn about Landtana Crown Braids, San Antonio's premier braiding salon specializing in protective styles and natural hair care.",
};
export default async function MainServicesArchive() {
  const categories = await getAllCategories();
  const services = await getAllServices();
  return (
    <ServicesArchiveClient
      services={services.services?.services || []}
      categories={categories.categories || []}
    />
  );
}
