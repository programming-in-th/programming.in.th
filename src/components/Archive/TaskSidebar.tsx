import { Dispatch, SetStateAction } from 'react'

import clsx from 'clsx'

const TaskSidebar = ({
  tags,
  tagFilter,
  setTagFilter
}: {
  tags: string[]
  tagFilter: string[]
  setTagFilter: Dispatch<SetStateAction<string[]>>
}) => {
  return (
    <div>
      <div className="mx-4 hidden w-52 shrink flex-col gap-4 divide-y font-display md:flex">
        <div className="space-y-2 text-sm text-gray-500 dark:text-gray-200">
          <div className="mt-4 flex items-baseline">
            <p className="grow text-base font-bold">Tag Filter</p>
            <p
              className="cursor-pointer hover:text-gray-400 dark:text-gray-300 dark:hover:text-white"
              onClick={() => {
                setTagFilter([])
              }}
            >
              clear
            </p>
          </div>
          <div className="space-y-1">
            {tags.map(tag => (
              <div
                key={tag}
                className={clsx(
                  tagFilter.includes(tag)
                    ? 'font-bold text-gray-600 dark:text-gray-300'
                    : 'text-gray-500 dark:text-gray-400',
                  'cursor-pointer transition-all'
                )}
                onClick={() => {
                  if (tagFilter.includes(tag)) {
                    setTagFilter(tagFilter.filter(t => t !== tag))
                  } else {
                    setTagFilter([...tagFilter, tag])
                  }
                }}
              >
                {tag}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default TaskSidebar
