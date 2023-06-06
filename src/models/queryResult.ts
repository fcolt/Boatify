export interface QueryResult<T> {
  totalSize: number,
  done: boolean,
  records: T[],
  queryLocator?: string
}