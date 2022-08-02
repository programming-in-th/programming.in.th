import { ArrowNarrowLeftIcon, ChevronUpIcon } from '@heroicons/react/outline'
import { Task } from '@prisma/client'
import Link from 'next/link'
import { FC } from 'react'
import useSWR from 'swr'
import dayjs from 'dayjs'
import { IGeneralSubmission } from '@/types/submissions'
import { TaskStatus } from '../Elements/TaskStatus'
import useSubmissionData from '@/lib/useSubmissionData'

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

const ViewSubmissionTab: FC<{ task: Task; submissionID: string }> = ({
  task,
  submissionID
}) => {
  // const { data, error } = useSWR<IGeneralSubmission>(
  //   `/api/submissions?filter=own_task&taskId=${task.id}`,
  //   fetcher
  // )

  const { submission } = useSubmissionData(12)

  const { data, error } = {
    data: {
      id: 103,
      user: {
        id: 'bruh',
        username: 'iammarkps',
        name: null,
        email: null,
        emailVerified: null,
        image: null,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      score: 34,
      language: 'cpp',
      time: 304,
      memory: 105,
      submittedAt: new Date()
    } as any,
    error: null
  }

  const dt = new Date(data.submittedAt)

  return (
    <div>
      {
        // TODO : go back 1 level
      }
      <Link href="/" passHref>
        <a className="flex items-center gap-2 text-sm text-prog-gray-500 hover:text-gray-600">
          <ArrowNarrowLeftIcon className="w-5 h-5" />
          <p>Back</p>
        </a>
      </Link>
      {
        // ! disgusting code alert - will move to component
      }
      <table className="w-full mt-6 text-sm bg-white border-separate rounded-md shadow-md table-auto border-spacing-y-3">
        <thead className="">
          <tr>
            {Columns.map(({ title, field }) => (
              <th key={field} className="py-2 font-light text-center">
                <p className="w-full text-gray-400">{title}</p>
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="text-gray-500">
          {!error && data && (
            <tr className="">
              <td className="px-6 py-2">
                <div className="flex flex-col">
                  <p className="font-medium">
                    {dayjs(dt).format('DD MMM YYYY')}
                  </p>
                  <p className="text-gray-400">
                    {dayjs(dt).format('HH:mm:ss')}
                  </p>
                </div>
              </td>
              <td className="py-2">
                <p className="font-medium text-center">{data.user.username}</p>
              </td>
              <td className="py-2">
                <div className="flex items-center justify-center h-auto mx-auto w-28">
                  <div className="flex flex-col items-center justify-around w-full h-auto">
                    <div className="relative w-full h-full">
                      <div className="absolute h-1.5 w-full rounded-full bg-gray-100" />
                      <div
                        className={`absolute h-1.5 rounded-full ${
                          data.score === task.fullScore
                            ? 'bg-blue-500'
                            : 'bg-gray-500'
                        }`}
                        style={{
                          width: `${(data.score / 100) * 100}%`
                        }}
                      />
                    </div>
                    <p className="mt-2 text-xs text-gray-500">
                      {data.score} points
                    </p>
                  </div>
                </div>
              </td>
              <td className="py-2">
                <p className="font-medium text-center">{data.language}</p>
              </td>
              <td className="py-2">
                <p className="font-medium text-center">
                  {data.time}{' '}
                  <span className="font-light text-gray-400">ms</span>
                </p>
              </td>
              <td className="px-6 py-2">
                <p className="font-medium text-center">
                  {data.memory}{' '}
                  <span className="font-light text-gray-400">kb</span>
                </p>
              </td>
            </tr>
          )}
        </tbody>
      </table>

      <pre className="p-4 mt-8 overflow-auto text-sm text-white bg-slate-800 rounded-mg">
        {`#include <bits/stdc++.h>

using namespace std;

int a, b, c;

int main () {
    scanf("%d %d %d", &a, &b, &c);
    int sum = a + b + c;
    if (sum <= 100 && sum >= 80) {
        printf("A");
    } else if (sum < 80 && sum >= 75) {
        printf("B+");
    } else if (sum < 75 && sum >= 70) {
    printf("B");
    } else if (sum < 70 && sum >= 65) {
        printf("C+");
    } else if (sum < 65 && sum >= 60) {
        printf("C");
    } else if (sum < 60 && sum >= 55) {
        printf("D+");
    } else if (sum < 55 && sum >= 50) {
        printf("D");
    } else if (sum < 50 && sum >= 0) {
        printf("F");
    }
}`}
      </pre>

      <TaskStatus />
    </div>
  )
}

export default ViewSubmissionTab
