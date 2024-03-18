'use client'
import CustomButton from '@/components/util/customButton'
import CustomTextField from '@/components/util/customTextField'
import InputImageUpload from '@/components/util/inputImageUpload'
import useRoute from '@/hook/router'
import { useAppSelector } from '@/redux/store'
import { useServiceStore } from '@/service/reno/useServiceStore'
import { yupResolver } from '@hookform/resolvers/yup'
import { Box, Grid } from '@mui/material'
import FormControl from '@mui/material/FormControl'
import React, { ChangeEvent, useState } from 'react'
import { SubmitHandler, useForm, useWatch } from 'react-hook-form'
import * as yup from 'yup'

const schema = yup.object({
  storeName: yup.string().min(3).max(50).required('Name is required'),
  detail: yup.string().max(300),
  phoneNumber: yup.string().min(10).max(10).required('Phone number is required'),
  houseNumber: yup.string().required('House number is required'),
  subdistrict: yup.string().required('Subdistrict is required'),
  district: yup.string().required('District is required'),
  province: yup.string().required('Province is required'),
  postalcode: yup.number().typeError('Amount must be a number').required('Province code is required')
})

type CreateStoreSchema = yup.InferType<typeof schema>

export interface SearchParamsSignup {
  email?: string
  isSignupSuccess?: boolean
}

interface ContentCreateStoreProps {}

export default function ContentCreateStore(props: ContentCreateStoreProps) {
  const { postStoreEmployee } = useServiceStore()
  const employeeId = useAppSelector(store => store.employeeReducer.employee?.id)
  const route = useRoute<SearchParamsSignup>()

  const [errorMessage, setErrorMessage] = useState<string | undefined>()
  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors }
  } = useForm<CreateStoreSchema>({ resolver: yupResolver(schema), mode: 'onSubmit', reValidateMode: 'onSubmit' })
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
    const getValue = () => {
      if (param.inputType == 'number') {
        return param.value
      }
      return param.value ?? ''
    }
    return (
      <CustomTextField
        className="w-full flex"
        {...register(param.registerType)}
        id={param.registerType.toString()}
        label={param.label}
        placeholder={`Please enter you ${param.label.toLowerCase()}`}
        type={param.inputType}
        value={getValue()}
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
      rows: 3
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
    postalcode: renderInput({
      registerType: 'postalcode',
      label: 'Postal Code',
      inputType: 'number',
      value: values.postalcode,
      onSetValue: (t, e) => setValue(t, +e.target.value),
      isError: !!errors.postalcode,
      errorMessage: errors.postalcode?.message
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

  const onSubmit: SubmitHandler<CreateStoreSchema> = async data => {
    try {
      if (!employeeId) throw new Error('Customer not found.')
      postStoreEmployee.trigger({
        storeName: data.storeName,
        detail: data.detail ?? '',
        address: {
          houseNumber: data.houseNumber,
          district: data.district,
          subdistrict: data.subdistrict,
          province: data.province,
          postalcode: data.postalcode,
          tal: data.phoneNumber
        },
        path: {
          employeeId
        }
      })
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
    <div className="flex bg-white w-full justify-center rounded-lg">
      <div className="block 3xl:w-1/2 xl:w-1/2 md:w-1/2 lg:w-1/2 sm:w-1/2 p-8">
        <div className="flex w-full">
          <FormControl onSubmit={handleSubmit(onSubmit)} className="flex w-full">
            {errorBox()}
            <Grid item xs={12}>
              <div className="flex flex-col items-center w-full h-full pb-8">
                <div className="text-3xl text-primary font-semibold pr-4 ">Create Store</div>
                <span className="text-lg text-gray-400">Lorem ipsum dolor sit, amet consectetur adipisicing elit.</span>
              </div>
            </Grid>
            <Box component="form" autoComplete="off" className="flex-grow w-full">
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <div className="flex">
                    <div className="flex flex-col items-center pr-6">
                      <InputImageUpload />
                      <div className="pt-2 text-primary">Upload image</div>
                    </div>
                    <div className="flex flex-col w-full">
                      <div className="pb-6">{objInput.storeName}</div>
                      <div className="">{objInput.detail}</div>
                    </div>
                  </div>
                </Grid>
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
                  {objInput.postalcode}
                </Grid>
                <Grid item xs={6}>
                  {objInput.phoneNumber}
                </Grid>
                <Grid item xs={12}>
                  <div className="flex w-full justify-between">
                    <CustomButton text="Previous" variant="sorf" />
                    <CustomButton type="submit" text="Confirm" className="w-full ml-4" />
                  </div>
                </Grid>
              </Grid>
            </Box>
          </FormControl>
        </div>
      </div>
    </div>
  )
}
