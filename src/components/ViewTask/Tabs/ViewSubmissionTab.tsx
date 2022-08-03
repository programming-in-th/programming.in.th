import { useEffect, useState } from 'react'

import Link from 'next/link'

import { ArrowNarrowLeftIcon } from '@heroicons/react/outline'
import { Task } from '@prisma/client'
import dayjs from 'dayjs'
import { motion, Variants } from 'framer-motion'

import { Loading } from '@/components/Loading'
import useSubmissionData from '@/lib/useSubmissionData'

// import { TaskStatus } from '../Elements/TaskStatus'

const ArrowVariants: Variants = {
  active: {
    rotate: '0deg',
    transition: { duration: 0.25, type: 'tween' }
  },
  hidden: {
    rotate: '-180deg',
    transition: { duration: 0.25, type: 'tween' }
  }
}

const DivVariants: Variants = {
  active: {
    overflow: 'auto',
    transition: { duration: 0.25, type: 'tween' }
  },
  hidden: {
    height: 0,
    paddingTop: 0,
    paddingBottom: 0,
    overflow: 'hidden',
    transition: { duration: 0.25, type: 'tween' }
  }
}

const Columns = [
  {
    title: 'Submission Time',
    field: 'submittedAt'
  },
  {
    title: 'Name',
    field: 'userId'
  },
  {
    title: 'Score',
    field: 'score'
  },
  {
    title: 'Language',
    field: 'language'
  },
  {
    title: 'Time',
    field: 'time'
  },
  {
    title: 'Memory',
    field: 'memory'
  }
]

const Accordion = ({ group, open }) => {
  const [expanded, setExpand] = useState(false)
  useEffect(() => {
    setExpand(open)
  }, [open])
  return (
    <div className="my-1 w-full rounded-lg bg-white">
      <button
        className="flex w-full items-center justify-between rounded-lg border-b border-gray-300 bg-white py-4 px-8"
        onClick={() => setExpand(e => !e)}
      >
        <div className="flex items-center">
          <p className="mr-1">{`Subtask ${group.group_index}`}</p>
          <p className="text-sm">{`(${group.score}/${group.full_score})`}</p>
        </div>
        <motion.span
          animate={expanded ? 'active' : 'hidden'}
          variants={ArrowVariants}
        >
          <svg
            width="14"
            height="8"
            viewBox="0 0 14 8"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M1 1L7 7L13 1" stroke="#94A3B8" />
          </svg>
        </motion.span>
      </button>
      <motion.div
        role="region"
        animate={expanded ? 'active' : 'hidden'}
        variants={DivVariants}
        className="w-full rounded-b-lg bg-white py-4"
        // className="px-8 py-4"
      >
        <table className="-mt-2 table-auto border-separate border-spacing-x-4 border-spacing-y-3 font-light text-gray-400">
          <thead>
            <tr>
              <th className="text-sm font-light">#</th>
              <th className="text-sm font-light">Time</th>
              <th className="text-sm font-light">Memory</th>
              <th className="text-sm font-light">Message</th>
            </tr>
          </thead>
          <tbody>
            {group.run_result.map(result => (
              <tr key={result.test_index}>
                <td
                  className="text-sm font-light"
                  key={`idx-${result.text_index}`}
                >
                  {result.test_index}
                </td>
                <td
                  className="text-sm font-light"
                  key={`time-${result.text_index}`}
                >
                  {`${result.time_usage * 1000} ms`}
                </td>
                <td
                  className="text-sm font-light"
                  key={`mem-${result.text_index}`}
                >
                  {`${result.memory_usage} kB`}
                </td>

                <td
                  className="text-sm font-light"
                  key={`status-${result.text_index}`}
                >
                  {result.status}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </motion.div>
    </div>
  )
}

const SubmissionStatus = ({ groups }) => {
  const [open, setOpen] = useState(false)
  return (
    <div className="flex w-full flex-col bg-gray-50 p-5 xl:p-20">
      <div className="flex w-full justify-between">
        <p className="font-semibold">subtasks</p>
        <div className="flex  justify-between">
          <button className="mr-8 flex" onClick={() => setOpen(false)}>
            <p>collapse all</p>
            <div className="flex h-full items-center justify-center">
              <svg
                className="mx-2"
                width="11"
                height="11"
                viewBox="0 0 9 9"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect width="9" height="9" fill="#64748B" />
              </svg>
            </div>
          </button>
          <button className="flex" onClick={() => setOpen(true)}>
            <p className="">expand all</p>
            <div className="flex h-full items-center justify-center">
              <svg
                className="mx-2"
                width="13"
                height="13"
                viewBox="0 0 10 10"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M1.5 2C1.5 1.72386 1.72386 1.5 2 1.5H8C8.27614 1.5 8.5 1.72386 8.5 2C8.5 2.27614 8.27614 2.5 8 2.5H2C1.72386 2.5 1.5 2.27614 1.5 2ZM1.5 4C1.5 3.72386 1.72386 3.5 2 3.5H8C8.27614 3.5 8.5 3.72386 8.5 4C8.5 4.27614 8.27614 4.5 8 4.5H2C1.72386 4.5 1.5 4.27614 1.5 4ZM1.5 6C1.5 5.72386 1.72386 5.5 2 5.5H8C8.27614 5.5 8.5 5.72386 8.5 6C8.5 6.27614 8.27614 6.5 8 6.5H2C1.72386 6.5 1.5 6.27614 1.5 6ZM1.5 8C1.5 7.72386 1.72386 7.5 2 7.5H8C8.27614 7.5 8.5 7.72386 8.5 8C8.5 8.27614 8.27614 8.5 8 8.5H2C1.72386 8.5 1.5 8.27614 1.5 8Z"
                  fill="#64748B"
                />
              </svg>
            </div>
          </button>
        </div>
      </div>
      {groups.map(group => (
        <Accordion key={group.group_index} group={group} open={open} />
      ))}
    </div>
  )
}

const ViewSubmissionTab = ({
  task,
  submissionID
}: {
  task: Task
  submissionID: number
}) => {
  const { submission, isLoading } = useSubmissionData(submissionID)

  if (isLoading || task === undefined) {
    return <Loading />
  }

  return (
    <div>
      {
        // TODO : go back 1 level
      }
      <Link href="/" passHref>
        <a className="flex items-center gap-2 text-sm text-prog-gray-500 hover:text-gray-600">
          <ArrowNarrowLeftIcon className="h-5 w-5" />
          <p>Back</p>
        </a>
      </Link>
      {
        // ! disgusting code alert - will move to component
      }
      <table className="mt-6 w-full table-auto border-separate border-spacing-y-3 rounded-md bg-white text-sm shadow-md">
        <thead className="">
          <tr>
            {Columns.map(({ title, field }) => (
              <th key={field} className="py-2 text-center font-light">
                <p className="w-full text-gray-400">{title}</p>
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="text-gray-500">
          {submission && (
            <tr className="">
              <td className="px-6 py-2">
                <div className="flex flex-col">
                  <p className="font-medium">
                    {dayjs(new Date(submission.submittedAt)).format(
                      'DD MMM YYYY'
                    )}
                  </p>
                  <p className="text-gray-400">
                    {dayjs(new Date(submission.submittedAt)).format('HH:mm:ss')}
                  </p>
                </div>
              </td>
              <td className="py-2">
                <p className="text-center font-medium">
                  {submission.user.username}
                </p>
              </td>
              <td className="py-2">
                <div className="mx-auto flex h-auto w-28 items-center justify-center">
                  <div className="flex h-auto w-full flex-col items-center justify-around">
                    <div className="relative h-full w-full">
                      <div className="absolute h-1.5 w-full rounded-full bg-gray-100" />
                      <div
                        className={`absolute h-1.5 rounded-full ${
                          submission.score === task.fullScore
                            ? 'bg-blue-500'
                            : 'bg-gray-500'
                        }`}
                        style={{
                          width: `${(submission.score / 100) * 100}%`
                        }}
                      />
                    </div>
                    <p className="mt-2 text-xs text-gray-500">
                      {submission.score} points
                    </p>
                  </div>
                </div>
              </td>
              <td className="py-2">
                <p className="text-center font-medium">{submission.language}</p>
              </td>
              <td className="py-2">
                <p className="text-center font-medium">
                  {submission.time}{' '}
                  <span className="font-light text-gray-400">ms</span>
                </p>
              </td>
              <td className="px-6 py-2">
                <p className="text-center font-medium">
                  {submission.memory}{' '}
                  <span className="font-light text-gray-400">kB</span>
                </p>
              </td>
            </tr>
          )}
        </tbody>
      </table>

      <p>{submission.status}</p>
      <pre className="rounded-mg mt-8 overflow-auto bg-slate-800 p-4 text-sm text-white">
        {submission.code[0]}
      </pre>
      <SubmissionStatus groups={submission.groups} />
    </div>
  )
}

export default ViewSubmissionTab
