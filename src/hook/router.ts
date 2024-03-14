import { useRouter, useSearchParams } from 'next/navigation'
import { convertStringToShouldType } from '~/util/util'

export const PATHS = {
  MAIN: '/',
  AUTHORIZATION: '/auth',
  CUSTOMER_SIGNIN: '/auth/customer/signin',
  CUSTOMER_SIGNUP: '/auth/customer/signup',
  EMPLOYEE_SIGNIN: '/auth/employee/signin',
  EMPLOYEE_SIGNUP: '/auth/employee/signup',
  CUSTOMER_PRODUCT: '/product/customer',
  EMPLOYEE_PRODUCT: '/product/employee'
} as const

type PATHS = (typeof PATHS)[keyof typeof PATHS]

const useRoute = <TypeParam>() => {
  const searchParams = useSearchParams()
  const router = useRouter()

  const createSearchParams = (params: TypeParam) => {
    const urlSearchParams = new URLSearchParams(searchParams?.toString())
    for (const key in params) {
      urlSearchParams.set(key, params[key] + '')
    }
    return `?${urlSearchParams.toString()}`
  }

  const route = (pathcName: PATHS, state?: TypeParam) => {
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

  return { createSearchParams, route, get }
}

export default useRoute
