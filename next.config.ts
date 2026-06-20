import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  devIndicators: false,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
  // HTTP security headers — will be configured in Phase 4 (security hardening)
  async headers() {
    return [
      // {
      //   source: "/(.*)",
      //   headers: [],
      // },
    ];
  },
};

export default nextConfig;
