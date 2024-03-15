'use client'
import React, { useContext } from 'react'

import AddIcon from '@mui/icons-material/Add'
import CloseIcon from '@mui/icons-material/Close'
import EditIcon from '@mui/icons-material/Edit'
import PrintIcon from '@mui/icons-material/Print'
import SearchIcon from '@mui/icons-material/Search'

import StorefrontIcon from '@mui/icons-material/Storefront'
import { TabContext, TabList, TabPanel } from '@mui/lab'
import { Box, Grid, Tab } from '@mui/material'
import { useServiceProduct, useWatcherService } from '@/service/reno/useServiceProduct'
import CustomizedMenus from '@/components/util/customMeno'
import useRoute from '@/hook/router'
import { Each } from '@/util/util'
import CreateProductModal, { CreateProductModalContext } from '@/components/home/createProductModal'
import TabSelectPagesControl, {
  TabSelectPagesControlContext,
  TabSelectPagesControlProps
} from '@/components/home/tabSelectPagesControl'
import { useAppSelector } from '@/redux/store'

export interface RouteParamHomePage {
  TabSelectinitialIndex?: number
}
export default function HomePage() {
  const { getProduct } = useServiceProduct()
  const { data } = useWatcherService(getProduct)
  const route = useRoute<RouteParamHomePage>()
  console.log(data)
  return (
    <TabSelectPagesControl
      labels={['Products', 'Order', 'Table View', 'Pay Later View']}
      initialPage={route.get('TabSelectinitialIndex') ?? 0}
    >
      <TabSelectPages />
      <PageContainer>
        <Page page={1}>
          <PageHeader>
            <CreateProductModal>
              <PageLabel />
              <ProductPageOptions />
            </CreateProductModal>
          </PageHeader>
          <PageSearch />
          <PageContent />
        </Page>
        <Page page={2}>
          <PageLabel />
          <PageSearch />
          <PageContent />
        </Page>
        <Page page={3}>
          <PageLabel />
          {/* <PageSearch /> */}
          <PageContent />
        </Page>
        <Page page={4}>
          <PageLabel />
          <PageSearch />
          {/* <PageContent /> */}
        </Page>
      </PageContainer>
    </TabSelectPagesControl>
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

function PageContainer(props: TabSelectPagesControlProps & { children: React.ReactNode }) {
  return <div className="w-full p-10">{props.children}</div>
}

function Page(props: { children: React.ReactNode } & { page: number }) {
  const [isLoading, setIsLoading] = React.useState(true)
  const context = useContext(TabSelectPagesControlContext)
  const index = props.page - 1
  React.useEffect(() => {}, [])
  //   if (isLoading) {
  //     return <></>
  //   }
  return <div className={`${context.currentTab?.index !== index ? ` hidden` : ''}`}>{props.children}</div>
}

function PageHeader(props: { children: React.ReactNode }) {
  return <div className="flex w-full justify-between">{props.children}</div>
}
function PageOptions(props: { children: React.ReactNode }) {
  return <div className="">{props.children}</div>
}

function PageLabel() {
  const context = useContext(TabSelectPagesControlContext)
  const userName = useAppSelector(state => state.authReducer.user.username)
  return (
    <div className="text-3xl font-bold">
      {context.currentTab?.label} {userName}
    </div>
  )
}

function PageSearch() {
  const context = useContext(TabSelectPagesControlContext)
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
          <OrderItems />
        </TabPanel>
        <TabPanel value="2">Dine in</TabPanel>
        <TabPanel value="3">To go</TabPanel>
        <TabPanel value="4">Delivery</TabPanel>
      </TabContext>
    </div>
  )
}

function TabSelectPages(props: TabSelectPagesControlProps) {
  const route = useRoute()
  const context = useContext(TabSelectPagesControlContext)
  return (
    <div className="bg-white h-12 flex items-center">
      <div className="flex">
        <CustomizedMenus
          variant="text"
          className="pr-4"
          menulabel="Store Name"
          options={[
            {
              icon: <StorefrontIcon />,
              label: 'Store Name',
              onClick: () => {}
            },
            {
              icon: <StorefrontIcon />,
              label: 'Store Name',
              isShowDividerBottom: true,
              onClick: () => {}
            },
            {
              icon: <AddIcon />,
              label: 'Create Store',
              onClick: () => {
                route.to('/store', { tebIndex: 2 })
              }
            }
          ]}
        />
      </div>
      <div className="flex">
        <Each
          values={context.tablabels}
          render={(label, index) => (
            <React.Fragment>
              <div
                key={`TabSelectPages-${index}`}
                onClick={() => context.setCurrentTab?.(index)}
                className={`hover:bg-opacity-50 ${
                  context.currentTab?.index === index
                    ? 'bg-success text-white'
                    : 'bg-white text-gray-400 hover:text-gray-600 hover:bg-gray-200'
                } px-5 py-2 rounded-lg text-sm mr-2 cursor-pointer`}
              >
                {label}
              </div>
            </React.Fragment>
          )}
        />
      </div>
    </div>
  )
}

function OrderItems() {
  return (
    <Grid container rowSpacing={3} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
      <Grid item xs={4}>
        <OrderItem />
      </Grid>
      <Grid item xs={4}>
        <OrderItem />
      </Grid>
      <Grid item xs={4}>
        <OrderItem />
      </Grid>
      <Grid item xs={4}>
        <OrderItem />
      </Grid>
    </Grid>
  )
}

function OrderItem() {
  const [isLoading, setIsLoading] = React.useState(true)
  if (isLoading) {
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
  return (
    <div className="bg-white rounded-lg animate-pulse ">
      <div className="flex flex-col p-6">
        <div className="w-full flex justify-between">
          <div className="text-sm font-semibold">Table No. 2A</div>
          <div className="text-sm font-semibold">#12345</div>
        </div>
        <div className="w-full flex justify-between mt-2">
          <div className="text-sm font-light">Name: Veerapan Boonbuth</div>
          <div className="text-sm font-light">$1000</div>
        </div>
        <div className="flex mt-4 justify-between">
          <div className="flex">
            <div className="px-8 py-1 text-xs text-center bg-primary text-white rounded-lg flex justify-center items-center mr-2">
              <div>Pay</div>
            </div>
            <div className="px-5 py-1 text-xs text-center bg-gray-100 text-gray-400 rounded-lg flex justify-center items-center">
              <div>Pay later</div>
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
