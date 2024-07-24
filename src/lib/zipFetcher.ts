export default async function zipFetcher<JSON = unknown>(
  input: RequestInfo,
  init?: RequestInit
): Promise<JSON | Blob> {
  try {
    const res = await fetch(input, init)

    if (res.headers.get('Content-Type')?.includes('application/zip')) {
      return res.blob()
    }
    return res.json()
  } catch (e) {
    return Promise.reject(e)
  }
}
