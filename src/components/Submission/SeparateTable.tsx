import { IGroup } from '@/types/submissions'

import { Header, Card } from './Table'

const SeparateTable = ({ groups }: { groups: IGroup[] }) => (
  <div className="flex w-full flex-col justify-between px-0 text-gray-400 md:px-4">
    <p className="mb-2 ml-4 font-semibold dark:text-white">Subtasks</p>
    <div className="px-4">
      <Header />
    </div>
    {groups.map(({ run_result: [testcase] }) => (
      <div
        className="my-1 w-full rounded-lg bg-white px-4 py-2 shadow-sm dark:bg-slate-600"
        key={testcase.test_index}
      >
        <Card {...testcase} />
      </div>
    ))}
    <div className="my-1 w-full rounded-lg bg-white dark:bg-slate-600"></div>
  </div>
)

export default SeparateTable
