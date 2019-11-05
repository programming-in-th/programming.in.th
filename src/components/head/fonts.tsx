import React from 'react'

export const Fonts = () => (
  <React.Fragment>
    <style
      dangerouslySetInnerHTML={{
        __html: `@import url('https://fonts.googleapis.com/css?family=Fira+Code|Montserrat:400,800|Roboto&display=swap');`
      }}
    ></style>
    <link rel="preload" href="/assets/fonts/Kanit-Regular.woff2" as="font" />
  </React.Fragment>
)
