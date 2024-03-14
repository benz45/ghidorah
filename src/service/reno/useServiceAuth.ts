
import { SigninRequest } from '~/model/auth/signinRequest'
import { SigninResponse } from '~/model/auth/signinResponse'
import { usePostMethod } from '../http/methods'


export function useServiceAuth() {
  const signin = usePostMethod<SigninRequest, SigninResponse>("api/auth/signin")
  return {
    signin
  }
}
