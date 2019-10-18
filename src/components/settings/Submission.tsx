import React from 'react'
import { List, Switch, Icon } from 'antd'

export const SubmissionSetting: React.FunctionComponent = () => {
  const getData = () => [
    {
      title: 'Hide Code',
      description: 'Set default code hiding in submission',
      actions: [
        <Switch
          style={{ marginLeft: 10 }}
          checkedChildren={<Icon type="check" />}
          unCheckedChildren={<Icon type="close" />}
          defaultChecked={false}
        />
      ]
    }
  ]

  return (
    <div>
      <List
        itemLayout="horizontal"
        dataSource={getData()}
        size="large"
        renderItem={(item: any) => (
          <List.Item actions={item.actions}>
            <List.Item.Meta
              avatar={item.avatar}
              title={item.title}
              description={item.description}
            />
          </List.Item>
        )}
      />
    </div>
  )
}
