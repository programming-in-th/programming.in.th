import React from 'react'
import { PageHeader } from 'antd'

export class Profile extends React.Component {
  render() {
    return (
      <div>
        <PageHeader
          onBack={() => null}
          title="Title"
          subTitle="This is a subtitle"
        />
      </div>
    )
  }
}
