import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/webp", "image/avif"],
    deviceSizes: [640, 768, 1024, 1280, 1536],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  experimental: {
    optimizeCss: false,
  },
  turbopack: {
    root: path.resolve(__dirname),
  },
  allowedDevOrigins: ["172.23.32.1"],
};



module.exports = nextConfig;