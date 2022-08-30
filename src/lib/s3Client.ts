import { S3 } from '@aws-sdk/client-s3'

if (!process.env.BUCKET_KEY_ID || !process.env.BUCKET_KEY_SECRET)
  throw new Error('Failed to initialize bucket')

export const s3Client = new S3({
  endpoint: process.env.BUCKET_ENDPOINT,
  region: process.env.BUCKET_REGION,
  credentials: {
    accessKeyId: process.env.BUCKET_KEY_ID,
    secretAccessKey: process.env.BUCKET_KEY_SECRET
  }
})
