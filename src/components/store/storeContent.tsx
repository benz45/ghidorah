'use client'
import SearchInput from '@/components/searchInput'
import ContentCreateStore from '@/components/store/createStore/contentCreateStore'
import StoreDetailBox from '@/components/store/storePage/storeDetailBox'
import StoreItemLoading from '@/components/store/storePage/storeItemLoading'
import CustomButton from '@/components/util/customButton'
import { RendomComponent } from '@/components/util/rendomComponent'
import { StorePageParams } from '@/hook/routeParams'
import useRoute from '@/hook/router'
import { StoreEmployeePageResponse } from '@/model/store/storeEmployeePageResponse'
import { useAppSelector } from '@/redux/store'
import { useServiceStore } from '@/service/reno/useServiceStore'
import { Each, ToggleComponent } from '@/util/util'
import { TabContext, TabList, TabPanel } from '@mui/lab'
import { Box, Grid, Tab } from '@mui/material'
import React, { useEffect, useState } from 'react'

export default function StoreContent() {
  const { getStoreEmployeePage } = useServiceStore()
  const employeeId = useAppSelector(store => store.employeeReducer.employee?.id)
  const [storeEmployeePages, setStoreEmployeePages] = useState<StoreEmployeePageResponse[]>([])
  const route = useRoute<StorePageParams>()
  const [value, setValue] = React.useState<string>(`${route.get('tebIndex') ?? 1}`)

  const handleChange = (_event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue)
  }
  useEffect(() => {
    const _getStoreEmployeePage = async () => {
      const { entities } = await getStoreEmployeePage.trigger({ employeeId })
      setStoreEmployeePages(entities)
    }
    if (employeeId) {
      _getStoreEmployeePage()
    }
  }, [employeeId])

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
          <div className="pb-6 flex w-full items-start justify-between">
            <SearchInput />
            <div className="block">
              <CustomButton text="Create Store" />
            </div>
          </div>
          <ToggleComponent
            toggle={getStoreEmployeePage.isLoading}
            begin={
              <React.Fragment>
                <Grid container rowSpacing={3} columnSpacing={3}>
                  <RendomComponent
                    counter={9}
                    then={
                      <Grid item xs={6} md={4} lg={3} xl={2}>
                        <StoreItemLoading />
                      </Grid>
                    }
                  />
                </Grid>
              </React.Fragment>
            }
            then={
              <React.Fragment>
                <Grid container rowSpacing={3} columnSpacing={3}>
                  <Each
                    values={storeEmployeePages}
                    render={(elem, index) => {
                      return (
                        <Grid item xs={6} md={4} lg={3} xl={2}>
                          <StoreDetailBox key={`StoreItem${index}`} store={elem} />
                        </Grid>
                      )
                    }}
                  />
                </Grid>
              </React.Fragment>
            }
          />
        </TabPanel>
        <TabPanel value="2" sx={{ padding: 0, paddingTop: 4 }}>
          <ContentCreateStore />
        </TabPanel>
        <TabPanel value="3">To go</TabPanel>
      </TabContext>
    </div>
  )
}
