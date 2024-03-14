import { CreateEmployeeRequest } from '~/model/employee/createEmployeeRequest'
import { CreateEmployeeResponse } from '~/model/employee/createEmployeeResponse'
import { usePostMethod } from '../http/methods'


export function useServiceEmployee() {
  
  const postEmployee = usePostMethod<CreateEmployeeRequest, CreateEmployeeResponse>("api/e-commerce-info/employee")

  return {
    postEmployee
  }
}
