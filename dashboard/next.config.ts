import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  env: {
    BE_API_PREFIX: process.env.BE_API_PREFIX,
  },
};

export default nextConfig;
