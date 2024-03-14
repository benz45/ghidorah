'use client'
import { yupResolver } from '@hookform/resolvers/yup'
import { LoadingButton } from '@mui/lab'
import { Box, Grid } from '@mui/material'
import FormControl from '@mui/material/FormControl'
import { useState } from 'react'
import { SubmitHandler, useForm, useWatch } from 'react-hook-form'
import * as yup from 'yup'
import CustomTextField from '~/components/util/customTextField'
import useRoute from '~/hook/router'
import { useServiceCustomer } from '~/service/reno/useServiceCustomer'

const schema = yup.object({
  name: yup.string().min(3).max(50).required('Name is required'),
  price: yup.number().required('Price is required'),
  amount: yup.number().required('Amount is required'),
  detail: yup.string().max(300)
})

type CreateUserSchema = yup.InferType<typeof schema>

export interface SearchParamsSignup {
  email?: string
  isSignupSuccess?: boolean
}

export default function FormCreateProductModel() {
  const { postCustomer } = useServiceCustomer()

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

  function renderPriceInput() {
    return (
      <>
        <CustomTextField
          {...register('price')}
          id="price"
          label="Price"
          placeholder="Please enter product price"
          type="text"
          value={values.price ?? ''}
          onChange={e => setValue('price', +e.target.value)}
          error={!!errors.price}
          helperText={errors.price?.message}
        />
      </>
    )
  }

  function renderAmountInput() {
    return (
      <>
        <CustomTextField
          {...register('amount')}
          id="amount"
          label="Amount"
          placeholder="Please enter product amount"
          type="text"
          value={values.amount ?? ''}
          onChange={e => setValue('amount', +e.target.value)}
          error={!!errors.amount}
          helperText={errors.amount?.message}
        />
      </>
    )
  }

  function renderDetailInput() {
    return (
      <>
        <CustomTextField
          {...register('detail')}
          id="detail"
          label="Detail"
          placeholder="Please enter product detail"
          type="text"
          value={values.detail ?? ''}
          onChange={e => setValue('detail', e.target.value)}
          error={!!errors.detail}
          helperText={errors.detail?.message}
        />
      </>
    )
  }

  const errorBox = () => {
    return (
      errorMessage && <div className="py-4 px-2 bg-red-200 text-red-900 rounded mb-4 text-center">{errorMessage}</div>
    )
  }

  const onSubmit: SubmitHandler<CreateUserSchema> = async data => {
    try {
      // const createCustomerRequest: CreateCustomerRequest = {
      //   name: data.name,
      //   username: data.username,
      //   password: data.password,
      //   email: data.email,
      //   gender: {
      //     id: data.gender
      //   },
      //   tal: data.phoneNumber,
      //   birthday: new Date(`${data.birthDate.year}-${data.birthDate.month}-${data.birthDate.day}`)
      // }
      // const customerResponse: CustomerResponse | undefined = await createCustomer(createCustomerRequest)
      // routeToSigninPage({ isSignupSuccess: true, email: customerResponse?.email })
    } catch (error) {
      if (typeof error === 'string') {
        setErrorMessage(error as string)
      } else if (error instanceof Error) {
        setErrorMessage(error.message)
      }
      console.error(error)
    }
  }

  const routeToSigninPage = ({ email = '', isSignupSuccess = false }: SearchParamsSignup) => {
    route.to('/auth', { email, isSignupSuccess })
  }

  return (
    <FormControl onSubmit={handleSubmit(onSubmit)}>
      {errorBox()}
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            {renderNameInput()}
          </Grid>
          <Grid item xs={6}>
            {renderPriceInput()}
          </Grid>
          <Grid item xs={6}>
            {renderAmountInput()}
          </Grid>
          <Grid item xs={12}>
            {renderDetailInput()}
          </Grid>
          <Grid item xs={12}>
            <LoadingButton variant="contained" loading={postCustomer.isLoading} size="large" fullWidth type="submit">
              Add Product
            </LoadingButton>
          </Grid>
        </Grid>
      </Box>
    </FormControl>
  )
}
