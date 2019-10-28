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
      href="https://cdn.jsdelivr.net/npm/katex@0.11.1/dist/katex.min.css"
      integrity="sha384-zB1R0rpPzHqg7Kpt0Aljp8JPLqbXI3bhnPWROx27a9N0Ll6ZP/+DiW/UqRcLbRjq"
      crossOrigin="anonymous"
    />
  </Head>
)
