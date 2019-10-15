import React from 'react'
import { Helmet } from 'react-helmet'

export const Head: React.FunctionComponent<{}> = () => (
  <Helmet>
    <link
      rel="preload"
      href={`${process.env.PUBLIC_URL}assets/fonts/Kanit-Regular.woff2`}
      as="font"
      crossOrigin="anonymous"
    />
    <link
      rel="preload"
      href={`${process.env.PUBLIC_URL}assets/fonts/THSarabun.woff2`}
      as="font"
      crossOrigin="anonymous"
    />
    <meta
      name="Description"
      content="Programming.in.th provides you with the fundamentals of algorithmic problem-solving, an important skill to differentiate yourself as a programmer in an increasingly technologically advanced world."
    />
    <meta property="og:url" content="https://betabeta.programming.in.th" />
    <meta property="og:type" content="website" />
    <meta property="og:title" content="programming.in.th" />
    <meta
      property="og:description"
      content="Programming.in.th provides you with the fundamentals of algorithmic problem-solving, an important skill to differentiate yourself as a programmer in an increasingly technologically advanced world."
    />
    <link
      rel="stylesheet"
      href="https://cdn.jsdelivr.net/npm/katex@0.11.0/dist/katex.min.css"
      integrity="sha384-BdGj8xC2eZkQaxoQ8nSLefg4AV4/AwB3Fj+8SUSo7pnKP6Eoy18liIKTPn9oBYNG"
      crossOrigin="anonymous"
    />
    <meta property="og:image" content="assets/img/og.jpg" />
    <meta property="og:image:type" content="image/jpeg" />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
    <meta name="twitter:card" content="summary" />
    <title>programming.in.th | Beta</title>
  </Helmet>
)
