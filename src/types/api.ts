export interface Result<T = unknown> {
  code: number
  data: T
  msg: string
}

export interface LoginParams {
  username: string
  password: string
}

export interface UserItem {
  _id: string
  userId: number
  userName: string
  userEmail: string
  deptId: string
  state: number
  role: number
  roleList: string
  createId: number
  deptName: string
  userImg: string
}
