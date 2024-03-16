'use client'

import HomePage from '@/components/home/homePage'
import LeftMenuBar from '@/components/home/leftMenuBar'
import TableDetailOrder from '@/components/home/tableDetailOrder'
import { ProductEmployeePageParams } from '@/hook/routeParams'
import useRoute from '@/hook/router'
import { setEmployee } from '@/redux/reducers/employee.reducer'
import { AppDispatch } from '@/redux/store'
import { useWatcherService } from '@/service/http/methods'
import { useServiceEmployee } from '@/service/reno/useServiceEmployee'
import React from 'react'
import { useDispatch } from 'react-redux'
export default function HocGetEmployee(props: { children: React.ReactNode }) {
  const route = useRoute<ProductEmployeePageParams>()
  const userId = route.get('userId')
  const { getEmployeeByUserId } = useServiceEmployee()
  const employee = useWatcherService(getEmployeeByUserId, { userId })
  const dispatch = useDispatch<AppDispatch>()
  React.useEffect(() => {
    if (employee.data) {
      dispatch(setEmployee(employee.data))
    }
  }, [employee.data])
  return <React.Fragment>{props.children}</React.Fragment>
}
