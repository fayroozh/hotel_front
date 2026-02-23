import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  env: {
    NEXT_PUBLIC_API_URL: "http://127.0.0.1:8000",
  },
  async rewrites() {
    return [
      {
        source: "/api/login",
        destination: "http://127.0.0.1:8000/login",
      },
      {
        source: "/api/register",
        destination: "http://127.0.0.1:8000/register",
      },
      {
        source: "/api/logout",
        destination: "http://127.0.0.1:8000/logout",
      },
      {
        source: "/api/sanctum/:path*",
        destination: "http://127.0.0.1:8000/sanctum/:path*",
      },
      {
        source: "/api/:path*",
        destination: "http://127.0.0.1:8000/api/:path*",
      },
      {
        source: "/sanctum/:path*",
        destination: "http://127.0.0.1:8000/sanctum/:path*",
      },
      {
        source: "/login",
        destination: "http://127.0.0.1:8000/login",
      },
    ];
  },
};

export default nextConfig;
