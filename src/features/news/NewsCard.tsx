interface NewsCardProps {
    title: string
    description: string
    url: string
    urlToImage: string
    publishedAt: string
    source: {
      name: string
    }
  }
  
  export default function NewsCard({
    title,
    description,
    url,
    urlToImage,
    publishedAt,
    source,
  }: NewsCardProps) {
    return (
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="block rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-200 bg-white dark:bg-gray-900"
      >
        {urlToImage && <img src={urlToImage} alt={title} className="w-full h-48 object-cover" />}
        <div className="p-4 text-black dark:text-white">
          <h3 className="text-lg font-semibold mb-2">{title}</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
            {new Date(publishedAt).toLocaleDateString()} • {source?.name}
          </p>
          <p className="text-sm text-gray-700 dark:text-gray-300">{description}</p>
        </div>
      </a>
    )
  }
  