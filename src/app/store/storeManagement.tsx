'use client'
import React, { useContext } from 'react'
import SearchIcon from '@mui/icons-material/Search'
import { TabContext, TabList, TabPanel } from '@mui/lab'
import { Box, Grid, Tab } from '@mui/material'
import TabSelectPagesControl, { TabSelectPagesControlContext } from '~/components/home/tabSelectPagesControl'
import CustomList, { CustomListValueProps } from '~/components/util/customList'
import { StorePageParams } from '~/hook/routeParams'
import useRoute from '~/hook/router'
import { useServiceProduct, useWatcherService } from '~/service/reno/useServiceProduct'
import StoreItem from './allStorePage/storeItem'
import ContentCreateStore from './createStore/contentCreateStore'
import TabHeaderSelectPages from './header/tabHeaderSelectPages'

export default function StoreManagement() {
  const { getProduct } = useServiceProduct()
  const { data } = useWatcherService(getProduct)

  return (
    <TabSelectPagesControl labels={['Products', 'Order', 'Table View', 'Pay Later View']} initialPage={-1}>
      <TabHeaderSelectPages />
      <div className="w-full p-10">
        <div className="flex w-full justify-between">
          <div className="text-3xl font-bold">Store Management</div>
        </div>
        <PageSearch />
        <PageContent />
      </div>
    </TabSelectPagesControl>
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
  const route = useRoute<StorePageParams>()
  const [value, setValue] = React.useState<string>(`${route.get('tebIndex') ?? 1}`)
  const listPages: CustomListValueProps[] = [
    { id: 1, label: 'General Info' },
    { id: 2, label: 'Store Address' },
    { id: 3, label: 'Complete' }
  ]
  const [currentActive, setCurrentActive] = React.useState<CustomListValueProps>(listPages[0])

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue)
  }

  return (
    <div className="mt-4">
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList onChange={handleChange} aria-label="lab API tabs example">
            <Tab label="All" value="1" className="text-gray-200" />
            <Tab label="Create Store" value="2" />
            <Tab label="Setting" value="3" />
          </TabList>
        </Box>
        <TabPanel value="1">
          <Grid container rowSpacing={3} columnSpacing={3}>
            <Grid item xs={6} md={4} lg={3} xl={2}>
              <StoreItem />
            </Grid>
            <Grid item xs={6} md={4} lg={3} xl={2}>
              <StoreItem />
            </Grid>
            <Grid item xs={6} md={4} lg={3} xl={2}>
              <StoreItem />
            </Grid>
            <Grid item xs={6} md={4} lg={3} xl={2}>
              <StoreItem />
            </Grid>
          </Grid>
        </TabPanel>
        <TabPanel value="2" sx={{ padding: 0, paddingTop: 4 }}>
          <div className="flex bg-white w-3/4 p-6 rounded-lg">
            <div className="block">
              <div className="text-2xl font-bold pb-6">Create Store</div>
              <Box display={'flex'} width={500} className="w-full pl-20">
                <CustomList
                  values={listPages}
                  currentActive={currentActive}
                  onChange={e => setCurrentActive(e)}
                  isShowNumberOfList
                />
              </Box>
            </div>
            <div className="block w-full pr-8 pl-24 ">
              <div className=" font-semibold text-primary text-xl">{currentActive.label}</div>
              <div className="py-8 flex w-full">
                <ContentCreateStore activeId={currentActive.id} onPrevious={() => setCurrentActive(listPages[0])} />
              </div>
            </div>
          </div>
        </TabPanel>
        <TabPanel value="3">To go</TabPanel>
      </TabContext>
    </div>
  )
}
