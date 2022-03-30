import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import prisma from 'lib/prisma'
import { PageLayout } from 'components/Layout'
import { triggerAsyncId } from 'async_hooks'

const Filter = () => {
  return <></>
}

const LeftBar = () => {
  return (
    <div className="mx-4 flex w-52 shrink flex-col font-display">
      <div className="flex h-9 w-full items-center justify-center rounded-md bg-gray-100">
        <p className="text-sm text-gray-500">All</p>
      </div>
      <div className="flex h-9 w-full items-center justify-center rounded-md hover:bg-gray-50">
        <p className="text-sm text-gray-500">Tried</p>
      </div>
      <div className="flex h-9 w-full items-center justify-center rounded-md hover:bg-gray-50">
        <p className="text-sm text-gray-500">Solved</p>
      </div>
      <div className="flex h-9 w-full items-center justify-center rounded-md hover:bg-gray-50">
        <p className="text-sm text-gray-500">Archives</p>
      </div>
      <div className="flex h-9 w-full items-center justify-center rounded-md hover:bg-gray-50">
        <p className="text-sm text-gray-500">Bookmarked</p>
      </div>
    </div>
  )
}

type Task = {
  id: string
  title: string
  tags: string[]
  solved: number
  score: number
  fullScore: number
  showTags: string[] | boolean
}

const TaskItem = (context: Task) => {
  const [bookmark, setBookmark] = useState<boolean>(false)
  const [tagStatus, setTag] = useState<boolean>(false)

  useEffect(() => {
    if (typeof context.showTags === 'boolean') {
      setTag(context.showTags)
    }
  }, [context.showTags])
  return (
    <div className="group flex w-full items-center justify-between p-2">
      <Link href={`/tasks/${context.id}`}>
        <a className="flex w-full rounded-xl py-3 px-6 font-display shadow-sm transition group-hover:shadow-md">
          <div className="flex w-full flex-col">
            <p className="text-sm font-medium text-gray-500">{context.title}</p>
            <p className="text-sm text-gray-400">{context.id}</p>
          </div>
          <div className="flex w-full items-center justify-center">
            {context.tags.map((tag: string) => {
              if (
                tagStatus === true ||
                (Array.isArray(context.showTags) &&
                  context.showTags.includes(tag))
              ) {
                return (
                  <div
                    className="mx-1 rounded-lg bg-gray-100 px-2 text-sm text-gray-500"
                    key={`tag-${context.id}-${tag}`}
                  >
                    {tag}
                  </div>
                )
              }
            })}
            {tagStatus !== true && (
              <p
                className="text-sm text-gray-400"
                onClick={event => {
                  event.preventDefault()
                  event.stopPropagation()
                  setTag(true)
                }}
              >{`show all tag >`}</p>
            )}
          </div>
          <div className="flex w-full items-center justify-center">
            <p className="text-sm text-gray-500">{context.solved}</p>
          </div>
          <div className="mx-3 flex h-auto w-28 flex-none items-center justify-center">
            <div className="flex h-auto w-full flex-col items-center justify-around">
              <div className="relative h-full w-full">
                <div className="absolute h-1.5 w-full rounded-full bg-gray-100" />
                <div
                  className={`absolute h-1.5 rounded-full ${
                    context.score === context.fullScore
                      ? 'bg-blue-500'
                      : 'bg-gray-500'
                  }`}
                  style={{
                    width: `${(context.score / context.fullScore) * 100}%`
                  }}
                />
              </div>
              <p className="mt-2 text-sm text-gray-500">
                {context.score} points
              </p>
            </div>
          </div>
        </a>
      </Link>
      <div className="w-14 p-4">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          onClick={() => setBookmark(!bookmark)}
          className={`${
            bookmark
              ? 'fill-gray-500 stroke-gray-500'
              : 'hidden stroke-gray-200 group-hover:block'
          }`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
          />
        </svg>
      </div>
    </div>
  )
}

const Index = ({ tasks }) => {
  const [tag, setTag] = useState<boolean>(false)

  return (
    <div className="flex w-auto justify-center">
      <div className="flex min-h-screen w-full max-w-7xl flex-col items-center">
        <div className="flex w-full flex-col items-center py-16">
          <p className="text-3xl text-gray-500">Tasks</p>
          <p className="text-md text-gray-500">browse over 700+ tasks</p>
          <input
            className="my-4 w-60 rounded-md border-gray-300 bg-gray-100 py-1 px-2 text-sm shadow-sm"
            placeholder="search..."
          ></input>
        </div>
        <div className="flex w-full">
          <LeftBar />
          <div className="h-full w-full">
            <div className="group flex w-full items-center justify-between px-2">
              <div className="flex w-full px-6 font-display">
                <div className="flex w-full flex-col">
                  <p className="text-sm font-medium text-gray-400">
                    Problem Title
                  </p>
                </div>
                <div className="flex w-full items-center justify-center">
                  <input
                    type="checkbox"
                    onChange={() => setTag(!tag)}
                    className="h-4 w-4 rounded border-gray-300"
                  />
                  <p className="ml-2 text-sm font-medium text-gray-400">
                    Show tag
                  </p>
                </div>
                <div className="flex w-full shrink items-center justify-center">
                  <p className="text-sm text-gray-400">Solved</p>
                </div>
                <div className="mx-3 flex h-auto w-28 flex-none items-center justify-center">
                  <p className="text-sm text-gray-400">Score</p>
                </div>
              </div>
              <div className="w-14 px-4" />
            </div>
            {tasks.map(context => (
              <TaskItem
                {...context}
                showTags={tag}
                key={`task-${context.id}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Index

export async function getStaticProps() {
  const tasks = await prisma.task.findMany()
  return {
    props: {
      tasks: tasks.map((item: any) => {
        let x = Math.floor(Math.random() * item.fullScore)
        if (x > 80) x = item.fullScore
        return {
          id: item.id,
          title: item.title,
          tags: [],
          solved: item.solved,
          score: x,
          fullScore: item.fullScore
        }
      })
    }
  }
}
