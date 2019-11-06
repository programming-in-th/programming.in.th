import React, { useState } from 'react'
import firebase from '../../lib/firebase'
import useSWR from 'swr'
import { fetchUserList } from '../../utils/fetchUserList'
import { Table, Switch, Icon } from 'antd'
import { CustomSpin } from '../../components/Spin'
import { AdminLayout } from '../../components/admin/AdminLayout'

export default () => {
  const { data } = useSWR('getAllUser', fetchUserList)
  const [state, setState] = useState('')
  const columns = [
    {
      title: 'Display Name',
      dataIndex: 'displayName'
    },
    {
      title: 'Email',
      dataIndex: 'email'
    },
    {
      title: 'Admin',
      dataIndex: 'admin',
      render: (isadmin: boolean, row: any) => (
        <span>
          <Switch
            checkedChildren={<Icon type="check" />}
            unCheckedChildren={<Icon type="close" />}
            defaultChecked={isadmin}
            loading={row.uid === state}
            onChange={async (checked: boolean) => {
              setState(row.uid)
              const param = { uid: row.uid, checked }
              const response = await firebase
                .app()
                .functions('asia-east2')
                .httpsCallable('updateAdmin')(param)
              if (response.data) setState('')
              else console.log('ERROR')
            }}
          />
        </span>
      )
    }
  ] as any

  return (
    <AdminLayout>
      {data ? (
        <Table
          columns={columns}
          dataSource={data.data}
          size="middle"
          pagination={{ pageSize: 1000 }}
        />
      ) : (
        <CustomSpin />
      )}
    </AdminLayout>
  )
}
