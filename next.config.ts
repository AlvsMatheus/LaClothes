import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'i.pinimg.com',
      },
      {
        protocol: 'https',
        hostname: 'techwear.store',
      },
      {
        protocol: 'https',
        hostname: 'images.tcdn.com.br',
      },
      // Coloque os outros 3 aqui ↓
      {
        protocol: 'https',
        hostname: 'http2.mlstatic.com',
      },
      {
        protocol: 'https',
        hostname: 'static.riachuelo.com.br',
      },
      {
        protocol: 'https',
        hostname: 'assets.adidas.com',
      },
      {
        protocol: 'https',
        hostname: 'www.twobrothers-store.com',
      },
      {
        protocol: 'https',
        hostname: 'lojaviego.com.br',
      },
       {
        protocol: 'https',
        hostname: 'midonstore.com',
      },
      {
        protocol: 'https',
        hostname: 'media.enomy.com',
      },
       {
        protocol: 'https',
        hostname: 'image-thumbs.shafastatic.net',
      },
      {
        protocol: 'https',
        hostname: 'sneakerpointzn.com',
      },
      {
        protocol: 'https',
        hostname: 'dcdn-us.mitiendanube.com',
      },
       {
        protocol: 'https',
        hostname: 'acdn-us.mitiendanube.com',
      },
    ],
  },
};

export default nextConfig;
