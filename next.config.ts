import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'im.newspic.kr',
      },
      {
        protocol: 'https',
        hostname: '**.newspic.kr',
      },
    ],
  },
}

export default nextConfig
