const withCss = require('@zeit/next-css')
const remarkMath = require('remark-math')
const rehypeKatex = require('rehype-katex')
const rehypePrism = require('@mapbox/rehype-prism')

const withMDX = require('@zeit/next-mdx')({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [remarkMath],
    rehypePlugins: [rehypeKatex, rehypePrism]
  }
})

module.exports = withCss(
  withMDX({
    pageExtensions: ['tsx', 'mdx']
  })
)
