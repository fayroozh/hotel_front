import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  env: {
    NEXT_PUBLIC_API_URL: "https://hotel-booking.xo.je",
  },
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
      {
        source: "/login",
        destination: "https://hotel-booking.xo.je/login",
      },
    ];
  },
};

export default nextConfig;
