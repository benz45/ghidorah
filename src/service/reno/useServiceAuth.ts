
import { SigninRequest } from '~/model/auth/signinRequest'
import { SigninResponse } from '~/model/auth/signinResponse'
import { usePostMethod } from '../http/methods'
import { SignupResponse } from '~/model/auth/signupResponse'
import { SignupRequest } from '~/model/auth/signupRequest'


export function useServiceAuth() {
  const signin = usePostMethod<SigninRequest, SigninResponse>("api/auth/signin")
  const signup = usePostMethod<SignupRequest, SignupResponse>("api/auth/signup")
  return {
    signin,
    signup
  }
}
