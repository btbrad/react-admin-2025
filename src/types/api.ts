export interface Result<T = unknown> {
  code: number
  data: T
  msg: string
}

export interface ResultData<T = unknown> {
  list: T[]
  page: {
    pageNum: number
    pageSize: number
    total: number
  }
}

export interface PageParams {
  pageNum: number
  pageSize?: number
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
  mobile: string
  job: string
}

export interface UserSearchParams extends PageParams {
  userId?: number
  userName?: string
  state?: number
}

export interface CreateUserParams {
  userName: string
  userEmail: string
  mobile?: string
  deptId: string
  job?: string
  state?: number
  roleList: string[]
  userImg: string
}

export interface EditUserParams extends CreateUserParams {
  userId: number
}

export interface DashboardReport {
  driverCount: number
  totalMoney: number
  orderCount: number
  cityNum: number
}

export interface DashboardLineData {
  label: string[]
  order: number[]
  money: number[]
}

export interface DashboardPieData {
  value: number
  name: string
}

export interface DashboardRadarData {
  indicator: { name: string; max: number }[]
  value: number[]
}
