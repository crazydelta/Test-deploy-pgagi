import { useState } from 'react'
import { useGetNewsByQueryQuery } from '@services/newsApi'
import { useGetQuoteBySymbolQuery } from '@services/financeApi'
import { useGetWeatherByCityQuery } from '@services/weatherApi'
import RecentActivityFeature from './RecentActivityFeature'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'

export default function DashboardFeature() {
  const [city, setCity] = useState('London')
  const [stockSymbol, setStockSymbol] = useState('AAPL')
  const [newsQuery, setNewsQuery] = useState('Tesla')

  const { data: weatherData, isLoading: weatherLoading } = useGetWeatherByCityQuery(city)
  const { data: newsData, isLoading: newsLoading } = useGetNewsByQueryQuery(newsQuery)
  const { data: financeData, isLoading: financeLoading } = useGetQuoteBySymbolQuery(stockSymbol)

  const latestHeadline = newsData?.articles?.[0]?.title || 'No news available'

  // Static mock chart data (demo only)
  const chartData = [
    { date: 'Apr 01', close: 150 },
    { date: 'Apr 02', close: 152 },
    { date: 'Apr 03', close: 149 },
    { date: 'Apr 04', close: 155 },
    { date: 'Apr 05', close: 157 },
    { date: 'Apr 06', close: 160 },
  ]

  return (
    <section className="max-w-7xl mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-bold text-black dark:text-white mb-6">Dashboard Overview</h1>

      {/* Dynamic input filters */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter city"
          className="p-2 border rounded dark:bg-gray-700 dark:text-white"
        />
        <input
          type="text"
          value={newsQuery}
          onChange={(e) => setNewsQuery(e.target.value)}
          placeholder="News topic"
          className="p-2 border rounded dark:bg-gray-700 dark:text-white"
        />
        <input
          type="text"
          value={stockSymbol}
          onChange={(e) => setStockSymbol(e.target.value.toUpperCase())}
          placeholder="Enter stock symbol (e.g., AAPL)"
          className="p-2 border rounded dark:bg-gray-700 dark:text-white"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Weather Card */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-2 text-black dark:text-white">
            Weather in {city}
          </h2>
          {weatherLoading ? (
            <p className="text-black dark:text-white">Loading...</p>
          ) : weatherData ? (
            <>
              <p className="text-black dark:text-white text-4xl font-bold">
                {weatherData.current.temp_c}°C
              </p>
              <p className="text-gray-600 dark:text-gray-400">
                {weatherData.current.condition.text}
              </p>
              <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                {weatherData.location.name}, {weatherData.location.country}
              </p>
            </>
          ) : (
            <p className="text-red-600 dark:text-red-400">Unable to load weather data.</p>
          )}
        </div>

        {/* News Card */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-2 text-black dark:text-white">
            News about {newsQuery}
          </h2>
          {newsLoading ? (
            <p className="text-black dark:text-white">Loading...</p>
          ) : newsData ? (
            <p className="text-black dark:text-white">{latestHeadline}</p>
          ) : (
            <p className="text-red-600 dark:text-red-400">Unable to load news.</p>
          )}
        </div>

        {/* Finance Card */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-2 text-black dark:text-white">
            Stock: {stockSymbol}
          </h2>
          {financeLoading ? (
            <p className="text-black dark:text-white">Loading...</p>
          ) : financeData ? (
            <>
              <p className="text-4xl font-bold text-black dark:text-white">
                ${financeData.c.toFixed(2)}
              </p>
              <p className="text-gray-600 dark:text-gray-400">
                High: ${financeData.h.toFixed(2)} | Low: ${financeData.l.toFixed(2)}
              </p>
              <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                Last updated: {new Date(financeData.t * 1000).toLocaleTimeString()}
              </p>

              {/* Mock Chart */}
              <div style={{ width: '100%', height: 200 }} className="mt-4">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={chartData}>
                    <XAxis dataKey="date" />
                    <YAxis domain={['auto', 'auto']} />
                    <Tooltip />
                    <Line
                      type="monotone"
                      dataKey="close"
                      stroke="#8884d8"
                      strokeWidth={2}
                      dot={false}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </>
          ) : (
            <p className="text-red-600 dark:text-red-400">Unable to load stock data.</p>
          )}
        </div>
      </div>
      <RecentActivityFeature
        city={city}
        newsQuery={newsQuery}
        stockSymbol={stockSymbol}
        weatherData={weatherData}
        newsData={newsData}
        financeData={financeData}
       />
    </section>
  )
}
