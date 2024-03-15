import { useGetTriggerMethod, usePostMethod } from '@/service/http/methods'

export function useServiceEmployee() {
  const getEmployeeByUserId = useGetTriggerMethod('api/e-commerce-info/employee/user/{userId}')
  const postEmployee = usePostMethod('api/e-commerce-info/employee')

  return {
    postEmployee,
    getEmployeeByUserId
  }
}
