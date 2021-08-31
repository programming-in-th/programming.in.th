import React from 'react'
import Script from 'next/script'
import { Preload } from './preload'

export const Head = () => (
  <React.Fragment>
    <Preload />
    <link
      href="https://fonts.googleapis.com/css?family=Fira+Code&display=swap"
      rel="stylesheet"
    />
    <meta charSet="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="theme-color" content="#000000" />
    <Script src="https://accounts.google.com/gsi/client"></Script>
    <link rel="icon" sizes="192x192" href="/assets/img/icon-512.png" />
    <link rel="manifest" href="/manifest.json" />
    <link rel="apple-touch-icon" href="/assets/img/icon-apple.png" />
    <meta
      name="Description"
      content="Programming.in.th provides you with the fundamentals of algorithmic problem-solving, an important skill to differentiate yourself as a programmer in an increasingly technologically advanced world."
    />
    <meta property="og:url" content="https://beta.programming.in.th" />
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
    <meta name="apple-mobile-web-app-capable" content="yes" />
    <meta name="apple-mobile-web-app-title" content="programming.in.th" />
    <meta name="apple-mobile-web-app-status-bar-style" content="default" />
    <meta name="format-detection" content="telephone=no" />
    <meta name="apple-touch-fullscreen" content="yes" />
    <title>programming.in.th | β</title>
  </React.Fragment>
)
