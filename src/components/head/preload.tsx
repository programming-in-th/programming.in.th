import React from 'react'

export const Preload = () => (
  <React.Fragment>
    <link
      rel="preload"
      href="https://cdn.jsdelivr.net/npm/katex@0.11.1/dist/katex.min.css"
      integrity="sha384-zB1R0rpPzHqg7Kpt0Aljp8JPLqbXI3bhnPWROx27a9N0Ll6ZP/+DiW/UqRcLbRjq"
      crossOrigin="anonymous"
      as="style"
    />
    <link
      rel="preload"
      as="font"
      href="https://fonts.gstatic.com/s/kanit/v5/nKKZ-Go6G5tXcraBGwCKd6xBDFs.woff2"
      type="font/woff2"
      crossOrigin="anonymous"
    />
    <link rel="preconnect" href="https://www.googleapis.com/" />
    <link
      rel="preconnect"
      href="https://asia-east2-proginth.cloudfunctions.net/"
    />
  </React.Fragment>
)
