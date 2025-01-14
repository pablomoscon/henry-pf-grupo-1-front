import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "hoteldegatos.com.ar",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
