import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: false,
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
      {
        source: "/wpp",
        destination:
          "https://chat.whatsapp.com/GTVHD19bsw7D7GGMgEieYQ?mode=gi_t",
        permanent: false,
      },
      {
        source: "/luma",
        destination: "https://luma.com/ytl522gp",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
