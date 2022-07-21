import prisma from '@/lib/prisma'

export async function getStaticProps() {
  const tasks = await prisma.task.findMany()
  return {
    props: {
      tasks: tasks.map((item: any) => {
        let x = Math.floor(Math.random() * item.fullScore)
        if (x > 80) x = item.fullScore
        return {
          id: item.id,
          title: item.title,
          tags: [],
          solved: item.solved,
          score: x,
          fullScore: item.fullScore
        }
      })
    }
  }
}
