import { CSRFResponse } from "~/model/CSRFResponse"
import { ProductPageResponse } from "~/model/product/productPageResponse"
import { CreateStoreRequest } from "../../model/store/CreateStoreRequest"
import { CreateStoreResponse } from "../../model/store/CreateStoreResponse"
import { CreateEmployeeResponse } from "../../model/employee/createEmployeeResponse"
import { CreateEmployeeRequest } from "../../model/employee/createEmployeeRequest"
import { CustomerResponse } from "../../model/customer/customerResponse"
import { CreateCustomerRequest } from "../../model/customer/createCustomerRequest"
import { SigninRequest } from "../../model/auth/signinRequest"
import { SigninResponse } from "../../model/auth/signinResponse"
import { SignupRequest } from "../../model/auth/signupRequest"
import { SignupResponse } from "../../model/auth/signupResponse"

export interface ApiGetPath {
  'api/csrf-token': [CSRFResponse],
  'api/e-commerce-info/product': [ProductPageResponse]
}

export interface ApiPostPath {
  'api/auth/signin': [SigninResponse, SigninRequest]
  'api/auth/signup': [SignupResponse, SignupRequest]
  'api/e-commerce-info/customer': [CustomerResponse, CreateCustomerRequest]
  'api/e-commerce-info/employee': [CreateEmployeeResponse, CreateEmployeeRequest]
  'api/e-commerce-info/store': [CreateStoreResponse, CreateStoreRequest]
}

export type ApiGetResponse <T extends keyof ApiGetPath> = ApiGetPath[T][0]
export type ApiPostResponse <T extends keyof ApiPostPath> = ApiPostPath[T][0]
export type ApiPostRequest <T extends keyof ApiPostPath> = ApiPostPath[T][1]

