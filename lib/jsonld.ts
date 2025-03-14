import {
  AboutPage,
  CollectionPage,
  LocalBusiness,
  Service,
  WebPage,
  WithContext,
} from "schema-dts";

export const businessJsonLd: WithContext<LocalBusiness> = {
  "@context": "https://schema.org",
  "@type": "HairSalon",
  name: "Landtana Crown Braids",
  description:
    "San Antonio's premier braiding salon specializing in protective styles and natural hair care.",
  url: "https://landtanacrownbraids.com",
  telephone: "+18303506003", // Replace with actual phone
  email: "info@landtanacrownbraids.com", // Replace with actual email
  address: {
    "@type": "PostalAddress",
    streetAddress: "6923 W Loop 1604 N suite 214", // Replace with actual address
    addressLocality: "San Antonio",
    addressRegion: "TX",
    postalCode: "78254", // Replace with actual zip
    addressCountry: "US",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 29.506567, // Replace with actual coordinates
    longitude: -98.708104, // Replace with actual coordinates
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday"],
      opens: "09:00",
      closes: "20:00",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Friday", "Saturday"],
      opens: "08:00",
      closes: "22:00",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: "Sunday",
      opens: "13:00",
      closes: "22:00",
    },
  ],
  sameAs: [
    "https://www.facebook.com/landtanacrownbraids",
    "https://www.instagram.com/landtanacrownbraids",
  ],
  priceRange: "$$",
  image: "https://landtanacrownbraids.com/images/salon-exterior.jpg",
  paymentAccepted: "Cash, Credit Card",
  areaServed: "San Antonio",
};

export function generateServiceJsonLd(service: {
  id: string;
  name: string;
  description: string;
  price: number;
  duration?: string;
  image?: string;
}): WithContext<Service> {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.name,
    description: service.description,
    provider: {
      "@type": "HairSalon",
      name: "Landtana Crown Braids",
      url: "https://landtanacrownbraids.com",
    },
    offers: {
      "@type": "Offer",
      price: service.price.toString(),
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
      url: `https://landtanacrownbraids.com/services/${service.id}`,
    },
    serviceType: "Hair Braiding Service",
    ...(service.image && { image: service.image }),
    ...(service.duration && {
      estimatedCost: {
        "@type": "MonetaryAmount",
        currency: "USD",
        value: service.price.toString(),
      },
      timeRequired: service.duration,
    }),
  };
}

export const aboutPageJsonLd: WithContext<AboutPage> = {
  "@context": "https://schema.org",
  "@type": "AboutPage",
  name: "About Landtana Crown Braids",
  description:
    "Learn about Landtana Crown Braids, our mission, values, and expert stylists in San Antonio.",
  mainEntity: {
    "@type": "Organization",
    name: "Landtana Crown Braids",
    url: "https://landtanacrownbraids.com",
    foundingDate: "2015", // Replace with actual year
    foundingLocation: "San Antonio, TX",
  },
};
export const bookingPageJsonLd: WithContext<WebPage> = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Book an Appointment - Landtana Crown Braids",
  description:
    "Schedule your braiding appointment at San Antonio's top protective styles salon.",
  mainEntity: {
    "@type": "Service",
    name: "Hair Braiding Appointment",
    provider: {
      "@type": "HairSalon",
      name: "Landtana Crown Braids",
    },
    potentialAction: {
      "@type": "ReserveAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: "https://landtanacrownbraids.com/booking",
        actionPlatform: "https://schema.org/OnlineOnly",
      },
      result: {
        "@type": "Reservation",
        name: "Hair Braiding Appointment",
      },
    },
  },
};
export function generateCategoryJsonLd(category: {
  id: string;
  name: string;
  description: string;
}): WithContext<CollectionPage> {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: `${category.name} - Landtana Crown Braids`,
    description: category.description,
    url: `https://landtanacrownbraids.com/categories/${category.id}`,
    mainEntity: {
      "@type": "ItemList",
      itemListElement: [], // You would populate this with the services in this category
    },
  };
}
