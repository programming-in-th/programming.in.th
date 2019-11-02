import React from 'react'
import Head from 'next/head'
import { Fonts } from './fonts'

export const CustomHead = () => (
  <Head>
    <Fonts />
    <meta charSet="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="theme-color" content="#000000" />
    <link rel="icon" sizes="192x192" href="/assets/img/icon-512.png" />
    <link rel="apple-touch-icon" href="/assets/img/icon-ios" />
    <meta
      name="Description"
      content="Programming.in.th provides you with the fundamentals of algorithmic problem-solving, an important skill to differentiate yourself as a programmer in an increasingly technologically advanced world."
    />
    <meta property="og:url" content="https://staging.programming.in.th" />
    <meta property="og:type" content="website" />
    <meta property="og:title" content="programming.in.th" />
    <meta
      property="og:description"
      content="Programming.in.th provides you with the fundamentals of algorithmic problem-solving, an important skill to differentiate yourself as a programmer in an increasingly technologically advanced world."
    />
    <meta property="og:image" content="/assets/img/og.jpg" />
    <meta property="og:image:type" content="image/jpeg" />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
    <meta name="twitter:card" content="summary" />
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
