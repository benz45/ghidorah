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

