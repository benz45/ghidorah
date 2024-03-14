import { CreateCustomerRequest } from '~/model/customer/createCustomerRequest'
import { CustomerResponse } from '~/model/customer/customerResponse'
import axios from '../http'
import { usePostMethod } from '../http/methods'
import { CSRFResponse } from '~/model/CSRFResponse'


export function useServiceCustomer() {

  const postCustomer = usePostMethod<CreateCustomerRequest, CustomerResponse>("api/e-commerce-info/customer")

  return {
    postCustomer
  }
}
