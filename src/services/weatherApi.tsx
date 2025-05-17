import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const WEATHER_API_KEY = process.env.NEXT_PUBLIC_WEATHER_API_KEY

export const weatherApi = createApi({
  reducerPath: 'weatherApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://api.weatherapi.com/v1/',
  }),
  endpoints: (builder) => ({
    getWeatherByCity: builder.query({
      query: (city: string) =>
        `current.json?key=${WEATHER_API_KEY}&q=${encodeURIComponent(city)}`,
    }),
  }),
})

export const { useGetWeatherByCityQuery } = weatherApi
