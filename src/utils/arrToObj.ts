export const arrToObj = (array: any[]): Object => {
  return array.reduce((obj, item) => {
    obj[item[0]] = item[1]
    return obj
  }, {})
}
