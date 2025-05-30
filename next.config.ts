import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  devIndicators: false,
  async redirects() {
    return [
      {
        source: "/",
        destination: "/customer",
        permanent: true, // 308 redirect
      },
    ];
  },
};

export default nextConfig;
