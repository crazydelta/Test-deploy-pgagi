import type { NextApiRequest, NextApiResponse } from 'next'

const FINNHUB_API_KEY = process.env.FINNHUB_API_KEY

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const symbol = typeof req.query.symbol === 'string' && req.query.symbol.trim() !== '' ? req.query.symbol : 'AAPL'

  if (!FINNHUB_API_KEY) {
    return res.status(500).json({ error: 'Missing FINNHUB_API_KEY in environment' })
  }

  try {
    const response = await fetch(
      `https://finnhub.io/api/v1/quote?symbol=${encodeURIComponent(symbol)}&token=${FINNHUB_API_KEY}`
    )
    if (!response.ok) throw new Error(`Finnhub API error: ${response.status}`)

    const data = await response.json()
    res.status(200).json(data)
  } catch (error) {
    console.error('Finnhub API proxy error:', error)
    res.status(500).json({ error: 'Failed to fetch Finnhub data' })
  }
}
