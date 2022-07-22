import { InboxInIcon } from '@heroicons/react/solid'
import { FC } from 'react'

export const FileUpload: FC = () => {
  return (
    <div className="rounded-md border border-dashed border-gray-400 text-gray-400 p-6 gap-2 flex flex-col justify-center items-center">
      <InboxInIcon className="w-10 h-10" />

      <div>Upload a file or drag and drop</div>

      <p>.CPP .PY .JAVA .RS up to 10MB</p>
    </div>
  )
}
