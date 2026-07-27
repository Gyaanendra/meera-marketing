'use client'

import { ReactNode, useEffect } from 'react'

export function Providers({ children }: { children: ReactNode }) {
  useEffect(() => {
    // Remove any server-rendered loading state classes
    document.body.classList.remove('loading')
  }, [])

  return <>{children}</>
}
