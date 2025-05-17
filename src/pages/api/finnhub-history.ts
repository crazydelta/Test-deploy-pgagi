import type { NextApiRequest, NextApiResponse } from 'next'

const FINNHUB_API_KEY = process.env.FINNHUB_API_KEY

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { symbol, from, to } = req.query

  if (!FINNHUB_API_KEY) {
    return res.status(500).json({ error: 'Missing FINNHUB_API_KEY' })
  }

  if (
    typeof symbol !== 'string' ||
    typeof from !== 'string' ||
    typeof to !== 'string' ||
    !symbol ||
    !from ||
    !to
  ) {
    return res.status(400).json({ error: 'Missing or invalid query parameters' })
  }

  try {
    const response = await fetch(
      `https://finnhub.io/api/v1/stock/candle?symbol=${encodeURIComponent(
        symbol
      )}&resolution=D&from=${from}&to=${to}&token=${FINNHUB_API_KEY}`
    )
    if (!response.ok) throw new Error(`Finnhub API error: ${response.status}`)

    const data = await response.json()
    res.status(200).json(data)
  } catch (error) {
    console.error('Finnhub history API error:', error)
    res.status(500).json({ error: 'Failed to fetch historical data' })
  }
}
