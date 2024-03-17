import Axios, { AxiosInstance } from 'axios'
import { PATHS } from '@/hook/router'
import { RefreshTokenResponse } from '@/model/auth/refreshTokenResponse'
import { SigninResponse } from '@/model/auth/signinResponse'

const LOCAL_STORAGE_AUTH_KEY: string = 'AUTH'

enum API_PATH {
  API_E_COMMERCE_INFO = 'api/e-commerce-info',
  API_AUTH = 'api/auth',
  API_REFRESH_TOKEN = 'api/auth/refreshtoken',
  API_CSRF = 'api/csrf'
}

const axios: AxiosInstance = Axios.create({
  xsrfCookieName: 'XSRF-TOKEN',
  xsrfHeaderName: 'X-XSRF-TOKEN',
  headers: {
    'X-Requested-With': 'XMLHttpRequest',
    'Cache-Control': 'no-cache',
    Accept: 'Application/json',
    'Content-Type': 'Application/json'
  },
  withXSRFToken: true,
  withCredentials: true
})

axios.interceptors.request.use(
  config => {
    switch (true) {
      case config.url?.startsWith(API_PATH.API_E_COMMERCE_INFO.valueOf()):
        config.baseURL = process.env.NEXT_PUBLIC_E_COMMERCE_STORE_URL
      case config.url?.startsWith(API_PATH.API_AUTH.valueOf()):
        config.baseURL = process.env.NEXT_PUBLIC_E_COMMERCE_STORE_URL
      case config.url?.startsWith(API_PATH.API_CSRF.valueOf()):
        config.baseURL = process.env.NEXT_PUBLIC_E_COMMERCE_STORE_URL
        break
    }

    if (!config.url?.startsWith(API_PATH.API_AUTH.valueOf()) || !config.url?.startsWith(API_PATH.API_CSRF.valueOf())) {
      const authLocalStorage = localStorage.getItem(LOCAL_STORAGE_AUTH_KEY)
      if (authLocalStorage) {
        const auth: SigninResponse = JSON.parse(authLocalStorage) as SigninResponse
        config.headers.Authorization = `Bearer ${auth.accessToken}`
        config.headers.RefreshToken = `${auth.refreshToken}`
      }
    }

    return config
  },
  error => Promise.reject(error)
)

axios.interceptors.response.use(
  config => {
    if (config.config.url?.startsWith(API_PATH.API_CSRF.valueOf())) {
      // if (setCookie) {
      //   const xsrfToken = setCookie
      //     .find(cookie => cookie.startsWith('XSRF-TOKEN='))
      //     ?.split(';')[0]
      //     .split('=')[1]
      //   if (xsrfToken) {
      //     axios.defaults.headers.common['X-XSRF-TOKEN'] = xsrfToken
      //   }
      // } else {
      const token = config.data?.['token']
      if (token) {
        axios.defaults.headers.common['X-XSRF-TOKEN'] = token
      }
      // }
    } else {
      const setCookie = config.headers['set-cookie']
      if (setCookie) {
        const xsrfToken = setCookie
          .find(cookie => cookie.startsWith('XSRF-TOKEN='))
          ?.split(';')[0]
          .split('=')[1]
        if (xsrfToken) {
          axios.defaults.headers.common['X-XSRF-TOKEN'] = xsrfToken
        }
      }
    }
    return config
  },
  async error => {
    const originalRequest = error.config
    if (error.response.data?.['path'] === '/error') {
      return axios(originalRequest)
    } else if (error.response?.status === 401 && !error.url?.startsWith(API_PATH.API_AUTH.valueOf())) {
      try {
        const authLocalStorage = localStorage.getItem(LOCAL_STORAGE_AUTH_KEY)
        if (authLocalStorage) {
          const auth: SigninResponse = JSON.parse(authLocalStorage) as SigninResponse
          const refreshTokenResponse = await axios.post<RefreshTokenResponse>(
            API_PATH.API_REFRESH_TOKEN.valueOf(),
            {
              refreshToken: `${auth.refreshToken}`
            },
            {
              headers: {
                Authorization: `Bearer ${auth.refreshToken}`
              }
            }
          )
          auth.accessToken = refreshTokenResponse.data.accessToken
          auth.refreshToken = refreshTokenResponse.data.refreshToken
          localStorage.setItem(LOCAL_STORAGE_AUTH_KEY, JSON.stringify(auth))
          return axios(originalRequest)
        }
      } catch (err) {
        // localStorage.removeItem(LOCAL_STORAGE_AUTH_KEY)
        // location.href = PATHS.AUTHORIZATION.path
      }
    }

    return Promise.reject(error)
  }
)

export default axios
