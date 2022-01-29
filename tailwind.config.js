const defaultTheme = require("tailwindcss/defaultTheme");
const plugin = require("tailwindcss/plugin");

module.exports = {
  corePlugins: {
    preflight: true,
  },
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      typography: (theme) => ({
        DEFAULT: {
          css: {
            h1: {
              color: theme("colors.gray.900"),
              fontWeight: "800",
              fontFamily: `${theme("fontFamily.display")}`,
            },
            h2: {
              color: theme("colors.gray.900"),
              fontWeight: "700",
              fontFamily: `${theme("fontFamily.display")}`,
            },
            h3: {
              color: theme("colors.gray.900"),
              fontWeight: "600",
              fontFamily: `${theme("fontFamily.display")}`,
            },
            h4: {
              color: theme("colors.gray.900"),
              fontWeight: "600",
              fontFamily: `${theme("fontFamily.display")}`,
            },
          },
        },
        lg: {
          css: {
            h1: {
              fontFamily: `${theme("fontFamily.display")}`,
            },
            h2: {
              fontFamily: `${theme("fontFamily.display")}`,
            },
            h3: {
              fontFamily: `${theme("fontFamily.display")}`,
            },
            h4: {
              fontFamily: `${theme("fontFamily.display")}`,
            },
          },
        },
        xl: {
          css: {
            h1: {
              fontFamily: `${theme("fontFamily.display")}`,
            },
            h2: {
              fontFamily: `${theme("fontFamily.display")}`,
            },
            h3: {
              fontFamily: `${theme("fontFamily.display")}`,
            },
            h4: {
              fontFamily: `${theme("fontFamily.display")}`,
            },
          },
        },
      }),
    },
    screens: {
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
    },
    fontFamily: {
      sans: ["Inter var", ...defaultTheme.fontFamily.sans],
      display: [
        "Inter var",
        "SF Pro Display",
        "Sukhumvit Set",
        "IBM Plex Sans Thai",
        ...defaultTheme.fontFamily.sans,
      ],
    },
  },
  plugins: [
    require("@tailwindcss/typography"),
    plugin(function ({ addBase }) {
      addBase({
        "@font-face": {
          fontFamily: "Inter var",
          fontWeight: "100 900",
          fontStyle: "normal",
          fontNamedInstance: "Regular",
          fontDisplay: "swap",
          src: 'url("/fonts/Inter-roman.var.woff2?3.13") format("woff2")',
        },
        "@font-face": {
          fontFamily: "Inter var",
          fontWeight: "100 900",
          fontStyle: "italic",
          fontNamedInstance: "Italic",
          fontDisplay: "swap",
          src: 'url("/fonts/Inter-italic.var.woff2?3.13") format("woff2")',
        },
        "@font-face": {
          fontFamily: "IBM Plex Sans Thai",
          fontStyle: "normal",
          fontWeight: "400",
          fontDisplay: "swap",
          src: 'local("IBM Plex Sans Thai"), local("IBMPlexSansThai"), url("/fonts/IBMPlexSansThai-Regular.woff2") format("woff2")',
        },
        "@font-face": {
          fontFamily: "IBM Plex Sans Thai",
          fontStyle: "normal",
          fontWeight: "450",
          fontDisplay: "swap",
          src: 'local("IBM Plex Sans Thai Text"), local("IBMPlexSansThai-Text"), url("/fonts/IBMPlexSansThai-Text.woff2") format("woff2")',
        },
        "@font-face": {
          fontFamily: "IBM Plex Sans Thai",
          fontStyle: "normal",
          fontWeight: "500",
          fontDisplay: "swap",
          src: 'local("IBM Plex Sans Thai Medium"), local("IBMPlexSansThai-Medium"), url("/fonts/IBMPlexSansThai-Medium.woff2") format("woff2")',
        },
        "@font-face": {
          fontFamily: "IBM Plex Sans Thai",
          fontStyle: "normal",
          fontWeight: "600",
          fontDisplay: "swap",
          src: 'local("IBM Plex Sans Thai SemiBold"), local("IBMPlexSansThai-SemiBold"), url("/fonts/IBMPlexSansThai-SemiBold.woff2") format("woff2")',
        },
        "@font-face": {
          fontFamily: "IBM Plex Sans Thai",
          fontStyle: "normal",
          fontWeight: "700",
          fontDisplay: "swap",
          src: 'local("IBM Plex Sans Thai Bold"), local("IBMPlexSansThai-Bold"), url("/fonts/IBMPlexSansThai-Bold.woff2") format("woff2")',
        },
        "@font-face": {
          fontFamily: "IBM Plex Sans Thai",
          fontStyle: "normal",
          fontWeight: "100",
          fontDisplay: "swap",
          src: 'local("IBM Plex Sans Thai Thin"), local("IBMPlexSansThai-Thin"), url("/fonts/IBMPlexSansThai-Thin.woff2") format("woff2")',
        },
        "@font-face": {
          fontFamily: "IBM Plex Sans Thai",
          fontStyle: "normal",
          fontWeight: "200",
          fontDisplay: "swap",
          src: 'local("IBM Plex Sans Thai ExtraLight"), local("IBMPlexSansThai-ExtraLight"), url("/fonts/IBMPlexSansThai-ExtraLight.woff2") format("woff2")',
        },
        "@font-face": {
          fontFamily: "IBM Plex Sans Thai",
          fontStyle: "normal",
          fontWeight: "300",
          fontDisplay: "swap",
          src: 'local("IBM Plex Sans Thai Light"), local("IBMPlexSansThai-Light"), url("/fonts/IBMPlexSansThai-Light.woff2") format("woff2")',
        },
        "@font-face": {
          fontFamily: "Sukhumvit Set",
          fontDisplay: "swap",
          src: "local('Sukhumvit Set')",
          unicodeRange: "U+0E01-0E5B, U+200C-200D, U+25CC",
        },
      });
    }),
  ],
};
