'use client'
import { createTheme } from '@mui/material/styles'
import { ThemeProvider } from '@mui/system'
import * as React from 'react'

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#5770FD',
      light: '#AFBBFE'
    },
    secondary: {
      main: '#FFD200'
    },
    error: {
      main: '#FC4855'
    }
  }
})

export const Theme = ({ children }: { children: React.ReactNode }) => {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>
}
