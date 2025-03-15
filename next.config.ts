import withPWA from "next-pwa";

const withPWAConfig = withPWA({
  dest: "public",
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === "development",
  sw: "sw.js",
});

const nextConfig = {
  serverExternalPackages: ["pino", "pino-pretty"],

  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
        ],
      },
      {
        source: "/sw.js",
        headers: [
          {
            key: "Content-Type",
            value: "application/javascript; charset=utf-8",
          },
          {
            key: "Cache-Control",
            value: "no-cache, no-store, must-revalidate",
          },
          {
            key: "Content-Security-Policy",
            value: "default-src 'self'; script-src 'self'",
          },
        ],
      },
    ];
  },
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https" as const,
        hostname: "*",
      },
      {
        protocol: "http" as const,
        hostname: "*",
      },
      {
        protocol: "https" as const,
        hostname: "res.cloudinary.com",
      },
      {
        protocol: "https" as const,
        hostname: "res-console.cloudinary.com",
      },
      {
        protocol: "https" as const,
        hostname: "widgets.guidestar.org",
      },
      {
        protocol: "https" as const,
        hostname: "images.unsplash.com",
      },
    ],
  },
};

export default withPWAConfig(nextConfig);
