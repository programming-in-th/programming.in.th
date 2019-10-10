export interface ISubmissionsState {
  readonly submissionsList: ReadonlyArray<ISubmission>
  readonly submissionsPage: ISubmissionPage
  readonly submissionsListStatus: 'LOADING' | 'SUCCESS' | null
  readonly detail: ISubmission | undefined
  readonly detailStatus: 'LOADING' | 'SUCCESS' | null
  readonly currentSubmissionUID: string | undefined
  readonly submission_uid: string | undefined
  readonly submissionResponse?: number
}

export interface ISubmission {
  readonly uid: string
  readonly submission_id: string
  readonly username: string
  readonly problem_id: string
  readonly language: string
  readonly status: string
  readonly points: number
  readonly time: number
  readonly memory: number
  readonly timestamp: Date
  readonly code?: string
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
