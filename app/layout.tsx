import type { Metadata } from "next";
import "./globals.css";
import Script from "next/script";
import NextTopLoader from "nextjs-toploader";

import { Navbar } from "@/components/navigation/navbar";
import ScrollToTop from "@/components/navigation/scroll-to-top";
// import { PWAComponents } from "@/components/pwa/pwa-components";
import { Toaster } from "@/components/ui/sonner";
import { businessJsonLd } from "@/lib/jsonld";
import { cn } from "@/lib/utils";
import Providers from "@/providers/tansack-provider";

// import { getUserAction } from "./actions/users.action";
import { getSession } from "./actions/session.action";
import { cormorant, iSans, lora } from "./fonts";

// You're attempting to animate multiple children within AnimatePresence, but its mode is set to "wait". This will lead to odd visual behaviour.

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_API_BASE_URL || "https://landtanacrownbraids.com"
  ),
  title: "Landtana Crown Braids | Premium Braiding Salon in San Antonio",
  description:
    "San Antonio's premier braiding salon specializing in protective styles, crown braids, and natural hair care. Book your appointment today!",

  // OpenGraph metadata for social sharing
  openGraph: {
    title: "Landtana Crown Braids | Premium Braiding Salon in San Antonio",
    description:
      "Transform your look with expert braiding services from San Antonio's premier natural hair care specialists.",
    type: "website",
    locale: "en_US",
    url:
      process.env.NEXT_PUBLIC_API_BASE_URL || "https://landtanacrownbraids.com",
    siteName: "Landtana Crown Braids",
    images: [
      {
        url: "/assets/images/landtana-og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Landtana Crown Braids San Antonio",
      },
    ],
  },

  // Twitter Card metadata
  twitter: {
    card: "summary_large_image",
    title: "Landtana Crown Braids | San Antonio's Top Braiding Salon",
    description:
      "Expert braiding services and natural hair care in San Antonio. Book your appointment today!",
    images: [
      "/assets/images/landtana-og-image.jpg",
      "/assets/images/asset.jpg",
    ],
    creator: "@landtanabraids",
  },

  // Additional SEO properties
  keywords:
    "crown braids, protective styles, hair braiding, natural hair care, San Antonio braiding salon, black-owned salon, box braids, knotless braids",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  // Comprehensive icons
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      // { url: "/favicon-192x192.png", sizes: "192x192", type: "image/png" },
      // { url: "/favicon-512x512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
    other: [
      {
        rel: "manifest",
        url: "/site.webmanifest",
      },
      // {
      //   rel: "mask-icon",
      //   url: "/safari-pinned-tab.svg",
      //   color: "#5bbad5"
      // },
    ],
  },

  // Additional metadata
  applicationName: "Landtana Crown Braids",
  authors: [
    {
      name: "Landtana Crown Braids",
      url:
        process.env.NEXT_PUBLIC_API_BASE_URL ||
        "https://landtanacrownbraids.com",
    },
  ],
  generator: "Next.js",

  // Android-specific
  manifest: "/manifest.json",

  // Apple-specific
  appleWebApp: {
    capable: true,
    title: "Landtana Crown Braids",
    statusBarStyle: "black-translucent",
  },

  // Verification for search consoles
  verification: {
    google:
      process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION ||
      "google-site-verification-code",
    yandex:
      process.env.NEXT_PUBLIC_YANDEX_VERIFICATION || "yandex-verification-code",
  },

  // Alternates for language/region variants if needed
  alternates: {
    canonical:
      process.env.NEXT_PUBLIC_API_BASE_URL || "https://landtanacrownbraids.com",
    languages: {
      "en-US":
        process.env.NEXT_PUBLIC_API_BASE_URL ||
        "https://landtanacrownbraids.com",
      "es-US": `${process.env.NEXT_PUBLIC_API_BASE_URL || "https://landtanacrownbraids.com"}/es`,
    },
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getSession();
  // const user = await getUserAction();
  // console.log("LAYOUT USER", user.user);
  return (
    <html lang="en">
      <Script
        id="business-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(businessJsonLd) }}
      />
      <body
        className={cn(
          cormorant.variable,
          lora.variable,
          iSans.variable,
          "font-lora antialiased"
        )}
      >
        <Providers>
          <NextTopLoader color="#216015" showSpinner={false} />

          <Toaster />
          <Navbar type="CENTER" isLogeedIn={session.isLoggedIn || false} />
          {/* <PushNotificationManager /> */}

          {children}
        </Providers>
        <ScrollToTop />

        {/* <BeforeFooter /> */}
      </body>
    </html>
  );
}
