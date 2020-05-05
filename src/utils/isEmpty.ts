export const isObjectEmpty = (obj: Object): boolean => {
  return Object.keys(obj).length === 0 && obj.constructor === Object
}

export const isArrayEmpty = (arr: any[]): boolean => {
  return !Array.isArray(arr) || !arr.length
}
