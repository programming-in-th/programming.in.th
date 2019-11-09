import React, { useState } from 'react'
import { AdminLayout } from '../../components/admin/AdminLayout'
import styled from 'styled-components'

import firebase from '../../lib/firebase'
import useSWR from 'swr'
import { Table, Switch, Icon, Input } from 'antd'
import { ITask } from '../../@types/task'
import { ColumnProps } from 'antd/lib/table'
import { fetchAdminTask } from '../../utils/fetcher'
import { CustomSpin } from '../../components/Spin'

const WarningText = styled.p`
  color: red;
`

const ConfirmBox = styled(Input)`
  margin: 10px 0;
`

export default () => {
  const { data } = useSWR('getAdminTask', fetchAdminTask)
  const [state, setState] = useState('')
  const [deleteID, setDeleteID] = useState('')

  const columns: ColumnProps<ITask>[] = [
    {
      title: 'Task ID',
      dataIndex: 'problem_id'
    },
    {
      title: 'Task Name',
      dataIndex: 'title'
    },
    {
      title: 'Visible',
      dataIndex: 'visible',
      render: (visible: boolean, row: any) => (
        <span>
          <Switch
            checkedChildren={<Icon type="check" />}
            unCheckedChildren={<Icon type="close" />}
            defaultChecked={visible}
            loading={row.uid === state}
            onChange={async (checked: boolean) => {
              setState(row.uid)
              const param = [{ uid: row.uid, visible: checked }]
              const response = await firebase
                .app()
                .functions('asia-east2')
                .httpsCallable('editTaskView')(param)
              if (response.data) setState('')
              else console.log('ERROR')
            }}
          />
        </span>
      )
    },
    {
      title: 'Allow Submission',
      dataIndex: 'submit',
      render: (submit: boolean, row: any) => (
        <span>
          <Switch
            checkedChildren={<Icon type="check" />}
            unCheckedChildren={<Icon type="close" />}
            defaultChecked={submit}
            loading={row.uid === state}
            onChange={async (checked: boolean) => {
              setState(row.uid)
              const param = [{ uid: row.uid, visible: checked }]
              const response = await firebase
                .app()
                .functions('asia-east2')
                .httpsCallable('editTaskSubmit')(param)
              if (response.data) setState('')
              else console.log('ERROR')
            }}
          />
        </span>
      )
    }
  ]

  console.log(data)
  return (
    <AdminLayout>
      {data ? (
        <Table
          columns={columns}
          dataSource={data.data}
          size="middle"
          pagination={{ pageSize: 1000 }}
          scroll={{ x: 100 }}
        />
      ) : (
        <CustomSpin />
      )}
    </AdminLayout>
  )
}
