import { Metadata } from "next";
import { notFound } from "next/navigation";
import Script from "next/script";

import {
  getAllServices,
  getServiceById,
  getSubCategoriesByCategoryID,
} from "@/app/actions/services.action";
import { ServiceDetailsPage } from "@/components/shared/pages/service-details-page";
import { durations } from "@/config/constants";
import { generateServiceJsonLd } from "@/lib/jsonld";
import { Service } from "@/types";

export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  // Note: params is not a Promise, so we don't need to await it
  const { id } = params;
  const services = await getServiceById(id);

  const service: Service = services.service;

  // If service not found, return a fallback metadata
  if (!services.success) {
    return {
      title: "Service Not Found | Landtana Crown Braids",
      description:
        "The requested service could not be found. Explore other braiding services at San Antonio's premier salon.",
    };
  }

  // Return dynamic metadata based on service details
  return {
    title: `${service.name} | Landtana Crown Braids`,
    description:
      service.description ||
      "Experience premium braiding services at San Antonio's top natural hair care salon. Book your appointment today!",
    openGraph: {
      title: `${service.name} | Landtana Crown Braids`,
      description:
        service.description ||
        "Transform your look with expert braiding services from San Antonio's premier natural hair care specialists.",
      type: "website",
      url: `https://landtanacrownbraids.com/services/${id}`,
      images: [
        {
          url: service.featured_image || service.images[0],
          width: 1200,
          height: 630,
          alt: `${service.name} - Landtana Crown Braids`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${service.name} | Landtana Crown Braids`,
      description:
        service.description ||
        "Expert braiding services in San Antonio. Book your appointment today!",
      images: [service.featured_image || "/images/default-service.jpg"],
    },
    keywords: `${service.name}, ${service.name || "protective styles, hair braiding, natural hair care, San Antonio braiding salon"}`,
    alternates: {
      canonical: `https://landtanacrownbraids.com/services/${id}`,
    },
  };
}

export default async function ServiceDetailsServer({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const service = await getServiceById(id);
  const services = await getAllServices();
  const subCat = await getSubCategoriesByCategoryID(
    "b15bd255-537b-4738-bb98-74938098599d"
  );

  if (!service.success) {
    return notFound();
  }

  const mainService: Service = service.service;
  const serviceJsonLd = generateServiceJsonLd({
    id: mainService.id,
    name: mainService.name,
    price: parseFloat(mainService.base_price),
    image: mainService.featured_image || "",
    description: mainService.description,
    duration:
      durations.find((dur) => dur.value === mainService.duration)?.label || "",
  });

  // console.log("FETCHED SEVR SERVICE", service.service);

  return (
    <>
      <Script
        id="service-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
      />

      <ServiceDetailsPage
        service={service.service}
        services={services.services?.services || []}
        subCat={subCat.category || []}
      />
    </>
  );
}
