import { CSRFResponse } from "~/model/CSRFResponse"
import { ProductPageResponse } from "~/model/product/productPageResponse"

export interface ApiGetPath {
  'api/csrf-token': [CSRFResponse],
  'api/e-commerce-info/product': [ProductPageResponse]
}

export type ApiResponse <T extends keyof ApiGetPath> = ApiGetPath[T][0]

