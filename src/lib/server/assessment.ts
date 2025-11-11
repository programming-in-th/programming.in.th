import { notFound } from 'next/navigation'

import prisma from '@/lib/prisma'
import { bestSubmission, sumSubtask } from '@/lib/scoring'
import { ScoringType } from '@/prisma/enums'

export async function getSubmissionsAndCalculateScore(
  assessmentId: string,
  userId: string
) {
  const assessment = await prisma.assessment.findUnique({
    where: {
      id: assessmentId
    },
    include: {
      tasks: {
        select: {
          task: { select: { id: true, title: true, fullScore: true } }
        }
      }
    }
  })

  if (!assessment) return notFound()

  const submissions = await prisma.submission.findMany({
    where: {
      assessmentId,
      userId
    }
  })

  const result = assessment.tasks.map(edge => {
    const submissionsOnThisTask =
      submissions?.filter(submission => submission.taskId === edge.task.id) ||
      []

    return {
      id: edge.task.id,
      title: edge.task.title,
      score:
        assessment.scoringType === ScoringType.SUM_SUBTASK
          ? sumSubtask(submissionsOnThisTask)
          : bestSubmission(submissionsOnThisTask),
      fullScore: edge.task.fullScore,
      // Sending only neccessary data to client (Reduce payload size)
      submissions: submissionsOnThisTask
        .sort((a, b) => b.id - a.id)
        .map(sub => ({
          id: sub.id,
          taskId: sub.taskId,
          score: sub.score,
          language: sub.language,
          time: sub.time,
          memory: sub.memory,
          submittedAt: sub.submittedAt.toISOString()
        }))
    }
  })

  return result
}
