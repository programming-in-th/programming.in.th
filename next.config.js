const withPlugins = require('next-compose-plugins')

const withOffline = require('next-offline')
const withBundleAnalyzer = require('@zeit/next-bundle-analyzer')

const remarkMath = require('remark-math')
const rehypeKatex = require('rehype-katex')
const rehypePrism = require('@mapbox/rehype-prism')

const withCSS = require('@zeit/next-css')
const withStylus = require('@zeit/next-stylus')

const withMDX = require('@zeit/next-mdx')({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [remarkMath],
    rehypePlugins: [rehypeKatex, rehypePrism]
  }
})

module.exports = withPlugins(
  [
    [
      withMDX,
      {
        pageExtensions: ['tsx', 'mdx']
      }
    ],
    withBundleAnalyzer,
    withOffline,
    withCSS,
    withStylus
  ],
  {
    analyzeServer: ['server', 'both'].includes(process.env.BUNDLE_ANALYZE),
    analyzeBrowser: ['browser', 'both'].includes(process.env.BUNDLE_ANALYZE),
    bundleAnalyzerConfig: {
      server: {
        analyzerMode: 'static',
        reportFilename: '../bundles/server.html'
      },
      browser: {
        analyzerMode: 'static',
        reportFilename: '../bundles/client.html'
      }
    },
    target: 'serverless',
    transformManifest: manifest => ['/'].concat(manifest),
    workboxOpts: {
      swDest: 'static/service-worker.js',
      runtimeCaching: [
        {
          urlPattern: /^https?.*/,
          handler: 'NetworkFirst',
          options: {
            cacheName: 'https-calls',
            networkTimeoutSeconds: 15,
            expiration: {
              maxEntries: 150,
              maxAgeSeconds: 30 * 24 * 60 * 60 // 1 month
            },
            cacheableResponse: {
              statuses: [0, 200]
            }
          }
        },
        {
          urlPattern: /\.(?:png|jpg|jpeg|svg)$/,

          handler: 'CacheFirst',
          options: {
            cacheName: 'images',
            expiration: {
              maxEntries: 150,
              maxAgeSeconds: 30 * 24 * 60 * 60 // 1 month
            },
            cacheableResponse: {
              statuses: [0, 200]
            }
          }
        },
        {
          urlPattern: /^https:\/\/fonts\.gstatic\.com/,

          handler: 'CacheFirst',
          options: {
            cacheName: 'google-fonts',
            expiration: {
              maxAgeSeconds: 60 * 60 * 24 * 365 // 1 years
            },
            cacheableResponse: {
              statuses: [0, 200]
            }
          }
        }
      ]
    }
  }
)
