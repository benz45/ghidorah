import type { NextApiRequest, NextApiResponse } from 'next'
import { CSRFResponse } from '~/model/CSRFResponse'
import { SigninResponse } from '~/model/auth/signinResponse'
import axios from '~/service/http'

export default async function handler(req: NextApiRequest, res: NextApiResponse<SigninResponse | { message: string }>) {
  res.setHeader('Cache-Control', 'no-store')
  try {
    axios.interceptors.response.use(
      response => {
        const setCookie = response.headers['set-cookie']
        if (setCookie != undefined) {
          const xsrfToken = setCookie
            .find(cookie => cookie.startsWith('XSRF-TOKEN='))
            ?.split(';')[0]
            ?.split('=')[1]
          //   .find(cookie => cookie.startsWith('XSRF-TOKEN='))
          //   .split(';')[0]
          //   .split('=')[1]

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
    console.log(req.body)
    const response = await axios.post<SigninResponse>('api/auth/signin', req.body, {
      xsrfCookieName: 'XSRF-TOKEN',
      xsrfHeaderName: 'X-XSRF-TOKEN',
      headers: {
        'Cache-Control': 'no-cache',
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'x-xsrf-token': `${req?.headers['x-xsrf-token'] ?? ''}`,
        // 'Access-Control-Allow-Origin': '*',
        // 'Access-Control-Allow-Credentials': true,
        // 'Access-Control-Allow-Methods': 'HEAD, GET, POST, PUT, PATCH, DELETE',
        // 'Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token'
      },
      withCredentials: true
    })
    const data = JSON.parse(JSON.stringify(response.data))
    res.status(200).json(data)
  } catch (error) {
    if (error instanceof Error) {
      // console.error(error)
      res.status(400).json({ message: 'error sign in ' })
    }
  }
}