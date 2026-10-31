import { useMemo } from 'react'

import { IGroup } from '@/types/submissions'

import GroupTable from './GroupTable'
import SeparateTable from './SeparateTable'

const SubmissionGroup = ({ groups }: { groups: IGroup[] }) => {
  const isSeperate = useMemo<boolean>(() => {
    return groups.every(current => current.run_result.length === 1)
  }, [groups])
  return (
    <div className="flex w-full flex-col rounded-md bg-gray-100 p-5 xl:px-10 xl:py-10 dark:bg-slate-700">
      {isSeperate ? (
        <SeparateTable groups={groups} />
      ) : (
        <GroupTable groups={groups} />
      )}
    </div>
  )
}

export default SubmissionGroup
