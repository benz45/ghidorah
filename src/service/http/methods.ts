import useSWR from 'swr'
import useSWRMutation from 'swr/mutation'
import { ApiGetPath, ApiResponse } from '../api/api'
import axios from '../http'
export function usePostMethod<TypeRequest, TypeResponse>(url: string) {
  const { data, trigger, isMutating, error } = useSWRMutation(url, async (key, options: { arg: TypeRequest }) => {
    const response = await axios.post<TypeResponse>(key, options.arg)
    return response.data
  })

  return {
    data,
    trigger,
    isLoading: isMutating,
    isError: error
  }
}

export function useGetMethod<T extends keyof ApiGetPath>(url: T) {
  const { data, error, isLoading, mutate, isValidating } = useSWR(
    url as string,
    async key => {
      const response = await axios.get<ApiResponse<typeof url>>(key)
      return response.data
    },
    {
      isPaused() {
        return true
      }
    }
  )

  return {
    data,
    isLoading,
    error,
    mutate,
    isValidating
  }
}

export function useGetTriggerMethod<T extends keyof ApiGetPath>(url: T) {
  const { data, trigger, isMutating, error } = useSWRMutation(url as string, async key => {
    const response = await axios.get<ApiResponse<typeof url>>(key)
    return response.data
  })
  return {
    data,
    trigger,
    isLoading: isMutating,
    error
  }
}
