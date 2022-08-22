import { useMemo } from 'react'

import GroupTable from './GroupTable'
import SeparateTable from './SeparateTable'

const SubmissionGroup = ({ groups }) => {
  console.log(groups)
  const isGroup = useMemo<boolean>(() => {
    return groups.every(current => current.run_result.length !== 1)
  }, [groups])
  return (
    <div className="flex w-full flex-col rounded-md bg-gray-50 p-5 dark:bg-slate-700 xl:px-10 xl:py-10">
      {isGroup ? (
        <GroupTable groups={groups} />
      ) : (
        <SeparateTable groups={groups} />
      )}
    </div>
  )
}

export default SubmissionGroup
