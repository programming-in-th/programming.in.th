import React from 'react'

export const Loading = () => (
  <div className="flex h-screen w-screen flex-col items-center justify-center">
    <p className="p-8 text-3xl font-extrabold md:text-6xl">PROGRAMMING.IN.TH</p>
    <svg
      className="h-20 w-20 animate-spin text-gray-800"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      ></circle>
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      ></path>
    </svg>
  </div>
)
