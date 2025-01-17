import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Enable React Strict Mode
  reactStrictMode: true,

  // Configure external images
  images: {
    domains: ['www.achieversit.com'],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "knackforge.com",
        pathname: "/wp-content/uploads/**",
      },
    ],
  },

  // Rewrites for path redirections
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "http://13.235.70.111:3000/:path*",
      },
    ];
  },

  // Webpack Customization
  webpack: (config) => {
    config.resolve.alias["@"] = require("path").resolve(__dirname, "src");
    return config;
  },
};

export default nextConfig;
