import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Dev server only: keep compiled pages in memory for an hour (the default
  // drops them after a minute), so pages embedded in the redesign case study,
  // like the large /archive/2025, aren't recompiled on every visit.
  onDemandEntries: {
    maxInactiveAge: 60 * 60 * 1000,
    pagesBufferLength: 50,
  },
  images: {
    // Album art for the 2025 edition's "last song played" card.
    remotePatterns: [{ protocol: "https", hostname: "i.scdn.co" }],
  },
  async redirects() {
    return [
      {
        // The agent case study is now the engineering side of OrderSync.
        source: "/orderSyncAgent",
        destination: "/orderSync?side=engineer",
        permanent: false,
      },
      {
        source: "/sceduler",
        destination: "/scheduler",
        permanent: true,
      },
      {
        source: "/:path*",
        has: [{ type: "host", value: "sceduler.erinkerr.me" }],
        destination: "https://scheduler.erinkerr.me/:path*",
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
