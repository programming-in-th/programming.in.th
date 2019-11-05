export interface ISubmissionsState {
  readonly submissionsPage: ISubmissionPage
  readonly currentSubmissionUID: string | undefined
  readonly submission_uid: string | undefined
  readonly submissionResponse?: number
}

export interface ISubmission {
  readonly uid: string
  readonly submission_id: string
  readonly username: string
  readonly problem_id: string
  readonly problem_name: string
  readonly language: string
  readonly status: string
  readonly points: number
  readonly time: number
  readonly memory: number
  readonly timestamp: Date
  readonly humanTimestamp: string
  readonly code?: string
  readonly hideCode: boolean
}

export interface INewSubmission {
  readonly uid: string
  readonly problem_id: string
  readonly language: string
  readonly code: string
}

export interface ISubmissionPage {
  readonly currentPage: number
  readonly currentPageSize: number | undefined
  readonly searchWord: string
  readonly pointFilter: boolean
}
