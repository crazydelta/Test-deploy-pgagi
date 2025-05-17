import { useGetNewsByQueryQuery } from '@services/newsApi'
import NewsCard from './NewsCard'

interface NewsListProps {
  query: string
}

export default function NewsList({ query }: NewsListProps) {
  const { data, error, isLoading } = useGetNewsByQueryQuery(query)

  if (isLoading) return <p className="text-black dark:text-white">Loading news...</p>
  if (error) return <p className="text-red-600 dark:text-red-400">Error loading news.</p>
  if (!data?.articles?.length) return <p className="text-black dark:text-white">No news found.</p>

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {data.articles.map((article: any) => (
        <NewsCard key={article.url} {...article} />
      ))}
    </div>
  )
}
