'use client'
import React from 'react'
import { CSRFResponse } from '@/model/csrfResponse'
import { ServiceApi } from '@/service/api'

interface CSRFContext {
  csrf: CSRFResponse | undefined
}
export const CSRFContext = React.createContext<CSRFContext>({ csrf: undefined })
export default function CsrfComponent({ children }: { children: React.ReactNode }) {
  const [csrf, setCsrf] = React.useState<CSRFResponse | undefined>(undefined)
  React.useEffect(() => {
    async function getCSRF() {
      const res = await ServiceApi.get('api/csrf-token')
      setCsrf(res)
    }
    getCSRF()
  }, [])
  return <CSRFContext.Provider value={{ csrf }}>{children}</CSRFContext.Provider>
}
