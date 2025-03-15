import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  const baseUrl =
    process.env.NEXT_PUBLIC_API_BASE_URL || "https://landtanacrownbraids.com";

  return {
    name: "Landtana Crown Braids",
    short_name: "Landtana Braids",
    description:
      "San Antonio's premier braiding salon specializing in protective styles, crown braids, and natural hair care.",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#5bbad5",
    icons: [
      {
        src: "/favicon-16x16.png",
        sizes: "16x16",
        type: "image/png",
      },
      {
        src: "/favicon-32x32.png",
        sizes: "32x32",
        type: "image/png",
      },
      {
        src: "/apple-touch-icon.png",
        sizes: "180x180",
        type: "image/png",
      },
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
      {
        src: "/assets/images/web-app-manifest-192x192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "maskable",
      },
      {
        src: "/assets/images/web-app-manifest-512x512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],

    orientation: "portrait",
    id: "/",
    scope: "/",
    lang: "en-US",
    categories: ["beauty", "hair salon", "braiding services"],
    screenshots: [
      {
        src: "/assets/images/landtana-og-image.jpg",
        sizes: "1200x630",
        type: "image/jpeg",
        form_factor: "wide",
      },
    ],
    shortcuts: [
      {
        name: "Services",
        url: "/services",
        description: "Browse our braiding services",
      },
      {
        name: "Gallery",
        url: "/gallery",
        description: "View our work",
      },
      {
        name: "Contact Us",
        url: "/contact-us",
        description: "Get in touch with us",
      },
      {
        name: "Book Consultation",
        url: "/consultation",
        description: "Schedule your appointment",
      },
    ],
    related_applications: [
      {
        platform: "web",
        url: baseUrl,
      },
    ],
  };
}
