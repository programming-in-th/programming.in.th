import React, { useEffect } from 'react'
import { GetStaticPaths, GetStaticProps } from 'next'

import { useRouter } from 'next/router'

import { TaskLayout } from 'components/tasks/TaskLayout'
import { Statement } from 'components/tasks/Statement'
import { Solution } from 'components/tasks/Solution'
import { SubmissionsList } from 'components/submissions/SubmissionsList'

import { renderMarkdown } from 'lib/renderMarkdown'

import { config } from 'config'

import db from 'lib/firebase-admin'

const Task = ({ type, metadata }) => {
  const router = useRouter()

  useEffect(() => {
    if (type === 'wrong') {
      router.push('/tasks/[...id]', `/tasks/${metadata.id}`)
    }
  }, [type])

  const RenderPage = ({ type: it }) => {
    switch (it) {
      case 'statement':
        return <Statement metadata={metadata} />

      case 'solution':
        return <Solution solution={metadata.solution} />

      case 'submissions':
        return <SubmissionsList id={metadata.id} />

      default:
        return null
    }
  }

  return (
    <TaskLayout type={type} metadata={metadata}>
      {router.isFallback ? null : <RenderPage type={type} />}
    </TaskLayout>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: true,
  }

  // const taskDocs = await db()
  //   .collection('tasks')
  //   .where('visible', '==', true)
  //   .get()

  // const result: string[][] = []

  // for (const doc of taskDocs.docs) {
  //   result.push([doc.id])
  // }
  // return {
  //   paths: result.map((id: string[]) => {
  //     return { params: { id } }
  //   }),
  //   fallback: true,
  // }
}

export const getStaticProps: GetStaticProps = async ({ params: { id } }) => {
  let metadata: any = {}

  const taskDoc = await db().doc(`tasks/${id[0]}`).get()

  let type = id.length === 1 ? 'statement' : id[1]

  if (
    (type !== 'statement' && type !== 'submissions' && type !== 'solution') ||
    id.length > 2
  ) {
    return {
      props: {
        type: 'wrong',
        metadata: { id: id[0] },
      },
    }
  }

  if (taskDoc.exists) {
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
      `${config.awsURL}/solutions/md/${metadata.id}.md`
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
    revalidate: 60,
  }
}

export default Task
