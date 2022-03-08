import React, { useEffect, useState } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import { PageLayout } from 'components/Layout'

const Filter = () => {
  return <></>
}

const LeftBar = () => {
  return <></>
}

type Task = {
  id: string
  title: string
  tags: string[]
  solved: number
  score: number
  fullScore: number
}

const TaskItem = (context: Task) => {
  const [bookmark, setBookmark] = useState<boolean>(false)
  return (
    <div className="group flex w-full items-center justify-between p-2">
      <div className="flex w-full rounded-xl py-3 px-6 font-display shadow-sm transition group-hover:shadow-md">
        <div className="flex w-full flex-col">
          <p className="text-sm">{context.title}</p>
          <p className="text-sm text-gray-400">{context.id}</p>
        </div>
        <div className="flex w-24 items-center justify-center">
          <p className="text-sm">{context.solved}</p>
        </div>
        <div className="flex h-auto w-36 items-center justify-center">
          <div className="flex h-auto w-full flex-col items-center justify-around">
            <div className="relative h-full w-full">
              <div className="absolute h-1 w-full rounded-full bg-gray-100" />
              <div className="absolute h-1 w-1/2 rounded-full bg-gray-500" />
            </div>
            <p className="mt-2 text-sm text-gray-400">{context.score} points</p>
          </div>
        </div>
      </div>
      <div className="w-14 p-4">
        {bookmark ? (
          <svg
            onClick={() => setBookmark(false)}
            width="18"
            height="17"
            viewBox="0 0 18 17"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M8.04894 0.927049C8.3483 0.00573802 9.6517 0.00574017 9.95106 0.927051L11.2451 4.90983C11.379 5.32185 11.763 5.60081 12.1962 5.60081H16.3839C17.3527 5.60081 17.7554 6.84043 16.9717 7.40983L13.5838 9.87132C13.2333 10.126 13.0866 10.5773 13.2205 10.9894L14.5146 14.9721C14.8139 15.8934 13.7595 16.6596 12.9757 16.0902L9.58778 13.6287C9.2373 13.374 8.7627 13.374 8.41221 13.6287L5.02426 16.0902C4.24054 16.6596 3.18607 15.8934 3.48542 14.9721L4.7795 10.9894C4.91338 10.5773 4.76672 10.126 4.41623 9.87132L1.02827 7.40983C0.244561 6.84043 0.647338 5.60081 1.61606 5.60081H5.8038C6.23703 5.60081 6.62099 5.32185 6.75486 4.90983L8.04894 0.927049Z"
              fill="#64748B"
            />
          </svg>
        ) : (
          <svg
            className="hidden group-hover:block"
            onClick={() => setBookmark(true)}
            width="18"
            height="17"
            viewBox="0 0 18 17"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M8.52447 1.08156C8.67415 0.620905 9.32585 0.620901 9.47553 1.08156L10.7696 5.06434C10.9704 5.68237 11.5464 6.10081 12.1962 6.10081H16.3839C16.8683 6.10081 17.0697 6.72062 16.6778 7.00532L13.2899 9.46681C12.7641 9.84878 12.5442 10.5258 12.745 11.1439L14.0391 15.1266C14.1887 15.5873 13.6615 15.9704 13.2696 15.6857L9.88168 13.2242C9.35595 12.8422 8.64405 12.8422 8.11832 13.2242L4.73037 15.6857C4.33851 15.9704 3.81127 15.5873 3.96095 15.1266L5.25503 11.1439C5.45584 10.5258 5.23585 9.84878 4.71012 9.46681L1.32217 7.00532C0.930313 6.72062 1.1317 6.10081 1.61606 6.10081H5.8038C6.45364 6.10081 7.02958 5.68237 7.23039 5.06434L8.52447 1.08156Z"
              stroke="#CBD5E1"
            />
          </svg>
        )}
      </div>
    </div>
  )
}

const Index = () => {
  const [task, setTask] = useState<Task[]>([])

  const fetchMoreData = () => {
    fetch(
      `/api/task?cursor=${
        task.length === 0 ? '' : task[task.length - 1].id
      }&limit=10`
    )
      .then(res => res.json())
      .then(res =>
        res.map((item: any) => {
          return {
            id: item.id,
            title: item.title,
            tags: item.tags,
            solved: [],
            score: 50,
            fullScore: item.fullScore
          }
        })
      )
      .then(res => {
        setTask([...task, ...res])
      })
  }

  useEffect(() => {
    fetchMoreData()
  }, [])

  return (
    <>
      <div className="flex h-screen flex-col items-center">
        <div className="flex w-full flex-col items-center bg-blue-500 py-10 text-white">
          <p className="text-3xl">Tasks</p>
          <p className="text-md">browse over 700+ tasks</p>
          <input className=""></input>
        </div>
        <div className="w-full max-w-6xl">
          <LeftBar />
          <InfiniteScroll
            className="flex w-full flex-col"
            dataLength={task.length}
            next={fetchMoreData}
            hasMore={true}
            loader={<div className="text-center">Loading...</div>}
          >
            {task.map(context => (
              <TaskItem {...context} />
            ))}
          </InfiniteScroll>
        </div>
      </div>
    </>
  )
}

export default Index
