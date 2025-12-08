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
  mobile: string
  job: string
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
