import { PrismaClient, Task } from '@prisma/client'
const prisma = new PrismaClient()

const data: Task[] = [
  {
    fullScore: 100,
    private: false,
    path: 'prog/00',
    title: 'A+B Problem',
    type: 'NORMAL',
    id: '0000',
    statement: 'PDF'
  },
  {
    type: 'NORMAL',
    title: 'Grading',
    private: false,
    path: 'prog/00',
    fullScore: 100,
    id: '0001',
    statement: 'PDF'
  },
  {
    path: 'prog/00',
    type: 'NORMAL',
    private: false,
    title: 'Min Max',
    fullScore: 100,
    id: '0002',
    statement: 'PDF'
  },
  {
    fullScore: 100,
    title: 'Matrix Addition',
    type: 'NORMAL',
    private: false,
    path: 'prog/00',
    id: '0003',
    statement: 'PDF'
  },
  {
    title: 'Character Checker',
    path: 'prog/00',
    private: false,
    type: 'NORMAL',
    fullScore: 100,
    id: '0004',
    statement: 'PDF'
  },
  {
    fullScore: 100,
    path: 'prog/00',
    private: false,
    title: 'Pythagorus',
    type: 'NORMAL',
    id: '0005',
    statement: 'PDF'
  },
  {
    title: 'Soundex',
    private: false,
    fullScore: 100,
    path: 'prog/00',
    type: 'NORMAL',
    id: '0006',
    statement: 'PDF'
  },
  {
    path: 'prog/00',
    fullScore: 100,
    type: 'NORMAL',
    title: 'Herman',
    private: false,
    id: '0007',
    statement: 'PDF'
  },
  {
    type: 'NORMAL',
    private: false,
    title: 'X2',
    path: 'prog/00',
    fullScore: 100,
    id: '0008',
    statement: 'PDF'
  },
  {
    private: false,
    type: 'NORMAL',
    title: 'ABC',
    fullScore: 100,
    path: 'prog/00',
    id: '0009',
    statement: 'PDF'
  },
  {
    title: 'Trik',
    private: false,
    path: 'prog/00',
    fullScore: 100,
    type: 'NORMAL',
    id: '0010',
    statement: 'PDF'
  },
  {
    path: 'ipst/62/may',
    type: 'NORMAL',
    fullScore: 100,
    title: 'กุ๊ยจัดแถว',
    private: false,
    id: 'o62_may09_judtaew',
    statement: 'PDF'
  }
]

async function main() {
  await prisma.task.createMany({
    data
  })
}

main()
  .catch(e => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
