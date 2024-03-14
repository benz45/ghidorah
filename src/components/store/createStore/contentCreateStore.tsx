'use client'
import { yupResolver } from '@hookform/resolvers/yup'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import { Box, Grid } from '@mui/material'
import FormControl from '@mui/material/FormControl'
import React, { ChangeEvent, useState } from 'react'
import { SubmitHandler, useForm, useWatch } from 'react-hook-form'
import * as yup from 'yup'
import CustomButton from '@/components/util/customButton'
import CustomTextField from '@/components/util/customTextField'
import InputImageUpload from '@/components/util/inputImageUpload'
import useRoute from '@/hook/router'
import { useServiceStore } from '@/service/reno/useServiceStore'

const schema = yup.object({
  storeName: yup.string().min(3).max(50).required('Name is required'),
  detail: yup.string().max(300),
  phoneNumber: yup.string().min(10).max(10).required('Phone number is required'),
  houseNumber: yup.string().required('House number is required'),
  subdistrict: yup.string().required('Subdistrict is required'),
  district: yup.string().required('District is required'),
  province: yup.string().required('Province is required'),
  postalcode: yup.number().required('Province code is required')
})

type CreateStoreSchema = yup.InferType<typeof schema>

export interface SearchParamsSignup {
  email?: string
  isSignupSuccess?: boolean
}

interface ContentCreateStoreProps {
  activeId: number
  onPrevious: () => void
}

export default function ContentCreateStore(props: ContentCreateStoreProps) {
  const { postStore } = useServiceStore()

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
      postStore.trigger({
        employeeId: 1,
        storeName: data.storeName,
        detail: data.detail ?? '',
        address: {
          houseNumber: data.houseNumber,
          district: data.district,
          subdistrict: data.subdistrict,
          province: data.province,
          postalcode: data.postalcode,
          tal: data.phoneNumber
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
    <FormControl onSubmit={handleSubmit(onSubmit)} className="flex w-full">
      {errorBox()}
      <Box component="form" autoComplete="off" className="flex-grow w-full">
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
                  <CustomButton text="Next" />
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
                {objInput.postalcode}
              </Grid>
              <Grid item xs={6}>
                {objInput.phoneNumber}
              </Grid>
              <Grid item xs={12}>
                <div className="flex w-full justify-between">
                  <CustomButton text="Previous" variant="sorf" onClick={() => props.onPrevious()} />
                  <CustomButton type="submit" text="Confirm" />
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
