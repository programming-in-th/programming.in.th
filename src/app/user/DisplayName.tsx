'use client'

import { FC, useState } from 'react'

import { Toaster, toast } from 'react-hot-toast'

type DisplayNameProps = {
  initialName: string
}

export const DisplayName: FC<DisplayNameProps> = ({ initialName }) => {
  const [name, setName] = useState(initialName)
  const [saving, setSaving] = useState(false)
  // const [error, setError] = useState('')

  async function handleSave() {
    setSaving(true)
    // setError('')

    const res = await fetch('/api/user', {
      method: 'POST',
      body: JSON.stringify({
        displayName: name
      })
    })

    if (res.ok) {
      window.location.reload()
      toast.success('เปลี่ยน display name สำเร็จ')
    } else {
      // const errorObj = await res.json()
      // setError(`${res.statusText}: ${errorObj?.error}`)
      setSaving(false)
      toast.error(
        'จำนวนตัวอักษรใน display name ต้องอยู่ระหว่าง 3 - 32 ตัวอักษร'
      )
    }
  }

  return (
    <section className="flex flex-col items-center gap-2">
      <Toaster
        toastOptions={{
          className: 'dark:bg-slate-800 dark:text-white'
        }}
      />
      <p className="text-xl">Display Name</p>

      {/* {error && <p className="text-red-500">{error}</p>} */}

      <div className="flex gap-2">
        <input
          className="w-72 rounded-md border-gray-300 bg-gray-100 px-2 py-1 text-lg shadow-sm dark:border-slate-900 dark:bg-slate-700 dark:text-gray-100"
          type="text"
          maxLength={32}
          value={name}
          onChange={e => setName(e.currentTarget.value)}
        />

        <button
          className="rounded-lg bg-prog-primary-500 p-2 enabled:hover:bg-prog-primary-600 disabled:bg-prog-primary-500/80"
          disabled={saving || initialName === name}
          onClick={() => handleSave()}
        >
          Save
        </button>
      </div>
    </section>
  )
}
