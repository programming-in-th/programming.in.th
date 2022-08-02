export const getLanguage = (fileName: string) => {
  const result = (fileName
    .toLowerCase()
    .replace('.', '')
    .match(/[0-9a-z]+$/i) ?? [])[0]

  if (result === 'c') return 'cpp'
  else return result
}
