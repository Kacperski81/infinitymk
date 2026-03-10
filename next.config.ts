import type { NextConfig } from "next";

const isStaticExport = process.env.STATIC_EXPORT === "true";

const nextConfig: NextConfig = {
  ...(!isStaticExport && { cacheComponents: true }),
  images: {
    formats: ["image/avif", "image/webp"],
    ...(isStaticExport && { unoptimized: true }),
  },
  ...(isStaticExport && {
    output: "export",
    trailingSlash: true,
  }),
};

export default nextConfig;
