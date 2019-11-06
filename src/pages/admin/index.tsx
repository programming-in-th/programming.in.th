import React, { useState, useEffect } from 'react'
import { PageLayout } from '../../components/Layout'
import styled, { keyframes } from 'styled-components'

import firebase from '../../lib/firebase'
import useSWR from 'swr'
import { WhiteContainerWrapper } from '../../design/Atomics'
import { fetchUserList } from '../../utils/fetchUserList'
import { Table, Switch, Icon } from 'antd'
import { useUser } from '../../components/UserContext'

export default () => {
  const { isAdmin } = useUser()
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
