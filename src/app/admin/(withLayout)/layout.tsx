import { ReactNode } from 'react'

import { AdminLinks } from './AdminLinks'

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex w-full justify-center">
      <div className="justify-cente r flex w-full flex-col items-center px-2 text-gray-500 dark:text-gray-50">
        <div className="flex w-full justify-center">
          <p className="py-8 text-xl font-semibold">Admin</p>
        </div>
        <div className="flex w-full max-w-3xl justify-center space-x-2">
          <AdminLinks />
        </div>
        {children}
      </div>
    </div>
  )
}
