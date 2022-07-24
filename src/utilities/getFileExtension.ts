export const getFileExtension = (fileName: string) =>
  (fileName.toLowerCase().match(/\.[0-9a-z]+$/i) ?? [])[0]
