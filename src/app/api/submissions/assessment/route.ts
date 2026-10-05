import { NextRequest } from 'next/server'

import { checkUserPermissionOnAssessment } from '@/lib/api/queries/checkOwnerPermissionOnAssessment'
import { getSubmissionsAndCalculateScore } from '@/lib/server/assessment'
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
  if (!(await checkUserPermissionOnAssessment(reqUser, assessmentId))) {
    return forbidden()
  }

  return json(await getSubmissionsAndCalculateScore(assessmentId, userId))
}
