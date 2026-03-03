import type { NextConfig } from "next";

const nextConfig: NextConfig = {
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
  async redirects() {
    return [
      {
        source: "/sceduler",
        destination: "/scheduler",
        permanent: true,
      },
    ];
  },
  async rewrites() {
    return [
      {
        source: "/",
        has: [{ type: "host", value: "scheduler.erinkerr.me" }],
        destination: "/scheduler",
      },
    ];
  },
};

export default nextConfig;

// CL tool
// ifconfig en0
// what your computer's local IP address is
// use to connect to your local network followed by port # on different devices
