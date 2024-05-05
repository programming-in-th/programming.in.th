import axios from 'axios'

const uploadFile = async (
  src: string,
  file: File,
  type: string,
  onProgress: (percent: number) => void
) => {
  await axios.put(src, file, {
    headers: {
      'Content-Type': type
    },
    onUploadProgress: progressEvent => {
      if (progressEvent.total) {
        const percentCompleted = Math.round(
          (progressEvent.loaded * 100) / progressEvent.total
        )
        onProgress(percentCompleted)
      }
    }
  })
}

export default uploadFile
