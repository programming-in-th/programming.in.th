import React from 'react'
import { GetStaticPaths, GetStaticProps } from 'next'

import { TaskLayout } from 'components/tasks/TaskLayout'
import { Solution } from 'components/tasks/Solution'

import { renderMarkdown } from 'lib/renderMarkdown'

import db from 'lib/firebase-admin'

export default ({ type, metadata }) => {
  return (
    <TaskLayout type={type} metadata={metadata}>
      <Solution solution={metadata.solution} />
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
    const solutionRes = await fetch(
      `https://beta-programming-in-th.s3-ap-southeast-1.amazonaws.com/solutions/md/${doc.id}.md`
    )
    if (solutionRes.status === 200) {
      result.push(doc.id)
    }
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

  let type = 'solution'

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
  metadata.solution = null

  if (type === 'solution') {
    const solutionRes = await fetch(
      `https://beta-programming-in-th.s3-ap-southeast-1.amazonaws.com/solutions/md/${metadata.id}.md`
    )
    if (solutionRes.status === 200) {
      const solution = await solutionRes.text()
      metadata.solution = await renderMarkdown(solution)
    }
  }

  return {
    props: {
      type,
      metadata,
    },
    unstable_revalidate: 60,
  }
}
