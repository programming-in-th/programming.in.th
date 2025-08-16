'use client'

import Link from 'next/link'
import { useSearchParams } from 'next/navigation'

import { learnLevels, LearnLevelType, LearnContentType } from './constants'

const ContentItem = ({
  index,
  id,
  content
}: {
  index: number
  id: string
  content: LearnContentType
}) => {
  return (
    <>
      <div className="group w-full items-center justify-between py-1">
        <Link
          href={{
            pathname: '/learn/content',
            query: { id: `${id}_${content.value}` }
          }}
          className="flex w-full rounded-xl px-6 py-3 font-display shadow-md transition group-hover:shadow-lg dark:bg-slate-700"
        >
          <span className="flex w-full flex-col">
            <p className="py-1 text-sm font-medium text-gray-500 dark:text-gray-100">
              {index}. {content.label}
            </p>
          </span>
        </Link>
      </div>
    </>
  )
}

const ContentList = ({ level }: { level: LearnLevelType }) => {
  return (
    <div className="m-6 flex gap-6">
      <div className="relative flex-1">
        <h2 className="my-5 text-3xl text-gray-500">{level.label}</h2>
        <div className="space-y-6">
          {level.sections.map(section => {
            return (
              <div key={section.value} className="relative pl-6">
                {/* Section header */}
                <h3 className="text-2xl text-gray-500">{section.label}</h3>

                {/* Section items */}
                {true && (
                  <ul className="mt-2 space-y-1">
                    {section.content.map((content, idx) => (
                      <li
                        key={content.value}
                        className="flex items-center gap-2 text-sm"
                      >
                        <ContentItem
                          index={idx + 1}
                          id={`${level.value}_${section.value}`}
                          content={content}
                        />
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
      <div className="w-full px-6 font-display">
        {learnLevels.map(learnLevel => {
          return !level || level == learnLevel.value ? (
            <ContentList key={learnLevel.value} level={learnLevel} />
          ) : (
            <></>
          )
        })}
      </div>
    </div>
  )
}
