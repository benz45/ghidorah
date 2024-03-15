import { CSRFResponse } from "@/model/csrfResponse"
import { ProductPageResponse } from "@/model/product/productPageResponse"
import { CreateEmployeeResponse } from "@/model/employee/createEmployeeResponse"
import { CreateEmployeeRequest } from "@/model/employee/createEmployeeRequest"
import { CustomerResponse } from "@/model/customer/customerResponse"
import { CreateCustomerRequest } from "@/model/customer/createCustomerRequest"
import { SigninRequest } from "@/model/auth/signinRequest"
import { SigninResponse } from "@/model/auth/signinResponse"
import { SignupRequest } from "@/model/auth/signupRequest"
import { SignupResponse } from "@/model/auth/signupResponse"
import { CreateStoreResponse } from "@/model/store/createStoreResponse"
import { CreateStoreRequest } from "@/model/store/createStoreRequest"
import { EmployeeResponse } from "@/model/employee/employeeResponse"
import { EmployeeRequestPath } from "@/model/employee/employeeRequest"

export interface ApiGetPath {
  'api/csrf-token': [CSRFResponse],
  'api/e-commerce-info/product': [ProductPageResponse],
  'api/e-commerce-info/employee/user/{userId}': [EmployeeResponse, EmployeeRequestPath]
}

export interface ApiPostPath {
  'api/auth/signin': [SigninResponse, SigninRequest]
  'api/auth/signup': [SignupResponse, SignupRequest]
  'api/e-commerce-info/customer': [CustomerResponse, CreateCustomerRequest]
  'api/e-commerce-info/employee': [CreateEmployeeResponse, CreateEmployeeRequest]
  'api/e-commerce-info/store': [CreateStoreResponse, CreateStoreRequest]
}

export type ApiGetResponse <T extends keyof ApiGetPath> = ApiGetPath[T][0]
export type ApiGetRequest <T extends keyof ApiGetPath> = ApiGetPath[T][1]
export type ApiPostResponse <T extends keyof ApiPostPath> = ApiPostPath[T][0]
export type ApiPostRequest <T extends keyof ApiPostPath> = ApiPostPath[T][1]

