export const updateObject = (oldObject: any, newObject: any) => {
  return {
    ...oldObject,
    ...newObject
  }
}
