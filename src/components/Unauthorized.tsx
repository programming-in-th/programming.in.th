import Link from 'next/link'

export const Unauthorized = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-16 pb-44 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 px-4 text-center text-3xl font-extrabold text-prog-gray-500 dark:text-prog-gray-100">
          Unauthorized, please log in
        </h2>
      </div>

      <Link
        href="/login"
        className="w-fit rounded-md bg-prog-primary-500 px-6 py-4 text-center text-2xl font-medium text-white shadow-md transition-colors hover:bg-prog-primary-600"
      >
        Login
      </Link>
    </div>
  )
}
