import { AxiosError } from "axios"
import axios from "@/service/http"
import { ApiGetPath, ApiGetResponse } from "@/service/api/api"


async function _get<T extends keyof ApiGetPath>(url: T): Promise<ApiGetResponse<T> | undefined> {
  try {
    const response = await axios.get(url)
    return response.data as ApiGetResponse<typeof url>
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
