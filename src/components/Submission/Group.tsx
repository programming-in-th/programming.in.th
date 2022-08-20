import { useMemo } from 'react'
import GroupTable from './GroupTable'
import SeparateTable from './SeparateTable'

const SubmissionGroup = ({ groups }) => {
  console.log(groups)
  const isGroup = useMemo<boolean>(() => {
    return groups.reduce(
      (previous: boolean, current) =>
        previous || current.run_result.length !== 1,
      false
    )
  }, [groups])
  return (
    <div className="flex w-full flex-col bg-gray-50 p-5 dark:bg-slate-700 xl:p-20 ">
      {isGroup ? (
        <GroupTable groups={groups} />
      ) : (
        <SeparateTable groups={groups} />
      )}
    </div>
  )
}

export default SubmissionGroup
