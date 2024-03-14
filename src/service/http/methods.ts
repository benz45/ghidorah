import useSWRMutation from 'swr/mutation'
import { AxiosInstance } from 'axios'
import { CSRFResponse } from '~/model/CSRFResponse'
import axios from '../http'
export function usePostMethod<TypeRequest, TypeResponse>(
  url: string,
) {
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

export function useGetMethod<TypeResponse>(url: string, axios: AxiosInstance) {
  const { data, trigger, isMutating, error } = useSWRMutation(url, async key => {
    const response = await axios.get<TypeResponse>(key, {
      withCredentials: true
    })
    return response.data
  })

  return {
    data,
    trigger,
    isLoading: isMutating,
    isError: error
  }
}

export async function getCsrfConfig(axios: AxiosInstance) {
  try {
    const response = await fetch('http://localhost:3000/api/csrf', {
      cache: 'no-store',
      credentials: 'include'
    })
    const data: CSRFResponse = await response.json()
    return data
  } catch (error) {
    if (error instanceof Error) {
      console.error(error)
    }
  }
}