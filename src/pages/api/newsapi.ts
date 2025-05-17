import type { NextApiRequest, NextApiResponse } from 'next'

const NEWSAPI_KEY = process.env.NEWSAPI_KEY

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

  if (!NEWSAPI_KEY) {
    return res.status(500).json({ error: 'Missing NEWSAPI_KEY in environment' })
  }

  const query = typeof req.query.q === 'string' && req.query.q.trim() !== '' ? req.query.q : 'tesla'

  try {
    const response = await fetch(
      `https://newsapi.org/v2/everything?q=${encodeURIComponent(query)}&language=en&apiKey=${NEWSAPI_KEY}`
    )
    if (!response.ok) {
      throw new Error(`NewsAPI error: ${response.status}`)
    }
    const data = await response.json()
    return res.status(200).json(data)
  } catch (error) {
    console.error('NewsAPI proxy error:', error)
    return res.status(500).json({ error: 'Failed to fetch news from NewsAPI' })
  }
}
