import React from 'react'
import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter'
import type { Metadata } from 'next'
import { montserrat, sansita_swashed } from '@/app/font'
import '@/app/globals.css'
import { Theme } from '@/app/theme'
import CsrfComponent from '@/components/csrfComponent'
import { ReduxProvider } from '@/redux/provider'
import Interceptors from '@/service/http/interceptors'

export const metadata: Metadata = {
  title: 'Brugge',
  description: 'Generated by create next app'
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ReduxProvider>
      <CsrfComponent>
        <html lang="en">
          <Theme>
            <body className={`${sansita_swashed.variable} ${montserrat.className}`}>
              <Interceptors>
                <AppRouterCacheProvider>{children}</AppRouterCacheProvider>
              </Interceptors>
            </body>
          </Theme>
        </html>
      </CsrfComponent>
    </ReduxProvider>
  )
}
