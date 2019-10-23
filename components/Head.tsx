import React from 'react'
import Head from 'next/head'

export const CustomHead = () => (
  <Head>
    <link
      href="https://fonts.googleapis.com/css?family=Fira+Code|Montserrat:400,800|Roboto&display=swap"
      rel="stylesheet"
    />
    <style type="text/css">
      {`
        @font-face {
            font-family: 'Kanit';
            font-style: normal;
            font-weight: 400;
            font-display: swap;
            src: url('/assets/fonts/Kanit-Regular.woff2')
              format('woff2');
            unicode-range: U+0E01-0E5B, U+200C-200D, U+25CC;
          }
    `}
    </style>
  </Head>
)
