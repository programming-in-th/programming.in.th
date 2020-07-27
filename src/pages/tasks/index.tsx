import React from 'react'
import { GetStaticProps } from 'next'
import { Flex } from '@chakra-ui/core'

import { PageLayout } from 'components/Layout'
import db from 'lib/firebase-admin'
import { TaskTable } from 'components/tasks/Table'

export default ({ result }) => {
  const columns = React.useMemo(
    () => [
      {
        Header: 'PROBLEM ID',
        accessor: 'id',
      },
      {
        Header: 'PROBLEM TITLE',
        accessor: 'title',
      },
    ],
    []
  )

  return (
    <PageLayout>
      <Flex justify="center" flexGrow={1} py={4} px={4}>
        <TaskTable result={result} columns={columns} />
      </Flex>
    </PageLayout>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const taskDocs = await db()
    .collection('tasks')
    .where('visible', '==', true)
    .get()

  const result = []

  for (const doc of taskDocs.docs) {
    const data = doc.data()
    data.id = doc.id
    result.push(data)
  }

  return {
    props: {
      result,
    },
    revalidate: 60,
  }
}
