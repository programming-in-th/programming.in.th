import React, { useState } from 'react'
import { PageLayout } from '../../components/Layout'
import styled from 'styled-components'

import firebase from '../../lib/firebase'
import useSWR from 'swr'
import { Table, Switch, Icon, Popover, Input, Button, message } from 'antd'
import { WhiteContainerWrapper } from '../../design/Atomics'
import { Router } from 'next/router'

const WarningText = styled.p`
  color: red;
`

const ConfirmBox = styled(Input)`
  margin: 10px 0;
`

const fetchAdminTask = async (type: string) => {
  const getAdminTask = firebase
    .app()
    .functions('asia-east2')
    .httpsCallable(type)

  return await getAdminTask({})
}

export default () => {
  const { data } = useSWR('getAdminTask', fetchAdminTask)
  const [state, setState] = useState('')
  const [deleteID, setDeleteID] = useState('')

  const columns = [
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
  ] as any

  console.log(data)
  return (
    <PageLayout>
      <WhiteContainerWrapper>
        {data ? (
          <Table
            columns={columns}
            dataSource={data.data}
            size="middle"
            pagination={{ pageSize: 1000 }}
          />
        ) : null}
      </WhiteContainerWrapper>
    </PageLayout>
  )
}
