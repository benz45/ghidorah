import { Children } from 'react'

const isNum = (value: string) => /^-?\d+$/.test(value)
const isBool = (value: string) => /^(?:true|false)$/gim.test(value)

export const convertStringToShouldType = (value: string) => {
  if (isNum(value)) {
    return +value as number
  } else if (isBool(value)) {
    return value.toLowerCase() == 'true'
  }
  return (value + '') as string
}

export function checkValid<T>(value: T, onInValid: (value: T) => void, onValid: (value: NonNullable<T>) => void) {
  if (value) {
    onValid(value)
  } else {
    onInValid(value)
  }
}

declare global {
  export type Optional<T> = {
    [P in keyof T]?: T[P]
  }
}

export function Each<ValueType, RenderType extends (element: ValueType, index: number) => React.JSX.Element>(props: {
  render: RenderType
  values: ValueType[] | undefined
}) {
  if (!props.values) {
    return []
  }
  return Children.toArray(props.values?.map((_elem, index) => props.render(_elem, index)))
}

export function ToggleComponent(props: { toggle: boolean; begin: React.ReactNode; then: React.ReactNode }) {
  if (props.toggle) {
    return props.begin
  }
  return props.then
}

export const getSearchParams = <T>(paramName: keyof T) => {
  if (typeof window !== 'undefined') {
    const params: URLSearchParams = new URLSearchParams(window.location.search)
    const value = params.get(paramName as string)
    if (value) {
      return convertStringToShouldType(value) as T[typeof paramName]
    }
  }
}

/**
 * e.g. @return key=value&key=value
 */
export const convertToRequestParams = <T>(params: T): string => {
  let _params = ''
  if (params) {
    let generateParams: URLSearchParams = new URLSearchParams()
    Object.keys(params).forEach(key => {
      if (params[key as keyof T] !== undefined) {
        generateParams.set(key, `${params[key as keyof T]}`)
      }
    })
    return (_params += generateParams)
  }
  return _params
}
