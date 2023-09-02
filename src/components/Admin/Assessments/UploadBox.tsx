import clsx from 'clsx'

import { IDisplayFile, useSubmit } from './EditTaskContext'

const DisplayFileCard = ({ data }: { data: IDisplayFile }) => {
  return (
    <div className="flex" key={data.path}>
      <p className="w-64 truncate pr-4">{data.path}</p>
      <div className="w-full pb-1 pt-2">
        <div className="relative h-full w-full">
          <div className="absolute h-full w-full rounded-full bg-gray-200"></div>
          <div
            className="absolute h-full rounded-full bg-green-500 "
            style={{
              width: `${data.percentage}%`
            }}
          />
        </div>
      </div>
    </div>
  )
}

const UploadBox = () => {
  const {
    isSubmitting,
    displayFiles,
    singleFile,
    inputRef,
    showSelectFile,
    changeFile
  } = useSubmit()
  return (
    <div
      onClick={() => showSelectFile()}
      className={clsx(
        'group/tc mt-4 h-full max-h-[calc(100vh-9rem)] rounded-md border border-dashed border-gray-400 p-6 transition hover:border-gray-500',
        !isSubmitting && 'cursor-pointer'
      )}
    >
      <input
        type="file"
        ref={inputRef}
        className="hidden"
        onChange={e => {
          if (e.target.files) {
            changeFile(Array.from(e.target.files))
          }
        }}
      />
      {displayFiles.length > 0 ? (
        <div className="no-scrollbar h-full overflow-y-scroll">
          {displayFiles.map(file => (
            <DisplayFileCard key={file.path} data={file} />
          ))}
        </div>
      ) : (
        <div className="flex h-full w-full flex-col items-center justify-center">
          <svg
            width="49"
            height="49"
            viewBox="0 0 49 49"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="group-hover:fill-gray-600"
          >
            <path
              d="M12.4992 7.70005C9.84825 7.70005 7.69922 9.84908 7.69922 12.5V36.5001C7.69922 39.151 9.84825 41.3001 12.4992 41.3001H36.4992C39.1502 41.3001 41.2992 39.151 41.2992 36.5001V12.5C41.2992 9.84908 39.1502 7.70005 36.4992 7.70005H34.0992C32.7737 7.70005 31.6992 8.77457 31.6992 10.1C31.6992 11.4255 32.7737 12.5 34.0992 12.5H36.4992V29.3H31.6992L29.2992 34.1H19.6992L17.2992 29.3H12.4992V12.5L14.8992 12.5C16.2247 12.5 17.2992 11.4255 17.2992 10.1C17.2992 8.77457 16.2247 7.70005 14.8992 7.70005H12.4992Z"
              fill="#94A3B8"
            />
            <path
              d="M18.0022 18.003C18.9394 17.0657 20.459 17.0657 21.3963 18.003L22.0992 18.7059L22.0992 7.70005C22.0992 6.37457 23.1737 5.30005 24.4992 5.30005C25.8247 5.30005 26.8992 6.37456 26.8992 7.70005V18.7059L27.6022 18.003C28.5394 17.0657 30.059 17.0657 30.9963 18.003C31.9335 18.9403 31.9335 20.4598 30.9963 21.3971L26.1963 26.1971C25.7462 26.6472 25.1357 26.9 24.4992 26.9C23.8627 26.9 23.2523 26.6472 22.8022 26.1971L18.0022 21.3971C17.0649 20.4598 17.0649 18.9402 18.0022 18.003Z"
              fill="#94A3B8"
            />
          </svg>
          <p className="transition group-hover/tc:text-gray-400">
            Upload a file or drag and drop
          </p>
          <p className="text-sm transition group-hover/tc:text-gray-400">
            {singleFile ? 'a file' : 'test case folder'}
          </p>
        </div>
      )}
    </div>
  )
}

export default UploadBox
