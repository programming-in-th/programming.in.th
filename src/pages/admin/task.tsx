import React, { useState, useEffect } from 'react'
import { AdminLayout } from '../../components/admin/AdminLayout'
import styled from 'styled-components'

import firebase from '../../lib/firebase'
import useSWR from 'swr'
import { Table, Switch, Icon, Input, Popover, message, Button } from 'antd'
import { ITask } from '../../@types/task'
import { ColumnProps } from 'antd/lib/table'
import { fetchFromFirebase } from '../../utils/fetcher'
import { CustomSpin } from '../../components/Spin'
import { SubFilterWrapper } from '../../design/Atomics'

const WarningText = styled.p`
  color: red;
`

const MarginBox = styled(Input)`
  margin: 10px 0;
`

export default () => {
  const { data } = useSWR('getAdminTask', fetchFromFirebase)
  const [state, setState] = useState('')
  const [deleteID, setDeleteID] = useState('')
  const [searchWord, setSearchWord] = useState('')
  const [taskList, setTaskList] = useState()

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
    },
    {
      title: 'Action',
      render: (row: any) => (
        <span>
          <Popover
            title="Delete Task"
            content={
              <div>
                <p>Are you sure you want to delete this task?</p>
                <WarningText>
                  Please type problem id below for confirmation.
                </WarningText>

                <MarginBox
                  placeholder={`Type ${row.problem_id}`}
                  onChange={(e: React.FormEvent<HTMLInputElement>) => {
                    setDeleteID(e.currentTarget.value)
                  }}
                ></MarginBox>
                <Button
                  href="#"
                  type="danger"
                  loading={row.uid === state}
                  onClick={async () => {
                    if (row.problem_id !== deleteID) {
                      message.error("Task ID doesn't match")
                      return
                    }
                    setState(row.uid)
                    const param = row.uid
                    const response = await firebase
                      .app()
                      .functions('asia-east2')
                      .httpsCallable('deleteTask')(param)
                    if (response.data) setState('')
                    else console.log('ERROR')
                  }}
                >
                  Delete
                </Button>
              </div>
            }
            trigger="click"
          >
            <a>Delete</a>
          </Popover>
        </span>
      )
    }
  ]

  useEffect(() => {
    const updateTask = () => {
      if (data) {
        const filteredEvents = data.data.filter(({ problem_id, title }) => {
          const textLowerCase = searchWord.toLowerCase()
          title = title.toLowerCase()
          const statusProblemID = problem_id
            .toLowerCase()
            .includes(textLowerCase)
          const statusTitle = title.toLowerCase().includes(textLowerCase)

          return statusProblemID || statusTitle
        })

        setTaskList(filteredEvents)
      }
    }

    updateTask()
  }, [searchWord, data])

  return (
    <AdminLayout>
      <SubFilterWrapper>
        Search:
        <Input
          defaultValue={searchWord}
          placeholder="Enter Problem ID or Title"
          onChange={(e: React.FormEvent<HTMLInputElement>) => {
            setSearchWord(e.currentTarget.value)
          }}
          style={{ margin: 10 }}
        />
      </SubFilterWrapper>
      {taskList ? (
        <Table
          bordered
          columns={columns}
          dataSource={taskList}
          size="middle"
          pagination={{ pageSize: 20 }}
          scroll={{ x: 500 }}
        />
      ) : (
        <CustomSpin />
      )}
    </AdminLayout>
  )
}
