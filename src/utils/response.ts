import { NextApiResponse } from 'next'

export const ok = (res: NextApiResponse, data: unknown) => {
  return json(res, data)
}

export const json = (res: NextApiResponse, data: unknown = {}) => {
  return res.status(200).json(data)
}

export function send(res: NextApiResponse, data: unknown, type = 'text/plain') {
  res.setHeader('Content-Type', type)

  return res.status(200).send(data)
}

export const badRequest = (res: NextApiResponse, msg = '400 Bad Request') => {
  return res.status(400).end(msg)
}

export const unauthorized = (
  res: NextApiResponse,
  msg = '401 Unauthorized'
) => {
  return res.status(401).end(msg)
}

export const forbidden = (res: NextApiResponse, msg = '403 Forbidden') => {
  return res.status(403).end(msg)
}

export const notFound = (res: NextApiResponse, msg = '404 Not Found') => {
  return res.status(404).end(msg)
}

export const methodNotAllowed = (
  res: NextApiResponse,
  allowed: string[] = [],
  msg = '405 Method Not Allowed'
) => {
  res.setHeader('Allow', allowed)
  return res.status(405).end(msg)
}

export const internalServerError = (
  res: NextApiResponse,
  msg = '500 Internal Server Error'
) => {
  return res.status(500).end(msg)
}
