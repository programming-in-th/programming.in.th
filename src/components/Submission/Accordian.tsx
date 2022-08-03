import { useEffect, useState } from 'react'

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
    overflow: 'auto',
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
    <div className="my-1 w-full rounded-lg bg-white">
      <button
        className="flex w-full items-center justify-between rounded-lg border-b border-gray-300 bg-white py-4 px-8"
        onClick={() => setExpand(e => !e)}
      >
        <div className="flex items-center">
          <p className="mr-1">{`Subtask ${group.group_index}`}</p>
          <p className="text-sm">{`(${group.score}/${group.full_score})`}</p>
        </div>
        <motion.span
          animate={expanded ? 'active' : 'hidden'}
          variants={ArrowVariants}
        >
          <svg
            width="14"
            height="8"
            viewBox="0 0 14 8"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M1 1L7 7L13 1" stroke="#94A3B8" />
          </svg>
        </motion.span>
      </button>
      <motion.div
        role="region"
        animate={expanded ? 'active' : 'hidden'}
        variants={DivVariants}
        className="w-full rounded-b-lg bg-white py-4"
        // className="px-8 py-4"
      >
        <table className="-mt-2 table-auto border-separate border-spacing-x-4 border-spacing-y-3 font-light text-gray-400">
          <thead>
            <tr>
              <th className="text-sm font-light">#</th>
              <th className="text-sm font-light">Time</th>
              <th className="text-sm font-light">Memory</th>
              <th className="text-sm font-light">Message</th>
            </tr>
          </thead>
          <tbody>
            {group.run_result.map(result => (
              <tr key={result.test_index}>
                <td
                  className="text-sm font-light"
                  key={`idx-${result.text_index}`}
                >
                  {result.test_index}
                </td>
                <td
                  className="text-sm font-light"
                  key={`time-${result.text_index}`}
                >
                  {`${result.time_usage * 1000} ms`}
                </td>
                <td
                  className="text-sm font-light"
                  key={`mem-${result.text_index}`}
                >
                  {`${result.memory_usage} kB`}
                </td>

                <td
                  className="text-sm font-light"
                  key={`status-${result.text_index}`}
                >
                  {result.status}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </motion.div>
    </div>
  )
}
