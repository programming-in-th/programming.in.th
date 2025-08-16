'use client'

import { useSearchParams } from 'next/navigation'

export const RenderContent = () => {
  const searchParams = useSearchParams()

  const content_id = searchParams.get('id')

  return (
    <div className="m-6 flex gap-6">
      <div className="relative flex-1">rendering {content_id}</div>
    </div>
  )
}
