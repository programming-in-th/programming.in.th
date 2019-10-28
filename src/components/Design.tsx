import { createGlobalStyle } from 'styled-components'

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
  display: [
    'Sukhumvit Set',
    'Kanit',
    'SF Pro Display',
    'Montserrat',
    ...getSystemFonts()
  ].join(', '),
  body: [...getSystemFonts()].join(', ')
}

const TH_UNICODE_RANGE = 'U+0E01-0E5B, U+200C-200D, U+25CC'

export const GlobalStyle = createGlobalStyle`
@font-face {
  font-family: 'Kanit';
  font-style: normal;
  font-weight: 400;
  font-display: swap;
  src: url('/assets/fonts/Kanit-Regular.woff2') format('woff2');
  unicode-range: ${TH_UNICODE_RANGE};
}

@font-face {
  font-family: 'Sukhumvit Set';
  src: local('Sukhumvit Set');
  unicode-range: ${TH_UNICODE_RANGE};
}

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

#nprogress {
  pointer-events: none;
}

#nprogress .bar {
  background: #0070f3;
  position: fixed;
  z-index: 99999;
  top: 0;
  left: 0;
  width: 100%;
  height: 3px;
}
  /* Fancy blur effect */
#nprogress .peg {
  display: block;
  position: absolute;
  right: 0px;
  width: 100px;
  height: 100%;
  box-shadow: 0 0 10px #0070f3, 0 0 5px #0070f3;
  opacity: 1;
  -webkit-transform: rotate(3deg) translate(0px, -4px);
  -ms-transform: rotate(3deg) translate(0px, -4px);
  transform: rotate(3deg) translate(0px, -4px);
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
`

export const MARGIN_BOTTOM: string = '16px'
export const MARGIN_TOP: string = '24px'
export const TEXT_COLOR: string = '#24292e'
export const BASE_FONT_SIZE: string = '16px'
