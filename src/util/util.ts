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
}){
  if (!props.values) {
    return []
  }
  return Children.toArray(props.values?.map((_elem, index) => props.render(_elem, index)))
}