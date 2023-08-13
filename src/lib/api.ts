import { ofetch } from 'ofetch'

export type ResponseType = {
  statusCode: number
  code: string
  message?: string
  data?: any
}

export const fetcher = async (...segments: string[]): Promise<ResponseType> => {
  const endpoint = segments.join('/')
  const target = `https://dua-dhikr.vercel.app/${endpoint}`

  const response = await ofetch(target, {
    ignoreResponseError: true,
    headers: { 'Accept-Language': 'id' },
  })

  return response
}
