import { StorePageParams } from '@/hook/routeParams'
import { convertStringToShouldType } from '@/util/util'
import { useRouter, useSearchParams } from 'next/navigation'

export const PATHS = {
  MAIN: {path:'/', params: {}},
  AUTHORIZATION: {path:'/auth', params: {}},
  CUSTOMER_SIGNIN: {path:'/auth/customer/signin', params:{}},
  CUSTOMER_SIGNUP: {path:'/auth/customer/signup', params:{}},
  EMPLOYEE_SIGNIN: {path:'/auth/employee/signin', params:{}},
  EMPLOYEE_SIGNUP: {path:'/auth/employee/signup', params:{}},
  STORE: {path:'/store', params: {} as StorePageParams},
  CUSTOMER_PRODUCT: {path:'/product/customer', params:{}},
  EMPLOYEE_PRODUCT: {path:'/product/employee', params:{}}
} as const


type PATHS_TYPE = (typeof PATHS)[keyof typeof PATHS]
export type ROUTE_PATH = keyof typeof PATHS

const useRoute = <TypeParam>() => {
  const searchParams = useSearchParams()
  const router = useRouter()

  const createSearchParams = <T>(params: T) => {
    const urlSearchParams = new URLSearchParams(searchParams?.toString())
    for (const key in params) {
      urlSearchParams.set(key, params[key] + '')
    }
    return `?${urlSearchParams.toString()}`
  }

  const to = <T extends PATHS_TYPE>(pathcName: T['path'], state?: T['params']) => {
    const path = pathcName
    if (state) {
      const searchParam: string = createSearchParams(state)
      router.push(path + searchParam)
    } else {
      router.push(path)
    }
  }

  const get = <T extends keyof TypeParam>(paramName: T) => {
    const value = searchParams?.get(paramName as string)
    if (value) {
      return convertStringToShouldType(value) as TypeParam[T]
    }
  }

  return { to, get }
}

export default useRoute
