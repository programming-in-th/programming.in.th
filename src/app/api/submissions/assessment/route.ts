import { notFound } from 'next/navigation'
import { NextRequest } from 'next/server'

import { ScoringType } from '@prisma/client'

import prisma from '@/lib/prisma'
import { bestSubmission, sumSubtask } from '@/lib/scoring'
import { getServerUser } from '@/lib/session'
import { APIResponse } from '@/types/APITypes'
import { badRequest, forbidden, json, unauthorized } from '@/utils/apiResponse'

export async function GET(
  req: NextRequest
): Promise<APIResponse<'GET /api/submissions/assessment'>> {
  const reqUser = await getServerUser()
  if (!reqUser || !reqUser.id) return unauthorized()

  const { searchParams } = new URL(req.url)

  const assessmentId = searchParams.get('assessmentId')
  const userId = searchParams.get('userId') ?? reqUser.id

  if (!assessmentId || !userId) {
    return badRequest()
  }

  if (!reqUser.admin && reqUser.id !== userId) return forbidden()

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
      submissions: submissionsOnThisTask.map(sub => ({
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

  return json(result)
}
