import { z } from 'zod'

export const stringToNumber = z.string().transform(val => Number(val))

export const dateParser = z.preprocess(arg => {
  if (typeof arg == 'string' || arg instanceof Date) return new Date(arg)
}, z.date())
