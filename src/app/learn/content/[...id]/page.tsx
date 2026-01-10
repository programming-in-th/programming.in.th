import { Suspense } from 'react'

import Link from 'next/link'

import { ArrowLeftIcon } from '@heroicons/react/24/solid'

import { getLearnMaterial } from '@/lib/api/queries/getLearnMaterial'

import { RenderContent } from './RenderContent'
import { learnLevels } from '../../constants'

const ContentSidebar = ({ id }: { id: string }) => {
  const path = id.split('_')
  if (path.length != 3) return <></>
  const levelLabel = learnLevels.filter(lev => lev.value == path[0])[0].label
  const label = learnLevels
    .filter(lev => lev.value == path[0])[0]
    .sections.filter(sec => sec.value == path[1])[0]
    .content.filter(con => con.value == path[2])[0].label

  return (
    <div>
      <div className="mx-4 hidden w-60 shrink flex-col gap-4 divide-y font-display md:flex">
        <div className="flex shrink flex-col pt-6 font-display">
          <Link href="/learn">
            <span className="group flex items-center gap-1">
              <ArrowLeftIcon className="h-5 w-5 text-gray-500 group-hover:text-gray-800" />
              <span className="text-gray-500 group-hover:text-gray-800">
                exit
              </span>
            </span>
          </Link>
          <h1 className="mt-5 text-lg"> เนื้อหา{levelLabel} </h1>
          <h1 className="mt-5 text-2xl"> เรื่อง {label} </h1>
        </div>
      </div>
    </div>
  )
}

const Page = async ({ params }: { params: { id: string[] } }) => {
  const learnMaterial = await getLearnMaterial(params.id[0])
  return (
    <div className="flex w-auto justify-center">
      <div className="flex min-h-[calc(100vh-2.5rem)] w-full max-w-7xl flex-col items-center">
        <div className="flex w-full flex-col items-center pb-6 pt-6" />
        <div className="flex w-full flex-col md:flex-row">
          <Suspense>
            <ContentSidebar id={params.id[0]} />
            <RenderContent content_md={learnMaterial} />
          </Suspense>
        </div>
      </div>
    </div>
  )
}

export default Page
