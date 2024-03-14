import { BaseType, BaseTypeIdOnly } from "@/model/baseType";

export interface CreateProductRequest {
  amount:        number;
  detail:        string;
  isActive:      boolean;
  name:          string;
  price:         number;
  productImages: ProductImage[];
  productStatus: BaseTypeIdOnly | BaseType;
  productTypes:  BaseTypeIdOnly[] | BaseType[];
  storeId:       number;
}

export interface ProductImage {
  key: string;
}
