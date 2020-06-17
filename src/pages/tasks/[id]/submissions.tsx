import React from 'react'
import { GetStaticPaths, GetStaticProps } from 'next'

import { useRouter } from 'next/router'

import { SubmissionsList } from 'components/submissions/SubmissionsList'
import { TaskLayout } from 'components/tasks/TaskLayout'

import db from 'lib/firebase-admin'

export default ({ type, metadata }) => {
  const router = useRouter()
  return (
    <TaskLayout type={type} metadata={metadata}>
      {router.isFallback ? null : <SubmissionsList taskFrom={metadata.id} />}
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

  let type = 'submissions'

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
