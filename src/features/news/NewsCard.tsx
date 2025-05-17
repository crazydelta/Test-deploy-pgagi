import Image from 'next/image'

interface Article {
  title: string
  description?: string
  url: string
  urlToImage?: string
  publishedAt?: string
  source?: {
    name: string
  }
}

interface NewsCardProps {
  article: Article
}

export default function NewsCard({ article }: NewsCardProps) {
  const { title, description, url, urlToImage, publishedAt, source } = article

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="block rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-200 bg-white dark:bg-gray-900"
    >
      {urlToImage && (
        <div className="relative w-full h-48">
          <Image
            src={urlToImage}
            alt={title}
            layout="fill"
            objectFit="cover"
            priority={true}
          />
        </div>
      )}
      <div className="p-4 text-black dark:text-white">
        <h3 className="text-lg font-semibold mb-2">{title}</h3>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
          {publishedAt ? new Date(publishedAt).toLocaleDateString() : ''} •{' '}
          {source?.name || ''}
        </p>
        <p className="text-sm text-gray-700 dark:text-gray-300">{description}</p>
      </div>
    </a>
  )
}
