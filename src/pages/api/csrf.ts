import type { NextApiRequest, NextApiResponse } from 'next'
import { CSRFResponse } from '~/model/CSRFResponse'
import axios from '~/service/http'

async function handler(req: NextApiRequest, res: NextApiResponse<CSRFResponse | { message: string }>) {
  try {
    const response = await axios.get('api/csrf/firsttime')
    const data = JSON.parse(JSON.stringify(response.data))
    res.status(200).json(data)
  } catch (error) {
    if (error instanceof Error) {
      console.error(error)
      res.status(400).json({ message: error.message })
    }
  }
}
export default handler
