import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "/dzohocmtc/**",
      },
    ],
  },
  async redirects() {
    return [
      {
        source: "/qa",
        destination: "https://luma.com/7rv7ahys",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
