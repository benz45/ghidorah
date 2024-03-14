'use client'
import { Box, Container, CssBaseline, Divider } from '@mui/material'
import Image from 'next/image'
import React from 'react'
import useRoute from '~/hook/router'

export default function AuthPage() {
  const route = useRoute()

  const navigateToCustomerSignin = () => route.route('/auth/customer/signin')
  const navigateToEmployeeSignin = () => route.route('/auth/employee/signin')

  const renderBaaseImage = () => {
    return (
      <div className="flex flex-col items-center justify-center">
        <Image priority src="/images/auth-signin.svg" height={600} width={600} className="" alt="Base image page" />
        <div className="font-bold text-2xl py-9">Optimize your business</div>
        <div className="flex items-center">
          <div className="w-2 h-2 mx-1 rounded bg-slate-400"></div>
          <div className="w-6 h-3 mx-1 rounded-lg bg-primary"></div>
          <div className="w-2 h-2 mx-1 rounded bg-slate-400"></div>
        </div>
      </div>
    )
  }

  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="xl">
        <Box sx={{ height: '100vh' }}>
          <div className="absolute p-10 flex items-center">
            <Image priority src="/logo.svg" height={50} width={50} className="" alt="Base image page" />
            <div className="font-bold pl-4 text-3xl text-primary">Brugge</div>
          </div>
          <div className="w-full h-full flex flex-col justify-center">
            <div className="flex w-full text-4xl font-bold justify-center text-primary pb-4">Authorization</div>
            <div className="flex w-full justify-center items-center">
              <div className="flex flex-col items-center pr-24">
                <div
                  className="w-96 bg-primary flex justify-center items-center h-28 rounded-lg mb-5 hover:bg-opacity-50 cursor-pointer"
                  onClick={() => navigateToCustomerSignin()}
                >
                  <div className="flex flex-col items-center">
                    <div className="text-white text-xl font-bold">Customer</div>
                    <div className="text-white font-xs">(Signup, Sighn etc.)</div>
                  </div>
                </div>
                <Divider className="pt-2 pb-6" flexItem>
                  Or
                </Divider>
                <div
                  className="w-96 bg-primary-light flex justify-center items-center rounded-lg h-28 hover:bg-opacity-50 cursor-pointer"
                  onClick={() => navigateToEmployeeSignin()}
                >
                  <div className="flex flex-col items-center">
                    <div className="text-xl font-bold">Employee</div>
                    <div className="font-xs text-gray-500">(Signup, Sighn, Manage Order etc.)</div>
                  </div>
                </div>
                <div className="text-gray-500 pt-8 select-none">
                  By signing up, I agree to the <span className="underline text-primary">Teams of Service</span> and
                </div>
                <div className="underline text-primary select-none">Privacy Policy</div>
              </div>
              {renderBaaseImage()}
            </div>
          </div>
        </Box>
      </Container>
    </React.Fragment>
  )
}
