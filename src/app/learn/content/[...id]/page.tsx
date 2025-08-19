import { getLearnMaterial } from '@/lib/api/queries/getLearnMaterial'

import { RenderContent } from './RenderContent'

const Page = async ({ params }: { params: { id: string } }) => {
  const learnMaterial = await getLearnMaterial(params.id)
  return <RenderContent content_md={learnMaterial} />
}

export default Page
