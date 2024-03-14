'use client'

import LeftMenuBar from '~/components/home/leftMenuBar'
import CreateStorePage from './storeManagement'
export default function Home() {
  return (
    <main className="flex min-h-screen">
      <div className="w-full flex bg-primary-light">
        <LeftMenuBar />
        <CreateStorePage />
      </div>
    </main>
  )
}
