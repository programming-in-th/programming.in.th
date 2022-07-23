import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/outline'
import { FC } from 'react'

const SubmissionsTab: FC = () => {
  return (
    <table className="table-auto text-sm border-separate w-full border-spacing-y-3">
      <thead className="text-gray-500">
        <tr>
          <th className="py-2 text-center font-light">
            <button className="flex justify-center items-center w-full gap-1">
              <p>Submission time</p>

              <ChevronUpIcon className="text-gray-400 w-3 h-3" />
            </button>
          </th>
          <th className="py-2 text-center font-light">
            <button className="flex justify-center items-center w-full gap-1">
              <p>Name</p>

              <ChevronDownIcon className="text-gray-400 w-3 h-3" />
            </button>
          </th>
          <th className="py-2 text-center font-light">
            <button className="flex justify-center items-center w-full gap-1">
              <p>Point</p>

              <ChevronDownIcon className="text-gray-400 w-3 h-3" />
            </button>
          </th>
          <th className="py-2 text-center font-light">
            <button className="flex justify-center items-center w-full gap-1">
              <p>Language</p>

              <ChevronDownIcon className="text-gray-400 w-3 h-3" />
            </button>
          </th>
          <th className="py-2 text-center font-light">
            <button className="flex justify-center items-center w-full gap-1">
              <p>Time</p>

              <ChevronDownIcon className="text-gray-400 w-3 h-3" />
            </button>
          </th>
          <th className="py-2 text-center font-light">
            <button className="flex justify-center items-center w-full gap-1">
              <p>Memory</p>

              <ChevronDownIcon className="text-gray-400 w-3 h-3" />
            </button>
          </th>
        </tr>
      </thead>
      <tbody className="text-gray-500">
        {Array.from({ length: 10 }, (_, i) => i + 1).map(v => (
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
              <p className="text-center"> 50 points</p>
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

export default SubmissionsTab
