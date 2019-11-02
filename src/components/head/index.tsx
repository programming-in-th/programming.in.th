import React from 'react'
import Head from 'next/head'
import { Fonts } from './fonts'

export const CustomHead = () => (
  <Head>
    <Fonts />
    <link
      rel="preload"
      href="https://cdn.jsdelivr.net/npm/katex@0.11.1/dist/katex.min.css"
      integrity="sha384-zB1R0rpPzHqg7Kpt0Aljp8JPLqbXI3bhnPWROx27a9N0Ll6ZP/+DiW/UqRcLbRjq"
      crossOrigin="anonymous"
      as="style"
    />
    <link rel="preconnect" href="https://www.googleapis.com/" />
    <link
      rel="preconnect"
      href="https://asia-east2-grader-ef0b5.cloudfunctions.net/"
    />
    <title>programming.in.th | β</title>
  </Head>
)
