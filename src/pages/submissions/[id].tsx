import { GetStaticPaths, GetStaticProps } from 'next'

import prisma from '@/lib/prisma'

const Submissions = ({ id, tasks }) => {
  return <>{id}</>
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: true
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const id = params.id

  return {
    props: {
      id
    }
  }
}

export default Submissions
