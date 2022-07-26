import { Task, Submission } from '@prisma/client'
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/outline'
import { FC, memo } from 'react'
import { ColumnDef, useReactTable } from '@tanstack/react-table'

const Columns = [
  {
    title: 'Submission time',
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

const SubmissionsTab: FC<{ task: Task }> = ({ task }) => {
  // const table = useReactTable({ columns: NewColumns })

  return (
    <table className="table-auto text-sm border-separate w-full border-spacing-y-3">
      <thead className="text-gray-500">
        <tr>
          {Columns.map(({ title, field }) => (
            <th key={field} className="py-2 text-center font-light">
              <button className="group flex justify-center items-center w-full gap-1">
                <p className="group-hover:text-gray-600 text-gray-500 transition-colors">
                  {title}
                </p>

                <ChevronUpIcon className="text-gray-400 group-hover:text-gray-500 transition-colors w-3 h-3" />
              </button>
            </th>
          ))}
        </tr>
      </thead>
      <tbody className="text-gray-500">
        {Array.from({ length: 10 }, (_, i) => i + 1).map((v, i) => (
          <tr
            key={v}
            className="shadow-md bg-white transition-colors hover:bg-slate-50"
          >
            <td className="py-4 px-6">
              <div className="flex flex-col">
                <p className="font-medium">6 SEP 2021</p>
                <p className="text-gray-400">23.59</p>
              </div>
            </td>
            <td className="py-4">
              <p className="font-medium text-center">iammarkps</p>
            </td>
            <td className="py-4">
              <div className="flex mx-auto h-auto w-28 items-center justify-center">
                <div className="flex h-auto w-full flex-col items-center justify-around">
                  <div className="relative h-full w-full">
                    <div className="absolute h-1.5 w-full rounded-full bg-gray-100" />
                    <div
                      className={`absolute h-1.5 rounded-full ${
                        (i + 1) * 10 === task.fullScore
                          ? 'bg-blue-500'
                          : 'bg-gray-500'
                      }`}
                      style={{
                        width: `${(((i + 1) * 10) / 100) * 100}%`
                      }}
                    />
                  </div>
                  <p className="mt-2 text-xs text-gray-500">
                    {(i + 1) * 10} points
                  </p>
                </div>
              </div>
            </td>
            <td className="py-4">
              <p className="font-medium text-center">C++</p>
            </td>
            <td className="py-4">
              <p className="font-medium text-center">
                5 <span className="font-light text-gray-400">ms</span>
              </p>
            </td>
            <td className="py-4 px-6">
              <p className="font-medium text-center">
                64 <span className="font-light text-gray-400">kb</span>
              </p>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default memo(SubmissionsTab)
