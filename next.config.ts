import type { NextConfig } from "next";

const isFTP = process.env.DEPLOY_TARGET === "ftp";

const nextConfig: NextConfig = {
  /* config options here */
  ...(!isFTP && { cacheComponents: true }),
  images: {
    formats: ["image/avif", "image/webp"],
    qualities: [75, 80],
    ...(isFTP && { unoptimized: true }),
  },
  ...(isFTP && {
    output: "export",
    trailingSlash: true,
  }),
};

export default nextConfig;
