import { CSRFResponse } from "~/model/CSRFResponse"

export interface ApiGetPath {
  'api/csrf-token': [CSRFResponse]
}

export type ApiResponse <T extends keyof ApiGetPath> = ApiGetPath[T][0]

