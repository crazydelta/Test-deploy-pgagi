// pages/_app.tsx
import '@styles/globals.css'
import type { AppProps } from 'next/app'
import { Provider } from 'react-redux'
import { store } from '@store/index'
import Layout from '@components/Layout'
import { useState, useEffect } from 'react'

export default function App({ Component, pageProps }: AppProps) {
  const [darkMode, setDarkMode] = useState(false)

  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode)
  }, [darkMode])

  return (
    <Provider store={store}>
      <Layout darkMode={darkMode} toggleDarkMode={() => setDarkMode(!darkMode)}>
        <Component {...pageProps} />
      </Layout>
    </Provider>
  )
}
