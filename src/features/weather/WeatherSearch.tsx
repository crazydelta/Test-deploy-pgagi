import { useState } from 'react'

interface Props {
  onSearch: (city: string) => void
}

export default function WeatherSearch({ onSearch }: Props) {
  const [input, setInput] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (input.trim()) onSearch(input.trim())
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 mb-4">
      <input
        type="text"
        className="border rounded-md px-3 py-2 text-black dark:text-white bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 flex-grow"
        placeholder="Enter city name..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button
        type="submit"
        className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 transition"
      >
        Search
      </button>
    </form>
  )
}
