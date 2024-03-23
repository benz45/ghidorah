import { useGetMethod, useGetTriggerMethod, useGetTriggerWithParamsMethod, usePostMethod } from '@/service/http/methods'

export function useServiceProduct() {

  const postProduct = usePostMethod("api/e-commerce-info/product")
  const getProduct = useGetTriggerWithParamsMethod("api/e-commerce-info/product")
  const getAllProductType = useGetMethod("api/e-commerce-info/product-type")
  const getAllProductStatus = useGetMethod("api/e-commerce-info/product-status")
  
  return {
    postProduct,
    getProduct,
    getAllProductType,
    getAllProductStatus
  }
}
