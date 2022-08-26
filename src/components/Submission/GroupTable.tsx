import { useState } from 'react'

import { CollapseAll, ExpandAll } from '@/svg/ExpandCollapse'

import { IGroup } from '@/types/submissions'

import { Accordion } from './Accordian'

const GroupTable = ({ groups }: { groups: IGroup[] }) => {
  const [open, setOpen] = useState(false)
  const [title, setTitle] = useState('expand all')
  const collapseAll = () => {
    setOpen(!open)
    setTitle(state => {
      return state === 'expand all' ? 'collapse all' : 'expand all'
    })
  }

  return (
    <>
      <div className="flex w-full justify-between">
        <p className="font-semibold dark:text-white">Subtasks</p>
        <div className="flex justify-between space-x-2 md:space-x-4">
          <button
            className="flex"
            onClick={() => {
              collapseAll()
            }}
          >
            <p className="dark:text-white">{title}</p>
            <div className="flex h-full items-center justify-center text-[#64748B] dark:text-white">
              <i>{open === false ? <ExpandAll /> : <CollapseAll />}</i>
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
