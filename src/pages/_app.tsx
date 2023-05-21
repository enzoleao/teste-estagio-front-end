import { ContextsProvider, useAllContexts } from '@/contexts/ContextsProvider'
import '@/styles/globals.css'
import type { AppProps } from 'next/app'

export default function App({ Component, pageProps }: AppProps) {
  const { loading } = useAllContexts()
  return (
    <ContextsProvider>
      <Component {...pageProps} />
    </ContextsProvider>
  )
}
