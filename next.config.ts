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
    domains: ["res.cloudinary.com"],
  },
};

export default nextConfig;
