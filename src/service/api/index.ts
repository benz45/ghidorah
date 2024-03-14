import { AxiosError } from "axios"
import axios from "../http"
import { ApiGetPath, ApiResponse } from "./api"


async function _get<T extends keyof ApiGetPath>(url: T): Promise<ApiResponse<T> | undefined> {
  try {
    const response = await axios.get(url)
    return response.data as ApiResponse<typeof url>
  } catch (error) {
    if (error instanceof Error || error instanceof AxiosError) {
      console.error(error.message)
    } else {
      console.error(error)
    }
  }
}

export const ServiceApi = {
  get: _get
}
