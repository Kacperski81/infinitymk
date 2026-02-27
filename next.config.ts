import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  cacheComponents: true,
  images: {
    formats: ["image/avif", "image/webp"],
    qualities: [75, 80],
  }
};

export default nextConfig;
