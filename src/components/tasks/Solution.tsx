import React from 'react'
import Head from 'next/head'

export const Solution = ({ solution }) => {
  if (!solution) {
    return (
      <div className="flex items-center justify-center flex-grow">
        <p className="text-6xl font-extrabold text-center p-8">
          Solution does not exist!
        </p>
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
      <div className="p-6 md:p-0 md:mt-4 md:mx-auto w-full max-w-4xl">
        <div
          className="prose lg:prose-lg xl:prose-xl"
          dangerouslySetInnerHTML={{ __html: solution }}
        />
      </div>
    </React.Fragment>
  )
}
