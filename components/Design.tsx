import styled, { createGlobalStyle } from 'styled-components'

export function getSystemFonts() {
  return [
    'SF Pro Display',
    '-apple-system',
    'BlinkMacSystemFont',
    'Segoe UI',
    'Oxygen',
    'Ubuntu',
    'Cantarell',
    'Fira Sans',
    'Droid Sans',
    'Helvetica Neue',
    'sans-serif'
  ]
}

export const Fonts = {
  display: ['Kanit', 'SF Pro Display', 'Montserrat', ...getSystemFonts()].join(
    ', '
  ),
  body: ['Kanit', ...getSystemFonts()].join(', ')
}

/**
 * Computes the absolute font size for
 * [typographic scale](http://spencermortensen.com/articles/typographic-scale/).
 *
 * We use [7 tone equal temperament](https://en.wikipedia.org/wiki/Equal_temperament#5_and_7_tone_temperaments_in_ethnomusicology)
 * which is the [tuning of Thai traditional instruments](https://en.wikipedia.org/wiki/Ranat_ek#Tuning).
 *
 * @param {number} n The font size, where
 *
 *   - `-14` = 0.25x normal font size.
 *   - `-7` = 0.5x normal font size.
 *   - `0` = normal font size.
 *   - `7` = 2x normal font size.
 *   - `14` = 4x normal font size.
 */
export function fontSize(n: number): string {
  return `${(2 ** (n / 7)).toFixed(3)}rem`
}

export const GlobalStyle = createGlobalStyle`
  body {
	margin: 0;
	width: 100%;
	background-color: #f1f5fa;
}

h1,
h2,
h3,
h4,
h5,
h6,
p,
span,
b,
u,
i,
div {
	cursor: default;
	margin: 0;
}

h1,
h2,
h3,
h4,
h5,
h6 {
	font-family: ${Fonts.display};
}

::selection,
::-webkit-selection {
	background-color: rgba(0, 123, 255, 0.25);
}

body {
	/* This will automatic fallback Thai font which Roboto can't handle. In other words, this will support Thai font by default. */
	font-family : ${Fonts.body};
	font-display: swap;
	box-sizing: border-box;
	-webkit-tap-highlight-color: transparent !important;
}

.untouchable {
	-webkit-user-select: none !important;
	-moz-user-select: none !important;
	-ms-user-select: none !important;
	user-select: none !important;
	-webkit-tap-highlight-color: transparent !important;
	-webkit-touch-callout: none !important;
	-webkit-text-size-adjust: none !important;
	-webkit-overflow-scrolling: touch;
}

.th {
	font-family: Sarabun;
}
`

const MARGIN_BOTTOM: string = '16px'

export const MarkDownStyle = styled.div`
  font-size: 16px;

  img {
    max-width: 100%;
  }

  /* Code */
  code:not(.hljs) {
    background-color: rgba(27, 31, 35, 0.1);
    font-size: 85%;
    padding: 0.2em 0.4em;
    margin: 0;
  }

  /* Math */
  .math {
    font-family: KaTeX_Main, 'Times New Roman', serif !important;
  }

  /* Text  */
  p,
  ol {
    margin-bottom: ${MARGIN_BOTTOM};
    font-family: ${getSystemFonts().join(', ')} !important;
  }

  p,
  ul,
  ol {
    font-size: 16px;
    font-family: ${getSystemFonts().join(', ')} !important;
    color: #24292e;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    font-family: ${Fonts.display} !important;
    border-bottom: 1px solid #d9d9d9;
    margin-top: 24px;
    margin-bottom: ${MARGIN_BOTTOM};
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
    font-family: ${getSystemFonts().join(', ')} !important;
    border-collapse: collapse;
    text-align: center;
    margin-bottom: ${MARGIN_BOTTOM};
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
