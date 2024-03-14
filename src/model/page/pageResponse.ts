export interface PageResponse<T> {
  pageInformation: PageInformation
  first: boolean
  last: boolean
  totalPages: number
  totalElement: number
  sequence: number
  entities: T[]
}

export interface PageInformation {
  number: number
  size: number
}
