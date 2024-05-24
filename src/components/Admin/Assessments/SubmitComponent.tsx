import { useSubmit } from './EditTaskContext'
import FormBox from './FormBox'
import UploadBox from './UploadBox'

const SubmitComponent = () => {
  const { handleSubmit, task, isSubmitting, setSingleFile, closedBar } =
    useSubmit()
  return (
    <form
      className="flex h-full w-full flex-col bg-white px-8 py-4 text-gray-500 dark:bg-gray-800"
      onSubmit={handleSubmit}
    >
      <div className="flex h-full w-full space-x-9">
        <fieldset disabled={isSubmitting}>
          <FormBox />
        </fieldset>
        <div className="flex w-full flex-col dark:text-gray-200">
          <div className="flex justify-between">
            <p>Test Case Files</p>
            <div className="flex items-center">
              <input
                type="checkbox"
                className="mr-1 h-4 w-4"
                onChange={e => setSingleFile(e.target.checked)}
              />
              <label>Is single file?</label>
            </div>
          </div>
          <p>
            You can also upload statements by uploading pdf file and public
            attachments by uploading zip file
          </p>
          <UploadBox />
        </div>
      </div>
      <div className="flex justify-end space-x-2 py-2">
        <button
          type="button"
          className="rounded-md border border-gray-100 px-9 py-2 text-gray-400 transition hover:bg-gray-100 dark:border-slate-700 dark:text-gray-200 dark:hover:bg-slate-700"
          disabled={isSubmitting}
          onClick={closedBar}
        >
          Cancel
        </button>
        <input
          disabled={isSubmitting}
          type="submit"
          value={task ? 'Update' : 'Create'}
          className="cursor-pointer rounded-md border bg-blue-500 px-9 py-2 text-white transition hover:bg-blue-600 dark:border-slate-600"
        />
      </div>
    </form>
  )
}

export default SubmitComponent
