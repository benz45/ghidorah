'use client'
import { Box, Container, CssBaseline } from '@mui/material'
import Image from 'next/image'
import React from 'react'
import * as yup from 'yup'

export default function AuthPage({ children }: { children: React.ReactNode }) {
  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="xl">
        <Box sx={{ height: '100vh' }}>
          <div className="absolute p-10 flex items-center">
            <Image priority src="/logo.svg" height={50} width={50} className="" alt="Base image page" />
            <div className="font-bold pl-4 text-3xl text-primary">Brugge</div>
          </div>
          <div className="flex w-full h-full items-center">
            <div className="flex w-full flex-col items-center justify-center">
              <Image priority src="/images/pos.svg" height={600} width={600} className="" alt="Base image page" />
              <div className="font-bold text-2xl py-9">Optimize your business</div>
              <div className="flex items-center">
                <div className="w-2 h-2 mx-1 rounded bg-slate-400"></div>
                <div className="w-6 h-3 mx-1 rounded-lg bg-primary"></div>
                <div className="w-2 h-2 mx-1 rounded bg-slate-400"></div>
              </div>
            </div>
            {children}
          </div>
        </Box>
      </Container>
    </React.Fragment>
  )
}
