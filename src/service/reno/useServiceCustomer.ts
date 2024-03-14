import { usePostMethod } from '../http/methods'


export function useServiceCustomer() {

  const postCustomer = usePostMethod("api/e-commerce-info/customer")

  return {
    postCustomer
  }
}
