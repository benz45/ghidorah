import { BaseType } from "../baseType"

export interface CreateStoreResponse {
  id: number
  storeName: string
  detail: string
  storeImages: StoreImage[]
  address: Address
  createdAt: Date
  updatedAt: Date
  createdBy: number
}

export interface Address {
  createdAt: Date
  updatedAt: Date
  id: number
  tal: string
  isActive: boolean
  houseNumber: string
  subdistrict: string
  district: string
  province: string
  postalcode: number
}

export interface StoreImage {
  createdAt: Date
  isDeleted: boolean
  id: number
  image: Image
  storeImageType: BaseType
}

export interface Image {
  createdAt: Date
  isDeleted: boolean
  createdBy: number
  id: number
  key: string
}

