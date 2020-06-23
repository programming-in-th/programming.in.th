export const getTimestamp = (second: number) => {
  const time = new Date(second * 1000)
  const dd = (time.getDate() < 10 ? '0' : '') + time.getDate()
  const mm = (time.getMonth() < 10 ? 1 : 0) + time.getMonth()
  const yyyy = time.getFullYear() + 543
  const tt = time.toString().substring(16, 24)
  const humanTimestamp = `${dd}/${mm}/${yyyy} ${tt}`
  return humanTimestamp
}
