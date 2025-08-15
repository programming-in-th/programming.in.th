'use client'

import { useSearchParams } from 'next/navigation'

import { learnLevels, LearnLevelType } from './constants'

// const ContentList = ({ level }: { level: LearnLevelType }) => {
//   return (
//     <>
//       <div> {level.label} </div>
//     </>
//   )
// }

const ContentList = ({ level }: { level: LearnLevelType }) => {
  return (
    <div className="m-6 flex gap-6">
      {/* Left column */}
      <div className="w-64">
        <h2 className="text-lg font-semibold">{level.label}</h2>
      </div>

      {/* Right column */}
      <div className="relative flex-1">
        <div className="absolute bottom-0 left-[7px] top-0 w-px bg-gray-300"></div>
        <div className="space-y-6">
          {level.sections.map(section => {
            return (
              <div key={section.value} className="relative pl-6">
                {/* Timeline dot */}
                <div className="absolute left-[-2px] top-1 h-3 w-3 rounded-full border border-gray-400 bg-white"></div>

                {/* Section header */}
                <h3 className="font-medium">{section.label}</h3>

                {/* Section items */}
                {true && (
                  <ul className="mt-2 space-y-1">
                    {section.content.map((item, idx) => (
                      <li
                        key={item.value}
                        className="flex items-center gap-2 text-sm"
                      >
                        <span>
                          {idx + 1} {item.label}
                        </span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export const LearnContent = () => {
  const searchParams = useSearchParams()
  const level = searchParams.get('level')

  return (
    <div className="h-full w-full">
      <div className="group flex w-full items-center justify-between px-2">
        <div className="hidden w-full px-6 font-display md:flex">
          <div className="flex w-full flex-col">
            <p className="text-sm font-medium text-gray-400">
              {learnLevels.map(learnLevel => {
                return !level || level == learnLevel.value ? (
                  <ContentList key={learnLevel.value} level={learnLevel} />
                ) : (
                  <></>
                )
              })}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
