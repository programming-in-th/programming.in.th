import React from 'react'
import { GetStaticPaths, GetStaticProps } from 'next'

import { TaskLayout } from 'components/tasks/TaskLayout'
import { Statement } from 'components/tasks/Statement'

import db from 'lib/firebase-admin'

export default ({ type, metadata }) => {
  return (
    <TaskLayout type={type} metadata={metadata}>
      <Statement metadata={metadata} />
    </TaskLayout>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const taskDocs = await db()
    .collection('tasks')
    .where('visible', '==', true)
    .get()

  const result: string[] = []

  for (const doc of taskDocs.docs) {
    result.push(doc.id)
  }
  return {
    paths: result.map((id: string) => {
      return { params: { id } }
    }),
    fallback: true,
  }
}

export const getStaticProps: GetStaticProps = async ({ params: { id } }) => {
  let metadata: any = {}

  const taskDoc = await db().doc(`tasks/${id}`).get()

  let type = 'statement'

  const exist = taskDoc.exists
  if (exist) {
    const data = taskDoc.data()
    data.id = taskDoc.id
    metadata = data.visible ? data : {}
    if (data.visible === false) {
      type = 'null'
    }
  } else {
    type = 'null'
  }

  return {
    props: {
      type,
      metadata,
    },
    unstable_revalidate: 60,
  }
}
