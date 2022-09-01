declare type DeepPartial<T> = T extends object
  ? {
      [P in keyof T]?: DeepPartial<T[P]>
    }
  : T

declare type CursorPagination<T, U> = {
  data: T
  nextCursor: U | null
}
