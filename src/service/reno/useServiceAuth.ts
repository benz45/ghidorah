
import { usePostMethod } from '@/service/http/methods'


export function useServiceAuth() {
  const signin = usePostMethod("api/auth/signin")
  const signup = usePostMethod("api/auth/signup")
  return {
    signin,
    signup
  }
}
