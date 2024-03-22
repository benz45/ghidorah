import { AxiosError } from "axios";
interface Exception {
  statusCode: string
  errorCode: string
  errorMessage: string
  project: string
}

export const ApiException = AxiosError<Exception | Exception[]>


