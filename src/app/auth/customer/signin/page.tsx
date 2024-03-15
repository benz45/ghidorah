'use client'
import AuthCustomerPage from '@/app/auth/customer/page'
import { SearchParamsSignup } from '@/app/auth/customer/signup/page'
import CustomTextField from '@/components/util/customTextField'
import TextHover from '@/components/util/textHover'
import useRoute from '@/hook/router'
import { useServiceAuth } from '@/service/reno/useServiceAuth'
import { yupResolver } from '@hookform/resolvers/yup'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import ErrorIcon from '@mui/icons-material/Error'
import { LoadingButton } from '@mui/lab'
import { Box, Container } from '@mui/material'
import FormControl from '@mui/material/FormControl'
import { AxiosError } from 'axios'
import React, { useState } from 'react'
import { SubmitHandler, useForm, useWatch } from 'react-hook-form'
import * as yup from 'yup'

const schema = yup.object({
  username: yup.string().required('Username is required'),
  password: yup.string().min(8).max(50).required('Password is required')
})

type SignInSchema = yup.InferType<typeof schema>

function AuthCustomerSigninPage() {
  const [isLoading, setIsLoading] = React.useState(false)
  const { signin } = useServiceAuth()
  const route = useRoute<SearchParamsSignup>()
  const [errorMessage, setErrorMessage] = useState<string | undefined>()

  const username = route.get('username')
  const isSignupSuccess = route.get('isSignupSuccess')

  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors }
  } = useForm<SignInSchema>({
    resolver: yupResolver(schema),
    mode: 'onSubmit',
    reValidateMode: 'onSubmit',
    defaultValues: {
      username: username ?? ''
    }
  })
  const values = useWatch({
    control,
    exact: true
  })

  function renderEmailInput() {
    return (
      <CustomTextField
        {...register('username', { required: true })}
        id="username"
        label="Username"
        placeholder="Please enter you username"
        type="text"
        value={values.username ?? ''}
        onChange={e => setValue('username', e.target.value)}
        error={!!errors.username}
        helperText={errors.username?.message}
        className="flex w-[452px]"
      />
    )
  }

  function renderPasswordInput() {
    return (
      <CustomTextField
        {...register('password', { required: true })}
        id="password"
        label="Password"
        type="password"
        placeholder="Enter password"
        value={values.password ?? ''}
        onChange={e => setValue('password', e.target.value)}
        error={!!errors.password}
        helperText={errors.password?.message}
        className="flex w-[452px]"
      />
    )
  }

  const renderAlert = () => {
    if (errorMessage) {
      return (
        <div className="py-6 px-2 bg-error bg-opacity-20 text-red-700 font-bold rounded mb-6 text-center select-none">
          {errorMessage} <ErrorIcon />
        </div>
      )
    }
    if (isSignupSuccess) {
      return (
        <div className="py-6 px-2 bg-success bg-opacity-20 text-green-700 font-bold rounded mb-6 text-center select-none">
          Sign Up Success <CheckCircleIcon />
        </div>
      )
    }
    return <></>
  }

  const signIn: SubmitHandler<SignInSchema> = async ({ username, password }) => {
    setIsLoading(true)
    await new Promise(res => setTimeout(res, 2000))
    try {
      const response = await signin.trigger({ username, password })
      localStorage.setItem('AUTH', JSON.stringify(response))
      route.to('/product/customer', { userId: response.id })
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.code === AxiosError.ERR_BAD_REQUEST) {
          setErrorMessage('Invalid username or password')
        } else {
          setErrorMessage(error.message)
        }
      } else if (error instanceof Error) {
        setErrorMessage(error.message)
      }
      setIsLoading(false)
    }
  }

  return (
    <AuthCustomerPage>
      <Container className="flex flex-col items-center justify-center w-full h-screen">
        <div className="flex flex-col h-full justify-center">
          <div className="flex flex-col w-full">
            <div className="font-bold text-4xl text-primary pb-4 select-none">Get Started Customer</div>
            <div className="text-gray-500 pb-6">
              <span className="select-none">Already have an account? </span>
              <TextHover onClick={() => route.to('/auth/customer/signup')} className="font-semibold text-primary ">
                Sign Up
              </TextHover>
            </div>
          </div>
          <FormControl onSubmit={handleSubmit(signIn)} className="flex flex-col w-[452px]">
            {renderAlert()}
            <Box component="form" autoComplete="on">
              <div className="w-full flex">{renderEmailInput()}</div>
              <div className="w-full flex my-6">{renderPasswordInput()}</div>
              <LoadingButton variant="contained" loading={isLoading} size="large" type="submit" className="w-full mt-6">
                Sign In
              </LoadingButton>
              <div className="text-gray-500 pt-8 select-none">
                By signing up, I agree to the <span className="underline text-primary">Teams of Service</span> and
              </div>
              <div className="underline text-primary select-none">Privacy Policy</div>
            </Box>
          </FormControl>
        </div>
      </Container>
    </AuthCustomerPage>
  )
}

export default AuthCustomerSigninPage
