export const SWRfetch = async <T = any>(
  input: RequestInfo,
  init?: RequestInit
): Promise<T> => {
  const res: T = await fetch(input, init).then((o) => {
    try {
      return o.json()
    } catch {
      // It is text or whatever.
      return o
    }
  })

  return res
}
