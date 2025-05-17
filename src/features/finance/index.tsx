// src/features/finance/index.tsx
import { useState } from 'react'
import { motion } from 'framer-motion'
import { useGetQuoteBySymbolQuery } from '@services/financeApi'

export default function FinanceFeature() {
  const [symbol, setSymbol] = useState('AAPL')
  const { data, error, isLoading } = useGetQuoteBySymbolQuery(symbol)

  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 flex flex-col"
    >
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-black dark:text-white">Finance</h2>
        <input
          className="p-2 border rounded dark:bg-gray-700 dark:text-white"
          type="text"
          value={symbol}
          onChange={(e) => setSymbol(e.target.value.toUpperCase())}
          placeholder="Symbol e.g. AAPL"
        />
      </div>
      {isLoading && <p className="text-gray-500 dark:text-gray-400">Loading...</p>}
      {error && <p className="text-red-600 dark:text-red-400">Error fetching.</p>}
      {data && (
        <div className="grid grid-cols-2 gap-4 flex-1 text-black dark:text-white">
          <div className="p-4 bg-gray-100 dark:bg-gray-700 rounded">
            <p className="font-semibold">Current</p>
            <p className="text-2xl">${data.c}</p>
          </div>
          <div className="p-4 bg-gray-100 dark:bg-gray-700 rounded">
            <p className="font-semibold">High</p>
            <p>${data.h}</p>
          </div>
          <div className="p-4 bg-gray-100 dark:bg-gray-700 rounded">
            <p className="font-semibold">Low</p>
            <p>${data.l}</p>
          </div>
          <div className="p-4 bg-gray-100 dark:bg-gray-700 rounded">
            <p className="font-semibold">Open</p>
            <p>${data.o}</p>
          </div>
          <div className="p-4 bg-gray-100 dark:bg-gray-700 rounded col-span-2">
            <p className="font-semibold">Prev Close</p>
            <p>${data.pc}</p>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              {new Date(data.t * 1000).toLocaleTimeString()}
            </p>
          </div>
        </div>
      )}
    </motion.section>
  )
}
