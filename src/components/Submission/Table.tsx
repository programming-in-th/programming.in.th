import { ITestCase } from '@/types/submissions'

const Status = ({ msg }: { msg: string }) => {
  if (msg === 'Correct') {
    return (
      <div className="flex items-center space-x-1 pr-2">
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M7.99961 14.4C11.5342 14.4 14.3996 11.5346 14.3996 7.99998C14.3996 4.46535 11.5342 1.59998 7.99961 1.59998C4.46499 1.59998 1.59961 4.46535 1.59961 7.99998C1.59961 11.5346 4.46499 14.4 7.99961 14.4ZM10.9653 6.96566C11.2777 6.65324 11.2777 6.14671 10.9653 5.83429C10.6529 5.52187 10.1463 5.52187 9.83392 5.83429L7.19961 8.4686L6.16529 7.43429C5.85288 7.12187 5.34634 7.12187 5.03392 7.43429C4.7215 7.74671 4.7215 8.25324 5.03392 8.56566L6.63392 10.1657C6.94634 10.4781 7.45288 10.4781 7.76529 10.1657L10.9653 6.96566Z"
            fill="#34D399"
          />
        </svg>
        <p className="text-green-400">Correct</p>
      </div>
    )
  }
  if (msg === '' || msg === 'Partially Correct') {
    return (
      <div className="flex items-center space-x-1 pr-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 20 20"
          fill="#FACC15"
        >
          <path
            fillRule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 000 2h6a1 1 0 100-2H7z"
            clipRule="evenodd"
          />
        </svg>
        <p className="text-yellow-400">{msg === '' ? 'Skip' : msg}</p>
      </div>
    )
  }
  return (
    <div className="flex items-center space-x-1 pr-2">
      <svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M7.99961 14.4C11.5342 14.4 14.3996 11.5346 14.3996 7.99998C14.3996 4.46535 11.5342 1.59998 7.99961 1.59998C4.46499 1.59998 1.59961 4.46535 1.59961 7.99998C1.59961 11.5346 4.46499 14.4 7.99961 14.4ZM6.96529 5.83429C6.65288 5.52187 6.14634 5.52187 5.83392 5.83429C5.5215 6.14671 5.5215 6.65324 5.83392 6.96566L6.86824 7.99998L5.83392 9.03429C5.5215 9.34671 5.5215 9.85324 5.83392 10.1657C6.14634 10.4781 6.65288 10.4781 6.96529 10.1657L7.99961 9.13135L9.03392 10.1657C9.34634 10.4781 9.85287 10.4781 10.1653 10.1657C10.4777 9.85324 10.4777 9.34671 10.1653 9.03429L9.13098 7.99998L10.1653 6.96566C10.4777 6.65324 10.4777 6.14671 10.1653 5.83429C9.85287 5.52187 9.34634 5.52187 9.03392 5.83429L7.99961 6.8686L6.96529 5.83429Z"
          fill="#F87171"
        />
      </svg>
      <p className="whitespace-nowrap text-red-400">{msg}</p>
    </div>
  )
}

export const Header = () => (
  <div className="flex w-full space-x-2">
    <p className="w-[2rem] min-w-[2rem] text-sm font-light">#</p>
    <p className="w-[6rem] min-w-[4.5rem] text-sm font-light">Time</p>
    <p className="w-[6rem] min-w-[5rem] text-sm font-light">Memory</p>
    <p className="text-sm font-light">Message</p>
  </div>
)

export const Card = ({
  memory_usage,
  status,
  test_index,
  time_usage
}: ITestCase) => (
  <div className="flex w-full space-x-2">
    <p className="w-[2rem] min-w-[2rem] text-base font-light">{test_index}</p>
    <p className="w-[6rem] min-w-[4.5rem] shrink-0 text-sm font-light">
      <span className="text-base font-medium text-gray-500 dark:text-white">{`${Math.floor(
        time_usage * 1000
      )} `}</span>
      ms
    </p>
    <p className="w-[6rem] min-w-[5rem] shrink-0 text-sm font-light">
      <span className="text-base font-medium text-gray-500 dark:text-white">{`${memory_usage} `}</span>
      kB
    </p>
    <Status msg={status} />
  </div>
)
