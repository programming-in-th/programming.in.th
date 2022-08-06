import { useState, useEffect } from 'react'

import { useTheme } from 'next-themes'

const Dark = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-6 w-6"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
    />
  </svg>
)

const Light = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-6 w-6"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth="2"
  >
    <path
      stroke-linecap="round"
      stroke-linejoin="round"
      d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
    />
  </svg>
)

const System = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-6 w-6"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
    />
  </svg>
)

const data = {
  dark: {
    next: 'light',
    svg: Dark
  },
  light: {
    next: 'system',
    svg: Light
  },
  system: {
    next: 'dark',
    svg: System
  }
}

const ThemeSwitch = () => {
  const { theme, setTheme } = useTheme()
  return (
    <button
      onClick={() => setTheme(data[theme].next)}
      className="focus-ring-inset inline-flex items-center justify-center rounded-md bg-transparent p-2 text-gray-400 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-white dark:text-white"
    >
      {theme === 'system' ? (
        <System />
      ) : theme === 'light' ? (
        <Light />
      ) : (
        <Dark />
      )}
    </button>
  )
}

export default ThemeSwitch
