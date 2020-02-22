import React from 'react'
import Head from 'next/head'

import { Wrapper } from './Common'
import { MarkDownStyle } from '../../design'

export const Solution = ({ statementMetadata, solution }) => {
  if (!solution) {
    return (
      <Wrapper>
        <h1>Solution does not exist!</h1>
      </Wrapper>
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
      <Wrapper>
        <h1>{statementMetadata.title}</h1>
        <MarkDownStyle>
          <div dangerouslySetInnerHTML={{ __html: solution }}></div>
        </MarkDownStyle>
      </Wrapper>
    </React.Fragment>
  )
}
