import { motion } from 'framer-motion'

interface Props {
  city: string
  newsQuery: string
  stockSymbol: string
  weatherData: any
  newsData: any
  financeData: any
}

export default function RecentActivityFeature({
  city,
  newsQuery,
  stockSymbol,
  weatherData,
  newsData,
  financeData,
}: Props) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 mt-6">
      <h2 className="text-2xl font-bold mb-4 text-black dark:text-white">Recent Activity</h2>

      <div className="space-y-4">
        {/* Weather Activity */}
        {weatherData && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="p-4 bg-gray-100 dark:bg-gray-700 rounded"
          >
            <p className="text-black dark:text-white">
              🌤 It's currently <strong>{weatherData.current.condition.text}</strong> in{' '}
              <strong>{weatherData.location.name}</strong> with a temperature of{' '}
              <strong>{weatherData.current.temp_c}°C</strong>.
            </p>
          </motion.div>
        )}

        {/* News Activity */}
        {newsData?.articles?.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="p-4 bg-gray-100 dark:bg-gray-700 rounded"
          >
            <p className="text-black dark:text-white">
              📰 Latest in <strong>{newsQuery}</strong>: {newsData.articles[0].title}
            </p>
          </motion.div>
        )}

        {/* Stock Activity */}
        {financeData && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="p-4 bg-gray-100 dark:bg-gray-700 rounded"
          >
            <p className="text-black dark:text-white">
              📈 {stockSymbol} is trading at <strong>${financeData.c.toFixed(2)}</strong> (High:{' '}
              <strong>${financeData.h.toFixed(2)}</strong>, Low: <strong>${financeData.l.toFixed(2)}</strong>)
            </p>
          </motion.div>
        )}
      </div>
    </div>
  )
}
