'use client'
import BaseLayoutCompomnent from '@/components/home/baseLayoutCompomnent'
import StoreContent from '@/components/store/storeContent'

export default function StorePage() {
  return (
    <BaseLayoutCompomnent>
      <div className="flex w-full flex-col">
        <div className="flex w-full justify-between">
          <div className="text-3xl font-bold">Store Management</div>
        </div>
        <StoreContent />
      </div>
    </BaseLayoutCompomnent>
  )
}
