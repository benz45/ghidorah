import { useGetTriggerMethod } from '@/service/http/methods'

export function useServiceProduct() {

  const getProduct = useGetTriggerMethod("api/e-commerce-info/product")
  
  return {
    getProduct
  }
}
