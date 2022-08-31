import clsx from 'clsx'
import { UseFormRegister } from 'react-hook-form'

import { IUser } from '@/types/users'

import { IAssessment, IAssessmentForm } from './EditAssessment'

export const LeftBar = ({
  register,
  assessment,
  users
}: {
  register: UseFormRegister<IAssessmentForm>
  assessment?: IAssessment
  users: IUser[]
}) => {
  return (
    <div className="flex h-full w-full flex-col space-y-3 overflow-y-auto border-r-[1px] border-gray-300 px-6 py-4 dark:border-slate-700">
      <div className="flex flex-col">
        <p>Assessment Name</p>
        <input
          type="text"
          className="rounded-md border px-4 py-1 dark:border-gray-900 dark:bg-gray-900 dark:focus:outline"
          {...register('name')}
        />
      </div>
      <div className="flex flex-col">
        <p>ID</p>
        <input
          type="text"
          className={clsx(
            'rounded-md border px-4 py-1 dark:border-gray-900 dark:bg-gray-900 dark:focus:outline',
            assessment && 'cursor-not-allowed text-gray-500'
          )}
          {...register('id')}
          disabled={assessment !== undefined}
        />
      </div>
      <div className="flex flex-col">
        <p>Description</p>
        <textarea
          className="h-28 rounded-md border px-4 py-1 dark:border-gray-900 dark:bg-gray-900 dark:focus:outline"
          {...register('description')}
        />
      </div>
      <div className="flex flex-col">
        <p>Instruction</p>
        <textarea
          className="h-28 rounded-md border px-4 py-1 dark:border-gray-900 dark:bg-gray-900 dark:focus:outline"
          {...register('instruction')}
        />
      </div>
      <div className="flex flex-col">
        <p>Open At</p>
        <input
          type="datetime-local"
          className="rounded-md border px-4 py-1 dark:border-gray-900 dark:bg-gray-900 dark:focus:outline"
          {...register('open')}
        ></input>
      </div>
      <div className="flex flex-col">
        <p>Closed At</p>
        <input
          type="datetime-local"
          className="rounded-md border px-4 py-1 dark:border-gray-900 dark:bg-gray-900 dark:focus:outline"
          {...register('close')}
        ></input>
      </div>
      <div className="flex flex-col">
        <p>Assign to</p>
        <div className="flex h-52 flex-col rounded-md border border-gray-200 p-0.5 dark:border-slate-700 ">
          <input
            type="text"
            className="rounded-md bg-gray-100 px-4 py-1 dark:border-gray-900 dark:bg-gray-900 dark:focus:outline"
            placeholder="Search..."
          />
          <div className="flex h-full w-full flex-col overflow-y-auto py-1">
            {users.map(user => (
              <div
                key={`assign-${user.id}`}
                className="flex items-center space-x-2 px-2"
              >
                <input
                  type="checkbox"
                  {...register(`assign-${user.id}`)}
                  className="h-4 w-4 rounded border-gray-300"
                />
                <p>{user.username}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="flex flex-col">
        <p>Assign owner to</p>
        <div className="flex h-52 flex-col rounded-md border border-gray-200 p-0.5 dark:border-slate-700 ">
          <input
            type="text"
            className="rounded-md bg-gray-100 px-4 py-1 dark:border-gray-900 dark:bg-gray-900 dark:focus:outline"
            placeholder="Search..."
          />
          <div className="flex h-full w-full flex-col overflow-y-auto py-1">
            {users.map(user => (
              <div
                key={`assignOwn-${user.id}`}
                className="flex items-center space-x-2 px-2"
              >
                <input
                  type="checkbox"
                  {...register(`assignOwn-${user.id}`)}
                  className="h-4 w-4 rounded border-gray-300"
                />
                <p>{user.username}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
