import { Readable } from 'stream'

const streamToString = (stream: Readable) =>
  new Promise<string>((resolve, reject) => {
    const chunks: Buffer[] = []
    stream.on('data', chunk => chunks.push(chunk))
    stream.once('end', () => resolve(Buffer.concat(chunks).toString()))
    stream.once('error', reject)
  })

export default streamToString
