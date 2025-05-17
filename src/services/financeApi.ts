import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const financeApi = createApi({
  reducerPath: 'financeApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/api/' }),
  endpoints: (builder) => ({
    getQuoteBySymbol: builder.query({
      query: (symbol: string) => `finnhub?symbol=${encodeURIComponent(symbol)}`,
    }),
  }),
})

export const { useGetQuoteBySymbolQuery } = financeApi
