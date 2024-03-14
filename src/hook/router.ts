import React from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { convertStringToShouldType } from '~/util/util'

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

  const route = (pathcName: string, state?: TypeParam) => {
    if (state) {
      const searchParam: string = createSearchParams(state);
      router.push(pathcName+searchParam)
    } else {
      router.push(pathcName)
    }
  }

  const get = <T extends keyof TypeParam>(paramName: T) => {
    const value = searchParams?.get(paramName as string)
    if (value) {
      return convertStringToShouldType(value)as TypeParam[T]
    }
  }

  return { createSearchParams, route, get }
}

export default useRoute
