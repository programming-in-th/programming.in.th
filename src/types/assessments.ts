export interface IAssessment {
  id: string
  name: string
  archived: boolean
  description: string | null
  instruction: string | null
  open: Date
  close: Date
}

export interface IAssessmentTask {
  id: string
  title: string
  fullScore: number
}

export interface IAssessmentwithTask extends IAssessment {
  tasks: IAssessmentTask[]
}
