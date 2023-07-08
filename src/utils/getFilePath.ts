const getFilePath = (file: File | undefined) => {
  if (!file) return { path: '', type: '' }
  if (file.webkitRelativePath === '')
    return {
      path: file.name,
      type: file.type === '' ? 'text/plain' : file.type
    }
  const segments = file.webkitRelativePath.split('/')
  segments.shift()
  return {
    path: segments.join('/'),
    type: file.type === '' ? 'text/plain' : file.type
  }
}
export default getFilePath
