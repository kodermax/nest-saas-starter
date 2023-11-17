import { useRouter } from 'next/router'
import React, { useEffect } from 'react'

function HomePage() {
  const router = useRouter()

  useEffect(() => {
    if (!router.isReady) {
      return
    }
    router.replace('/login')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      <h1>Domain error</h1>
      <h2>Failed to resolve DNS path for this host</h2>
    </>
  )
}
export default HomePage
