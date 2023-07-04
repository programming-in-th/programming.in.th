export function paramsToObject(search: URLSearchParams) {
  const params: Record<string, string> = {}
  for (const [key, value] of search.entries()) {
    params[key] = value
  }
  return params
}
