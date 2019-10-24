import React from 'react'
import Head from 'next/head'

export const CustomHead = () => (
  <Head>
    <link
      href="https://fonts.googleapis.com/css?family=Fira+Code|Montserrat:400,800|Roboto&display=swap"
      rel="stylesheet"
    />
    <link
      rel="stylesheet"
      href="https://cdn.jsdelivr.net/npm/katex@0.11.0/dist/katex.min.css"
      integrity="sha384-BdGj8xC2eZkQaxoQ8nSLefg4AV4/AwB3Fj+8SUSo7pnKP6Eoy18liIKTPn9oBYNG"
      crossOrigin="anonymous"
    />
  </Head>
)
