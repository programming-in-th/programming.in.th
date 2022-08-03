export const getLanguage = (fileName: string) => {
  const result = (fileName.toLowerCase().match(/[0-9a-z]+$/i) ?? [])[0].replace(
    '.',
    ''
  )

  if (result === 'c') return 'cpp'
  else return result
}
