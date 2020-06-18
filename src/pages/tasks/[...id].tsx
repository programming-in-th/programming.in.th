import React from 'react'
import { GetStaticPaths, GetStaticProps } from 'next'

import { useRouter } from 'next/router'

import { TaskLayout } from 'components/tasks/TaskLayout'
import { Statement } from 'components/tasks/Statement'
import { Solution } from 'components/tasks/Solution'
import { SubmissionsList } from 'components/submissions/SubmissionsList'

import { renderMarkdown } from 'lib/renderMarkdown'

import db from 'lib/firebase-admin'

export default ({ type, metadata }) => {
  const router = useRouter()

  const RenderPage = ({ type: it }) => {
    switch (it) {
      case 'statement':
        return <Statement metadata={metadata} />

      case 'solution':
        return <Solution solution={metadata.solution} />

      case 'submissions':
        return <SubmissionsList id={metadata.id} />
    }
  }

  return (
    <TaskLayout type={type} metadata={metadata}>
      {router.isFallback ? null : <RenderPage type={type} />}
    </TaskLayout>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const taskDocs = await db()
    .collection('tasks')
    .where('visible', '==', true)
    .get()

  const result: string[][] = []

  for (const doc of taskDocs.docs) {
    const solutionRes = await fetch(
      `https://beta-programming-in-th.s3-ap-southeast-1.amazonaws.com/solutions/md/${doc.id}.md`
    )
    result.push([doc.id])
    result.push([doc.id, 'submissions'])
    if (solutionRes.status === 200) {
      result.push([doc.id, 'solution'])
    }
  }
  return {
    paths: result.map((id: string[]) => {
      return { params: { id } }
    }),
    fallback: true,
  }
}

export const getStaticProps: GetStaticProps = async ({ params: { id } }) => {
  let metadata: any = { solution: null }

  const taskDoc = await db().doc(`tasks/${id[0]}`).get()

  let type = id.length === 1 ? 'statement' : id[1]

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
