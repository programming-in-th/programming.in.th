const withCss = require('@zeit/next-css')
const remarkMath = require('remark-math')
const rehypeKatex = require('rehype-katex')
const rehypePrism = require('@mapbox/rehype-prism')
const withPlugins = require('next-compose-plugins')

const withMDX = require('@zeit/next-mdx')({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [remarkMath],
    rehypePlugins: [rehypeKatex, rehypePrism]
  }
})

module.exports = withPlugins(
  [
    withCss,
    [
      withMDX,
      {
        pageExtensions: ['tsx', 'mdx']
      }
    ]
  ],
  {
    webpack: (config, { isServer }) => {
      if (isServer) {
        const antStyles = /antd\/.*?\/style\/css.*?/
        const origExternals = [...config.externals]
        config.externals = [
          (context, request, callback) => {
            if (request.match(antStyles)) return callback()
            if (typeof origExternals[0] === 'function') {
              origExternals[0](context, request, callback)
            } else {
              callback()
            }
          },
          ...(typeof origExternals[0] === 'function' ? [] : origExternals)
        ]

        config.module.rules.unshift({
          test: antStyles,
          use: 'null-loader'
        })
      }
      return config
    }
  }
)
