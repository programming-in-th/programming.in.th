import { Tab } from '@headlessui/react'
import classNames from 'classnames'
import { Fragment } from 'react'

const Tabs = [
  {
    label: 'All',
    value: 'all'
  },
  {
    label: 'Tried',
    value: 'tried'
  },
  {
    label: 'Solved',
    value: 'solved'
  },
  {
    label: 'Archives',
    value: 'archives'
  },
  {
    label: 'Bookmarked',
    value: 'bookmarked'
  }
]

export const LeftBar = () => {
  return (
    <div className="mx-4 flex w-52 shrink flex-col font-display">
      <div className="flex shrink flex-col font-display">
        <Tab.List>
          {Tabs.map(tabItem => {
            return (
              <Tab key={tabItem.value} as={Fragment}>
                {({ selected }) => (
                  <button
                    className={classNames(
                      'flex h-9 w-full items-center justify-center rounded-md transition-colors',
                      selected ? 'bg-gray-100' : 'hover:bg-gray-50'
                    )}
                  >
                    <p className="text-sm text-gray-500">{tabItem.label}</p>
                  </button>
                )}
              </Tab>
            )
          })}
        </Tab.List>
      </div>
    </div>
  )
}
