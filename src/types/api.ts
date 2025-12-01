export interface Result<T = unknown> {
  code: number
  data: T
  msg: string
}

export interface LoginParams {
  username: string
  password: string
}
