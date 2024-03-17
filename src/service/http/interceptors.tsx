'use client'
import CustomButton from '@/components/util/customButton'
import useRoute, { PATHS } from '@/hook/router'
import { RefreshTokenResponse } from '@/model/auth/refreshTokenResponse'
import { SigninResponse } from '@/model/auth/signinResponse'
import axios from '@/service/http'
import { Backdrop, Button, CircularProgress } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'
const LOCAL_STORAGE_AUTH_KEY: string = 'AUTH'

enum API_PATH {
  API_E_COMMERCE_INFO = 'api/e-commerce-info',
  API_AUTH = 'api/auth',
  API_REFRESH_TOKEN = 'api/auth/refreshtoken',
  API_CSRF = 'api/csrf'
}
export default function Interceptors(props: { children: React.ReactNode }) {
  const [open, setOpen] = React.useState(false)
  const route = useRoute()
  React.useEffect(() => {
    axios.interceptors.response.use(
      config => config,
      async error => {
        if (
          error.response?.status === 403 &&
          error.response?.config?.url?.startsWith(API_PATH.API_REFRESH_TOKEN.valueOf())
        ) {
          setOpen(true)
        }
        return Promise.reject(error)
      }
    )
  }, [])

  return (
    <React.Fragment>
      <Backdrop sx={{ zIndex: theme => theme.zIndex.drawer + 1 }} open={open}>
        <div className="flex flex-col w-96 h-56 rounded-lg bg-white justify-center items-center p-10">
          <span className="text-gray-600 text-xl pb-6">Session Expired</span>
          <CustomButton
            text="Signin again"
            onClick={() => {
              setOpen(false)
              route.to('/auth')
            }}
          />
        </div>
      </Backdrop>
      {props.children}
    </React.Fragment>
  )
}
