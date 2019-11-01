import React from 'react'
import { Upload as AntDUpload, Button, Icon, message } from 'antd'

import firebase from '../../lib/firebase'
import 'firebase/storage'

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
