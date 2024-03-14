'use client'
import { yupResolver } from '@hookform/resolvers/yup'
import { Box, Grid } from '@mui/material'
import FormControl from '@mui/material/FormControl'
import CustomizedButtons from '~/components/util/customButton'
import CustomTextField from '~/components/util/customTextField'
import InputImageUpload from '~/components/util/uploadImage'
import useRoute from '~/hook/router'
import { ChangeEvent, useState } from 'react'
import { SubmitHandler, useForm, useWatch } from 'react-hook-form'
import { useServiceCustomer } from '~/service/reno/useServiceCustomer'
import * as yup from 'yup'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'

const schema = yup.object({
  storeName: yup.string().min(3).max(50).required('Name is required'),
  detail: yup.string().max(300),
  phoneNumber: yup.string().min(10).max(10).required('Phone number is required'),
  houseNumber: yup.string().max(10).required('House number is required'),
  subdistrict: yup.string().max(10).required('Subdistrict is required'),
  district: yup.string().max(10).required('District is required'),
  province: yup.string().max(10).required('Province is required'),
  provinceCode: yup.number().max(10).required('Province code is required')
})

type CreateUserSchema = yup.InferType<typeof schema>

export interface SearchParamsSignup {
  email?: string
  isSignupSuccess?: boolean
}

interface ContentCreateStoreProps {
  activeId: number
  onPrevious: () => void
}

export default function ContentCreateStore(props: ContentCreateStoreProps) {
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

  function renderInput<T extends Parameters<typeof register>, RegisterType extends T[0]>(param: {
    label: string
    registerType: RegisterType
    value: string | number | undefined
    isError: boolean
    errorMessage: string | undefined
    onSetValue: (registerType: RegisterType, e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
    inputType: React.InputHTMLAttributes<unknown>['type']
    rows?: number
  }) {
    const onChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      param.onSetValue(param.registerType, e)
    }
    return (
      <CustomTextField
        className="w-full flex"
        {...register(param.registerType)}
        id={param.registerType.toString()}
        label={param.label}
        placeholder={`Please enter you ${param.label.toLowerCase()}`}
        type={param.inputType}
        value={param.value ?? ''}
        onChange={e => onChange(e)}
        error={param.isError}
        multiline={!!param.rows}
        rows={param.rows}
        helperText={param.errorMessage}
      />
    )
  }

  const objInput: { [K in Parameters<typeof register>[0]]: React.JSX.Element } = {
    storeName: renderInput({
      label: 'Store Name',
      inputType: 'text',
      value: values.storeName,
      onSetValue: (t, e) => setValue(t, e.target.value),
      isError: !!errors.storeName,
      errorMessage: errors.storeName?.message,
      registerType: 'storeName'
    }),
    detail: renderInput({
      registerType: 'detail',
      label: 'detail',
      inputType: 'text',
      value: values.detail,
      onSetValue: (t, e) => setValue(t, e.target.value),
      isError: !!errors.detail,
      errorMessage: errors.detail?.message,
      rows: 4
    }),
    houseNumber: renderInput({
      registerType: 'houseNumber',
      label: 'House Number',
      inputType: 'text',
      value: values.houseNumber,
      onSetValue: (t, e) => setValue(t, e.target.value),
      isError: !!errors.houseNumber,
      errorMessage: errors.houseNumber?.message
    }),
    phoneNumber: renderInput({
      registerType: 'phoneNumber',
      label: 'Phone Number',
      inputType: 'text',
      value: values.phoneNumber,
      onSetValue: (t, e) => setValue(t, e.target.value),
      isError: !!errors.phoneNumber,
      errorMessage: errors.phoneNumber?.message
    }),
    province: renderInput({
      registerType: 'province',
      label: 'province',
      inputType: 'text',
      value: values.province,
      onSetValue: (t, e) => setValue(t, e.target.value),
      isError: !!errors.province,
      errorMessage: errors.province?.message
    }),
    provinceCode: renderInput({
      registerType: 'provinceCode',
      label: 'Province Code',
      inputType: 'number',
      value: values.provinceCode,
      onSetValue: (t, e) => setValue(t, +e.target.value),
      isError: !!errors.provinceCode,
      errorMessage: errors.provinceCode?.message
    }),
    subdistrict: renderInput({
      registerType: 'subdistrict',
      label: 'Subdistrict',
      inputType: 'text',
      value: values.subdistrict,
      onSetValue: (t, e) => setValue(t, e.target.value),
      isError: !!errors.subdistrict,
      errorMessage: errors.subdistrict?.message
    }),
    district: renderInput({
      registerType: 'district',
      label: 'District',
      inputType: 'text',
      value: values.district,
      onSetValue: (t, e) => setValue(t, e.target.value),
      isError: !!errors.district,
      errorMessage: errors.district?.message
    })
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
    <FormControl onSubmit={handleSubmit(onSubmit)} className="flex w-full">
      {errorBox()}
      <Box className="flex-grow w-full">
        {/* {props.activeId === 1 && (
          <>
            <div className="w-full flex pb-6">
              <InputImageUpload />
            </div>
          </>
        )} */}
        <Grid container spacing={2}>
          {props.activeId === 1 && (
            <>
              <Grid item xs={12}>
                <div className="flex">
                  <div className="flex pb-6 pr-6">
                    <InputImageUpload />
                  </div>
                  <div className="flex flex-col w-full">
                    <div className="pb-6">{objInput.storeName}</div>
                    <div className="">{objInput.detail}</div>
                  </div>
                </div>
              </Grid>
              <Grid item xs={12}>
                <div className="flex w-full justify-end">
                  <CustomizedButtons text="Next" />
                </div>
              </Grid>
            </>
          )}
          {props.activeId === 2 && (
            <>
              <Grid item xs={6}>
                {objInput.houseNumber}
              </Grid>
              <Grid item xs={6}>
                {objInput.subdistrict}
              </Grid>
              <Grid item xs={6}>
                {objInput.district}
              </Grid>
              <Grid item xs={6}>
                {objInput.province}
              </Grid>
              <Grid item xs={6}>
                {objInput.provinceCode}
              </Grid>
              <Grid item xs={6}>
                {objInput.phoneNumber}
              </Grid>
              <Grid item xs={12}>
                <div className="flex w-full justify-between">
                  <CustomizedButtons text="Previous" variant="sorf" onClick={() => props.onPrevious()} />
                  <CustomizedButtons text="Confirm" />
                </div>
              </Grid>
            </>
          )}
          {props.activeId === 3 && (
            <Grid item xs={12}>
              <div className="flex items-center justify-center">
                <div className="text-4xl text-primary text-semibold pr-4">Completed</div>
                <CheckCircleIcon sx={{ fontSize: '40px' }} className="text-primary" />
              </div>
            </Grid>
          )}
        </Grid>
      </Box>
    </FormControl>
  )
}
