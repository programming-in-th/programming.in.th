'use client'

import useSWR from 'swr'

import zipFetcher from '@/lib/zipFetcher'
import { DownloadIcon } from '@/svg/Illustrations/DownloadIcon'

export const Attachment = ({ id }: { id: string }) => {
  const { data: attachment } = useSWR(`/api/tasks/${id}/attachment`, zipFetcher)

  if (!(attachment instanceof Blob)) {
    return null
  }

  const downloadAttachment = () => {
    const url = URL.createObjectURL(attachment as Blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${id}.zip`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
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
