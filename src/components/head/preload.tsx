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
    <link rel="preconnect" href="https://www.googleapis.com/" />
    <link
      rel="preconnect"
      href="https://asia-east2-grader-ef0b5.cloudfunctions.net/"
    />
    <link
      rel="preload"
      href="https://asia-east2-grader-ef0b5.cloudfunctions.net/getAllTasks"
      as="fetch"
      crossOrigin="anonymous"
    />
    <link
      rel="preload"
      href="https://asia-east2-grader-ef0b5.cloudfunctions.net/getRecentSubmissions"
      as="fetch"
      crossOrigin="anonymous"
    />
  </React.Fragment>
)
