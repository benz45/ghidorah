import Axios, { AxiosInstance } from 'axios'

const axios: AxiosInstance = Axios.create({
  xsrfCookieName: 'XSRF-TOKEN',
  xsrfHeaderName: 'X-XSRF-TOKEN',
  headers: {
    'X-Requested-With': 'XMLHttpRequest',
    'Cache-Control': 'no-cache',
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  },
  withXSRFToken: true,
  withCredentials: true
})

axios.interceptors.request.use(
  config => {
    switch (true) {
      case config.url?.startsWith('api/e-commerce-info'):
        config.baseURL = process.env.NEXT_PUBLIC_E_COMMERCE_STORE_URL
      case config.url?.startsWith('api/auth'):
        config.baseURL = process.env.NEXT_PUBLIC_E_COMMERCE_STORE_URL
      case config.url?.startsWith('api/csrf'):
        config.baseURL = process.env.NEXT_PUBLIC_E_COMMERCE_STORE_URL
        break
    }
    return config
  },
  error => Promise.reject(error)
)
axios.interceptors.response.use(
  response => {
    const setCookie = response.headers['set-cookie']
    if (setCookie) {
      const xsrfToken = setCookie
        .find(cookie => cookie.startsWith('XSRF-TOKEN='))!
        .split(';')[0]
        .split('=')[1]
      if (xsrfToken) {
        axios.defaults.headers.common['X-XSRF-TOKEN'] = xsrfToken
      }
    }

    return response
  },
  error => {
    return Promise.reject(error)
  }
)

export default axios
