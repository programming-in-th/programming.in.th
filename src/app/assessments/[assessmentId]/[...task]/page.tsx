import { Loading } from '@/components/Loading'
import { TaskContent } from '@/components/Task/Content'
import { TaskLayout } from '@/components/Task/Layout'
import { getTask } from '@/lib/api/queries/getTask'

export default async function AssessmentTask(
  props: PageProps<'/assessments/[assessmentId]/[...task]'>
) {
  const params = await props.params
  const assessmentId = params.assessmentId
  const taskPath = params.task

  const taskId = taskPath[0]
  const type = taskPath.length === 1 ? 'statement' : taskPath[1]

  const { task } = await getTask(taskId, type)

  return (
    <>
      {task ? (
        <TaskLayout task={task} type={type} assessmentId={assessmentId}>
          <TaskContent
            task={task}
            type={type}
            solution={null}
            assessmentId={assessmentId}
          />
        </TaskLayout>
      ) : (
        <Loading />
      )}
    </>
  )
}
