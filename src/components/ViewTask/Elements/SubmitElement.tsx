import { FC } from 'react'
import { FileUpload } from './FileUpload'

export const SubmitElement: FC = () => {
  return (
    <div className="flex flex-col gap-6 w-full rounded-md shadow-md text-prog-gray-500">
      <div className="bg-white px-8 py-4">
        <div className="flex justify-between items-center">
          <h2 className="text-lg mb-6">Submit</h2>
          {/* <div className="flex gap-2">
          <button className="border-gray-300 border text-prog-gray-500 rounded-md px-8 py-2">
            C
          </button>
          <button className="bg-prog-gray-500 border text-white rounded-md px-8 py-2">
            Java
          </button>
          <button className="border-gray-300 border text-prog-gray-500 rounded-md px-8 py-2">
            Rust
          </button>
        </div> */}
        </div>

        <FileUpload />
      </div>

      <div className="bg-prog-gray-100 px-8 py-4">
        <div className="flex justify-end">
          <button className="bg-prog-gray-500 border text-white rounded-md px-8 py-2">
            Submit
          </button>
        </div>
      </div>
    </div>
  )
}
