import { Suspense } from 'react'

import { Metadata, type NextPage } from 'next'

import { RenderContent } from './RenderContent'

export const metadata: Metadata = {
  title: 'Learn | programming.in.th'
}

const Page: NextPage = () => {
  return (
    <Suspense>
      <RenderContent />
    </Suspense>
  )
}

export default Page
