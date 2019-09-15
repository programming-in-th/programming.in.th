export interface ILearnState {
  readonly menuStatus: 'LOADING' | 'SUCCESS' | null
  readonly currentContentStatus: 'LOADING' | 'SUCCESS' | null
  readonly idMap: Map<string, INode>
  readonly menu: INode[] | undefined
  readonly currentContent: string | undefined
}

export interface INode {
  readonly name: string
  readonly type: string
  readonly article_id?: string
  readonly url?: string
  readonly articles?: INode[]
}
