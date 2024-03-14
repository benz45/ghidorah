import React from 'react'
import { useGetTriggerMethod } from '@/service/http/methods'

export function useServiceProduct() {

  const getProduct = useGetTriggerMethod("api/e-commerce-info/product")
  
  return {
    getProduct
  }
}

export function useWatcherService<T extends {trigger: () => void}>(swr: T) {
  React.useEffect(() => {
    swr?.trigger()
  }, [])
  return swr
}
