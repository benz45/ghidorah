'use client'
import TabSelectPagesControl from '@/components/home/tabSelectPagesControl'
import Searchinput from '@/components/searchInput'
import TabHeaderSelectPages from '@/components/store/header/tabHeaderSelectPages'
import StoreContent from '@/components/store/storeContent'

export default function StoreManagement() {
  return (
    <TabSelectPagesControl labels={['Products', 'Order', 'Table View', 'Pay Later View']} initialPage={-1}>
      <TabHeaderSelectPages />
      <div className="w-full p-10">
        <div className="flex w-full justify-between">
          <div className="text-3xl font-bold">Store Management</div>
        </div>
        <Searchinput />
        <StoreContent />
      </div>
    </TabSelectPagesControl>
  )
}
