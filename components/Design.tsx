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
  }
}
`

export const MARGIN_BOTTOM: string = '16px'
export const MARGIN_TOP: string = '24px'
export const TEXT_COLOR: string = '#24292e'
export const BASE_FONT_SIZE: string = '16px'
