export const getFileExtension = (fileName: string) => {
  const result = ((fileName.toLowerCase().match(/[0-9a-z]+$/i) as string[]) ??
    [])[0].replace('.', '')

  if (result === 'c') return 'cpp'
  else return result
}
