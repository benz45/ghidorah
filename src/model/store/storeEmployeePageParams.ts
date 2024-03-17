import { Pageable } from '@/model/page/pageable'

export interface StoreEmployeePageParams {
  storeName?: string
  employeeId?: number
  pageable?: Pageable
}
