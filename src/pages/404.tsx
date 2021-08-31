import React from 'react'

import Link from 'next/link'
import Image from 'next/image'

const FourZeroFour = () => (
  <div className="flex flex-col min-h-screen pt-16 pb-12 bg-white">
    <main className="flex flex-col justify-center flex-grow w-full px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
      <div className="flex justify-center flex-shrink-0">
        <Link href="/">
          <a className="inline-flex">
            <span className="sr-only">Workflow</span>
            <Image
              width="48px"
              height="48px"
              className="w-auto h-12"
              src="https://tailwindui.com/img/logos/workflow-mark.svg?color=gray&shade=600"
              alt=""
            />
          </a>
        </Link>
      </div>
      <div className="py-16">
        <div className="text-center">
          <p className="text-sm font-semibold tracking-wide text-gray-600 uppercase">
            404 error
          </p>
          <h1 className="mt-2 text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl">
            Page not found.
          </h1>
          <p className="mt-2 text-base text-gray-500">
            Sorry, we couldn’t find the page you’re looking for.
          </p>
          <div className="mt-6">
            <Link href="/">
              <a className="text-base font-medium text-gray-600 hover:text-gray-500">
                Go back home<span aria-hidden="true"> &rarr;</span>
              </a>
            </Link>
          </div>
        </div>
      </div>
    </main>
    <footer className="flex-shrink-0 w-full px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
      <nav className="flex justify-center space-x-4">
        <a
          href="#"
          className="text-sm font-medium text-gray-500 hover:text-gray-600"
        >
          Contact Support
        </a>
        <span
          className="inline-block border-l border-gray-300"
          aria-hidden="true"
        />
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.facebook.com/programming.in.th"
          className="text-sm font-medium text-gray-500 hover:text-gray-600"
        >
          Facebook
        </a>
      </nav>
    </footer>
  </div>
)

export default FourZeroFour
