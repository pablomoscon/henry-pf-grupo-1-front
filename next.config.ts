import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "hoteldegatos.com.ar",
      },
    ],
  },
};

export default nextConfig;
