'use client'

import HomePage from '@/components/home/homePage'
import LeftMenuBar from '@/components/home/leftMenuBar'
import TableDetailOrder from '@/components/home/tableDetailOrder'
export default function ProductEmployeePage() {
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
