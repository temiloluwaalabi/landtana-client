import type { Metadata } from "next";
import "./globals.css";
import NextTopLoader from "nextjs-toploader";

import { Navbar } from "@/components/navigation/navbar";
import { Toaster } from "@/components/ui/sonner";
import { cn } from "@/lib/utils";
import Providers from "@/providers/tansack-provider";

// import { getUserAction } from "./actions/users.action";
import { getSession } from "./actions/session.action";
import { cormorant, iSans, lora } from "./fonts";

// You're attempting to animate multiple children within AnimatePresence, but its mode is set to "wait". This will lead to odd visual behaviour.

export const metadata: Metadata = {
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
    url: "https://landtanacrownbraids.com",
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

  // Viewport settings
  viewport: "width=device-width, initial-scale=1, maximum-scale=5",

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
    { name: "Landtana Crown Braids", url: "https://landtanacrownbraids.com" },
  ],
  generator: "Next.js",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#222222" },
  ],

  // Android-specific
  manifest: "/site.webmanifest",

  // Apple-specific
  appleWebApp: {
    capable: true,
    title: "Landtana Crown Braids",
    statusBarStyle: "black-translucent",
  },

  // Verification for search consoles
  verification: {
    google: "google-site-verification-code",
    yandex: "yandex-verification-code",
  },

  // Alternates for language/region variants if needed
  alternates: {
    canonical: "https://landtanacrownbraids.com",
    languages: {
      "en-US": "https://landtanacrownbraids.com",
      "es-US": "https://landtanacrownbraids.com/es",
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
      <body
        className={cn(
          cormorant.variable,
          lora.variable,
          iSans.variable,
          "font-lora antialiased",
        )}
      >
        <Providers>
          <NextTopLoader color="#216015" showSpinner={false} />

          <Toaster />
          <Navbar type="CENTER" isLogeedIn={session.isLoggedIn || false} />
          {children}
        </Providers>
        {/* <BeforeFooter /> */}
      </body>
    </html>
  );
}
