'use client'
import { yupResolver } from '@hookform/resolvers/yup'
import { LoadingButton } from '@mui/lab'
import { Box, Container, FormControlLabel, FormLabel, Grid, Radio, RadioGroup } from '@mui/material'
import FormControl from '@mui/material/FormControl'
import { useState } from 'react'
import { SubmitHandler, useForm, useWatch } from 'react-hook-form'
import * as yup from 'yup'
import CustomSelect from '~/components/util/customSelect'
import CustomTextField from '~/components/util/customTextField'
import TextHover from '~/components/util/textHover'
import * as DateConstant from '~/constant/dateConstant'
import { RoleTypeConstant } from '~/constant/roleTypeConstant'
import { UserTypeConstant } from '~/constant/userTypeConstant'
import useRoute from '~/hook/router'
import { SignupRequest } from '~/model/auth/signupRequest'
import { useServiceAuth } from '~/service/reno/useServiceAuth'
import AuthPage from '../page'

const schema = yup.object({
  name: yup.string().min(3).max(50).required('Name is required'),
  username: yup.string().min(3).max(50).required('Username is required'),
  gender: yup.number().required('Gender is required'),
  birthDate: yup.object({
    day: yup.number().required('Day is required'),
    month: yup.number().required('Month is required'),
    year: yup.number().required('Year is required')
  }),
  phoneNumber: yup.string().min(10).max(10).required('Phone number is required'),
  email: yup.string().email().required('Email is required'),
  password: yup.string().min(8).max(50).required('Password is required'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password')], 'Confirm password not match')
    .required('Confirm password is required')
})

type CreateUserSchema = yup.InferType<typeof schema>

export interface SearchParamsSignup {
  username?: string
  isSignupSuccess?: boolean
}

export default function SignupPage() {
  const { signup } = useServiceAuth()

  const route = useRoute<SearchParamsSignup>()

  const [errorMessage, setErrorMessage] = useState<string | undefined>()
  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors }
  } = useForm<CreateUserSchema>({ resolver: yupResolver(schema), mode: 'onSubmit', reValidateMode: 'onSubmit' })
  const values = useWatch({
    control,
    exact: true
  })

  function renderNameInput() {
    return (
      <>
        <CustomTextField
          {...register('name', { required: true, min: 18, max: 99 })}
          id="name"
          label="Name"
          placeholder="Please enter you name"
          type="text"
          value={values.name ?? ''}
          onChange={e => setValue('name', e.target.value)}
          error={!!errors.name}
          helperText={errors.name?.message}
        />
      </>
    )
  }

  function renderUserNameInput() {
    return (
      <>
        <CustomTextField
          {...register('username', { required: true, min: 18, max: 99 })}
          id="username"
          label="User Name"
          placeholder="Please enter you user name"
          type="text"
          value={values.username ?? ''}
          onChange={e => setValue('username', e.target.value)}
          error={!!errors.username}
          helperText={errors.username?.message}
        />
      </>
    )
  }

  function renderRadioGender() {
    return (
      <>
        <FormLabel id="demo-radio-buttons-group-label" error={!!errors.gender}>
          Gender
        </FormLabel>
        <RadioGroup
          {...register('gender', { required: true })}
          row
          aria-labelledby="demo-radio-buttons-group-label"
          value={values.gender ?? ''}
          name="radio-buttons-group"
          onChange={e => setValue('gender', +e.target.value)}
        >
          <FormControlLabel value={1} control={<Radio />} label="Male" />
          <FormControlLabel value={2} control={<Radio />} label="Female" />
        </RadioGroup>
      </>
    )
  }

  function renderBirthdateLabel() {
    return (
      <>
        <FormLabel
          id="demo-radio-buttons-group-label"
          error={!!errors.birthDate?.day || !!errors.birthDate?.month || !!errors.birthDate?.year}
        >
          BirthDate
        </FormLabel>
      </>
    )
  }

  function renderDayForBirthdate() {
    return (
      <FormControl fullWidth>
        <CustomSelect
          control={{
            label: 'Day',
            id: 'dayForBirthdate',
            value: values.birthDate?.day ?? '',
            valueOptions: DateConstant.days,
            onSelectChanged: e => setValue('birthDate.day', +e),
            mapToLabel: e => e,
            mapToValue: e => e,
            isError: !!errors.birthDate?.day
          }}
        />
      </FormControl>
    )
  }

  function renderMonthForBirthdate() {
    return (
      <FormControl fullWidth>
        <CustomSelect
          control={{
            label: 'Month',
            id: 'monthForBirthdate',
            value: values.birthDate?.month ?? '',
            valueOptions: DateConstant.months.map(e => e.number),
            onSelectChanged: e => setValue('birthDate.month', +e),
            mapToLabel: e => DateConstant.months.find(m => m.number === +e)?.name,
            mapToValue: e => e,
            isError: !!errors.birthDate?.month
          }}
        />
      </FormControl>
    )
  }

  function renderYearForBirthdate() {
    return (
      <FormControl fullWidth>
        <CustomSelect
          control={{
            label: 'Year',
            id: 'yearForBirthdate',
            value: values.birthDate?.year ?? '',
            valueOptions: DateConstant.years(),
            onSelectChanged: e => setValue('birthDate.year', +e),
            mapToLabel: e => e,
            mapToValue: e => e,
            isError: !!errors.birthDate?.year
          }}
        />
      </FormControl>
    )
  }

  function renderEmailInput() {
    return (
      <CustomTextField
        {...register('email', { required: true })}
        id="email"
        label="Email"
        placeholder="Please enter you email"
        type="email"
        value={values.email ?? ''}
        onChange={e => setValue('email', e.target.value)}
        error={!!errors.email}
        helperText={errors.email?.message}
      />
    )
  }

  function renderPhoneNumberInput() {
    return (
      <CustomTextField
        {...register('phoneNumber', {
          required: true,
          pattern: {
            value: /^(0)\d{9}/i,
            message: 'Invalid pattern phone number'
          }
        })}
        id="phoneNumber"
        label="Phone Number"
        placeholder="Please enter you phone number"
        type="tel"
        value={values.phoneNumber ?? ''}
        onChange={e => setValue('phoneNumber', e.target.value)}
        error={!!errors.phoneNumber}
        helperText={errors.phoneNumber?.message}
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
      />
    )
  }

  function renderConfirmPasswordInput() {
    return (
      <CustomTextField
        {...register('confirmPassword', {
          required: true
        })}
        id="confirm-password"
        label="Confirm password"
        type="password"
        placeholder="Enter confirm password"
        value={values.confirmPassword ?? ''}
        onChange={e => setValue('confirmPassword', e.target.value)}
        error={!!errors.confirmPassword}
        helperText={errors.confirmPassword?.message}
      />
    )
  }

  const errorBox = () => {
    return (
      errorMessage && <div className="py-4 px-2 bg-red-200 text-red-900 rounded mb-4 text-center">{errorMessage}</div>
    )
  }

  const onSubmit: SubmitHandler<CreateUserSchema> = async data => {
    try {
      const request: SignupRequest = {
        name: data.name,
        username: data.username,
        password: data.password,
        email: data.email,
        userTypeId: UserTypeConstant.CUSTOMER_ID,
        role: [RoleTypeConstant.ROLE_USER_ID, RoleTypeConstant.ROLE_MODERATOR_ID],
        gender: {
          id: data.gender
        },
        tal: data.phoneNumber,
        birthday: new Date(`${data.birthDate.year}-${data.birthDate.month}-${data.birthDate.day}`)
      }
      await signup.trigger(request)
      routeToSigninPage({ isSignupSuccess: true, username: data.username })
    } catch (error) {
      if (typeof error === 'string') {
        setErrorMessage(error as string)
      } else if (error instanceof Error) {
        setErrorMessage(error.message)
      }
      console.error(error)
    }
  }

  const routeToSigninPage = ({ username, isSignupSuccess = false }: SearchParamsSignup) => {
    route.to('/auth/customer/signin', { username, isSignupSuccess })
  }

  return (
    <AuthPage>
      <Container className="flex flex-col items-center justify-center w-2/4 p-14">
        <div className="flex flex-col w-full">
          <div className="font-bold text-4xl text-primary pb-4">Get Started Customer </div>
          <div className="text-gray-500 pb-10">
            Already have an account?{' '}
            <TextHover className="font-semibold text-primary" onClick={() => route.to('/auth/customer/signin')}>
              Sign In
            </TextHover>
          </div>
        </div>
        <FormControl onSubmit={handleSubmit(onSubmit)}>
          {errorBox()}
          <Box component="form" autoComplete="off">
            <Grid container spacing={2}>
              <Grid item xs={6} md={6}>
                {renderNameInput()}
              </Grid>
              <Grid item xs={6} md={6}>
                {renderUserNameInput()}
              </Grid>
              <Grid item md={12}>
                {renderRadioGender()}
              </Grid>
              <Grid item md={12}>
                {renderBirthdateLabel()}
              </Grid>
              <Grid item md={4}>
                {renderDayForBirthdate()}
              </Grid>

              <Grid item md={4}>
                {renderMonthForBirthdate()}
              </Grid>

              <Grid item md={4}>
                {renderYearForBirthdate()}
              </Grid>

              <Grid item md={6}>
                {renderEmailInput()}
              </Grid>
              <Grid item md={6}>
                {renderPhoneNumberInput()}
              </Grid>
              <Grid item md={6}>
                {renderPasswordInput()}
              </Grid>
              <Grid item md={6}>
                {renderConfirmPasswordInput()}
              </Grid>
              <Grid item md={12}>
                <LoadingButton variant="contained" loading={signup.isLoading} size="large" fullWidth type="submit">
                  Sign Up
                </LoadingButton>
                <div className="text-gray-500 pt-8">
                  By signing up, I agree to the <span className="underline text-primary">Teams of Service</span> and
                </div>
                <div className="underline text-primary">Privacy Policy</div>
              </Grid>
            </Grid>
          </Box>
        </FormControl>
      </Container>
    </AuthPage>
  )
}
