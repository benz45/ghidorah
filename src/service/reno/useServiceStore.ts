
import { usePostMethod } from '@/service/http/methods'


export function useServiceStore() {
  const postStore = usePostMethod("api/e-commerce-info/store")
  return {
    postStore: postStore
  }
}
