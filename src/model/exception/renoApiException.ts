import { AxiosError } from 'axios'

export interface RenoApiException {
  statusCode: string
  errorCode: string
  errorMessage: string
  project: string
}

export class ApiException {
  errorMessage: string | undefined
  errorCode: string | undefined
  statusCode: string | undefined

  constructor(error: unknown) {
    if (error instanceof AxiosError) {
      const _error = error as AxiosError<RenoApiException | RenoApiException[]>
      if (_error.response?.data instanceof Array) {
        this.shouldSetError(_error.response?.data?.[0])
      } else {
        if (_error.response?.data) {
          this.shouldSetError(_error.response?.data)
        }
      }
    } else if (error instanceof Error) {
      this.errorMessage = error.message
    } else if (typeof error === 'string') {
      this.errorMessage = error
    } else {
      console.error(error)
    }
  }

  private shouldSetError(error: RenoApiException) {
    this.errorCode = error.errorCode
    this.statusCode = error.statusCode
    this.errorMessage = error.errorMessage
  }
}
