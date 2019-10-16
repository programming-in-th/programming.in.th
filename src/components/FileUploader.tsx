import React from 'react'
import { Upload as AntDUpload, Button, Icon, message } from 'antd'
import firebase from 'firebase/app'
import 'firebase/storage'

interface IUploaderProps {
  getCodeFromUpload: (code: string) => void
}

export const Upload: React.FunctionComponent<IUploaderProps> = (
  props: IUploaderProps
) => (
  <AntDUpload
    accept=".c, .cpp, .py"
    showUploadList={false}
    beforeUpload={file => {
      const reader = new FileReader()

      reader.onload = (ev: any) => {
        props.getCodeFromUpload(ev.target.result)
      }

      reader.readAsText(file)

      return false
    }}
  >
    <Button>
      <Icon type="upload" /> Upload
    </Button>
  </AntDUpload>
)

interface IAvatarUploaderProps {
  user: firebase.User
}
export const AvatarUploader: React.FunctionComponent<IAvatarUploaderProps> = (
  props: IAvatarUploaderProps
) => {
  const customUpload = async (option: any) => {
    const storage = firebase.storage()
    const metadata = {
      contentType: 'image/jpeg'
    }

    const storageRef = await storage.ref()
    const imgFile = storageRef.child(`profilePic/${props.user.uid}/image.png`)

    try {
      const image = await imgFile.put(option.file, metadata)
      option.onSuccess(null, image)
      imgFile
        .getDownloadURL()
        .then(data =>
          props.user
            .updateProfile({ photoURL: data })
            .then(() => message.success('Success!'))
        )
    } catch (e) {
      option.onError(e)
    }
  }

  const beforeUpload = (file: any) => {
    const isImage = file.type.indexOf('image/') === 0
    if (!isImage) {
      message.error('You need to upload image!')
    }

    return isImage
  }

  return (
    <AntDUpload
      showUploadList={false}
      beforeUpload={beforeUpload}
      customRequest={customUpload}
    >
      <Button>
        <Icon type="upload" /> Upload
      </Button>
    </AntDUpload>
  )
}
