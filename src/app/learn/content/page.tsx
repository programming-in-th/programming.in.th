import { Metadata, type NextPage } from 'next'

import { RenderContent } from './RenderContent'

export const metadata: Metadata = {
  title: 'Learn | programming.in.th'
}

const Page: NextPage = () => {
  return <RenderContent />
}

export default Page
