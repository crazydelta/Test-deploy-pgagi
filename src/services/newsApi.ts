import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const newsApi = createApi({
  reducerPath: 'newsApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/api/' }),
  endpoints: (builder) => ({
    getNewsByQuery: builder.query({
      query: (q: string) => `newsapi?q=${encodeURIComponent(q)}`,
    }),
  }),
})

export const { useGetNewsByQueryQuery } = newsApi
