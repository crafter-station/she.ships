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
      {
        source: "/bog",
        destination: "https://luma.com/cej2uy3n",
        permanent: false,
      },
      {
        source: "/init",
        destination: "https://meet.google.com/vuz-mvxo-gdo",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
