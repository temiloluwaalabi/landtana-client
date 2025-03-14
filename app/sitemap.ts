import { MetadataRoute } from "next";

import { getAllCategories, getAllServices } from "./actions/services.action";

async function fetchServices() {
  try {
    const services = await getAllServices();
    return services.services?.services.map((service) => service.id);
  } catch (error) {
    console.error("Error fetching serviceIDs:", error);
    return [];
  }
}
async function fetcgCategories() {
  try {
    const categories = await getAllCategories();
    return categories.categories?.map((service) => service.id) || [];
  } catch (error) {
    console.error("Error fetching categories:", error);
    return [];
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl =
    process.env.NEXT_PUBLIC_API_BASE_URL ||
    "http://landtana-client.vercel.app/";

  // Static routes
  const staticRoutes = [
    "",
    "/about-us",
    "/consultation",
    "/contact-us",
    "/faq",
    "/gallery",
    "/general-policies",
    "/job-board",
    "/services",
    "/team",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: route === "" ? 1 : 0.8,
  }));
  // Fetch dynamic routes data
  const [serviceIds, serviceCategories] = await Promise.all([
    fetchServices(),
    fetcgCategories(),
  ]);
  // Service detail routes
  const serviceRoutes = serviceIds?.map((id) => ({
    url: `${baseUrl}/services/${id}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  // Service category routes
  const serviceCategoryRoutes = serviceCategories.map((category) => ({
    url: `${baseUrl}/services/category/${category}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  return [...staticRoutes, ...(serviceRoutes || []), ...serviceCategoryRoutes];
}
