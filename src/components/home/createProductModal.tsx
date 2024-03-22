'use client'
import CustomButton from '@/components/util/customButton'
import CustomTextField from '@/components/util/customTextField'
import { ApiException } from '@/model/exception/apiException'
import { CreateProductRequest } from '@/model/product/createProductRequest'
import { useAppSelector } from '@/redux/store'
import { useServiceProduct } from '@/service/reno/useServiceProduct'
import { Dialog, Transition } from '@headlessui/react'
import { yupResolver } from '@hookform/resolvers/yup'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import { Box, Grid, MenuItem } from '@mui/material'
import FormControl from '@mui/material/FormControl'
import { AxiosError } from 'axios'
import React, { Fragment, useRef, useState } from 'react'
import { SubmitHandler, useForm, useWatch } from 'react-hook-form'
import * as yup from 'yup'

const schema = yup.object({
  name: yup.string().min(3).max(50).required('Name is required'),
  price: yup.number().typeError('Amount must be a number').required('Price is required'),
  productTypeId: yup.number().typeError('Amount must be a number').required('Product type is required'),
  productStatusId: yup.number().typeError('Amount must be a number').required('Product status is required'),
  amount: yup.number().typeError('Amount must be a number').required('Amount is required'),
  detail: yup.string().max(300)
})

type CreateUserSchema = yup.InferType<typeof schema>

export interface SearchParamsSignup {
  email?: string
  isSignupSuccess?: boolean
}

interface CreateProductModalContext {
  setShowModel?: (isShow: boolean) => void
}

export const CreateProductModalContext = React.createContext<CreateProductModalContext>({})

export default function CreateProductModal(props: { children: React.ReactNode }) {
  const { postProduct } = useServiceProduct()
  const { getAllProductStatus, getAllProductType } = useServiceProduct()
  const [errorMessage, setErrorMessage] = useState<string | undefined>()
  const [isCreateSuccess, setIsCreateSuccess] = useState<boolean>(false)
  const [open, setOpen] = useState(false)
  const storeSelected = useAppSelector(store => store.storeReducer.storeEmployee.selected)
  const cancelButtonRef = useRef(null)
  const setShowModel = (isShow: boolean) => setOpen(isShow)

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
      <CustomTextField
        {...register('name')}
        id="name"
        label="Name"
        placeholder="Please enter you name"
        type="text"
        value={values.name ?? ''}
        onChange={e => setValue('name', e.target.value)}
        error={!!errors.name}
        helperText={errors.name?.message}
      />
    )
  }

  function renderPriceInput() {
    return (
      <CustomTextField
        {...register('price')}
        id="price"
        label="Price"
        placeholder="Please enter product price"
        type="number"
        value={values.price ?? ''}
        onChange={e => setValue('price', +e.target.value)}
        error={!!errors.price}
        helperText={errors.price?.message}
      />
    )
  }

  function renderAmountInput() {
    return (
      <CustomTextField
        {...register('amount')}
        id="amount"
        label="Amount"
        placeholder="Please enter product amount"
        type="number"
        value={values.amount ?? ''}
        onChange={e => setValue('amount', +e.target.value)}
        error={!!errors.amount}
        helperText={errors.amount?.message}
      />
    )
  }

  function renderDetailInput() {
    return (
      <>
        <CustomTextField
          {...register('detail')}
          id="detail"
          label="Description (Optional)"
          placeholder="Please enter product description"
          type="text"
          value={values.detail ?? ''}
          onChange={e => setValue('detail', e.target.value)}
          error={!!errors.detail}
          rows={4}
          multiline
          helperText={errors.detail?.message}
        />
      </>
    )
  }

  function renderProductTypeSelect() {
    return (
      <CustomTextField
        {...register('productTypeId')}
        id="product-type-select"
        value={`${values.productTypeId ?? ''}`}
        label="Product Type"
        onChange={e => setValue('productTypeId', +e.target.value)}
        error={!!errors.productTypeId}
        helperText={errors.productTypeId?.message}
        select
      >
        {getAllProductType.data?.map(e => (
          <MenuItem key={e.nameEn} value={e.id}>
            {e.nameTh ?? ''}
          </MenuItem>
        ))}
      </CustomTextField>
    )
  }

  function renderProductStatusSelect() {
    return (
      <CustomTextField
        {...register('productStatusId')}
        id="product-status-select"
        value={`${values.productStatusId ?? ''}`}
        label="Product Status"
        onChange={e => setValue('productStatusId', +e.target.value)}
        error={!!errors.productStatusId}
        helperText={errors.productStatusId?.message}
        select
      >
        {getAllProductStatus.data?.map(e => (
          <MenuItem key={e.nameEn} value={e.id}>
            {e.nameTh ?? ''}
          </MenuItem>
        ))}
      </CustomTextField>
    )
  }

  const errorBox = () => {
    return (
      errorMessage && <div className="py-4 px-2 bg-red-200 text-red-900 rounded mb-4 text-center">{errorMessage}</div>
    )
  }

  const onSubmit: SubmitHandler<CreateUserSchema> = async data => {
    try {
      if (!storeSelected?.id) {
        throw new Error('Store is not selected')
      }
      const request: CreateProductRequest = {
        name: data.name,
        amount: data.amount,
        detail: data.detail,
        price: data.price,
        productStatus: {
          id: data.productStatusId
        },
        productTypes: [
          {
            id: data.productTypeId
          }
        ],
        storeId: storeSelected?.id
      }
      await postProduct.trigger(request)
      setIsCreateSuccess(true)
    } catch (error) {
      debugger

      if (typeof error === 'string') {
        setErrorMessage(error as string)
      } else if (error instanceof Error) {
        setErrorMessage(error.message)
      } else if (error instanceof ApiException) {
        debugger
        // const _error = error as AxiosError<BadRequest>
        // _error.response?.data[0].errorMessage
      }
      console.error(error)
    }
  }

  const renderContent = () => {
    if (isCreateSuccess) {
      return (
        <div className="flex w-full items-center flex-col justify-center">
          <div className="flex w-full justify-center">
            <CheckCircleIcon color="success" style={{ fontSize: 86 }} />
          </div>
          <div className="text-2xl font-semibold">Success</div>
          <CustomButton text="Close" className="w-full mt-6" onClick={() => setOpen(false)} />
        </div>
      )
    }
    return (
      <>
        <Dialog.Title as="h3" className="text-xl font-semibold leading-6 text-primary">
          Create New Product
        </Dialog.Title>
        <Dialog.Title className="text-sm leading-6 text-gray-400">
          You are going to create new product to store <span className="text-primary">{storeSelected?.name}</span>
        </Dialog.Title>
        <div className="mt-6">
          <FormControl onSubmit={handleSubmit(onSubmit)} fullWidth>
            {errorBox()}
            <Box sx={{ flexGrow: 1 }} component="form" autoComplete="on">
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  {renderNameInput()}
                </Grid>
                <Grid item xs={6}>
                  {renderPriceInput()}
                </Grid>
                <Grid item xs={6}>
                  {renderAmountInput()}
                </Grid>
                <Grid item xs={6}>
                  <FormControl fullWidth>{renderProductTypeSelect()}</FormControl>
                </Grid>
                <Grid item xs={6}>
                  <FormControl fullWidth>{renderProductStatusSelect()}</FormControl>
                </Grid>
                <Grid item xs={12}>
                  {renderDetailInput()}
                </Grid>
                <Grid item xs={12}>
                  <CustomButton text="Create" loading={postProduct.isLoading} type="submit" className="w-full" />
                </Grid>
              </Grid>
            </Box>
          </FormControl>
        </div>
      </>
    )
  }
  return (
    <CreateProductModalContext.Provider value={{ setShowModel }}>
      <Transition.Root show={open} as={Fragment}>
        <Dialog as="div" className="relative z-10" initialFocus={cancelButtonRef} onClose={setOpen}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>
          <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-3xl px-24 py-12">
                  <div className="sm:flex sm:items-start w-full">
                    <div className="mt-3 text-center sm:mt-0 sm:text-left w-full">{renderContent()}</div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
      {props.children}
    </CreateProductModalContext.Provider>
  )
}
