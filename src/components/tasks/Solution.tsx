import React from 'react'
import Head from 'next/head'

import { MarkDownStyle } from 'design'

export const Solution = ({ solution }) => {
  if (!solution) {
    return (
      <div className="flex items-center justify-center flex-grow">
        <h2 className="font-bold leading-5 text-xl sm:text-4xl">
          Solution does not exist!
        </h2>
      </div>
    )
  }

  return (
    <React.Fragment>
      <Head>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/katex@0.11.1/dist/katex.min.css"
          integrity="sha384-zB1R0rpPzHqg7Kpt0Aljp8JPLqbXI3bhnPWROx27a9N0Ll6ZP/+DiW/UqRcLbRjq"
          crossOrigin="anonymous"
        />
      </Head>
      <div className="p-6 sm:p-0 mt-0 sm:mt-4 mx-0 sm:mx-auto w-full max-w-full sm:max-w-4xl">
        <MarkDownStyle>
          <div dangerouslySetInnerHTML={{ __html: solution }}></div>
        </MarkDownStyle>
      </div>
    </React.Fragment>
  )
}
