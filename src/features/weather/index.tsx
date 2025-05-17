import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

const API_KEY = process.env.NEXT_PUBLIC_WEATHER_API_KEY as string

export default function WeatherFeature() {
  const [city, setCity] = useState('London')
  const [weather, setWeather] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const fetchWeather = async (city: string) => {
    if (!API_KEY) {
      setError('Missing API key')
      return
    }

    setLoading(true)
    setError('')
    try {
      const res = await fetch(
        `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${city}`
      )
      if (!res.ok) throw new Error('City not found')
      const data = await res.json()
      setWeather(data)
    } catch (err: any) {
      setError(err.message)
      setWeather(null)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchWeather(city)
  }, [])

  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 flex flex-col"
    >
      <h2 className="text-xl font-bold mb-4 text-black dark:text-white">Weather</h2>
      <div className="flex gap-2 mb-4">
        <input
          className="flex-1 px-3 py-2 border rounded dark:bg-gray-700 dark:text-white"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="City name"
        />
        <button
          onClick={() => fetchWeather(city)}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          Search
        </button>
      </div>
      {loading && <p className="text-gray-500 dark:text-gray-400">Loading...</p>}
      {error && <p className="text-red-600">{error}</p>}
      {weather && (
        <div className="flex items-center justify-between flex-wrap">
          <div>
            <h3 className="text-lg font-semibold text-black dark:text-white">
              {weather.location.name}, {weather.location.country}
            </h3>
            <p className="text-gray-700 dark:text-gray-300">
              {weather.current.condition.text}
            </p>
            <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">
              {weather.current.temp_c}°C
            </p>
          </div>
          <img
            src={weather.current.condition.icon}
            alt="Weather Icon"
            className="w-20 h-20"
          />
        </div>
      )}
    </motion.section>
  )
}
