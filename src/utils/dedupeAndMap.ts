import removeArrDup from './removeArrDup'

const dedupeAndMap = <T, U>(
  arr: T[],
  mapFn: (value: T, index: number, array: T[]) => U
): U[] => {
  return removeArrDup(arr).map(mapFn)
}

export default dedupeAndMap
