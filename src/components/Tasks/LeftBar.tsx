export const LeftBar = () => {
  return (
    <div className="mx-4 flex w-52 shrink flex-col font-display">
      <div className="flex h-9 w-full items-center justify-center rounded-md bg-gray-100">
        <p className="text-sm text-gray-500">All</p>
      </div>
      <div className="flex h-9 w-full items-center justify-center rounded-md hover:bg-gray-50">
        <p className="text-sm text-gray-500">Tried</p>
      </div>
      <div className="flex h-9 w-full items-center justify-center rounded-md hover:bg-gray-50">
        <p className="text-sm text-gray-500">Solved</p>
      </div>
      <div className="flex h-9 w-full items-center justify-center rounded-md hover:bg-gray-50">
        <p className="text-sm text-gray-500">Archives</p>
      </div>
      <div className="flex h-9 w-full items-center justify-center rounded-md hover:bg-gray-50">
        <p className="text-sm text-gray-500">Bookmarked</p>
      </div>
    </div>
  )
}
