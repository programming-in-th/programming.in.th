import * as https from 'https'

import { S3 } from '@aws-sdk/client-s3'
import { NodeHttpHandler } from '@smithy/node-http-handler'

// Basic validation
if (!process.env.BUCKET_KEY_ID || !process.env.BUCKET_KEY_SECRET)
  throw new Error('Failed to initialize bucket: Environment Variable Missing')

// Configure a shared HTTPS agent to reuse sockets and avoid leaking connections.
// Tune via env vars if needed in production.
const MAX_SOCKETS = process.env.S3_MAX_SOCKETS
  ? parseInt(process.env.S3_MAX_SOCKETS, 10)
  : 200

// default socket acquisition warning timeout in ms
const SOCKET_ACQUISITION_WARNING_TIMEOUT = process.env
  .S3_SOCKET_ACQUISITION_WARNING_TIMEOUT
  ? parseInt(process.env.S3_SOCKET_ACQUISITION_WARNING_TIMEOUT, 10)
  : 2000

const httpsAgent = new https.Agent({ keepAlive: true, maxSockets: MAX_SOCKETS })

const httpHandler = new NodeHttpHandler({
  httpsAgent,
  // Warn if acquiring a socket takes too long — reduces silent queueing.
  socketAcquisitionWarningTimeout: SOCKET_ACQUISITION_WARNING_TIMEOUT
})

export const s3Client = new S3({
  endpoint: process.env.BUCKET_ENDPOINT,
  region: process.env.BUCKET_REGION,
  credentials: {
    accessKeyId: process.env.BUCKET_KEY_ID,
    secretAccessKey: process.env.BUCKET_KEY_SECRET
  },
  // Use the shared handler so all S3 calls reuse the same socket pool.
  requestHandler: httpHandler
})
