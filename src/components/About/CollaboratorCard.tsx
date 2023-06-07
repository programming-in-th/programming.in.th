import Image from 'next/image'
import Link from 'next/link'

interface ICollaborator {
  username: string
  image: string
  url: string
  key: number
}

export const CollaboratorCard = ({ username, image, url }: ICollaborator) => {
  return (
    <div className="m-2 inline-block rounded-lg bg-white p-2 shadow-md hover:bg-gray-100 dark:bg-slate-800 dark:hover:bg-slate-700">
      <Link
        className="no-underline"
        target="_blank"
        rel="noopener noreferrer"
        href={url}
      >
        <div className="flex flex-row items-center">
          <div className="relative">
            <Image
              alt={username}
              className="mr-3 rounded-full object-cover"
              width={30}
              height={30}
              src={image}
            />
          </div>
          <p className="text-xl">{username}</p>
        </div>
      </Link>
    </div>
  )
}
