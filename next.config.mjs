// @ts-check

import bundleAnalyzer from '@next/bundle-analyzer'

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === 'true'
})

export default withBundleAnalyzer({
  reactStrictMode: true,
  images: {
    domains: ['lh3.googleusercontent.com', 'avatars.githubusercontent.com']
  },

  webpack(config) {
    config.externals.push({
      // Unused, is here to surpress errors
      '@aws-sdk/signature-v4-crt': '@aws-sdk/signature-v4-crt',
      'aws-crt': 'aws-crt'
    })

    return config
  }
})
