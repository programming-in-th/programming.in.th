import React from 'react'
import { Upload as AntDUpload, Button, Icon } from 'antd'

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
