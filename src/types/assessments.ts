import { MDXRemoteSerializeResult } from 'next-mdx-remote'

export interface IAssessment {
  id: string
  name: string
  archived: boolean
  description: string | null
  instruction: MDXRemoteSerializeResult | string | null
  open: string
  close: string
}

export interface IAssessmentTask {
  id: string
  title: string
  fullScore: number
}

export interface IAssessmentwithTask extends IAssessment {
  tasks: IAssessmentTask[]
}
