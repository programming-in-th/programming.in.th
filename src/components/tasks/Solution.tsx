import React from 'react'
import Head from 'next/head'

export const Solution = ({ solution }) => {
  if (!solution) {
    return (
      <div className="flex items-center justify-center flex-grow">
        <p className="p-8 text-6xl font-extrabold text-center">
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
          href="https://cdn.jsdelivr.net/npm/katex@0.13.13/dist/katex.min.css"
          integrity="sha384-RZU/ijkSsFbcmivfdRBQDtwuwVqK7GMOw6IMvKyeWL2K5UAlyp6WonmB8m7Jd0Hn"
          crossOrigin="anonymous"
        />
      </Head>
      <div className="w-full max-w-4xl p-6 md:p-0 md:mt-4 md:mx-auto">
        <div
          className="prose lg:prose-lg xl:prose-xl"
          dangerouslySetInnerHTML={{ __html: solution }}
        />
      </div>
    </React.Fragment>
  )
}
