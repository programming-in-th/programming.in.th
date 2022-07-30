import { Task } from '@prisma/client'
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/outline'
import { FC, memo, useEffect, useMemo, useState } from 'react'
import Table from '@/components/common/Table'

const TestTable: FC<{ task: Task }> = ({ task }) => {
  // data state to store the Users API data.
  //Initially it  is an empty array.
  const [data, setData] = useState([])

  useEffect(() => {
    ;(async () => {
      const result = await fetch('https://jsonplaceholder.typicode.com/users')
      const data = await result.json()
      setData(data)
      console.log(data)
    })()
  }, [])

  const tabledata = useMemo(
    () => [
      {
        // first group - Users
        Header: 'Users',
        // group columns
        columns: [
          {
            Header: 'Id',
            accessor: 'id'
          },
          {
            Header: 'Name',
            accessor: 'name'
          },
          {
            Header: 'User Name',
            accessor: 'username'
          }
        ]
      },
      {
        // Second group - Contact Details
        Header: 'Contact Details',
        // group columns
        columns: [
          {
            Header: 'Phone',
            accessor: 'phone'
          },
          {
            Header: 'Email',
            accessor: 'email'
          },
          {
            Header: 'Website',
            accessor: 'website'
          }
        ]
      }
    ],
    []
  )

  return (
    <div className="App">
      <Table columns={tabledata} data={data} />
    </div>
  )
}

export default memo(TestTable)
