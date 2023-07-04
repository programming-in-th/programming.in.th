export function paramsToObject(search: URLSearchParams) {
  const params: Record<string, string | string[]> = {}
  for (const [key, value] of search.entries()) {
    if (params[key]) {
      if (Array.isArray(params[key])) {
        ;(params[key] as string[]).push(value)
      } else {
        params[key] = [params[key] as string, value]
      }
      continue
    }
    params[key] = value
  }
  return params
}
