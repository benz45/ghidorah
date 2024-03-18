'use client'
import SearchInput from '@/components/searchInput'
import ContentCreateStore from '@/components/store/createStore/contentCreateStore'
import StoreDetailBox from '@/components/store/storePage/storeDetailBox'
import StoreItemLoading from '@/components/store/storePage/storeItemLoading'
import CustomButton from '@/components/util/customButton'
import { RendomComponent } from '@/components/util/rendomComponent'
import { StorePageParams } from '@/hook/routeParams'
import useRoute from '@/hook/router'
import { setStoreEmployeePage } from '@/redux/reducers/store.reducer'
import { AppDispatch, useAppSelector } from '@/redux/store'
import { useServiceStore } from '@/service/reno/useServiceStore'
import { Each, ToggleComponent } from '@/util/util'
import { TabContext, TabPanel } from '@mui/lab'
import { Box, Grid, Tab, Tabs, styled } from '@mui/material'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'

const AntTabs = styled(Tabs)({
  borderColor: '#F7F8FD',
  '& .MuiTabs-indicator': {
    borderBottom: '4px solid #5770FD',
    borderRadius: 100,
    'border-bottom-right-radius': '10px',
    'border-bottom-left-radius': '10px'
  }
})

interface StyledTabProps {
  label: string
  value: string
}

const AntTab = styled((props: StyledTabProps) => <Tab disableRipple {...props} />)(({ theme }) => ({
  textTransform: 'none',
  fontWeight: theme.typography.fontWeightMedium,
  marginRight: theme.spacing(1),
  fontFamily: [
    '-apple-system',
    'BlinkMacSystemFont',
    '"Segoe UI"',
    'Roboto',
    '"Helvetica Neue"',
    'Arial',
    'sans-serif',
    '"Apple Color Emoji"',
    '"Segoe UI Emoji"',
    '"Segoe UI Symbol"'
  ].join(','),
  '&:hover': {
    color: '#5770FD',
    opacity: 1
  },
  '&.Mui-selected': {
    color: '#5770FD'
  },
  '&.Mui-focusVisible': {
    backgroundColor: '#F3F7FF'
  }
}))

export default function StoreContent() {
  const { getStoreEmployeePage } = useServiceStore()
  const employeeId = useAppSelector(store => store.employeeReducer.employee?.id)
  const route = useRoute<StorePageParams>()
  const [value, setValue] = React.useState<string>(`${route.get('tebIndex') ?? 1}`)
  const dispatch = useDispatch<AppDispatch>()
  const handleChange = (_event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue)
  }
  const storeEmployeePage = useAppSelector(store => store.storeReducer.storeEmployee.pages)
  useEffect(() => {
    const _getStoreEmployeePage = async () => {
      const response = await getStoreEmployeePage.trigger({ employeeId })
      dispatch(setStoreEmployeePage(response))
    }
    if (employeeId) {
      _getStoreEmployeePage()
    }
  }, [employeeId])

  return (
    <div className="mt-4">
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <AntTabs value={value} onChange={handleChange} aria-label="lab API tabs example">
            <AntTab label="All" value="1" />
            <AntTab label="Create Store" value="2" />
            <AntTab label="Setting" value="3" />
          </AntTabs>
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
                    values={storeEmployeePage?.entities}
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
