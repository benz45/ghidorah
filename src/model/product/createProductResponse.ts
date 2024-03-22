import { BaseType } from "@/model/baseType";

export interface CreateProductResponse {
  createdAt:         Date;
  updatedAt:         Date;
  id:                number;
  name:              string;
  price:             number;
  amount:            number;
  detail:            string;
  store:             Store;
  productStatus:     BaseType;
  productDetailType: ProductDetailType[];
  isActive:          boolean;
  images:            Image[];
}

export interface Image {
  createdAt: Date;
  isDeleted: boolean;
  createdBy: number;
  id:        number;
  key:       string;
}

export interface ProductDetailType {
  createdAt:   Date;
  isDeleted:   boolean;
  id:          number;
  productType: BaseType;
}

export interface Store {
  createdAt: Date;
  updatedAt: Date;
  id:        number;
  storeName: string;
  detail:    string;
  address:   Address;
}

export interface Address {
  createdAt:   Date;
  updatedAt:   Date;
  id:          number;
  tal:         string;
  isActive:    boolean;
  houseNumber: string;
  subdistrict: string;
  district:    string;
  province:    string;
  postalcode:  number;
}
