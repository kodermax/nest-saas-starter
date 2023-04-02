// ----------------------------------------------------------------------

import { CacheProvider, EmotionCache } from '@emotion/react'

// next
import { NextPage } from 'next'
import Head from 'next/head'
import { AppProps } from 'next/app'

import { createEmotionCache } from 'ui'

// theme
import { ThemeProvider } from 'ui'
import { ThemeSettings } from 'ui'

// ----------------------------------------------------------------------

const clientSideEmotionCache = createEmotionCache()

type NextPageWithLayout = NextPage & {
  getLayout?: (page: React.ReactElement) => React.ReactNode
}

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache
  Component: NextPageWithLayout
}

export default function MyApp(props: MyAppProps) {
  const { Component, pageProps, emotionCache = clientSideEmotionCache } = props

  const getLayout = Component.getLayout ?? (page => page)

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <meta name='viewport' content='initial-scale=1, width=device-width' />
      </Head>
      <ThemeProvider>
        <ThemeSettings>{getLayout(<Component {...pageProps} />)}</ThemeSettings>
      </ThemeProvider>
    </CacheProvider>
  )
}
