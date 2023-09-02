import clsx from 'clsx'

import { useSubmit } from './EditTaskContext'

const FormBox = () => {
  const { register, task } = useSubmit()
  if (!register) return null
  return (
    <div className="flex w-72 flex-none flex-col space-y-4 text-sm dark:text-gray-200">
      <div className="flex flex-col">
        <p>Task Name</p>
        <input
          type="text"
          className="h-10 rounded-md border px-4 py-1 dark:border-gray-900 dark:bg-gray-900 dark:focus:outline"
          {...register('title')}
        />
      </div>
      <div className="flex flex-col">
        <p>ID</p>
        <input
          type="text"
          className={clsx(
            'h-10 rounded-md border px-4 py-1 backdrop-blur-sm dark:border-gray-900 dark:bg-gray-900 dark:focus:outline',
            task && 'cursor-not-allowed text-gray-500'
          )}
          {...register('id', { required: true })}
          disabled={task !== undefined}
        />
      </div>
      <div className="flex flex-col">
        <p>Category Path</p>
        <input
          type="text"
          className="h-10 rounded-md border px-4 py-1 dark:border-gray-900 dark:bg-gray-900 dark:focus:outline"
          {...register('categoryId')}
        />
      </div>
      <div className="flex w-full space-x-4">
        <div className="flex w-full min-w-0 flex-col">
          <p>Full Score</p>
          <input
            type="number"
            className="h-10 w-full rounded-md border px-4 py-1 dark:border-gray-900 dark:bg-gray-900 dark:focus:outline"
            {...register('fullScore', { valueAsNumber: true })}
          />
        </div>
        <div className="flex w-full min-w-0 flex-col">
          <p>Privacy</p>
          <select
            {...register('private')}
            className="h-10 w-full rounded-md border px-4 py-1 dark:border-gray-900 dark:bg-gray-900 dark:focus:outline"
          >
            <option value="true">private</option>
            <option value="false">public</option>
          </select>
        </div>
      </div>
      <div className="flex w-full min-w-0 flex-col">
        <p>Type</p>
        <select
          {...register('type')}
          className="h-10 w-full rounded-md border px-4 py-1 dark:border-gray-900 dark:bg-gray-900 dark:focus:outline"
        >
          <option value="NORMAL">Normal</option>
          <option value="COMMUNICATION">Communication</option>
          <option value="OUTPUT_ONLY">Output Only</option>
        </select>
      </div>
    </div>
  )
}

export default FormBox
