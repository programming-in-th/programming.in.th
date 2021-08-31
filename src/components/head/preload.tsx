import React from 'react'

export const Preload = () => (
  <React.Fragment>
    <link
      rel="preload"
      href="https://cdn.jsdelivr.net/npm/katex@0.13.13/dist/katex.min.css"
      integrity="sha384-RZU/ijkSsFbcmivfdRBQDtwuwVqK7GMOw6IMvKyeWL2K5UAlyp6WonmB8m7Jd0Hn"
      crossOrigin="anonymous"
      as="style"
    />
    <link rel="preconnect" href="https://fonts.gstatic.com" />
    <link rel="preconnect" href="https://www.googleapis.com/" />
    <link
      rel="preconnect"
      href="https://asia-east2-proginth.cloudfunctions.net/"
    />
  </React.Fragment>
)
