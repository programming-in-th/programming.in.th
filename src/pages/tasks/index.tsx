import { Fragment, useCallback, useState } from 'react'

import { InferGetStaticPropsType } from 'next'

import { useRouter } from 'next/router'

import { Tab } from '@headlessui/react'

import { PageLayout } from '@/components/Layout'
import { LeftBar } from '@/components/Tasks/LeftBar'
import { RightDisplay } from '@/components/Tasks/RightDisplay'
import prisma from '@/lib/prisma'
import { IGeneralTask } from '@/types/tasks'

export async function getStaticProps() {
  const tasks = await prisma.task.findMany()

  return {
    props: {
      tasks: tasks.map((item: any) => {
        let x = Math.floor(Math.random() * item.fullScore)
        if (x > 80) x = item.fullScore
        return {
          id: item.id as string,
          title: item.title as string,
          tags: [] as string[],
          solved: item.solved as number,
          score: x as number,
          fullScore: item.fullScore as number
        } as IGeneralTask
      })
    }
  }
}

const Tabs = ['all', 'tried', 'solved', 'archives', 'bookmarked']

const Tasks = ({ tasks }: InferGetStaticPropsType<typeof getStaticProps>) => {
  const [tag, setTag] = useState<boolean>(false)

  const { isFallback, query, replace } = useRouter()

  const onTabChange = useCallback((index: number) => {
    replace({ query: { ...query, type: Tabs[index] } }, null, {
      shallow: true
    })
  }, [])

  return (
    <PageLayout>
      <div className="flex w-auto justify-center">
        <div className="flex min-h-screen w-full max-w-7xl flex-col items-center">
          <div className="flex w-full flex-col items-center pt-6 pb-10">
            <p className="text-3xl text-gray-500 dark:text-white">Tasks</p>
            <p className="text-md text-gray-500 dark:text-gray-300">
              browse over 700+ tasks
            </p>
            {/* <input
              className="px-2 py-1 my-4 text-sm bg-gray-100 border-gray-300 rounded-md shadow-sm w-60"
              placeholder="search..."
            /> */}
          </div>
          <div className="flex w-full">
            <Tab.Group
              defaultIndex={
                Tabs.includes(query?.type as string)
                  ? Tabs.findIndex(v => v === query?.type)
                  : 0
              }
              onChange={onTabChange}
              as={Fragment}
            >
              <LeftBar />
              <RightDisplay tasks={tasks} tag={tag} setTag={setTag} />
            </Tab.Group>
          </div>
        </div>
      </div>
    </PageLayout>
  )
}

export default Tasks
