import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    turbopackFileSystemCacheForDev: true
  },
  images:{
    domains:["images.unsplash.com"]
  },
  reactCompiler: true,
};

export default nextConfig;
