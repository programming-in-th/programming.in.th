'use client'

import { DownloadIcon } from '@/svg/Illustrations/DownloadIcon'

export const Attachment = ({
  attachmentData,
  id
}: {
  attachmentData: Blob | JSON | undefined
  id: string
}) => {
  const downloadAttachment = () => {
    const url = URL.createObjectURL(attachmentData as Blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${id}.zip`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  if (!(attachmentData instanceof Blob)) {
    return null
  }

  return (
    <div className="my-3 text-gray-500 dark:text-gray-100">
      <p className="mb-1">Attachment</p>
      <button
        className="flex w-full items-center justify-between rounded-md border p-3"
        onClick={downloadAttachment}
      >
        <p className="w-2/3 truncate">{id}.zip</p>
        <DownloadIcon />
      </button>
      <hr className="my-4 hidden md:block" />
    </div>
  )
}
