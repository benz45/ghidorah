'use client'

import BaseLayoutCompomnent from '@/components/home/baseLayoutCompomnent'
import HomePage from '@/components/home/homePage'
import TableDetailOrder from '@/components/home/tableDetailOrder'
export default function ProductEmployeePage() {
  return (
    <BaseLayoutCompomnent>
      <div className="flex w-full  ">
        <HomePage />
        <TableDetailOrder />
      </div>
    </BaseLayoutCompomnent>
  )
}
