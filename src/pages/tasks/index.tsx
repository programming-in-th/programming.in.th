import React from 'react'
import { GetStaticProps } from 'next'
import { Flex } from '@chakra-ui/core'

import { PageLayout } from 'components/Layout'
import db from 'lib/firebase-admin'
import { TaskTable } from 'components/tasks/NewTable'

const Tasks = ({ data }) => {
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
        <TaskTable result={data} columns={columns} />
      </Flex>
    </PageLayout>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const manifestRef = db().doc('tasks/$manifest')

  const manifest = (await manifestRef.get()).data()

  let data = []

  if (manifest.newTask === true) {
    const taskDocs = await db()
      .collection('tasks')
      .where('visible', '==', true)
      .get()

    for (const doc of taskDocs.docs) {
      const docData = doc.data()
      docData.id = doc.id
      data.push(docData)
    }
    await manifestRef.update({ newTask: false, data })
  } else {
    data = manifest.data
  }

  return {
    props: {
      data,
    },
    revalidate: manifest.revalidate,
  }
}

export default Tasks
