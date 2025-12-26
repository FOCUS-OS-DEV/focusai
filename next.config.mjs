import { withPayload } from '@payloadcms/next/withPayload'

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Removed standalone - using regular build for Payload compatibility
  serverExternalPackages: ['sharp', 'graphql'],

  async redirects() {
    return [
      // AI Ready course redirects - all paths lead to landing page
      {
        source: '/courses/ai-ready',
        destination: '/ai-ready',
        permanent: true, // 301 redirect
      },
      {
        source: '/courses/AI-Ready',
        destination: '/ai-ready',
        permanent: true,
      },
      {
        source: '/courses/ai-ready/:path*',
        destination: '/ai-ready',
        permanent: true,
      },
    ]
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'raw.githubusercontent.com',
      },
    ],
  },
  webpack: (webpackConfig) => {
    webpackConfig.resolve.extensionAlias = {
      '.cjs': ['.cts', '.cjs'],
      '.js': ['.ts', '.tsx', '.js', '.jsx'],
      '.mjs': ['.mts', '.mjs'],
    }

    return webpackConfig
  },
}

export default withPayload(nextConfig, { devBundleServerPackages: false })
