import React from 'react'
import Head from 'next/head'

export const CustomHead = () => (
  <Head>
    <link
      href="https://fonts.googleapis.com/css?family=Fira+Code|Montserrat:400,800|Roboto&display=swap"
      rel="stylesheet"
    />
    <link
      rel="prefetch"
      href="https://cdn.jsdelivr.net/npm/katex@0.11.1/dist/katex.min.css"
      integrity="sha384-zB1R0rpPzHqg7Kpt0Aljp8JPLqbXI3bhnPWROx27a9N0Ll6ZP/+DiW/UqRcLbRjq"
      crossOrigin="anonymous"
      as="style"
    />
    <link rel="preconnect" href="https://www.googleapis.com/"></link>
    <link
      rel="preconnect"
      href="https://asia-east2-grader-ef0b5.cloudfunctions.net/"
    ></link>
    <title>programming.in.th | β</title>
  </Head>
)
