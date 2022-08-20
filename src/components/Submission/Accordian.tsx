import { useEffect, useState } from 'react'

import { Header, Card, ITestCase } from './Table'

import { motion, Variants } from 'framer-motion'

const ArrowVariants: Variants = {
  active: {
    rotate: '0deg',
    transition: { duration: 0.25, type: 'tween' }
  },
  hidden: {
    rotate: '-180deg',
    transition: { duration: 0.25, type: 'tween' }
  }
}

const DivVariants: Variants = {
  active: {
    // height: 'auto',
    paddingTop: '16px',
    paddingBottom: '16px',
    transition: { duration: 0.25, type: 'tween' }
  },
  hidden: {
    height: 0,
    paddingTop: 0,
    paddingBottom: 0,
    overflow: 'hidden',
    transition: { duration: 0.25, type: 'tween' }
  }
}

export const Accordion = ({ group, open }) => {
  const [expanded, setExpand] = useState(false)
  useEffect(() => {
    setExpand(open)
  }, [open])
  return (
    <div className="my-1 w-full rounded-lg bg-white dark:bg-slate-600">
      <button
        className="flex w-full items-center justify-between rounded-lg border-b border-gray-300 bg-white px-8 py-2 dark:border-slate-600 dark:bg-slate-500"
        onClick={() => setExpand(e => !e)}
      >
        <div className="flex items-center dark:text-gray-100">
          <p className="mr-1">{`Subtask ${group.group_index}`}</p>
          <p className="text-sm">{`(${group.score}/${group.full_score})`}</p>
        </div>
        <motion.span
          animate={expanded ? 'active' : 'hidden'}
          variants={ArrowVariants}
        >
          <div className="text-[#94A3B8] dark:text-white">
            <svg
              width="14"
              height="8"
              viewBox="0 0 14 8"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M1 1L7 7L13 1" stroke="currentColor" />
            </svg>
          </div>
        </motion.span>
      </button>
      <motion.div
        role="region"
        animate={expanded ? 'active' : 'hidden'}
        variants={DivVariants}
        className="h-auto w-full rounded-b-lg bg-white py-4 dark:bg-slate-600"
      >
        <div className="space-y-1 px-10 font-light text-gray-400 dark:text-gray-200">
          <Header />
          {group.run_result.map((result: ITestCase) => (
            <Card {...result} key={result.test_index} />
          ))}
        </div>
      </motion.div>
    </div>
  )
}
