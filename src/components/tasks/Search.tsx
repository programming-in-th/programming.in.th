import React, { useEffect, useRef } from 'react'
import { Highlight } from 'react-instantsearch-dom'
import { SearchIcon } from '@heroicons/react/solid'

import Link from 'next/link'

export const CustomSearch = ({ currentRefinement, refine }) => {
  const inputRef = useRef(null)
  useEffect(() => {
    inputRef.current.focus()
  }, [])

  return (
    <div className="relative mt-1 rounded-md shadow-sm">
      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
        <SearchIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
      </div>
      <input
        type="text"
        id="search"
        className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 pl-10 placeholder-gray-400 shadow-sm focus:border-gray-500 focus:outline-none focus:ring-gray-500 sm:text-sm"
        placeholder="Search"
        value={currentRefinement}
        onChange={(e) => refine(e.target.value)}
        ref={inputRef}
      />
    </div>
  )
}

const ProblemHit = ({ hit }) => {
  useEffect(() => {
    console.log(hit)
  }, [hit])

  return (
    <div className="w-full border-b border-gray-200 bg-white px-4 py-5 sm:px-6">
      <Link href={`/tasks/${hit.objectID}`}>
        <a>
          [{hit.objectID}] <Highlight hit={hit} attribute="title" />
        </a>
      </Link>
    </div>
  )
}

export const ProblemHits = ({ hits }) => {
  return (
    <div className="my-10 h-full font-display font-medium">
      {hits.map((hit) => (
        <ProblemHit hit={hit} key={`problemhit-${hit.objectID}`} />
      ))}
    </div>
  )
}
