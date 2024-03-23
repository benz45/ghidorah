'use client'
import React, { useEffect } from 'react'

import AddIcon from '@mui/icons-material/Add'
import CloseIcon from '@mui/icons-material/Close'
import EditIcon from '@mui/icons-material/Edit'
import PrintIcon from '@mui/icons-material/Print'
import SearchIcon from '@mui/icons-material/Search'

import CreateProductModal, { CreateProductModalContext } from '@/components/home/createProductModal'
import CustomizedMenus from '@/components/util/customMeno'
import { ProductResponse } from '@/model/product/productResponse'
import { setProductPage } from '@/redux/reducers/product.reducer'
import { AppDispatch, useAppSelector } from '@/redux/store'
import { useWatcherService } from '@/service/http/methods'
import { useServiceProduct } from '@/service/reno/useServiceProduct'
import { getFormattedDate } from '@/util/util'
import { TabContext, TabList, TabPanel } from '@mui/lab'
import { Box, Grid, Tab } from '@mui/material'
import { useDispatch } from 'react-redux'

export default function HomePage() {
  const dispatch = useDispatch<AppDispatch>()
  const { getProduct } = useServiceProduct()
  const selectedStore = useAppSelector(store => store.storeReducer.storeEmployee.selected)
  const { data: productPage } = useWatcherService(getProduct, { storeId: selectedStore?.id })
  useEffect(() => {
    dispatch(setProductPage(productPage))
  }, [productPage])
  return (
    <div className="flex w-full">
      <Page pageId={1}>
        <PageHeader>
          <CreateProductModal>
            <PageLabel />
            <ProductPageOptions />
          </CreateProductModal>
        </PageHeader>
        <PageSearch />
        <PageContent />
      </Page>
      <Page pageId={2}>
        <PageLabel />
        <PageSearch />
        <PageContent />
      </Page>
      <Page pageId={3}>
        <PageLabel />
        {/* <PageSearch /> */}
        <PageContent />
      </Page>
      <Page pageId={4}>
        <PageLabel />
        <PageSearch />
        {/* <PageContent /> */}
      </Page>
    </div>
  )
}

function ProductPageOptions() {
  const createProductModalContext = React.useContext(CreateProductModalContext)
  return (
    <PageOptions>
      <CustomizedMenus
        menulabel="Options"
        options={[
          {
            icon: <AddIcon />,
            label: 'Add Product',
            onClick: () => createProductModalContext.setShowModel?.(true)
          }
        ]}
      />
    </PageOptions>
  )
}

function Page(props: { children: React.ReactNode } & { pageId: number }) {
  const { headerLabelSelected } = useAppSelector(store => store.baseLayoutReducer)
  return (
    <div className={`${headerLabelSelected?.id !== props.pageId ? ` hidden` : ' flex w-full flex-col pr-10'}`}>
      {props.children}
    </div>
  )
}

function PageHeader(props: { children: React.ReactNode }) {
  return <div className="flex w-full justify-between">{props.children}</div>
}
function PageOptions(props: { children: React.ReactNode }) {
  return <div className="">{props.children}</div>
}

function PageLabel() {
  const { headerLabelSelected } = useAppSelector(store => store.baseLayoutReducer)
  return <div className="text-3xl font-bold">{headerLabelSelected?.label}</div>
}

function PageSearch() {
  return (
    <div className="flex w-96 h-12 bg-white p-2  px-4 rounded-lg items-center mt-4 ">
      <SearchIcon className="text-primary" />
      <div className="text-gray-400 ml-2">Search for foods, drinks, etc.</div>
    </div>
  )
}

function PageContent() {
  const [value, setValue] = React.useState('1')

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue)
  }

  return (
    <div className="mt-4">
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList onChange={handleChange} aria-label="lab API tabs example">
            <Tab label="All" value="1" className="text-gray-200" />
            <Tab label="Dine in" value="2" />
            <Tab label="To go" value="3" />
            <Tab label="Delivery" value="4" />
          </TabList>
        </Box>
        <TabPanel value="1">
          <ProductItems />
        </TabPanel>
        <TabPanel value="2">Dine in</TabPanel>
        <TabPanel value="3">To go</TabPanel>
        <TabPanel value="4">Delivery</TabPanel>
      </TabContext>
    </div>
  )
}

function ProductItems() {
  const productPage = useAppSelector(store => store.productReducer.productPage)
  if (productPage?.entities) {
    return (
      <Grid container rowSpacing={3} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        {productPage.entities.map((elem, index) => (
          <Grid item xs={12} md={12} lg={6} xl={3}>
            <ProductBox key={`ProductItems${index}`} value={elem} />
          </Grid>
        ))}
      </Grid>
    )
  }
  return (
    <Grid container rowSpacing={3} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
      <Grid item xs={4}>
        <ProductBoxLoading />
      </Grid>
      <Grid item xs={4}>
        <ProductBoxLoading />
      </Grid>
      <Grid item xs={4}>
        <ProductBoxLoading />
      </Grid>
      <Grid item xs={4}>
        <ProductBoxLoading />
      </Grid>
    </Grid>
  )
}

function ProductBox(props: { value: ProductResponse }) {
  return (
    <div className="bg-white rounded-lg bg-opacity-70 ">
      <div className="flex flex-col p-6">
        <div className="w-full flex justify-between">
          <div className="text-md font-semibold">{props.value.name}</div>
          <div className="text-md font-semibold">{props.value.price}.-</div>
        </div>
        <div className="w-full flex justify-between mt-2">
          <div className="text-sm font-light">ID. {props.value.id}</div>
          <div className="text-sm font-light">{getFormattedDate(props.value.createdAt)}</div>
        </div>
        <div className="flex mt-4 justify-between">
          <div className="flex">
            <div className="px-8 py-1 text-xs text-center bg-primary text-white rounded-lg flex justify-center items-center mr-2 cursor-pointer">
              <div>Select</div>
            </div>
          </div>
          <div className="flex">
            <div className="py-1 px-1 rounded-lg bg-gray-100 text-gray-400 ml-2">
              <CloseIcon />
            </div>
            <div className="py-1 px-1 rounded-lg bg-gray-100 text-gray-400 ml-2">
              <PrintIcon />
            </div>
            <div className="py-1 px-1 rounded-lg bg-gray-100 text-gray-400 ml-2">
              <EditIcon />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-[#EDFCF7] rounded-b-lg px-6 py-2 border-dashed border-t-2 border-success">
        <div className="text-success text-sm">Dine in</div>
      </div>
    </div>
  )
}

function ProductBoxLoading() {
  return (
    <div className=" bg-white bg-opacity-70 rounded-md p-4 max-w-sm w-full mx-auto">
      <div className="animate-pulse flex space-x-4">
        <div className="flex-1 space-y-6 py-6">
          <div className="space-y-5">
            <div className="grid grid-cols-4 gap-5">
              <div className="h-2 bg-slate-300 rounded col-span-2"></div>
              <div className="h-2 bg-white rounded col-span-1"></div>
              <div className="h-2 bg-slate-300 rounded col-span-1"></div>
            </div>
            <div className="grid grid-cols-4 gap-4">
              <div className="h-2 bg-slate-300 rounded col-span-3"></div>
              <div className="h-2 bg-slate-300 rounded col-span-1"></div>
            </div>
            <div className="grid grid-cols-4 gap-4">
              <div className="h-2 bg-slate-300 rounded col-span-1"></div>
              <div className="h-2 bg-slate-300 rounded col-span-3"></div>
            </div>
          </div>
          <div className="h-2 bg-slate-300 rounded"></div>
        </div>
      </div>
    </div>
  )
}
