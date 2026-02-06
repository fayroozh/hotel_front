import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "https://hotel-booking.xo.je/api/:path*",
      },
      {
        source: "/sanctum/:path*",
        destination: "https://hotel-booking.xo.je/sanctum/:path*",
      },
    ];
  },
};

export default nextConfig;
