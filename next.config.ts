import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  devIndicators: false,
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
