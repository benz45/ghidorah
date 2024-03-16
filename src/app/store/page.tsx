'use client'
import HocGetEmployee from '@/components/employee/hocGetEmployee'
import LeftMenuBar from '@/components/home/leftMenuBar'
import CreateStorePage from '@/components/store/storeManagement'

export default function StorePage() {
  return (
    <HocGetEmployee>
      <main className="flex min-h-screen">
        <div className="w-full flex bg-primary-light">
          <LeftMenuBar />
          <CreateStorePage />
        </div>
      </main>
    </HocGetEmployee>
  )
}
