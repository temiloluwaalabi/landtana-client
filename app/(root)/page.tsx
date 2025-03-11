import { Metadata } from "next";

import { HomePageClient } from "@/components/shared/pages/home-page-client";

import { getAllCategories, getAllServices } from "../actions/services.action";
export const metadata: Metadata = {
  title: "Home | Landtana Crown Braids",
  description:
    "Learn about Landtana Crown Braids, San Antonio's premier braiding salon specializing in protective styles and natural hair care.",
};
export default async function Home() {
  const services = await getAllServices();
  const categories = await getAllCategories();
  return (
    <HomePageClient
      categories={categories.categories || []}
      services={services.services?.services || []}
    />
  );
}
