const removeArrDup = <T>(arr: T[]) => {
  return Array.from(new Set(arr))
}

export default removeArrDup
