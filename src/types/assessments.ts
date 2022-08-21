export interface IAssessment {
  id: string
  name: string
  private: boolean
  description?: string
  instruction?: string
  open: Date
  close: Date
}
