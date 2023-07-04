import { memo } from 'react'

export interface IPieData {
  id: string
  value: number
  color: string
}

const PieChart = memo(function PieChart({
  points,
  fullScore
}: {
  points: number
  fullScore: number
}) {
  return (
    <div className="relative h-[160px] w-full">
      <div className="absolute flex w-full justify-center">
        <div
          className="pie animate inset-x-0 top-0 z-10 transition-all"
          style={{
            '--c': points > 0 ? '#3b82f6' : '#F1F5F9',
            '--p': (points / fullScore) * 100
          }}
        >
          <div className="flex flex-col items-center">
            <p>
              <span className="font-bold text-gray-500 dark:text-gray-200">
                {points}
              </span>
              <span className="text-gray-400 dark:text-gray-300">
                /{fullScore}
              </span>
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-300">points</p>
          </div>
        </div>
      </div>
      <div className="absolute flex w-full justify-center">
        <div
          className="pie inset-x-0 top-0"
          style={{ '--c': '#F1F5F9', '--p': 100 }}
        ></div>
      </div>
    </div>
  )
})

export { PieChart }
