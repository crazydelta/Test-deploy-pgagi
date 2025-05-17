// src/features/news/index.tsx
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

const CATEGORIES = [
  'general',
  'business',
  'technology',
  'sports',
  'health',
  'science',
  'entertainment',
]

export default function NewsFeature() {
  const [category, setCategory] = useState('technology')
  const [news, setNews] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const fetchNews = async (cat: string) => {
    setLoading(true)
    setError('')
    try {
      const res = await fetch(`/api/newsapi?q=${cat}`)
      if (!res.ok) throw new Error('Failed to fetch news')
      const data = await res.json()
      setNews(data.articles || [])
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchNews(category)
  }, [category])

  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.1 }}
      className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 flex flex-col"
    >
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-black dark:text-white">News</h2>
        <select
          className="p-2 border rounded dark:bg-gray-700 dark:text-white"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          {CATEGORIES.map((cat) => (
            <option key={cat} value={cat}>
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </option>
          ))}
        </select>
      </div>
      {loading && <p className="text-gray-500 dark:text-gray-400">Loading...</p>}
      {error && <p className="text-red-600">{error}</p>}
      <div className="overflow-y-auto space-y-4 flex-1">
        {news.map((article, idx) => (
          <a
            key={idx}
            href={article.url}
            target="_blank"
            rel="noopener noreferrer"
            className="block p-4 border rounded hover:bg-gray-100 dark:hover:bg-gray-700 transition"
          >
            <h3 className="font-semibold text-black dark:text-white">
              {article.title}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-300 mt-1 line-clamp-2">
              {article.description}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
              {article.source?.name} ·{' '}
              {new Date(article.publishedAt).toLocaleDateString()}
            </p>
          </a>
        ))}
      </div>
    </motion.section>
  )
}
