import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseUrl =
    process.env.NEXT_PUBLIC_API_BASE_URL || "https://landtanacrownbraids.com";

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/admin/", "/private/", "/*?source=*"],
      },
      // Special rule for Googlebot to give it full access except for sensitive areas
      {
        userAgent: "Googlebot",
        allow: "/",
        disallow: ["/api/", "/admin/", "/*?source=*"],
      },
      // Special rule for image bots to allow image crawling
      {
        userAgent: "Googlebot-Image",
        allow: ["/gallery/", "/assets/images/"],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  };
}
