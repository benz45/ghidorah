'use client'

import HomePage from '@/components/home/homePage'
import LeftMenuBar from '@/components/home/leftMenuBar'
import TableDetailOrder from '@/components/home/tableDetailOrder'
import { ProductEmployeePageParams } from '@/hook/routeParams'
import useRoute from '@/hook/router'
import { useWatcherService } from '@/service/http/methods'
import { useServiceEmployee } from '@/service/reno/useServiceEmployee'
export default function ProductEmployeePage() {
  const route = useRoute<ProductEmployeePageParams>()
  const userId = route.get('userId')
  const { getEmployeeByUserId } = useServiceEmployee()
  const employee = useWatcherService(getEmployeeByUserId, { userId })
  console.log('employee: ', employee.data)
  return (
    <main className="flex min-h-screen">
      <div className="w-full flex bg-primary-light">
        <LeftMenuBar />
        <HomePage />
      </div>
      <TableDetailOrder />
    </main>
  )
}
