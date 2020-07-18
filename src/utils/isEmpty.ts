export const isObjectEmpty = (obj: Object): boolean => {
  return obj?.constructor === Object && Object.keys(obj).length === 0
}

export const isArrayEmpty = (arr: any[]): boolean => {
  return !Array.isArray(arr) || !arr.length
}
