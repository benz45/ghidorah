import CustomizedMenus from '@/components/util/customMeno'
import useRoute from '@/hook/router'
import { setSelectStore, setStoreEmployeePage } from '@/redux/reducers/store.reducer'
import { AppDispatch, useAppSelector } from '@/redux/store'
import { useServiceStore } from '@/service/reno/useServiceStore'
import AddIcon from '@mui/icons-material/Add'
import StorefrontIcon from '@mui/icons-material/Storefront'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked'
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked'
export default function SelectStore() {
  const route = useRoute()
  const { getStoreEmployeePage } = useServiceStore()
  const employeeId = useAppSelector(store => store.employeeReducer.employee?.id)
  const { pages, selected } = useAppSelector(store => store.storeReducer.storeEmployee)
  const dispatch = useDispatch<AppDispatch>()
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
    <>
      <div className="pl-4 pr-2 text-primary">
        <StorefrontIcon />
      </div>
      <CustomizedMenus
        variant="text"
        className="pr-4"
        menulabel={selected?.name ?? 'Select Store'}
        options={[
          {
            icon: <StorefrontIcon />,
            label: 'Store Management',
            onClick: () => {
              route.to('/store', { tebIndex: 1 })
            }
          },
          {
            icon: <AddIcon />,
            label: 'Create Store',
            isShowDividerBottom: true,
            onClick: () => {
              route.to('/store', { tebIndex: 2 })
            }
          },
          ...(pages?.entities.map(elem => ({
            icon: selected?.id === elem.id ? <RadioButtonCheckedIcon /> : <RadioButtonUncheckedIcon />,
            label: elem.name ?? '',
            onClick: () => {
              dispatch(setSelectStore(elem))
            }
          })) ?? [])
        ]}
      />
    </>
  )
}
