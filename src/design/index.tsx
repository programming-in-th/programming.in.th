import { Global, css } from '@emotion/core'
import styled from '@emotion/styled'

import { nprogress } from './nprogress'

export function getSystemFonts() {
  return [
    '-apple-system',
    'BlinkMacSystemFont',
    'Segoe UI',
    'Oxygen',
    'Ubuntu',
    'Cantarell',
    'Fira Sans',
    'Droid Sans',
    'Helvetica Neue',
    'sans-serif',
  ]
}

export const Fonts = {
  display: [
    'SF Pro Display',
    'Sukhumvit Set',
    'Kanit',
    ...getSystemFonts(),
  ].join(', '),
  body: getSystemFonts().join(', '),
}

const TH_UNICODE_RANGE = 'U+0E01-0E5B, U+200C-200D, U+25CC'

export const GlobalStyle = () => (
  <Global
    styles={css`
      :root {
        /* Based on TailwindCSS(https://github.com/tailwindcss/tailwindcss/blob/master/stubs/defaultConfig.stub.js) */

        --shadow-xs: 0 0 0 1px rgba(0, 0, 0, 0.05);
        --shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
        --shadow-default: 0 1px 3px 0 rgba(0, 0, 0, 0.1),
          0 1px 2px 0 rgba(0, 0, 0, 0.06);
        --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
          0 2px 4px -1px rgba(0, 0, 0, 0.06);
        --shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1),
          0 4px 6px -2px rgba(0, 0, 0, 0.05);
        --shadow-xl: 0 20px 25px -5px rgba(0, 0, 0, 0.1),
          0 10px 10px -5px rgba(0, 0, 0, 0.04);
        --shadow-2xl: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
        --shadow-inner: inset 0 2px 4px 0 rgba(0, 0, 0, 0.06);
        --shadow-outline: 0 0 0 3px rgba(66, 153, 225, 0.5);

        --font-display: ${Fonts.display};
        --font-body: ${Fonts.body};
        --font-size: 16px;
        --gap-top: 24px;
        --gap-bottom: 16px;
        --text-color: #24292e;
      }

      @font-face {
        font-family: 'Kanit';
        font-style: normal;
        font-weight: 400;
        font-display: swap;
        src: local('Kanit Regular'), local('Kanit-Regular'),
          url('https://fonts.gstatic.com/s/kanit/v5/nKKZ-Go6G5tXcraBGwCKd6xBDFs.woff2')
            format('woff2');
        unicode-range: ${TH_UNICODE_RANGE};
      }

      @font-face {
        font-family: 'Sukhumvit Set';
        font-display: swap;
        src: local('Sukhumvit Set');
        unicode-range: ${TH_UNICODE_RANGE};
      }

      html,
      body,
      #__next {
        width: 100%;
        height: 100%;
        margin: 0;
      }

      svg {
        display: inline;
      }

      pre {
        font-size: 14px;
        line-height: 1.4em;
        margin: 0 0 1.5em;
        overflow-x: auto;
        padding: 1.5em;
        white-space: pre;
        background: #011627;
        border-radius: 4px;

        code {
          padding: 0;
          text-shadow: none;
        }
      }

      ${nprogress}
    `}
  />
)

export const MarkDownStyle = styled.div`
  font-size: 16px;

  img {
    max-width: 100%;
    margin: 0 auto;
  }

  /* Code */
  code {
    background-color: rgba(27, 31, 35, 0.1);
    font-size: 90%;
    margin: 0;
  }

  /* Math */
  .math {
    font-family: KaTeX_Main, 'Times New Roman', serif !important;
  }

  /* Text  */
  p,
  ol {
    margin-bottom: var(--gap-bottom);
    font-family: var(--font-body) !important;
  }

  p,
  ul,
  ol {
    font-size: 16px;
    font-family: var(--font-body) !important;
    color: #24292e;
  }

  li {
    list-style-position: inside;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    font-family: var(--font-display) !important;
    border-bottom: 1px solid #d9d9d9;
    margin-top: 24px;
    margin-bottom: var(--gap-bottom);
  }

  h1 {
    font-size: 32px;
  }

  h2 {
    font-size: 24px;
  }

  h3 {
    font-size: 20px;
  }

  h4,
  h5,
  h6 {
    font-size: unset;
  }

  em {
    font-style: italic;
  }

  /* Table  */
  table {
    font-family: var(--font-body) !important;
    border-collapse: collapse;
    text-align: center;
    margin-bottom: var(--gap-bottom);
  }

  table th {
    padding: 6px 13px;
    border: 1px solid #dfe2e5;
    font-weight: 600;
  }

  table td {
    padding: 6px 13px;
    border: 1px solid #dfe2e5;
  }

  table tr {
    border-top: 1px solid #c6cbd1;
  }

  table tr:nth-child(2n) {
    background-color: #f6f8fa;
  }
`
