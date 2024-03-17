
import { useGetTriggerMethod, useGetTriggerWithParamsMethod, usePostMethod } from '@/service/http/methods'


export function useServiceStore() {
  const postStoreCustomer = usePostMethod("api/e-commerce-info/store/customer/{customerId}")
  const postStoreEmployee = usePostMethod("api/e-commerce-info/store/employee/{employeeId}")
  const getStoreEmployeePage = useGetTriggerWithParamsMethod("api/e-commerce-info/store/employee")
  return {
    postStoreCustomer,
    postStoreEmployee,
    getStoreEmployeePage
  }
}
