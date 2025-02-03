import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: ["i.scdn.co", "covers.openlibrary.org"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "your-image-host.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
