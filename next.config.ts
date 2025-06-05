import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });
    return config;
  },
  images: {
    domains: ["images.unsplash.com", "www.google.com", "unsplash.com"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**", // Allow all hostnames over HTTPS
      },
    ],
  },
};

export default nextConfig;
