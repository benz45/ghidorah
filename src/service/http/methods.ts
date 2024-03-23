import {
  ApiGetPath,
  ApiGetRequest,
  ApiGetRequestParams,
  ApiGetResponse,
  ApiPostPath,
  ApiPostRequest,
  ApiPostRequestPath,
  ApiPostResponse
} from '@/service/api/api'
import axios from '@/service/http/index'
import { convertToRequestParams } from '@/util/util'
import React from 'react'
import useSWR from 'swr'
import useSWRMutation, { TriggerWithArgs, TriggerWithoutArgs } from 'swr/mutation'

export function usePostMethod<T extends keyof ApiPostPath>(url: T) {
  const { data, trigger, isMutating, error } = useSWRMutation(
    url as string,
    async (key, options: { arg: ApiPostRequest<typeof url> & { path?: ApiPostRequestPath<typeof url> } }) => {
      let _url = key
      const path = options.arg.path
      if (path) {
        let _request = path as {
          [Key in keyof typeof path]: (typeof path)[Key]
        }
        for (const _key in _request) {
          _url = _url.replace(`{${_key}}`, `${_request[_key as keyof typeof _request]}`)
        }
      }
      delete options.arg.path
      const response = await axios.post<ApiPostResponse<typeof url>>(_url, options.arg)
      return response.data
    }
  )
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
      const response = await axios.get<ApiGetResponse<typeof url>>(key)
      return response.data
    },
    // {
    //   isPaused() {
    //     return true
    //   }
    // }
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
  const { data, trigger, isMutating, error } = useSWRMutation(
    url as string,
    async (key, options: { arg: ApiGetRequest<typeof url> }) => {
      let _url = key
      if (options.arg) {
        let _request = options.arg as {
          [Key in keyof typeof options.arg]: (typeof options.arg)[Key]
        }
        for (const _key in _request) {
          _url = _url.replace(`{${_key}}`, `${_request[_key as keyof typeof _request]}`)
        }
      }
      const response = await axios.get<ApiGetResponse<typeof url>>(_url)
      return response.data
    }
  )
  return {
    data,
    trigger,
    isLoading: isMutating,
    error
  }
}

export function useGetTriggerWithParamsMethod<T extends keyof ApiGetPath>(url: T) {
  const { data, trigger, isMutating, error } = useSWRMutation(
    url as string,
    async (key, options: { arg: ApiGetRequestParams<T> }) => {
      let _url = key
      if (options.arg) {
        _url += `?${convertToRequestParams(options.arg)}`
      }
      const response = await axios.get<ApiGetResponse<typeof url>>(_url)
      return response.data
    }
  )
  return {
    data,
    trigger,
    isLoading: isMutating,
    error
  }
}

export function useWatcherService<
  T extends { trigger: <R>(r: R) => void }>(swr: T, request?: Parameters<T['trigger']>[0]) {
  React.useEffect(() => {
    swr?.trigger(request)
  }, [])
  return swr
}
