export const getTimestamp = (timestamp: any) => {
  const second = timestamp.seconds ? timestamp.seconds : timestamp._seconds
  const time = new Date(second * 1000)
  const dd = (time.getDate() < 10 ? '0' : '') + time.getDate()
  const mm = (time.getMonth() < 10 ? '0' : '') + (time.getMonth() + 1)
  const yyyy = time.getFullYear() + 543
  const tt = time.toString().substring(16, 24)
  const humanTimestamp = `${dd}/${mm}/${yyyy} ${tt}`
  return humanTimestamp
}
