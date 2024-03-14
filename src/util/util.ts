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



declare global {
  export type Optional<T> = {
    [P in keyof T]?: T[P]
  }
}