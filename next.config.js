const withCss = require('@zeit/next-css')
const remarkMath = require('remark-math')
const rehypeKatex = require('rehype-katex')
const rehypePrism = require('@mapbox/rehype-prism')

const withMDX = require('@zeit/next-mdx')({
  extension: /\.mdx?$/,
  options: {
    hastPlugins: [rehypePrism],
    remarkPlugins: [remarkMath],
    rehypePlugins: [rehypeKatex]
  }
})

module.exports = withCss(
  withMDX({
    pageExtensions: ['tsx', 'mdx']
  })
)
