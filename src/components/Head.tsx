import React from 'react'
import { Helmet } from 'react-helmet'

export const Head: React.FunctionComponent<{}> = () => (
  <Helmet>
    <link
      rel="preload"
      href="assets/fonts/Kanit-Regular.woff2"
      as="font"
      crossOrigin="anonymous"
    />
    <link
      rel="preload"
      href="assets/fonts/THSarabun.woff2"
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
    <meta property="og:image" content="assets/img/og.jpg" />
    <meta property="og:image:type" content="image/jpeg" />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
    <meta name="twitter:card" content="summary" />
    <style type="text/css">
      {` @font-face {
        font-family: 'Sarabun';
        font-style: normal;
        font-weight: 400;
        font-display: swap;
        src: local('Sarabun Regular'), local('Sarabun-Regular'),
          url('assets/fonts/THSarabun.woff2') format('woff2');
        unicode-range: U+0E01-0E5B, U+200C-200D, U+25CC;
      }

      @font-face {
        font-family: 'Kanit';
        font-style: normal;
        font-weight: 400;
        font-display: swap;
        src: url('assets/fonts/Kanit-Regular.woff2') format('woff2');
        unicode-range: U+0E01-0E5B, U+200C-200D, U+25CC;
      }`}
    </style>
    <title>programming.in.th | Beta</title>
  </Helmet>
)
