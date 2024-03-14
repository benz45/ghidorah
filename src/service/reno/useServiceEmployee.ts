import { CreateEmployeeRequest } from '~/model/employee/createEmployeeRequest'
import { CreateEmployeeResponse } from '~/model/employee/createEmployeeResponse'
import axios from '../http'
import { usePostMethod } from '../http/methods'


export function useServiceEmployee() {
  
  const postEmployee = usePostMethod<CreateEmployeeRequest, CreateEmployeeResponse>("api/e-commerce-info/employee", axios)

  return {
    postEmployee
  }
}
