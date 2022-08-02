import { Task, Submission } from '@prisma/client'
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/outline'
import { FC, memo } from 'react'
import { ColumnDef, useReactTable } from '@tanstack/react-table'
import fetcher from '@/lib/fetcher'
import { IGeneralSubmission } from '@/types/submissions'
import useSWR from 'swr'
import dayjs from 'dayjs'
import { useRouter } from 'next/router'

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

const NewColumns: ColumnDef<Submission>[] = [
  {
    id: 'submittedAt',
    cell: props => <span>SubmittedAt</span>
  }
]

const MySubmissionsTab: FC<{ task: Task }> = ({ task }) => {
  // const table = useReactTable({ columns: NewColumns })
  const { data, error } = useSWR<IGeneralSubmission[]>(
    `/api/submissions?filter=own_task&taskId=${task.id}`,
    fetcher
  )

  return (
    <table className="w-full text-sm border-separate table-auto border-spacing-y-3">
      <thead className="text-gray-500">
        <tr>
          {Columns.map(({ title, field }) => (
            <th key={field} className="py-2 font-light text-center">
              <button className="flex items-center justify-center w-full gap-1 group">
                <p className="text-gray-500 transition-colors group-hover:text-gray-600">
                  {title}
                </p>

                <ChevronUpIcon className="w-3 h-3 text-gray-400 transition-colors group-hover:text-gray-500" />
              </button>
            </th>
          ))}
        </tr>
      </thead>
      <tbody className="text-gray-500">
        {!error &&
          data &&
          data.map(sub => {
            const dt = new Date(sub.submittedAt)
            return (
              <tr
                key={sub.id}
                className="transition-colors bg-white shadow-md hover:bg-slate-50"
              >
                <td className="px-6 py-4">
                  <div className="flex flex-col">
                    <p className="font-medium">
                      {dayjs(dt).format('DD MMM YYYY')}
                    </p>
                    <p className="text-gray-400">
                      {dayjs(dt).format('HH:mm:ss')}
                    </p>
                  </div>
                </td>
                <td className="py-4">
                  <p className="font-medium text-center">{sub.user.username}</p>
                </td>
                <td className="py-4">
                  <div className="flex items-center justify-center h-auto mx-auto w-28">
                    <div className="flex flex-col items-center justify-around w-full h-auto">
                      <div className="relative w-full h-full">
                        <div className="absolute h-1.5 w-full rounded-full bg-gray-100" />
                        <div
                          className={`absolute h-1.5 rounded-full ${
                            sub.score === task.fullScore
                              ? 'bg-blue-500'
                              : 'bg-gray-500'
                          }`}
                          style={{
                            width: `${(sub.score / 100) * 100}%`
                          }}
                        />
                      </div>
                      <p className="mt-2 text-xs text-gray-500">
                        {sub.score} points
                      </p>
                    </div>
                  </div>
                </td>
                <td className="py-4">
                  <p className="font-medium text-center">{sub.language}</p>
                </td>
                <td className="py-4">
                  <p className="font-medium text-center">
                    {sub.time}{' '}
                    <span className="font-light text-gray-400">ms</span>
                  </p>
                </td>
                <td className="px-6 py-4">
                  <p className="font-medium text-center">
                    {sub.memory}{' '}
                    <span className="font-light text-gray-400">kb</span>
                  </p>
                </td>
              </tr>
            )
          })}
      </tbody>
    </table>
  )
}

export default memo(MySubmissionsTab)
