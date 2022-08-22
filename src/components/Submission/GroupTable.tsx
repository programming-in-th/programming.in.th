import { useState } from 'react'

import { Accordion } from './Accordian'

const GroupTable = ({ groups }) => {
  const [open, setOpen] = useState(false)
  return (
    <>
      <div className="flex w-full justify-between">
        <p className="font-semibold dark:text-white">Subtasks</p>
        <div className="flex justify-between space-x-2 md:space-x-4">
          <button
            className="flex"
            onClick={() => {
              setOpen(false)
            }}
          >
            <p className="dark:text-white">collapse all</p>
            <div className="flex h-full items-center justify-center text-[#64748B] dark:text-white">
              <svg
                className="mx-2"
                width="11"
                height="11"
                viewBox="0 0 9 9"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect width="9" height="9" fill="currentColor" />
              </svg>
            </div>
          </button>
          <button
            className="flex"
            onClick={() => {
              setOpen(true)
            }}
          >
            <p className="dark:text-white">expand all</p>
            <div className="flex h-full items-center justify-center text-[#64748B] dark:text-white">
              <svg
                className="mx-2"
                width="13"
                height="13"
                viewBox="0 0 10 10"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M1.5 2C1.5 1.72386 1.72386 1.5 2 1.5H8C8.27614 1.5 8.5 1.72386 8.5 2C8.5 2.27614 8.27614 2.5 8 2.5H2C1.72386 2.5 1.5 2.27614 1.5 2ZM1.5 4C1.5 3.72386 1.72386 3.5 2 3.5H8C8.27614 3.5 8.5 3.72386 8.5 4C8.5 4.27614 8.27614 4.5 8 4.5H2C1.72386 4.5 1.5 4.27614 1.5 4ZM1.5 6C1.5 5.72386 1.72386 5.5 2 5.5H8C8.27614 5.5 8.5 5.72386 8.5 6C8.5 6.27614 8.27614 6.5 8 6.5H2C1.72386 6.5 1.5 6.27614 1.5 6ZM1.5 8C1.5 7.72386 1.72386 7.5 2 7.5H8C8.27614 7.5 8.5 7.72386 8.5 8C8.5 8.27614 8.27614 8.5 8 8.5H2C1.72386 8.5 1.5 8.27614 1.5 8Z"
                  fill="currentColor"
                />
              </svg>
            </div>
          </button>
        </div>
      </div>
      {groups.map(group => (
        <Accordion key={group.group_index} group={group} open={open} />
      ))}
    </>
  )
}

export default GroupTable
