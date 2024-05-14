import Image from 'next/image'

export default function NotFoundPage() {
  return (
    <div className="flex h-[70vh] flex-col items-center justify-center p-8">
      <Image
        src="/assets/img/vendor/404.webp"
        alt="404 Not Found"
        width="480"
        height="270"
      />
    </div>
  )
}
