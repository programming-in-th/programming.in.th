import { createGlobalStyle } from 'styled-components'

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
    'sans-serif'
  ]
}

export const Fonts = {
  display: ['Kanit', 'Montserrat', ...getSystemFonts()].join(', '),
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
	font-family: ${Fonts.display}
	;
}

::selection,
::-webkit-selection {
	background-color: rgba(0, 123, 255, 0.25);
}

* {
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

#root {
	width: 1020px;
	margin-left: auto;
	margin-right: auto;
}

.divider {
	margin-top: 25px;
	padding: 7px 0;
	color: #8e8e93;
	p {
		font-size: 24px;
		font-weight: bolder;
	}
}
`
