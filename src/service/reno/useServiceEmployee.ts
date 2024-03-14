import { usePostMethod } from '@/service/http/methods'


export function useServiceEmployee() {
  
  const postEmployee = usePostMethod("api/e-commerce-info/employee")

  return {
    postEmployee
  }
}
