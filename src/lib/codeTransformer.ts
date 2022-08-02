import { brotliCompress, brotliDecompress } from 'zlib'

export async function compressCode(code: string): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    brotliCompress(code, (err, res) => {
      if (err) reject(err)
      resolve(res)
    })
  })
}

export async function decompressCode(code: Buffer): Promise<string[]> {
  return new Promise((resolve, reject) => {
    brotliDecompress(code, (err, res) => {
      if (err) reject(err)
      resolve(JSON.parse(res.toString('utf8')))
    })
  })
}
